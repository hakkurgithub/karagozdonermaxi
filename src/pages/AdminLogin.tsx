// pages/AdminLogin.tsx
import React, { useState } from 'react';

interface LoginFormData {
  username: string;
  password: string;
}

interface AdminLoginProps {
  onLoginSuccess: () => void;
}

const AdminLogin: React.FC<AdminLoginProps> = ({ onLoginSuccess }) => {
  const [formData, setFormData] = useState<LoginFormData>({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError(''); // Clear error when user types
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // Basit authentication - production'da daha güvenli olmalı
      if (formData.username === 'admin' && formData.password === 'karagoz2024') {
        // Admin token'ı localStorage'a kaydet
        const adminToken = btoa(`${formData.username}:${Date.now()}`);
        localStorage.setItem('adminToken', adminToken);
        localStorage.setItem('adminUsername', formData.username);

        // Admin paneline yönlendir
        onLoginSuccess();
      } else {
        setError('Geçersiz kullanıcı adı veya şifre!');
      }
    } catch (err) {
      setError('Giriş yapılırken bir hata oluştu!');
    } finally {
      setIsLoading(false);
    }
  };

  const goToMenu = () => {
    (window as any).navigateTo('menu');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center px-4">
      <div className="max-w-md w-full space-y-8">
        {/* Logo and Header */}
        <div className="text-center">
          <div className="flex justify-center mb-6">
            <div className="bg-white p-4 rounded-full shadow-lg">
              <img 
                src="/logo.svg" 
                alt="Karagöz Döner Logo" 
                className="w-16 h-16"
              />
            </div>
          </div>
          <h2 className="text-3xl font-bold text-white mb-2">
            Yönetim Paneli
          </h2>
          <p className="text-gray-400">
            Karagöz Döner Admin Girişi
          </p>
        </div>

        {/* Login Form */}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-lg bg-white p-8 shadow-xl">
            <div className="space-y-4">
              {/* Username Field */}
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                  👤 Kullanıcı Adı
                </label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  value={formData.username}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
                />
              </div>

              {/* Password Field */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  🔒 Şifre
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
                />
              </div>

              {/* Error Message */}
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                  <p className="text-red-700 text-sm">⚠️ {error}</p>
                </div>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-6 bg-red-600 hover:bg-red-700 disabled:bg-gray-400 text-white py-3 rounded-lg font-semibold transition-colors flex items-center justify-center"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Giriş yapılıyor...
                </>
              ) : (
                '🔑 Giriş Yap'
              )}
            </button>
          </div>
        </form>

        {/* Back to Website */}
        <div className="text-center">
          <button
            onClick={goToMenu}
            className="text-gray-400 hover:text-white transition-colors text-sm"
          >
            ← Ana Siteye Dön
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;