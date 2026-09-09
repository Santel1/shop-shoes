"use client";
import Container from "@/shared/components/Container/Container";
import s from "./page.module.scss";
import shoes from "@/shared/data/shoes.json";
import bags from "@/shared/data/bags.json";
import {
  useRouter,
  useSearchParams,
  usePathname,
  useParams,
} from "next/navigation";
import { useMemo } from "react";
import ProductList from "@/modules/productList/components/ProductList";
import CatalogFilters from "@/modules/catalogFilters/components/CatalogFilters/CatalogFilters";
import { Product } from "@/types/product";

const products: Product[] = [
  ...shoes.filter((product) => product.category === "shoes"),
  ...bags,
];

export default function Page({}) {
  const router = useRouter();
  const params = useSearchParams();
  const pathname = usePathname();
  const routeParams = useParams();

  const locale = routeParams?.locale || "en";
  const currentParams = params ?? new URLSearchParams();
  const color = currentParams.get("color") || "";
  const size = currentParams.get("size") || "";
  const category = currentParams.get("category") || "";
  const sort = currentParams.get("sort") || "newest";

  const categories = useMemo(
    () => Array.from(new Set(products.map((product) => product.category))),
    [],
  );

  const categoryProducts = useMemo(
    () =>
      products.filter((product) => {
        if (category) return product.category === category;
        return product.category !== "bags";
      }),
    [category],
  );

  const selectedColors = color.split(",").filter(Boolean);
  const selectedSizes = size.split(",").filter(Boolean);

  const productsMatchingColors = useMemo(
    () =>
      selectedColors.length
        ? categoryProducts.filter((product) =>
            selectedColors.some((selectedColor) =>
              (product.color ?? []).includes(selectedColor),
            ),
          )
        : categoryProducts,
    [categoryProducts, selectedColors],
  );

  const productsMatchingSizes = useMemo(
    () =>
      selectedSizes.length
        ? categoryProducts.filter((product) =>
            (product.size ?? []).some((value) =>
              selectedSizes.includes(String(value)),
            ),
          )
        : categoryProducts,
    [categoryProducts, selectedSizes],
  );

  const availableColors = useMemo(
    () =>
      Array.from(
        new Set(
          productsMatchingSizes.flatMap((product) => product.color ?? []),
        ),
      ),
    [productsMatchingSizes],
  );

  const availableColorOptions = useMemo(
    () =>
      Array.from(
        new Map(
          categoryProducts
            .flatMap((product) => product.colorOptions ?? [])
            .map((option) => [option.name, option]),
        ).values(),
      ),
    [categoryProducts],
  );

  const availableSizes = useMemo(() => {
    const values = productsMatchingColors.flatMap(
      (product) => product.size ?? [],
    );
    return Array.from(new Set(values.map(String))).sort((a, b) => {
      const numericA = Number(a);
      const numericB = Number(b);
      if (!Number.isNaN(numericA) && !Number.isNaN(numericB))
        return numericA - numericB;
      return a.localeCompare(b);
    });
  }, [productsMatchingColors]);

  const filteredProducts = useMemo(() => {
    const selectedColors = color.split(",").filter(Boolean);
    const selectedSizes = size.split(",").filter(Boolean);

    return categoryProducts
      .filter((shoe) => {
        if (selectedColors.length) {
          const shoeColors = shoe.color ?? [];

          if (
            !selectedColors.some((selectedColor) =>
              shoeColors.includes(selectedColor),
            )
          )
            return false;
        }

        if (
          selectedSizes.length &&
          !(shoe.size ?? []).some((value) =>
            selectedSizes.includes(String(value)),
          )
        ) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sort === "newest")
          return Number(Boolean(b.isNew)) - Number(Boolean(a.isNew));
        if (sort === "asc") return a.price - b.price;
        if (sort === "desc") return b.price - a.price;
        return 0;
      });
  }, [categoryProducts, color, size, sort]);

  const updateFilter = (key: string, value: string) => {
    const newParams = new URLSearchParams(currentParams.toString());

    if (key === "category") {
      newParams.delete("color");
      newParams.delete("size");
    }

    if (key === "color") {
      const nextColors = value.split(",").filter(Boolean);
      const validSizes = new Set(
        (nextColors.length
          ? categoryProducts.filter((product) =>
              nextColors.some((selectedColor) =>
                (product.color ?? []).includes(selectedColor),
              ),
            )
          : categoryProducts
        ).flatMap((product) => (product.size ?? []).map(String)),
      );
      const nextSizes = size
        .split(",")
        .filter((selectedSize) => validSizes.has(selectedSize));

      if (nextSizes.length) newParams.set("size", nextSizes.join(","));
      else newParams.delete("size");
    }

    if (key === "size") {
      const nextSizes = value.split(",").filter(Boolean);
      const validColors = new Set(
        (nextSizes.length
          ? categoryProducts.filter((product) =>
              nextSizes.some((selectedSize) =>
                (product.size ?? []).some(
                  (productSize) => String(productSize) === selectedSize,
                ),
              ),
            )
          : categoryProducts
        ).flatMap((product) => product.color ?? []),
      );
      const nextColors = color
        .split(",")
        .filter((selectedColor) => validColors.has(selectedColor));

      if (nextColors.length) newParams.set("color", nextColors.join(","));
      else newParams.delete("color");
    }

    if (value) {
      newParams.set(key, value);
    } else {
      newParams.delete(key);
    }

    const query = newParams.toString();
    const basePath = pathname ?? `/${locale}/catalog`;
    router.push(query ? `${basePath}?${query}` : basePath);
  };

  return (
    <Container>
      <CatalogFilters
        count={filteredProducts.length}
        color={color}
        size={size}
        category={category}
        sort={sort}
        colors={availableColors}
        colorOptions={availableColorOptions}
        sizes={availableSizes}
        categories={categories}
        onChangeAction={updateFilter}
        onResetAction={() => router.push(pathname as string)}
      />
      <section className={s.catalog}>
        <ProductList products={filteredProducts} basePath={`/${locale}`} />
      </section>
    </Container>
  );
}
