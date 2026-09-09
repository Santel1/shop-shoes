"use client";

import { useProductSelection } from "../../hooks/useProductSelection";

import ProductColors from "../ProductColors/ProductColors";
import ProductSizes from "../ProductSizes/ProductSizes";
import ProductDelivery from "../ProductDelivery/ProductDelivery";

import s from "./ProductInfo.module.scss";
import AddToCart from "@/shared/components/AddToCart/AddToCart";
import { Product } from "@/types/product";

type ProductInfoProps = {
  shoe: Product;
};

export default function ProductInfo({ shoe }: ProductInfoProps) {
  const {
    selectedColor,
    selectedSize,

    selectColor,
    selectSize,

    selectedVariant,
    sizeGroups,

    isSelected,
    isMadeToOrder,

    deliveryText,

    showSelectionMessage,
    setShowSelectionMessage,
  } = useProductSelection(shoe);

  return (
    <div className={s.infoContainer}>
      <h1 className={s.name}>{shoe.name}</h1>

      <p className={s.price}>${shoe.price.toFixed(2)}</p>

      <ProductColors
        colors={shoe.color}
        colorOptions={shoe.colorOptions}
        selectedColor={selectedColor}
        onSelectAction={selectColor}
      />

      <ProductSizes
        sizeGroups={sizeGroups}
        selectedSize={selectedSize}
        onSelectAction={selectSize}
      />

      <ProductDelivery visible={isSelected} text={deliveryText} />

      <AddToCart
        shoe={shoe}
        selectedColor={selectedColor}
        selectedSize={selectedSize}
        selectedVariant={selectedVariant}
        isMadeToOrder={isMadeToOrder}
        deliveryText={deliveryText}
        showSelectionMessage={showSelectionMessage}
        setShowSelectionMessage={setShowSelectionMessage}
      />
    </div>
  );
}
