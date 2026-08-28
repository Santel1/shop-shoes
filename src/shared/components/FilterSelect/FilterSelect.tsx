import React from "react";
import s from "./FilterSelect.module.scss";

export interface FilterSelectProps {
  title?: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
}

export default function FilterSelect({
  title,
  value,
  onChange,
  options,
}: FilterSelectProps) {
  const capitalize = (str: string) =>
    str.charAt(0).toUpperCase() + str.slice(1);

  return (
    <div className={s.filterGroup}>
      <label className={s.filterLabel}>{title}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={s.filterSelect}
      >
        <option value="" disabled hidden>
          Choose the {title?.toLowerCase()}
        </option>
        {options.map((option) => (
          <option key={option} value={option}>
            {capitalize(option)}
          </option>
        ))}
      </select>
    </div>
  );
}
