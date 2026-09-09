"use client";
import React from "react";
import s from "./ColorSwatch.module.scss";

export type ColorOption = {
  name: string;
  label?: string;
  type: "solid" | "pattern" | "image" | string;
  value: string;
};

interface Props {
  option: ColorOption;
  selected?: boolean;
  onSelectAction: (name: string) => void;
  size?: number;
}

export default function ColorSwatch({
  option,
  selected = false,
  onSelectAction,
  size = 48,
}: Props) {
  const style: React.CSSProperties = {};

  if (option.type === "solid") {
    style.backgroundColor = option.value;
  } else {
    style.backgroundImage = `url(${option.value})`;
    style.backgroundSize = "cover";
    style.backgroundPosition = "center";
  }

  return (
    <button
      type="button"
      aria-pressed={selected}
      aria-label={option.label ?? option.name}
      className={`${s.swatch} ${selected ? s.active : ""}`}
      onClick={() => onSelectAction(option.name)}
      style={{ ...style, width: size, height: size }}
    />
  );
}
