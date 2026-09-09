import { Product } from "@/types/product";

export function getProductVariant(
  shoe: Product,
  color: string,
  size: string | number | null,
) {
  if (!color || size === null) {
    return null;
  }

  return (
    shoe.variants.find(
      (variant) =>
        variant.colorVariant === color && variant.sizeVariant === size,
    ) ?? null
  );
}
