"use client";

import type { SizeGroups } from "../../utils/getSizeGroups";

import s from "./ProductSizes.module.scss";

type ProductSizesProps = {
  sizeGroups: SizeGroups;
  selectedSize: string | number | null;
  onSelectAction: (size: string | number) => void;
};

export default function ProductSizes({
  sizeGroups,
  selectedSize,
  onSelectAction,
}: ProductSizesProps) {
  return (
    <div className={s.sizes}>
      <h3>Available Sizes:</h3>

      {sizeGroups.inStock.length > 0 && (
        <div className={s.sizeGroup}>
          <h4 className={s.sizeGroupTitle}>In stock</h4>

          <div className={s.sizeOptions}>
            {sizeGroups.inStock.map((size) => (
              <button
                key={size}
                type="button"
                className={`${s.sizeBtn} ${
                  selectedSize === size ? s.active : ""
                }`}
                onClick={() => onSelectAction(size)}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
      )}

      {sizeGroups.madeToOrder.length > 0 && (
        <div className={s.sizeGroup}>
          <h4 className={s.sizeGroupTitle}>Made to order</h4>

          <div className={s.sizeOptions}>
            {sizeGroups.madeToOrder.map((size) => (
              <button
                key={size}
                type="button"
                className={`${s.sizeBtn} ${
                  selectedSize === size ? s.active : ""
                }`}
                onClick={() => onSelectAction(size)}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
