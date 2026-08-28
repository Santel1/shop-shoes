import ProductCard from "@/shared/components/ProductCard/ProductCard";
import React from "react";
import s from "./ProductList.module.scss";
import { Product } from "@/types/product";

export interface ProductListProps {
  products: Product[];
  basePath?: string;
}

export default function ProductList({
  products,
  basePath = "/en",
}: ProductListProps) {
  return (
    <ul className={s.catalogList}>
      {products.map((product) => (
        <li key={product.id} className={s.catalogItem}>
          <ProductCard product={product} basePath={basePath} />
        </li>
      ))}
    </ul>
  );
}
