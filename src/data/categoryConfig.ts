// data/categoryConfig.ts
import { CategoryInfo, MenuCategory } from '../types/menu';

export const CATEGORY_CONFIG: Record<MenuCategory, CategoryInfo> = {
  "Kebapok és Grillek": {
    category: "Kebapok és Grillek",
    displayName: "Kebapok és Grillek",
    icon: "🍖",
    color: "from-red-500 to-orange-600"
  },
  "Pide és Lahmacun": {
    category: "Pide és Lahmacun",
    displayName: "Pide és Lahmacun",
    icon: "🍞",
    color: "from-amber-500 to-yellow-600"
  },
  "Döner": {
    category: "Döner",
    displayName: "Döner",
    icon: "🥙",
    color: "from-green-500 to-teal-600"
  },
  "Dürüm": {
    category: "Dürüm",
    displayName: "Dürüm",
    icon: "🌯",
    color: "from-blue-500 to-cyan-600"
  },
  "Levesek": {
    category: "Levesek",
    displayName: "Levesek",
    icon: "🍲",
    color: "from-purple-500 to-pink-600"
  },
  "Köretek": {
    category: "Köretek",
    displayName: "Köretek",
    icon: "🥗",
    color: "from-emerald-500 to-green-600"
  },
  "Desszertek": {
    category: "Desszertek",
    displayName: "Desszertek",
    icon: "🍰",
    color: "from-pink-500 to-rose-600"
  },
  "Italok": {
    category: "Italok",
    displayName: "Italok",
    icon: "🥤",
    color: "from-indigo-500 to-blue-600"
  },
  "Gyros tálak": {
    category: "Gyros tálak",
    displayName: "Gyros tálak",
    icon: "🍽️",
    color: "from-orange-500 to-red-600"
  },
  "Hamburgerek": {
    category: "Hamburgerek",
    displayName: "Hamburgerek",
    icon: "🍔",
    color: "from-yellow-500 to-orange-600"
  },
  "Gyros piták": {
    category: "Gyros piták",
    displayName: "Gyros piták",
    icon: "🥙",
    color: "from-teal-500 to-cyan-600"
  },
  "Saláták": {
    category: "Saláták",
    displayName: "Saláták",
    icon: "🥬",
    color: "from-lime-500 to-green-600"
  },
  "Tészták": {
    category: "Tészták",
    displayName: "Tészták",
    icon: "🍝",
    color: "from-red-500 to-pink-600"
  },
  "Közkedvelt ételek": {
    category: "Közkedvelt ételek",
    displayName: "Közkedvelt ételek",
    icon: "⭐",
    color: "from-amber-500 to-yellow-600"
  }
};

export const CATEGORY_ORDER: MenuCategory[] = [
  "Közkedvelt ételek",
  "Kebapok és Grillek", 
  "Pide és Lahmacun",
  "Döner",
  "Dürüm",
  "Gyros tálak",
  "Gyros piták",
  "Hamburgerek",
  "Saláták",
  "Levesek",
  "Köretek",
  "Tészták",
  "Desszertek",
  "Italok"
];