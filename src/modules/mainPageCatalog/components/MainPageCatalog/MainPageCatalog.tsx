import React from "react";
import s from "./MainPageCatalog.module.scss";
import shoesData from "@/shared/data/shoes.json";
import Container from "@/shared/components/Container/Container";
import ProductList from "@/modules/productList/components/ProductList";

export default function MainPageCatalog() {
  const newCollection = shoesData.filter((shoe) => shoe.isNew).slice(0, 8);
  return (
    <Container>
      <h2 className={s.catalogTitle}>Our new collection</h2>
      <ProductList products={newCollection} basePath="/en" />
    </Container>
  );
}
