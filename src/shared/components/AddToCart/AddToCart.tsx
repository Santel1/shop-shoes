"use client";

import { useCart } from "@/context/CartContext";

import s from "./AddToCart.module.scss";
import { createCartItem } from "@/modules/productPage/utils/createCartItem";
import { Product } from "@/types/product";

type AddToCartProps = {
  shoe: Product;

  selectedColor: string;
  selectedSize: string | number | null;

  selectedVariant: Product["variants"][number] | null;

  isMadeToOrder: boolean;
  deliveryText: string;

  showSelectionMessage: boolean;
  setShowSelectionMessage: (value: boolean) => void;
};

export default function AddToCart({
  shoe,
  selectedColor,
  selectedSize,
  selectedVariant,
  isMadeToOrder,
  deliveryText,
  showSelectionMessage,
  setShowSelectionMessage,
}: AddToCartProps) {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    if (selectedSize === null) {
      setShowSelectionMessage(true);
      return;
    }

    const cartItem = createCartItem({
      shoe,
      selectedColor,
      selectedSize,
      selectedVariant,
      isMadeToOrder,
      deliveryText,
    });

    addToCart(cartItem);
  };

  return (
    <>
      {showSelectionMessage && selectedSize === null && (
        <div className={s.selectionMessage}>Please select a size</div>
      )}

      <button
        type="button"
        className={`${s.addToCart} ${
          selectedColor && selectedSize !== null ? s.active : ""
        }`}
        onClick={handleAddToCart}
        disabled={!selectedColor}
      >
        Add to Cart
      </button>
    </>
  );
}
