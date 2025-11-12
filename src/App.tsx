// App.tsx
import { useState, useEffect, useCallback } from 'react';
import MenuPage from './pages/MenuPage';
import ContactPage from './pages/ContactPage';
import CartPage from './pages/CartPage';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import AdminMenuManagement from './pages/AdminMenuManagement';
import { CartProvider } from './context/CartContext';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('menu');

  useEffect(() => {
    // Hash-based routing için URL'yi kontrol et
    const updateFromHash = () => {
      const hash = window.location.hash.slice(1); // # karakterini kaldır
      if (hash === 'contact') {
        setCurrentPage('contact');
      } else if (hash === 'cart') {
        setCurrentPage('cart');
      } else if (hash === 'admin') {
        setCurrentPage('admin-login');
      } else if (hash === 'admin/dashboard') {
        setCurrentPage('admin-dashboard');
      } else if (hash === 'admin/menu') {
        setCurrentPage('admin-menu');
      } else {
        // Hash yoksa veya bilinmeyen hash ise menu sayfasına yönlendir
        setCurrentPage('menu');
        if (!hash) {
          window.location.hash = '#menu';
        }
      }
    };

    updateFromHash();

    // Hash değişikliklerini dinle
    window.addEventListener('hashchange', updateFromHash);
    return () => window.removeEventListener('hashchange', updateFromHash);
  }, []);

  // Sayfa değiştirme fonksiyonu - Hash-based routing
  const navigateTo = useCallback((page: string) => {
    setCurrentPage(page);
    if (page === 'contact') {
      window.location.hash = '#contact';
    } else if (page === 'cart') {
      window.location.hash = '#cart';
    } else if (page === 'admin-login') {
      window.location.hash = '#admin';
    } else if (page === 'admin-dashboard') {
      window.location.hash = '#admin/dashboard';
    } else if (page === 'admin-menu') {
      window.location.hash = '#admin/menu';
    } else {
      window.location.hash = '#menu';
    }
  }, []);

  // Global navigation fonksiyonunu window objesine ekle
  useEffect(() => {
    (window as any).navigateTo = navigateTo;
  }, [navigateTo]);

  return (
    <CartProvider>
      <div className="App">
        {currentPage === 'contact' ? (
          <ContactPage />
        ) : currentPage === 'cart' ? (
          <CartPage />
        ) : currentPage === 'admin-login' ? (
          <AdminLogin onLoginSuccess={() => navigateTo('admin-dashboard')} />
        ) : currentPage === 'admin-dashboard' ? (
          <AdminDashboard />
        ) : currentPage === 'admin-menu' ? (
          <AdminMenuManagement />
        ) : (
          <MenuPage />
        )}
      </div>
    </CartProvider>
  );
}

export default App;