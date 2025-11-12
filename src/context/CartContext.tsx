// context/CartContext.tsx
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { MenuItem, CartItem } from '../types/menu';

const CART_STORAGE_KEY = 'karagoz-cart';

interface CartContextType {
  cartItems: CartItem[];
  isCartOpen: boolean;
  setIsCartOpen: (isOpen: boolean) => void;
  addToCart: (item: MenuItem, quantity?: number) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
  getTotalItems: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // LocalStorage'dan sepet verilerini yükle
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem(CART_STORAGE_KEY);
      console.log('🔄 localStorage\'dan sepet yükleniyor:', savedCart);
      if (savedCart) {
        const parsedCart = JSON.parse(savedCart);
        console.log('✅ Sepet başarıyla yüklendi:', parsedCart);
        setCartItems(parsedCart);
      } else {
        console.log('ℹ️ localStorage\'da sepet verisi bulunamadı');
      }
    } catch (error) {
      console.error('❌ Sepet verilerini yüklerken hata:', error);
    }
  }, []);

  // Sepet değiştiğinde localStorage'a kaydet
  useEffect(() => {
    try {
      console.log('💾 Sepet localStorage\'a kaydediliyor:', cartItems);
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
    } catch (error) {
      console.error('❌ Sepet verilerini kaydederken hata:', error);
    }
  }, [cartItems]);

  const addToCart = useCallback((item: MenuItem, quantity: number = 1) => {
    console.log('🛒 Context: Ürün sepete ekleniyor:', item.name, 'x' + quantity);
    setCartItems(prev => {
      const existingItem = prev.find(cartItem => cartItem.id === item.id);
      
      if (existingItem) {
        const updated = prev.map(cartItem =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + quantity, totalPrice: (cartItem.quantity + quantity) * cartItem.price }
            : cartItem
        );
        console.log('📦 Mevcut ürün miktarı güncellendi:', updated);
        return updated;
      } else {
        const newCart = [...prev, { ...item, quantity, totalPrice: quantity * item.price }];
        console.log('🆕 Yeni ürün sepete eklendi:', newCart);
        return newCart;
      }
    });
  }, []);

  const removeFromCart = useCallback((itemId: string) => {
    console.log('🗑️ Context: Ürün sepetten kaldırılıyor:', itemId);
    setCartItems(prev => {
      const updated = prev.filter(item => item.id !== itemId);
      console.log('✅ Ürün kaldırıldı, yeni sepet:', updated);
      return updated;
    });
  }, []);

  const updateQuantity = useCallback((itemId: string, quantity: number) => {
    console.log('🔢 Context: Ürün miktarı güncelleniyor:', itemId, 'yeni miktar:', quantity);
    if (quantity <= 0) {
      removeFromCart(itemId);
      return;
    }
    
    setCartItems(prev => {
      const updated = prev.map(item =>
        item.id === itemId
          ? { ...item, quantity, totalPrice: quantity * item.price }
          : item
      );
      console.log('✅ Miktar güncellendi:', updated);
      return updated;
    });
  }, [removeFromCart]);

  const clearCart = useCallback(() => {
    console.log('🧹 Context: Sepet temizleniyor');
    setCartItems([]);
  }, []);

  const getTotalPrice = useCallback(() => {
    const total = cartItems.reduce((total, item) => total + item.totalPrice, 0);
    console.log('💰 Toplam fiyat hesaplandı:', total, 'Ft');
    return total;
  }, [cartItems]);

  const getTotalItems = useCallback(() => {
    const total = cartItems.reduce((total, item) => total + item.quantity, 0);
    console.log('📊 Toplam ürün sayısı:', total);
    return total;
  }, [cartItems]);

  const value: CartContextType = {
    cartItems,
    isCartOpen,
    setIsCartOpen,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalPrice,
    getTotalItems
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};