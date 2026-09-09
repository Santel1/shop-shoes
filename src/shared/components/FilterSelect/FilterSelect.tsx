"use client";

import React, {
  createContext,
  useContext,
  useId,
  useState,
  type ReactNode,
} from "react";
import s from "./FilterSelect.module.scss";
import Icon from "@/shared/components/Icon/Icon";

type FilterSelectContextValue = {
  activeId: string | null;
  setActiveId: (id: string | null) => void;
};

const FilterSelectContext = createContext<FilterSelectContextValue | null>(
  null,
);

export function FilterSelectGroup({ children }: { children: ReactNode }) {
  const [activeId, setActiveId] = useState<string | null>(null);
  return (
    <FilterSelectContext.Provider value={{ activeId, setActiveId }}>
      {children}
    </FilterSelectContext.Provider>
  );
}

export interface FilterSelectProps {
  title?: string;
  value: string | string[];
  action: (value: string) => void;
  options: string[];
  multiple?: boolean;
}

export default function FilterSelect({
  title,
  value,
  action,
  options,
  multiple = false,
}: FilterSelectProps) {
  const dropdownId = useId();
  const context = useContext(FilterSelectContext);
  const [localOpen, setLocalOpen] = useState(false);
  const isOpen = context ? context.activeId === dropdownId : localOpen;
  const capitalize = (str: string) =>
    str.charAt(0).toUpperCase() + str.slice(1);
  const selectedValues = (
    typeof value === "string" ? value.split(",") : value
  ).filter(Boolean);

  React.useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        if (context) context.setActiveId(null);
        else setLocalOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [context, isOpen]);

  return (
    <div className={s.filterGroup}>
      <span className={s.filterLabel}>{title}</span>
      <div className={`${s.customSelect} ${isOpen ? s.open : ""}`}>
        <button
          type="button"
          className={s.selectTrigger}
          onClick={() => {
            if (context) context.setActiveId(isOpen ? null : dropdownId);
            else setLocalOpen((current) => !current);
          }}
          aria-expanded={isOpen}
          aria-haspopup="listbox"
          aria-label={`${title} filter`}
        >
          <span className={s.selectedText}>
            {selectedValues.length
              ? multiple
                ? `${selectedValues.length} selected`
                : capitalize(selectedValues[0])
              : `Choose the ${title?.toLowerCase()}`}
          </span>
          <Icon
            iconName="icon-chevron-down"
            className={s.chevron}
            aria-hidden="true"
          />
        </button>
        {isOpen && (
          <div className={s.options} role="listbox" aria-label={title}>
            {options.map((option) => {
              const isSelected = selectedValues.includes(option);
              return (
                <button
                  type="button"
                  key={option}
                  className={s.option}
                  role={multiple ? "option" : "option"}
                  aria-selected={isSelected}
                  onClick={() => {
                    if (multiple) {
                      const nextValues = isSelected
                        ? selectedValues.filter((item) => item !== option)
                        : [...selectedValues, option];
                      action(nextValues.join(","));
                      return;
                    }
                    action(option);
                    if (context) context.setActiveId(null);
                    else setLocalOpen(false);
                  }}
                >
                  {multiple && (
                    <span
                      className={`${s.checkbox} ${isSelected ? s.checkboxSelected : ""}`}
                      aria-hidden="true"
                    >
                      {isSelected && (
                        <Icon
                          iconName="icon-check-mark"
                          className={s.checkIcon}
                        />
                      )}
                    </span>
                  )}
                  <span>{capitalize(option)}</span>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
