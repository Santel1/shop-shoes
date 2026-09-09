import { Product } from "@/types/product";

type CreateCartItemParams = {
  shoe: Product;
  selectedColor: string;
  selectedSize: string | number;
  selectedVariant: Product["variants"][number] | null;
  isMadeToOrder: boolean;
  deliveryText: string;
};

export function createCartItem({
  shoe,
  selectedColor,
  selectedSize,
  selectedVariant,
  isMadeToOrder,
  deliveryText,
}: CreateCartItemParams) {
  return {
    id: shoe.id,
    category: shoe.category,
    name: shoe.name,
    price: shoe.price,
    quantity: 1,

    imageUrl: shoe.imageUrl,
    description: shoe.description,

    color: shoe.color,
    size: shoe.size,
    colorOptions: shoe.colorOptions ?? undefined,

    selectedColor,
    selectedSize,

    idVariant:
      selectedVariant?.idVariant ??
      `${shoe.id}-${selectedColor}-${selectedSize}`,

    stockVariant: selectedVariant?.stockVariant ?? 0,

    madeToOrder: isMadeToOrder,

    deliveryText,
  };
}
