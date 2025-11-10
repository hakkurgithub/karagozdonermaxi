// components/SearchAndSort.tsx
import React from 'react';

interface SearchAndSortProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  sortBy: 'name' | 'price' | 'rating';
  onSortChange: (sort: 'name' | 'price' | 'rating') => void;
  className?: string;
}

const SearchAndSort: React.FC<SearchAndSortProps> = ({
  searchQuery,
  onSearchChange,
  sortBy,
  onSortChange,
  className = ''
}) => {
  return (
    <div className={`flex flex-col sm:flex-row gap-4 ${className}`}>
      <div className="flex-1">
        <div className="relative">
          <input
            type="text"
            placeholder="Étel keresése..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:outline-none transition-colors"
          />
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
            🔍
          </div>
        </div>
      </div>
      
      <div className="sm:w-48">
        <select
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value as 'name' | 'price' | 'rating')}
          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:outline-none transition-colors"
        >
          <option value="name">Név szerint</option>
          <option value="price">Ár szerint</option>
          <option value="rating">Értékelés szerint</option>
        </select>
      </div>
    </div>
  );
};

export default SearchAndSort;