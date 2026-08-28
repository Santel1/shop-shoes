"use client";
import Container from "@/shared/components/Container/Container";
import s from "./page.module.scss";
import shoes from "@/shared/data/shoes.json";
import { useCart } from "@/context/CartContext";
import {
  useRouter,
  useSearchParams,
  usePathname,
  useParams,
} from "next/navigation";
import { useMemo } from "react";
import ProductList from "@/modules/productList/components/ProductList";
import FilterSelect from "@/shared/components/FilterSelect/FilterSelect";
import FilterButtons from "@/shared/components/FilterButtons/FilterButtons";

export default function Page({}) {
  const { addToCart } = useCart();
  const router = useRouter();
  const params = useSearchParams();
  const pathname = usePathname();
  const routeParams = useParams();

  const locale = routeParams?.locale || "en";
  const currentParams = params ?? new URLSearchParams();
  const color = currentParams.get("color") || "";
  const size = currentParams.get("size") || "";
  const category = currentParams.get("category") || "";
  const sort = currentParams.get("sort") || "";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ color, size, sort, category });
  };

  const colors = useMemo(
    () =>
      Array.from(
        new Set(
          shoes.flatMap((shoe) =>
            Array.isArray(shoe.color) ? shoe.color : [shoe.color],
          ),
        ),
      ),
    [shoes],
  );

  const sizes = useMemo(
    () =>
      Array.from(
        new Set(shoes.flatMap((shoe) => (shoe.size ?? []) as number[])),
      ).sort((a, b) => a - b),
    [shoes],
  );

  const categories = useMemo(
    () => Array.from(new Set(shoes.map((shoe) => shoe.category))),
    [shoes],
  );

  const filteredProducts = useMemo(() => {
    return shoes
      .filter((shoe) => {
        if (color) {
          const shoeColors = Array.isArray(shoe.color)
            ? shoe.color
            : [shoe.color];

          if (!shoeColors.includes(color)) return false;
        }

        if (size && !((shoe.size ?? []) as number[]).includes(Number(size))) {
          return false;
        }

        if (category && shoe.category !== category) return false;

        return true;
      })
      .sort((a, b) => {
        if (sort === "asc") return a.price - b.price;
        if (sort === "desc") return b.price - a.price;
        return 0;
      });
  }, [shoes, color, size, category, sort]);

  const updateFilter = (key: string, value: string) => {
    const newParams = new URLSearchParams(currentParams.toString());

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
      <h2 className={s.filterTitle}>Filters</h2>
      <form onSubmit={handleSubmit} className={s.filterForm}>
        <FilterSelect
          title="Color"
          value={color}
          onChange={(value) => updateFilter("color", value)}
          options={colors}
        />
        <FilterSelect
          title="Size"
          value={size}
          onChange={(value) => updateFilter("size", value)}
          options={sizes.map((s) => s.toString())}
        />
        <FilterSelect
          title="Category"
          value={category}
          onChange={(value) => updateFilter("category", value)}
          options={categories}
        />

        <FilterButtons
          title="Sort by"
          value={sort}
          onChange={(value) => updateFilter("sort", value)}
          options={[
            { label: "Price from low", value: "asc" },
            { label: "Price from high", value: "desc" },
          ]}
        />
        <div className={s.btnWrapper}>
          <button
            type="button"
            onClick={() => router.push(pathname as string)}
            className={s.filterResetButton}
          >
            Reset filters
          </button>
        </div>
      </form>
      <section className={s.catalog}>
        <ProductList products={filteredProducts} basePath={`/${locale}`} />
      </section>
    </Container>
  );
}
