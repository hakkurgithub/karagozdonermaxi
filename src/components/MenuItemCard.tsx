// components/MenuItemCard.tsx
import React from 'react';
import { MenuItem } from '../types/menu';

interface MenuItemCardProps {
  item: MenuItem;
  onAddToCart: (item: MenuItem) => void;
  className?: string;
}

const MenuItemCard: React.FC<MenuItemCardProps> = ({ item, onAddToCart, className = '' }) => {
  return (
    <div 
      className={`bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer transform hover:-translate-y-2 ${className}`}
      onClick={() => onAddToCart(item)}
    >
      <div className="relative overflow-hidden">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = 'https://via.placeholder.com/300x200/667eea/ffffff?text=Karagöz+Döner+Maxi';
          }}
        />
        <div className="absolute top-3 left-3">
          <div className="bg-white/95 backdrop-blur-sm p-1 rounded-full shadow-lg">
            <img 
              src="/logo.svg" 
              alt="Karagöz" 
              className="w-6 h-6"
            />
          </div>
        </div>
        <div className="absolute top-3 right-3">
          <div className="bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-sm font-semibold text-red-600">
            {item.rating} ⭐
          </div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      
      <div className="p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-2 group-hover:text-red-600 transition-colors">
          {item.name}
        </h3>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {item.description}
        </p>
        
        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold text-red-600">
            {item.price.toLocaleString('hu-HU')} Ft
          </div>
          
          <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors duration-200 transform hover:scale-105">
            Kosárba
          </button>
        </div>
      </div>
    </div>
  );
};

export default MenuItemCard;