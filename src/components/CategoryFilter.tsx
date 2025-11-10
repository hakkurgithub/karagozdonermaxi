// components/CategoryFilter.tsx
import React from 'react';
import { MenuCategory } from '../types/menu';
import { CATEGORY_CONFIG } from '../data/categoryConfig';

interface CategoryFilterProps {
  categories: MenuCategory[];
  selectedCategory: MenuCategory | 'all';
  onCategoryChange: (category: MenuCategory | 'all') => void;
  className?: string;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({
  categories,
  selectedCategory,
  onCategoryChange,
  className = ''
}) => {
  return (
    <div className={`flex flex-wrap gap-3 justify-center ${className}`}>
      <button
        onClick={() => onCategoryChange('all')}
        className={`px-6 py-3 rounded-full font-semibold transition-all duration-200 transform hover:scale-105 ${
          selectedCategory === 'all'
            ? 'bg-gradient-to-r from-red-500 to-orange-600 text-white shadow-lg'
            : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-red-300'
        }`}
      >
        🌟 Minden étel
      </button>
      
      {categories.map((category) => {
        const config = CATEGORY_CONFIG[category];
        return (
          <button
            key={category}
            onClick={() => onCategoryChange(category)}
            className={`px-6 py-3 rounded-full font-semibold transition-all duration-200 transform hover:scale-105 flex items-center gap-2 ${
              selectedCategory === category
                ? `bg-gradient-to-r ${config.color} text-white shadow-lg`
                : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-red-300'
            }`}
          >
            <span className="text-lg">{config.icon}</span>
            <span className="hidden sm:inline">{config.displayName}</span>
          </button>
        );
      })}
    </div>
  );
};

export default CategoryFilter;