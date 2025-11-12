// hooks/useMenu.ts
import { useState, useMemo } from 'react';
import { MenuCategory } from '../types/menu';
import { MENU_ITEMS } from '../lib/menuData';
import { CATEGORY_ORDER } from '../data/categoryConfig';

export const useMenu = () => {
  const [selectedCategory, setSelectedCategory] = useState<MenuCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'price' | 'rating'>('name');

  const categories = useMemo(() => {
    return CATEGORY_ORDER;
  }, []);

  const filteredItems = useMemo(() => {
    // Start with active items only
    let items = MENU_ITEMS.filter(item => item.isActive !== false);

    // Filter by category
    if (selectedCategory !== 'all') {
      items = items.filter(item => item.category === selectedCategory);
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      items = items.filter(item =>
        item.name.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query)
      );
    }

    // Sort items
    items.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name, 'hu');
        case 'price':
          return a.price - b.price;
        case 'rating':
          return b.rating - a.rating;
        default:
          return 0;
      }
    });

    return items;
  }, [selectedCategory, searchQuery, sortBy]);

  const getItemsByCategory = (category: MenuCategory) => {
    return MENU_ITEMS.filter(item => item.category === category);
  };

  const getPopularItems = () => {
    return MENU_ITEMS.filter(item => item.rating >= 4.5);
  };

  const getNewItems = () => {
    return MENU_ITEMS.filter(item => item.id.startsWith('wix-'));
  };

  return {
    categories,
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
    sortBy,
    setSortBy,
    filteredItems,
    getItemsByCategory,
    getPopularItems,
    getNewItems,
    allItems: MENU_ITEMS
  };
};