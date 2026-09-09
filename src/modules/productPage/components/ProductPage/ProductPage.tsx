"use client";

import Container from "@/shared/components/Container/Container";

import s from "./ProductPage.module.scss";
import ProductGallery from "../ProductGallery/ProductGallery";
import ProductInfo from "../ProductInfo/ProductInfo";
import { Product } from "@/types/product";

type ProductPageProps = {
  data: Product;
};

// Я специально пока не заставляю тебя создавать отдельный Shoe interface, потому что у тебя уже есть JSON и TypeScript может вывести тип непосредственно из него.

// Позже, когда данные переедут в БД/API, тип можно будет нормально вынести в types.

export default function ProductPage({ data }: ProductPageProps) {
  return (
    <Container>
      <div className={s.container}>
        <ProductGallery shoe={data} />

        <ProductInfo shoe={data} />
      </div>

      <div className={s.description}>
        <h3>Description:</h3>
        <p>{data.description}</p>
      </div>
    </Container>
  );
}
