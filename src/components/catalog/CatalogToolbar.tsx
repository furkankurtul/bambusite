import { Search, X } from "lucide-react";
import { PRODUCT_CATEGORIES, type ProductCategory } from "@/types/product";

export type CatalogCategory = ProductCategory | "All";

interface CatalogToolbarProps {
  readonly activeCategory: CatalogCategory;
  readonly hasActiveFilters: boolean;
  readonly onCategoryChange: (category: CatalogCategory) => void;
  readonly onClear: () => void;
  readonly onSearchChange: (value: string) => void;
  readonly resultCount: number;
  readonly searchValue: string;
}

const categoryOptions: readonly CatalogCategory[] = [
  "All",
  ...PRODUCT_CATEGORIES,
];

export function CatalogToolbar({
  activeCategory,
  hasActiveFilters,
  onCategoryChange,
  onClear,
  onSearchChange,
  resultCount,
  searchValue,
}: CatalogToolbarProps) {
  return (
    <div className="space-y-5 rounded-2xl border border-zinc-200 bg-white p-4 sm:p-5">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="relative w-full lg:max-w-md">
          <label className="sr-only" htmlFor="catalog-search">
            Search products
          </label>
          <Search
            aria-hidden="true"
            className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-zinc-400"
          />
          <input
            autoComplete="off"
            className="h-12 w-full rounded-lg border border-zinc-300 bg-white pl-11 pr-4 text-base text-zinc-950 outline-none transition placeholder:text-zinc-400 focus:border-zinc-950 focus:ring-2 focus:ring-zinc-950/15"
            id="catalog-search"
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Search products"
            type="search"
            value={searchValue}
          />
        </div>

        <div className="flex items-center justify-between gap-4">
          <p aria-live="polite" className="text-sm text-zinc-500">
            {resultCount} {resultCount === 1 ? "product" : "products"}
          </p>
          {hasActiveFilters && (
            <button
              className="inline-flex min-h-10 items-center gap-1.5 rounded-md px-2 py-1 text-sm font-semibold text-zinc-700 hover:bg-zinc-100 hover:text-zinc-950 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-950"
              onClick={onClear}
              type="button"
            >
              <X aria-hidden="true" className="size-4" />
              Clear filters
            </button>
          )}
        </div>
      </div>

      <div
        aria-label="Product category"
        className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1 [scrollbar-width:thin]"
        role="group"
      >
        {categoryOptions.map((category) => {
          const selected = category === activeCategory;
          return (
            <button
              aria-controls="product-grid"
              aria-pressed={selected}
              className={`shrink-0 rounded-full border px-4 py-2 text-sm font-semibold transition focus-visible:outline-offset-2 ${
                selected
                  ? "border-zinc-950 bg-zinc-950 text-white"
                  : "border-zinc-300 bg-white text-zinc-700 hover:border-zinc-950 hover:text-zinc-950"
              }`}
              key={category}
              onClick={() => onCategoryChange(category)}
              type="button"
            >
              {category}
            </button>
          );
        })}
      </div>
    </div>
  );
}
