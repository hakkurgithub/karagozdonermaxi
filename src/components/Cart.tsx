// components/Cart.tsx
import React from 'react';
import { CartItem } from '../types/menu';

interface CartProps {
  items: CartItem[];
  isOpen: boolean;
  onClose: () => void;
  onUpdateQuantity: (itemId: string, quantity: number) => void;
  onRemoveItem: (itemId: string) => void;
  onClearCart: () => void;
  totalPrice: number;
}

const Cart: React.FC<CartProps> = ({
  items,
  isOpen,
  onClose,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  totalPrice
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex justify-end">
      <div className="bg-white w-full max-w-md h-full overflow-hidden flex flex-col">
        <div className="bg-gradient-to-r from-red-500 to-orange-600 text-white p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img 
                src="/logo.svg" 
                alt="Karagöz Logo" 
                className="w-8 h-8"
              />
              <h2 className="text-xl font-bold">Kosár</h2>
            </div>
            <button
              onClick={onClose}
              className="text-2xl hover:bg-white/20 p-2 rounded-lg transition-colors"
            >
              ×
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          {items.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🛒</div>
              <p className="text-gray-500">A kosár üres</p>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.id} className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800">{item.name}</h3>
                      <p className="text-red-600 font-bold">
                        {item.price.toLocaleString('hu-HU')} Ft
                      </p>
                      
                      <div className="flex items-center gap-2 mt-2">
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                          className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center font-bold"
                        >
                          -
                        </button>
                        <span className="w-8 text-center font-semibold">{item.quantity}</span>
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                          className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center font-bold"
                        >
                          +
                        </button>
                      </div>
                    </div>
                    
                    <button
                      onClick={() => onRemoveItem(item.id)}
                      className="text-red-500 hover:bg-red-50 p-2 rounded-lg"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t p-4">
            <div className="flex items-center justify-between mb-4">
              <span className="text-lg font-semibold">Összesen:</span>
              <span className="text-2xl font-bold text-red-600">
                {totalPrice.toLocaleString('hu-HU')} Ft
              </span>
            </div>
            
            <div className="space-y-2">
              <button 
                onClick={() => {
                  onClose();
                  (window as any).navigateTo('cart');
                }}
                className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-semibold transition-colors"
              >
                🛒 Rendelés leadása
              </button>
              <button
                onClick={onClearCart}
                className="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 py-2 rounded-lg font-semibold transition-colors"
              >
                🗑️ Kosár ürítése
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;