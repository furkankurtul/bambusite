import { SearchX } from "lucide-react";

interface CatalogEmptyStateProps {
  readonly onReset: () => void;
}

export function CatalogEmptyState({ onReset }: CatalogEmptyStateProps) {
  return (
    <div
      className="flex min-h-80 flex-col items-center justify-center rounded-2xl border border-dashed border-zinc-300 bg-white px-6 py-14 text-center"
      id="product-grid"
    >
      <span className="mb-5 flex size-14 items-center justify-center rounded-2xl bg-zinc-100 text-zinc-600">
        <SearchX aria-hidden="true" className="size-7" />
      </span>
      <h2 className="text-xl font-semibold text-zinc-950">
        No products match your current filters.
      </h2>
      <p className="mt-2 max-w-md text-sm leading-6 text-zinc-600">
        Try another search term or clear the selected category.
      </p>
      <button
        className="mt-6 min-h-11 rounded-md bg-zinc-950 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-zinc-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-950"
        onClick={onReset}
        type="button"
      >
        Reset filters
      </button>
    </div>
  );
}
