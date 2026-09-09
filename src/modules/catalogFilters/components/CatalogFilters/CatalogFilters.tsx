"use client";

import { useEffect, useMemo, useState } from "react";
import clsx from "clsx";
import ColorSwatch from "@/shared/components/ColorSwatch/ColorSwatch";
import FilterSelect, {
  FilterSelectGroup,
} from "@/shared/components/FilterSelect/FilterSelect";
import FilterButtons from "@/shared/components/FilterButtons/FilterButtons";
import { ColorOption } from "@/types/product";
import s from "./CatalogFilters.module.scss";
import Icon from "@/shared/components/Icon/Icon";

type FilterKey = "color" | "size" | "category" | "sort";

interface CatalogFiltersProps {
  count: number;
  color: string;
  size: string;
  category: string;
  sort: string;
  colors: string[];
  colorOptions: ColorOption[];
  sizes: string[];
  categories: string[];
  onChangeAction: (key: FilterKey, value: string) => void;
  onResetAction: () => void;
}

const sortOptions = [
  { label: "Newest first", value: "newest" },
  { label: "Price — low to high", value: "asc" },
  { label: "Price — high to low", value: "desc" },
];

export default function CatalogFilters({
  count,
  color,
  size,
  category,
  sort,
  colors,
  colorOptions,
  sizes,
  categories,
  onChangeAction,
  onResetAction,
}: CatalogFiltersProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [draft, setDraft] = useState({ color, size, category, sort });
  const hasActiveFilters = Boolean(color || size || category);

  useEffect(() => {
    setDraft({ color, size, category, sort });
  }, [color, size, category, sort]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const colorSwatches = useMemo(() => {
    const byName = new Map(colorOptions.map((option) => [option.name, option]));
    return colors.map(
      (name): ColorOption =>
        byName.get(name) ?? {
          name,
          label: name,
          type: "solid",
          value: name,
        },
    );
  }, [colorOptions, colors]);

  const activeFilters = [
    ["color", color],
    ["size", size],
    ["category", category],
  ] as const;

  const setDraftFilter = (key: FilterKey, value: string) => {
    setDraft((current) => ({ ...current, [key]: value }));
  };

  const updateDraftFilter = (key: FilterKey, value: string) => {
    setDraftFilter(key, value);
    onChangeAction(key, value);
  };

  const applyDraft = () => setIsOpen(false);

  return (
    <FilterSelectGroup>
      <section className={s.filters} aria-label="Product filters">
        <div className={s.mobileToolbar}>
          <button
            type="button"
            className={s.mobileFilterButton}
            onClick={() => setIsOpen(true)}
            aria-expanded={isOpen}
          >
            <span aria-hidden="true">☷</span>
            Filters
          </button>
          <span className={s.mobileCount}>{count}</span>
        </div>

        <div className={s.desktopPanel}>
          <div className={s.panelHeading}>
            <h1>Filters</h1>
            {hasActiveFilters && <span>{count} products</span>}
          </div>
          <div className={s.desktopControls}>
            <FilterSelect
              title="Color"
              value={color}
              action={(value) => onChangeAction("color", value)}
              options={colors}
              multiple
            />
            <FilterSelect
              title="Size"
              value={size}
              action={(value) => onChangeAction("size", value)}
              options={sizes}
              multiple
            />
            <FilterSelect
              title="Category"
              value={category}
              action={(value) => onChangeAction("category", value)}
              options={categories}
            />
            <FilterButtons
              title="Sort by"
              value={sort}
              onChange={(value) => onChangeAction("sort", value)}
              options={sortOptions}
            />
          </div>
          <ActiveFilters
            filters={activeFilters}
            onRemove={onChangeAction}
            onReset={onResetAction}
          />
        </div>

        <div
          className={clsx(s.backdrop, isOpen && s.backdropVisible)}
          onClick={() => setIsOpen(false)}
        />
        <aside
          className={clsx(s.drawer, isOpen && s.drawerVisible)}
          aria-hidden={!isOpen}
        >
          <div className={s.drawerHeader}>
            <h2>Filters</h2>
            <button
              type="button"
              className={s.closeButton}
              onClick={() => setIsOpen(false)}
              aria-label="Close filters"
            >
              ×
            </button>
          </div>
          <div className={s.drawerBody}>
            <div className={s.drawerActiveHeader}>
              <span>Active filters</span>
              {hasActiveFilters && (
                <button type="button" onClick={onResetAction}>
                  Reset filters
                </button>
              )}
            </div>
            <ActiveFilters
              filters={activeFilters}
              onRemove={onChangeAction}
              onReset={onResetAction}
            />
            <FilterButtons
              title="Sort by"
              value={draft.sort}
              onChange={(value) => updateDraftFilter("sort", value)}
              options={sortOptions}
            />
            <div className={s.drawerGroup}>
              <span className={s.drawerLabel}>Size</span>
              <div className={s.optionGrid}>
                {sizes.map((option) => (
                  <button
                    type="button"
                    key={option}
                    className={clsx(
                      s.sizeButton,
                      selectedValues(draft.size).includes(option) && s.selected,
                    )}
                    onClick={() =>
                      updateDraftFilter("size", toggleValue(draft.size, option))
                    }
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
            <div className={s.drawerGroup}>
              <span className={s.drawerLabel}>Color</span>
              <div className={s.swatches}>
                {colorSwatches.map((option) => (
                  <ColorSwatch
                    key={option.name}
                    option={option}
                    selected={selectedValues(draft.color).includes(option.name)}
                    onSelectAction={(value) =>
                      updateDraftFilter(
                        "color",
                        toggleValue(draft.color, value),
                      )
                    }
                    size={22}
                  />
                ))}
              </div>
            </div>
            <FilterSelect
              title="Category"
              value={draft.category}
              action={(value) => {
                setDraft({
                  category: value,
                  color: "",
                  size: "",
                  sort: draft.sort,
                });
                onChangeAction("category", value);
              }}
              options={categories}
            />
          </div>
          <button type="button" className={s.viewResults} onClick={applyDraft}>
            View results ({count})
          </button>
        </aside>
      </section>
    </FilterSelectGroup>
  );
}

function ActiveFilters({
  filters,
  onRemove,
  onReset,
}: {
  filters: readonly (readonly [string, string])[];
  onRemove: (key: FilterKey, value: string) => void;
  onReset: () => void;
}) {
  const visibleFilters = filters.flatMap(([key, value]) =>
    selectedValues(value).map((selectedValue) => ({
      key,
      selectedValue,
      nextValue: selectedValues(value)
        .filter((item) => item !== selectedValue)
        .join(","),
    })),
  );
  if (!visibleFilters.length) return null;

  return (
    <div className={s.activeFilters}>
      <div className={s.chips}>
        {visibleFilters.map(({ key, selectedValue, nextValue }) => (
          <button
            type="button"
            key={`${key}-${selectedValue}`}
            className={s.chip}
            onClick={() => onRemove(key as FilterKey, nextValue)}
          >
            {selectedValue}{" "}
            <Icon iconName="icon-cross-line" className={s.chipIcon} />
          </button>
        ))}
      </div>
      <button type="button" className={s.resetButton} onClick={onReset}>
        Reset filters
      </button>
    </div>
  );
}

function selectedValues(value: string) {
  return value.split(",").filter(Boolean);
}

function toggleValue(current: string, value: string) {
  const values = selectedValues(current);
  return values.includes(value)
    ? values.filter((item) => item !== value).join(",")
    : [...values, value].join(",");
}
