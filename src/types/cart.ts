import type { ColorOption } from "@/types/product";

export interface CartItem {
  id: string;
  category: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
  description: string;
  color: string[];
  size: number[];
  selectedColor?: string;
  selectedSize?: number;
  colorOptions?: ColorOption[];
  idVariant?: string;
  stockVariant?: number;
  madeToOrder?: boolean;
  deliveryText?: string;
}

export interface CartState {
  items: CartItem[];
}

export interface MenuItem {
  id: string;
  text: string;
  href: string;
  subMenu?: SubMenuItem[];
}

export interface SubMenuItem {
  id: string;
  text: string;
  href: string;
}
