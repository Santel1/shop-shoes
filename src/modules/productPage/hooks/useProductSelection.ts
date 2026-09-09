"use client";

import { useEffect, useState } from "react";

import { getProductVariant } from "../utils/getProductVariant";
import { getSizeGroups } from "../utils/getSizeGroups";
import { Product } from "@/types/product";

export function useProductSelection(shoe: Product) {
  const [selectedColor, setSelectedColor] = useState(shoe.color?.[0] ?? "");

  const [selectedSize, setSelectedSize] = useState<string | number | null>(
    null,
  );

  const [showSelectionMessage, setShowSelectionMessage] = useState(false);

  /*
   * Если пользователь перешёл с одного товара на другой,
   * синхронизируем выбранный цвет с новым товаром.
   */
  useEffect(() => {
    setSelectedColor(shoe.color?.[0] ?? "");
    setSelectedSize(null);
    setShowSelectionMessage(false);
  }, [shoe.id, shoe.color]);

  /*
   * При смене цвета размер старого цвета больше не валиден.
   *
   * Поэтому размер сбрасываем непосредственно в selectColor,
   * а не через отдельный useEffect.
   */

  const selectColor = (color: string) => {
    setSelectedColor(color);
    setSelectedSize(null);
    setShowSelectionMessage(false);
  };

  const selectSize = (size: string | number) => {
    setSelectedSize(size);
    setShowSelectionMessage(false);
  };

  const sizeGroups = getSizeGroups(shoe, selectedColor);

  const selectedVariant = getProductVariant(shoe, selectedColor, selectedSize);

  const isSelected = Boolean(selectedColor) && selectedSize !== null;

  const isInStock = isSelected && (selectedVariant?.stockVariant ?? 0) > 0;

  const isMadeToOrder = isSelected && !isInStock;

  const deliveryText = !isSelected
    ? ""
    : isInStock
      ? "In stock, ready to ship within 1-2 business days"
      : "Made to order, ships in 5-9 business days";

  return {
    selectedColor,
    selectedSize,

    selectColor,
    selectSize,

    selectedVariant,
    sizeGroups,

    isSelected,
    isInStock,
    isMadeToOrder,

    deliveryText,

    showSelectionMessage,
    setShowSelectionMessage,
  };
}
