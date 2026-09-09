import { Product } from "@/types/product";

export type SizeGroups = {
  inStock: (string | number)[];
  madeToOrder: (string | number)[];
};

export function getSizeGroups(
  shoe: Product,
  selectedColor: string,
): SizeGroups {
  if (!selectedColor) {
    return {
      inStock: [],
      madeToOrder: [],
    };
  }

  const inStock: (string | number)[] = [];
  const madeToOrder: (string | number)[] = [];

  shoe.size.forEach((size) => {
    const variant = shoe.variants.find(
      (item) =>
        item.colorVariant === selectedColor && item.sizeVariant === size,
    );

    if (variant && variant.stockVariant > 0) {
      inStock.push(size);
    } else {
      madeToOrder.push(size);
    }
  });

  return {
    inStock,
    madeToOrder,
  };
}
