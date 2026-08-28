"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import s from "./ProductCard.module.scss";

interface Props {
  product: any;
  basePath?: string; // e.g. '/en'
}

export default function ProductCard({ product, basePath = "/en" }: Props) {
  const colors: any[] =
    product.colorOptions && product.colorOptions.length > 0
      ? product.colorOptions
      : (Array.isArray(product.color)
          ? product.color
          : [product.color || ""]
        ).map((name: string) => ({
          name,
          label: name.charAt(0).toUpperCase() + name.slice(1),
          type: "solid",
          value: name.replace(/\s+/g, "").toLowerCase(),
        }));

  const visible = colors.slice(0, 3);
  const extra = Math.max(0, colors.length - 3);

  return (
    <>
      <Link href={`${basePath}/${product.id}`} aria-label={product.name}>
        <Image
          src={product.imageUrl}
          alt={product.name}
          width={300}
          height={300}
          className={s.image}
        />
      </Link>
      <div className={s.colors}>
        {visible.map((c) => (
          <span
            key={c.name}
            className={s.swatch}
            title={c.label}
            aria-label={c.label}
            style={
              c.type === "solid"
                ? { backgroundColor: c.value }
                : {
                    backgroundImage: `url(${c.value})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }
            }
          />
        ))}
        {extra > 0 && <span className={s.more}>+{extra}</span>}
      </div>
      <Link href={`${basePath}/${product.id}`} className={s.productLink}>
        {product.name}
      </Link>
      <p className={s.price}>${product.price}</p>
    </>
  );
}
