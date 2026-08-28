import React from "react";
import s from "./FilterButtons.module.scss";

export interface FilterButtonsProps {
  title: string;
  value: string;
  options: { label: string; value: string }[];
  onChange: (value: string) => void;
}

export default function FilterButtons({
  title,
  value,
  options,
  onChange,
}: FilterButtonsProps) {
  return (
    <div className={s.filterGroup}>
      <label className={s.filterLabel}>{title}</label>
      <div className={s.sortButtons}>
        {options.map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() => onChange(option.value)}
            className={`${s.sortButton} ${value === option.value ? s.active : ""}`}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}
