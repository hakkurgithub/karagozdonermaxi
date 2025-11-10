// App.tsx
import { useState, useEffect, useCallback } from 'react';
import MenuPage from './pages/MenuPage';
import ContactPage from './pages/ContactPage';
import CartPage from './pages/CartPage';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import AdminMenuManagement from './pages/AdminMenuManagement';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('menu');

  useEffect(() => {
    // URL'yi kontrol et
    const path = window.location.pathname;
    if (path === '/contact') {
      setCurrentPage('contact');
    } else if (path === '/cart') {
      setCurrentPage('cart');
    } else if (path === '/admin') {
      setCurrentPage('admin-login');
    } else if (path === '/admin/dashboard') {
      setCurrentPage('admin-dashboard');
    } else if (path === '/admin/menu') {
      setCurrentPage('admin-menu');
    } else {
      setCurrentPage('menu');
    }

    // Browser back/forward butonları için
    const handlePopState = () => {
      const path = window.location.pathname;
      if (path === '/contact') {
        setCurrentPage('contact');
      } else if (path === '/cart') {
        setCurrentPage('cart');
      } else if (path === '/admin') {
        setCurrentPage('admin-login');
      } else if (path === '/admin/dashboard') {
        setCurrentPage('admin-dashboard');
      } else if (path === '/admin/menu') {
        setCurrentPage('admin-menu');
      } else {
        setCurrentPage('menu');
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Sayfa değiştirme fonksiyonu
  const navigateTo = useCallback((page: string) => {
    setCurrentPage(page);
    if (page === 'contact') {
      window.history.pushState(null, '', '/contact');
    } else if (page === 'cart') {
      window.history.pushState(null, '', '/cart');
    } else if (page === 'admin-login') {
      window.history.pushState(null, '', '/admin');
    } else if (page === 'admin-dashboard') {
      window.history.pushState(null, '', '/admin/dashboard');
    } else if (page === 'admin-menu') {
      window.history.pushState(null, '', '/admin/menu');
    } else {
      window.history.pushState(null, '', '/');
    }
  }, []);

  // Global navigation fonksiyonunu window objesine ekle
  useEffect(() => {
    (window as any).navigateTo = navigateTo;
  }, [navigateTo]);

  return (
    <div className="App">
      {currentPage === 'contact' ? (
        <ContactPage />
      ) : currentPage === 'cart' ? (
        <CartPage />
      ) : currentPage === 'admin-login' ? (
        <AdminLogin />
      ) : currentPage === 'admin-dashboard' ? (
        <AdminDashboard />
      ) : currentPage === 'admin-menu' ? (
        <AdminMenuManagement />
      ) : (
        <MenuPage />
      )}
    </div>
  );
}

export default App;