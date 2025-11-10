// pages/MenuPage.tsx
import React, { useState } from 'react';
import { useMenu } from '../hooks/useMenu';
import { useCart } from '../hooks/useCart';
import MenuItemCard from '../components/MenuItemCard';
import CategoryFilter from '../components/CategoryFilter';
import Cart from '../components/Cart';
import SearchAndSort from '../components/SearchAndSort';
import { MenuItem } from '../types/menu';

const MenuPage: React.FC = () => {
  const {
    categories,
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
    sortBy,
    setSortBy,
    filteredItems
  } = useMenu();

  const {
    cartItems,
    isCartOpen,
    setIsCartOpen,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalPrice,
    getTotalItems
  } = useCart();

  const [notification, setNotification] = useState<string | null>(null);

  const handleAddToCart = (item: MenuItem) => {
    addToCart(item);
    setNotification(`${item.name} hozzáadva a kosárhoz!`);
    setTimeout(() => setNotification(null), 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-red-600 to-orange-600 text-white py-8 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center gap-4 mb-4">
            <img 
              src="/logo.svg" 
              alt="Karagöz Döner Maxi Logo" 
              className="w-16 h-16 md:w-20 md:h-20"
            />
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-2">
                Karagöz Döner Maxi
              </h1>
              <p className="text-xl opacity-90">
                Autentikus török konyha • Magyarország
              </p>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Navigation Buttons */}
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={() => (window as any).navigateTo('contact')}
            className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-xl font-semibold transition-colors flex items-center gap-2 shadow-lg transform hover:scale-105"
          >
            📞 Kapcsolat
          </button>
          
          <div className="flex gap-4">
            <button
              onClick={() => setIsCartOpen(true)}
              className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-xl font-semibold transition-colors flex items-center gap-2 shadow-lg transform hover:scale-105"
            >
              👁️ Kosár előnézet
              {getTotalItems() > 0 && (
                <span className="bg-white text-orange-600 px-2 py-1 rounded-full text-sm font-bold">
                  {getTotalItems()}
                </span>
              )}
            </button>
            
            <button
              onClick={() => {
                console.log('Cart button clicked'); 
                // Fallback: Direkt cart sayfasına git
                window.location.href = '/cart';
              }}
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl font-semibold transition-colors flex items-center gap-2 shadow-lg transform hover:scale-105"
            >
              🛒 Rendelés leadása
              {getTotalItems() > 0 && (
                <span className="bg-white text-red-600 px-2 py-1 rounded-full text-sm font-bold">
                  {getTotalItems()}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Category Filter */}
        <div className="mb-8">
          <CategoryFilter
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />
        </div>

        {/* Search and Sort */}
        <div className="mb-8">
          <SearchAndSort
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            sortBy={sortBy}
            onSortChange={setSortBy}
          />
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            {filteredItems.length} étel található
            {selectedCategory !== 'all' && (
              <span className="ml-1">
                a "{selectedCategory}" kategóriában
              </span>
            )}
          </p>
          {/* Debug Info */}
          <div className="text-xs text-gray-400 mt-2">
            Debug: Seçili kategori: {selectedCategory}, Arama: "{searchQuery}"
            <br />
            {selectedCategory !== 'all' && (
              <>
                {selectedCategory} kategorisindeki ürünler: {filteredItems.filter(item => item.category === selectedCategory).length}
                <br />
              </>
            )}
            Toplam filtrelenmiş ürün: {filteredItems.length}
          </div>
        </div>

        {/* Menu Grid */}
        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredItems.map((item) => (
              <MenuItemCard
                key={item.id}
                item={item}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <p className="text-gray-500 text-lg">
              Nincs találat a keresési feltételekre
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className="mt-4 text-red-600 hover:text-red-700 font-semibold"
            >
              Szűrők törlése
            </button>
          </div>
        )}
      </div>

      {/* Cart Component */}
      <Cart
        items={cartItems}
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeFromCart}
        onClearCart={clearCart}
        totalPrice={getTotalPrice()}
      />

      {/* Notification */}
      {notification && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-slide-in">
          {notification}
        </div>
      )}

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h3 className="text-xl font-bold mb-2">Karagöz Étterem</h3>
          <p className="text-gray-300 mb-4">
            Autentikus török konyha • Magyarország
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 text-sm text-gray-400">
            <span>📍 Magyarország</span>
            <span>📞 +36 30 123 4567</span>
            <span>⏰ Minden nap 10:00 - 24:00</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MenuPage;