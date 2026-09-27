"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDeferredValue, useEffect, useMemo, useState } from "react";
import { ProductCard } from "@/components/product/ProductCard";
import { productMatchesSearch } from "@/lib/products/search";
import {
  PRODUCT_CATEGORIES,
  type Product,
  type ProductCategory,
} from "@/types/product";
import { CatalogEmptyState } from "./CatalogEmptyState";
import { CatalogToolbar, type CatalogCategory } from "./CatalogToolbar";

interface ProductCatalogProps {
  readonly products: readonly Product[];
  readonly thumbnailSources: Readonly<Record<string, string>>;
}

function isProductCategory(value: string | null): value is ProductCategory {
  return PRODUCT_CATEGORIES.some((category) => category === value);
}

export function ProductCatalog({
  products,
  thumbnailSources,
}: ProductCatalogProps) {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const queryFromUrl = searchParams.get("q") ?? "";
  const categoryFromUrl = searchParams.get("category");
  const activeCategory: CatalogCategory = isProductCategory(categoryFromUrl)
    ? categoryFromUrl
    : "All";
  const [searchValue, setSearchValue] = useState(queryFromUrl);
  const deferredSearchValue = useDeferredValue(searchValue);

  useEffect(() => {
    function syncSearchFromHistory() {
      const params = new URLSearchParams(window.location.search);
      setSearchValue(params.get("q") ?? "");
    }

    window.addEventListener("popstate", syncSearchFromHistory);
    return () => window.removeEventListener("popstate", syncSearchFromHistory);
  }, []);

  const visibleProducts = useMemo(
    () =>
      products.filter(
        (product) =>
          (activeCategory === "All" || product.category === activeCategory) &&
          productMatchesSearch(product, deferredSearchValue),
      ),
    [activeCategory, deferredSearchValue, products],
  );

  function updateUrl(
    updates: Readonly<Record<"category" | "q", string | null>>,
    history: "push" | "replace",
  ) {
    const params = new URLSearchParams(searchParams.toString());

    for (const [key, value] of Object.entries(updates)) {
      if (value) params.set(key, value);
      else params.delete(key);
    }

    const href = params.size > 0 ? `${pathname}?${params}` : pathname;
    router[history](href, { scroll: false });
  }

  function handleSearchChange(value: string) {
    setSearchValue(value);
    updateUrl(
      { category: categoryFromUrl, q: value.trim() || null },
      "replace",
    );
  }

  function handleCategoryChange(category: CatalogCategory) {
    updateUrl(
      {
        category: category === "All" ? null : category,
        q: searchValue.trim() || null,
      },
      "push",
    );
  }

  function clearFilters() {
    setSearchValue("");
    updateUrl({ category: null, q: null }, "push");
  }

  const hasActiveFilters =
    searchValue.trim().length > 0 || categoryFromUrl !== null;

  return (
    <div className="space-y-8">
      <CatalogToolbar
        activeCategory={activeCategory}
        hasActiveFilters={hasActiveFilters}
        onCategoryChange={handleCategoryChange}
        onClear={clearFilters}
        onSearchChange={handleSearchChange}
        resultCount={visibleProducts.length}
        searchValue={searchValue}
      />

      {visibleProducts.length > 0 ? (
        <div
          className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4"
          id="product-grid"
        >
          {visibleProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              thumbnailSrc={thumbnailSources[product.id]}
            />
          ))}
        </div>
      ) : (
        <CatalogEmptyState onReset={clearFilters} />
      )}
    </div>
  );
}
