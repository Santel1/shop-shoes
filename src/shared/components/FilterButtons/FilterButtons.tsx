import React, { useId } from "react";
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
  const groupId = useId();

  return (
    <div className={s.filterGroup}>
      <label className={s.filterLabel}>{title}</label>
      <div className={s.sortButtons}>
        {options.map((option) => (
          <label
            key={option.value}
            className={s.sortButton}
            htmlFor={`${groupId}-${option.value}`}
          >
            <input
              id={`${groupId}-${option.value}`}
              type="radio"
              name={groupId}
              value={option.value}
              checked={value === option.value}
              onChange={() => onChange(option.value)}
            />
            <span className={s.radioBullet} aria-hidden="true" />
            {option.label}
          </label>
        ))}
      </div>
    </div>
  );
}
