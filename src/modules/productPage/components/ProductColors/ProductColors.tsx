"use client";

import ColorSwatch from "@/shared/components/ColorSwatch/ColorSwatch";

import s from "./ProductColors.module.scss";
import { ColorOption } from "@/types/product";

type ProductColorsProps = {
  colors: string[];
  colorOptions?: ColorOption[];
  selectedColor: string;
  onSelectAction: (color: string) => void;
};

export default function ProductColors({
  colors,
  colorOptions,
  selectedColor,
  onSelectAction,
}: ProductColorsProps) {
  const normalizeColorName = (color: string) =>
    color.replace(/\s+/g, "").toLowerCase();

  return (
    <div className={s.colors}>
      <h3>Available Colors:</h3>

      <div className={s.colorOptions}>
        {colors.map((color) => {
          const colorOption = colorOptions?.find(
            (option) => option.name === color,
          );

          if (colorOption) {
            return (
              <ColorSwatch
                key={color}
                option={colorOption}
                selected={selectedColor === color}
                onSelectAction={onSelectAction}
                size={36}
              />
            );
          }

          return (
            <button
              key={color}
              type="button"
              className={`${s.colorBtn} ${
                selectedColor === color ? s.active : ""
              }`}
              onClick={() => onSelectAction(color)}
              aria-label={`Select ${color}`}
              style={{
                backgroundColor: normalizeColorName(color),
              }}
            />
          );
        })}
      </div>
    </div>
  );
}
