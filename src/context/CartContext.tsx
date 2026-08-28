"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { CartItem, CartState } from "@/types/cart";

interface CartContextType {
  cart: CartState;
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartState>({ items: [] });

  const addToCart = (item: CartItem) => {
    setCart((prev) => {
      const existingItem = item.idVariant
        ? prev.items.find((i) => i.idVariant === item.idVariant)
        : prev.items.find((i) => i.id === item.id);

      if (existingItem) {
        return {
          items: prev.items.map((i) =>
            item.idVariant
              ? i.idVariant === item.idVariant
                ? { ...i, quantity: i.quantity + item.quantity }
                : i
              : i.id === item.id
                ? { ...i, quantity: i.quantity + item.quantity }
                : i,
          ),
        };
      }
      return { items: [...prev.items, item] };
    });
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => ({
      items: prev.items.filter(
        (item) => item.id !== id && item.idVariant !== id,
      ),
    }));
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity < 1) {
      // removeFromCart(id);
      return;
    }
    setCart((prev) => ({
      items: prev.items.map((item) =>
        item.idVariant === id || item.id === id ? { ...item, quantity } : item,
      ),
    }));
  };

  const clearCart = () => {
    setCart({ items: [] });
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
