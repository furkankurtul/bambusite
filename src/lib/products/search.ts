import type { Product } from "@/types/product";
import { normalizeSearchQuery } from "./utils";

export function productMatchesSearch(product: Product, query: string): boolean {
  const normalizedQuery = normalizeSearchQuery(query);
  if (!normalizedQuery) return true;

  const searchableText = normalizeSearchQuery(
    [
      product.name,
      product.shortDescription,
      product.category,
      ...(product.tags ?? []),
    ].join(" "),
  );

  return normalizedQuery
    .split(" ")
    .every((token) => searchableText.includes(token));
}
