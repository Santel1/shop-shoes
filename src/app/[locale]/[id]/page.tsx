"use client";
import React, { use, useEffect, useMemo, useState } from "react";
import data from "@/shared/data/shoes.json";
import s from "./page.module.scss";
import Image from "next/image";
import Container from "@/shared/components/Container/Container";
import { useCart } from "@/context/CartContext";
import ColorSwatch from "@/shared/components/ColorSwatch/ColorSwatch";

// export interface PageProps {}

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { addToCart } = useCart();

  const shoe = data.find((item) => item.id === id);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState<number | null>(null);

  useEffect(() => {
    setSelectedColor("");
    setSelectedSize(null);
  }, [shoe?.id]);

  useEffect(() => {
    setSelectedSize(null);
  }, [selectedColor]);

  const availableSizesForColor = useMemo(() => {
    if (!shoe || !selectedColor) return [];

    return shoe.variants
      .filter((variant) => variant.colorVariant === selectedColor)
      .map((variant) => variant.sizeVariant)
      .sort((a, b) => a - b);
  }, [shoe, selectedColor]);

  const selectedVariant = useMemo(() => {
    if (!shoe || !selectedColor || selectedSize === null) return null;

    return (
      shoe.variants.find(
        (variant) =>
          variant.colorVariant === selectedColor &&
          variant.sizeVariant === selectedSize,
      ) ?? null
    );
  }, [shoe, selectedColor, selectedSize]);

  const normalizeColorName = (color: string) =>
    color.replace(/\s+/g, "").toLowerCase();

  const deliveryText = useMemo(() => {
    if (!selectedColor || selectedSize === null) return "";
    if ((selectedVariant?.stockVariant ?? 0) > 0) {
      return "Отправка 1-2 рабочих дня";
    }
    return "Изготовление и отправка 5-9 рабочих дней";
  }, [selectedColor, selectedSize, selectedVariant]);

  const isAddDisabled = !selectedColor || selectedSize === null;

  const selectionMessage = useMemo(() => {
    if (!selectedColor && selectedSize === null) {
      return "Select size and color";
    }
    if (!selectedColor) {
      return "Select color";
    }
    if (selectedSize === null) {
      return "Select size";
    }
    return "";
  }, [selectedColor, selectedSize]);

  const handleAddToCart = () => {
    if (!shoe || isAddDisabled) return;

    addToCart({
      id: shoe.id,
      category: shoe.category,
      name: shoe.name,
      price: shoe.price,
      quantity: 1,
      imageUrl: shoe.imageUrl,
      description: shoe.description,
      color: shoe.color,
      size: shoe.size,
      colorOptions: (shoe.colorOptions as any) ?? undefined,
      selectedColor,
      selectedSize,
      idVariant:
        selectedVariant?.idVariant ??
        `${shoe.id}-${selectedColor}-${selectedSize}`,
      stockVariant: selectedVariant?.stockVariant ?? 0,
      madeToOrder: selectedVariant?.madeToOrder ?? false,
      deliveryText,
    });
  };

  if (!shoe) {
    return <div className={s.error}>Shoe not found</div>;
  }

  return (
    <Container>
      <div className={s.container}>
        <div className={s.imageContainer}>
          <Image
            src={shoe.imageUrl}
            alt={shoe.name}
            layout="fill"
            objectFit="cover"
            className={s.image}
          />
        </div>
        <div className={s.infoContainer}>
          <h1 className={s.name}>{shoe.name}</h1>
          <p className={s.price}>${shoe.price.toFixed(2)}</p>
          <div className={s.colors}>
            <h3>Available Colors:</h3>
            <div className={s.colorOptions}>
              {shoe.colorOptions && shoe.colorOptions.length > 0
                ? shoe.colorOptions.map((opt) => (
                    <ColorSwatch
                      key={opt.name}
                      option={opt}
                      selected={selectedColor === opt.name}
                      onSelect={(name) => setSelectedColor(name)}
                      size={36}
                    />
                  ))
                : shoe.color.map((color) => {
                    const swatchColor = normalizeColorName(color);
                    return (
                      <button
                        key={color}
                        type="button"
                        className={`${s.colorBtn} ${
                          selectedColor === color ? s.active : ""
                        }`}
                        onClick={() => setSelectedColor(color)}
                        aria-label={`Select ${color}`}
                        style={{ backgroundColor: swatchColor }}
                      />
                    );
                  })}
            </div>
          </div>

          <div className={s.sizes}>
            <h3>Available Sizes:</h3>
            <div className={s.sizeOptions}>
              {shoe.size.map((size) => {
                availableSizesForColor.includes(size);
                return (
                  <button
                    key={size}
                    type="button"
                    className={`${s.sizeBtn} ${
                      selectedSize === size ? s.active : ""
                    } `}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                );
              })}
            </div>
          </div>

          {selectedColor && selectedSize !== null && (
            <div className={s.deliveryInfo}>
              <p className={s.deliveryText}>{deliveryText}</p>
            </div>
          )}

          {selectionMessage && (
            <div className={s.selectionMessage}>{selectionMessage}</div>
          )}

          <button
            className={`${s.addToCart} ${!isAddDisabled ? s.active : ""}`}
            onClick={handleAddToCart}
            disabled={isAddDisabled}
          >
            Add to Cart
          </button>
        </div>
      </div>
      <div className={s.description}>
        <h3>Description:</h3>
        <p>{shoe.description}</p>
      </div>
    </Container>
  );
}
