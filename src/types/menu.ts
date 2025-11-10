// types/menu.ts
export type MenuCategory =
  | "Kebapok és Grillek"
  | "Pide és Lahmacun"
  | "Döner"
  | "Dürüm"
  | "Levesek"
  | "Köretek"
  | "Desszertek"
  | "Italok"
  | "Gyros tálak"
  | "Hamburgerek"
  | "Gyros piták"
  | "Saláták"
  | "Tészták"
  | "Közkedvelt ételek";

export interface MenuItem {
  id: string;
  name: string;
  price: number;
  description: string;
  category: MenuCategory;
  image: string;
  rating: number;
  isAvailable?: boolean;
  spiceLevel?: 1 | 2 | 3 | 4 | 5;
  isPopular?: boolean;
  isNew?: boolean;
}

export interface CartItem extends MenuItem {
  quantity: number;
  totalPrice: number;
}

export interface CategoryInfo {
  category: MenuCategory;
  displayName: string;
  icon: string;
  color: string;
}