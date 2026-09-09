type Product = {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  category: string;
  isNew?: boolean;
  description: string;
  color: string[];
  size: (number | string)[];
  colorOptions?: ColorOption[];
  variants: Variant[];
};

type Variant = {
  idVariant: string;
  colorVariant: string;
  sizeVariant: string | number;

  stockVariant: number;
  madeToOrder: boolean;
};

export type ColorOption = {
  name: string;
  label: string;
  type: "solid" | "pattern" | "image" | string;
  value: string;
};

export type { Product, Variant };
