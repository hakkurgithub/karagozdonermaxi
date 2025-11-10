// pages/AdminDashboard.tsx
import React, { useState, useEffect } from 'react';

interface AdminStats {
  totalOrders: number;
  todayOrders: number;
  totalProducts: number;
  totalRevenue: number;
}

const AdminDashboard: React.FC = () => {
  const [adminUsername, setAdminUsername] = useState('');
  const [stats] = useState<AdminStats>({
    totalOrders: 156,
    todayOrders: 12,
    totalProducts: 24,
    totalRevenue: 89450
  });

  useEffect(() => {
    // Check if user is authenticated
    const token = localStorage.getItem('adminToken');
    const username = localStorage.getItem('adminUsername');
    
    if (!token || !username) {
      (window as any).navigateTo('admin-login');
      return;
    }
    
    setAdminUsername(username);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUsername');
    (window as any).navigateTo('admin-login');
  };

  const navigateToMenuManagement = () => {
    (window as any).navigateTo('admin-menu');
  };

  const navigateToOrderManagement = () => {
    (window as any).navigateTo('admin-orders');
  };

  const goToWebsite = () => {
    (window as any).navigateTo('menu');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center gap-4">
              <img 
                src="/logo.svg" 
                alt="Karagöz Logo" 
                className="w-10 h-10"
              />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Yönetim Paneli</h1>
                <p className="text-sm text-gray-600">Karagöz Döner Maxi</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">
                Hoş geldiniz, <strong>{adminUsername}</strong>
              </span>
              <button
                onClick={goToWebsite}
                className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg transition-colors"
              >
                🌐 Siteyi Görüntüle
              </button>
              <button
                onClick={handleLogout}
                className="bg-red-100 hover:bg-red-200 text-red-700 px-4 py-2 rounded-lg transition-colors"
              >
                🚪 Çıkış Yap
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Toplam Sipariş</p>
                <p className="text-3xl font-bold text-gray-900">{stats.totalOrders}</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <span className="text-2xl">📦</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Bugünkü Sipariş</p>
                <p className="text-3xl font-bold text-gray-900">{stats.todayOrders}</p>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <span className="text-2xl">🕒</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-purple-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Toplam Ürün</p>
                <p className="text-3xl font-bold text-gray-900">{stats.totalProducts}</p>
              </div>
              <div className="bg-purple-100 p-3 rounded-full">
                <span className="text-2xl">🍽️</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-yellow-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Toplam Gelir</p>
                <p className="text-3xl font-bold text-gray-900">{stats.totalRevenue.toLocaleString()} Ft</p>
              </div>
              <div className="bg-yellow-100 p-3 rounded-full">
                <span className="text-2xl">💰</span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="text-center">
              <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🍽️</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Menü Yönetimi</h3>
              <p className="text-gray-600 text-sm mb-4">Ürün ekleme, düzenleme ve fiyat güncelleme</p>
              <button
                onClick={navigateToMenuManagement}
                className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg transition-colors"
              >
                Menüyü Yönet
              </button>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">📋</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Sipariş Yönetimi</h3>
              <p className="text-gray-600 text-sm mb-4">Gelen siparişleri görüntüle ve yönet</p>
              <button
                onClick={navigateToOrderManagement}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition-colors"
              >
                Siparişleri Görüntüle
              </button>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">📊</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">İstatistikler</h3>
              <p className="text-gray-600 text-sm mb-4">Satış raporları ve analizler</p>
              <button
                className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg transition-colors"
                disabled
              >
                Yakında
              </button>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Son Aktiviteler</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between py-3 border-b">
              <div className="flex items-center gap-3">
                <div className="bg-green-100 p-2 rounded-full">
                  <span className="text-green-600">✅</span>
                </div>
                <div>
                  <p className="font-medium text-gray-900">Yeni sipariş alındı</p>
                  <p className="text-sm text-gray-600">Döner Kebab x2 - Ahmet Yılmaz</p>
                </div>
              </div>
              <span className="text-sm text-gray-500">5 dakika önce</span>
            </div>

            <div className="flex items-center justify-between py-3 border-b">
              <div className="flex items-center gap-3">
                <div className="bg-blue-100 p-2 rounded-full">
                  <span className="text-blue-600">📝</span>
                </div>
                <div>
                  <p className="font-medium text-gray-900">Menü güncellendi</p>
                  <p className="text-sm text-gray-600">Lahmacun fiyatı güncellendi</p>
                </div>
              </div>
              <span className="text-sm text-gray-500">1 saat önce</span>
            </div>

            <div className="flex items-center justify-between py-3">
              <div className="flex items-center gap-3">
                <div className="bg-purple-100 p-2 rounded-full">
                  <span className="text-purple-600">👤</span>
                </div>
                <div>
                  <p className="font-medium text-gray-900">Admin girişi</p>
                  <p className="text-sm text-gray-600">admin kullanıcısı giriş yaptı</p>
                </div>
              </div>
              <span className="text-sm text-gray-500">2 saat önce</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;