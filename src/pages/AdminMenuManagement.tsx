// pages/AdminMenuManagement.tsx
import React, { useState, useEffect } from 'react';
import { MenuItem, MenuCategory } from '../types/menu';
import { MENU_ITEMS } from '../lib/menuData';

interface MenuFormData {
  name: string;
  description: string;
  price: number;
  category: MenuCategory;
  image: string;
  rating: number;
}

const AdminMenuManagement: React.FC = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [filteredItems, setFilteredItems] = useState<MenuItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState<MenuCategory | 'all'>('all');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [formData, setFormData] = useState<MenuFormData>({
    name: '',
    description: '',
    price: 0,
    category: "Kebapok és Grillek",
    image: '',
    rating: 4.0
  });

  useEffect(() => {
    // Check authentication
    const token = localStorage.getItem('adminToken');
    if (!token) {
      (window as any).navigateTo('admin-login');
      return;
    }

    // Load menu items (simulated data for now)
    loadMenuItems();
  }, []);

  // Filter items when search or category changes
  useEffect(() => {
    let filtered = menuItems;

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply category filter
    if (filterCategory !== 'all') {
      filtered = filtered.filter(item => item.category === filterCategory);
    }

    setFilteredItems(filtered);
  }, [menuItems, searchTerm, filterCategory]);

  const loadMenuItems = () => {
    // Load real menu items from menuData.ts
    setMenuItems(MENU_ITEMS);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'price' || name === 'rating' ? parseFloat(value) : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingItem) {
      // Update existing item
      setMenuItems(prev => prev.map(item => 
        item.id === editingItem.id 
          ? { ...item, ...formData }
          : item
      ));
    } else {
      // Add new item
      const newItem: MenuItem = {
        id: Date.now().toString(),
        ...formData
      };
      setMenuItems(prev => [...prev, newItem]);
    }
    
    resetForm();
  };

  const handleEdit = (item: MenuItem) => {
    setEditingItem(item);
    setFormData({
      name: item.name,
      description: item.description,
      price: item.price,
      category: item.category,
      image: item.image,
      rating: item.rating
    });
    setIsFormOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Bu ürünü silmek istediğinizden emin misiniz?')) {
      setMenuItems(prev => prev.filter(item => item.id !== id));
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      price: 0,
      category: "Kebapok és Grillek",
      image: '',
      rating: 4.0
    });
    setEditingItem(null);
    setIsFormOpen(false);
  };

  const goToDashboard = () => {
    (window as any).navigateTo('admin-dashboard');
  };

  const categories: { value: MenuCategory; label: string }[] = [
    { value: "Kebapok és Grillek", label: 'Kebab ve Grill' },
    { value: "Pide és Lahmacun", label: 'Pide ve Lahmacun' },
    { value: "Döner", label: 'Döner' },
    { value: "Dürüm", label: 'Dürüm' },
    { value: "Levesek", label: 'Çorbalar' },
    { value: "Köretek", label: 'Garnitürler' },
    { value: "Desszertek", label: 'Tatlılar' },
    { value: "Italok", label: 'İçecekler' },
    { value: "Gyros tálak", label: 'Gyros Tabakları' },
    { value: "Hamburgerek", label: 'Hamburgerler' },
    { value: "Gyros piták", label: 'Gyros Pita' },
    { value: "Saláták", label: 'Salatalar' },
    { value: "Tészták", label: 'Makarnalar' },
    { value: "Közkedvelt ételek", label: 'Popüler Yemekler' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center gap-4">
              <button
                onClick={goToDashboard}
                className="text-gray-600 hover:text-gray-900"
              >
                ← Geri
              </button>
              <img 
                src="/logo.svg" 
                alt="Karagöz Logo" 
                className="w-8 h-8"
              />
              <h1 className="text-2xl font-bold text-gray-900">Menü Yönetimi</h1>
            </div>
            <button
              onClick={() => setIsFormOpen(true)}
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg transition-colors"
            >
              ➕ Yeni Ürün Ekle
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Menu Items List */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Mevcut Ürünler</h2>
            <div className="text-sm text-gray-600">
              {filteredItems.length} ürün ({menuItems.length} toplam)
            </div>
          </div>

          {/* Search and Filter Controls */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
                🔍 Ürün Ara
              </label>
              <input
                type="text"
                id="search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Ürün adı veya açıklama..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
            <div>
              <label htmlFor="categoryFilter" className="block text-sm font-medium text-gray-700 mb-1">
                📂 Kategori Filtrele
              </label>
              <select
                id="categoryFilter"
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value as MenuCategory | 'all')}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                <option value="all">Tüm Kategoriler</option>
                {categories.map(cat => (
                  <option key={cat.value} value={cat.value}>
                    {cat.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full table-auto">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4">Ürün</th>
                  <th className="text-left py-3 px-4">Kategori</th>
                  <th className="text-left py-3 px-4">Fiyat</th>
                  <th className="text-left py-3 px-4">Puan</th>
                  <th className="text-left py-3 px-4">İşlemler</th>
                </tr>
              </thead>
              <tbody>
                {filteredItems.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="text-center py-8 text-gray-500">
                      {searchTerm || filterCategory !== 'all' 
                        ? 'Arama kriterlerine uygun ürün bulunamadı.' 
                        : 'Henüz ürün eklenmemiş.'}
                    </td>
                  </tr>
                ) : (
                  filteredItems.map((item) => (
                    <tr key={item.id} className="border-b hover:bg-gray-50">
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                            🍽️
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{item.name}</p>
                            <p className="text-sm text-gray-600 truncate max-w-xs">{item.description}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                          {categories.find(cat => cat.value === item.category)?.label}
                        </span>
                      </td>
                      <td className="py-4 px-4 font-semibold text-gray-900">
                        {item.price} Ft
                      </td>
                      <td className="py-4 px-4">
                        <span className="flex items-center gap-1">
                          ⭐ {item.rating}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEdit(item)}
                            className="bg-blue-100 hover:bg-blue-200 text-blue-700 px-3 py-1 rounded text-sm transition-colors"
                          >
                            ✏️ Düzenle
                          </button>
                          <button
                            onClick={() => handleDelete(item.id)}
                            className="bg-red-100 hover:bg-red-200 text-red-700 px-3 py-1 rounded text-sm transition-colors"
                          >
                            🗑️ Sil
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Add/Edit Form Modal */}
      {isFormOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold text-gray-900">
                  {editingItem ? 'Ürün Düzenle' : 'Yeni Ürün Ekle'}
                </h3>
                <button
                  onClick={resetForm}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Ürün Adı *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    placeholder="Örn: Döner Kebab"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Açıklama *
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    required
                    rows={3}
                    placeholder="Örn: Taze malzemelerle hazırlanmış geleneksel döner..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Fiyat (Ft) *
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    required
                    min="0"
                    placeholder="1800"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Kategori *
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    required
                    title="Ürün Kategorisi"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  >
                    {categories.map(cat => (
                      <option key={cat.value} value={cat.value}>
                        {cat.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Resim URL
                  </label>
                  <input
                    type="url"
                    name="image"
                    value={formData.image}
                    onChange={handleInputChange}
                    placeholder="https://example.com/resim.jpg"
                    title="Ürün Resim URL'si"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Puan (1-5)
                  </label>
                  <input
                    type="number"
                    name="rating"
                    value={formData.rating}
                    onChange={handleInputChange}
                    min="1"
                    max="5"
                    step="0.1"
                    placeholder="4.5"
                    title="Ürün Puanı (1-5)"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="submit"
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg transition-colors"
                  >
                    {editingItem ? 'Güncelle' : 'Ekle'}
                  </button>
                  <button
                    type="button"
                    onClick={resetForm}
                    className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 py-2 rounded-lg transition-colors"
                  >
                    İptal
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminMenuManagement;