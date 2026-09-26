import localProducts from "@/data/products";
import type { Product, ProductCategory } from "@/types/product";
import { normalizeSearchQuery } from "./utils";
import { assertValidProductCatalog } from "./validation";

export interface ProductLookupOptions {
  readonly includeInactive?: boolean;
}

assertValidProductCatalog(localProducts);

const catalog: readonly Product[] = localProducts;

function canReturnProduct(
  product: Product,
  options: ProductLookupOptions,
): boolean {
  return options.includeInactive === true || product.active;
}

/** Internal/administrative access to active and inactive catalog entries. */
export async function getAllProducts(): Promise<readonly Product[]> {
  return [...catalog];
}

/** Public catalog access. Inactive entries are excluded. */
export async function getProducts(): Promise<readonly Product[]> {
  return catalog.filter((product) => product.active);
}

export async function getActiveProducts(): Promise<readonly Product[]> {
  return getProducts();
}

export async function getProductBySlug(
  slug: string,
  options: ProductLookupOptions = {},
): Promise<Product | undefined> {
  return catalog.find(
    (product) => product.slug === slug && canReturnProduct(product, options),
  );
}

export async function getProductById(
  id: string,
  options: ProductLookupOptions = {},
): Promise<Product | undefined> {
  return catalog.find(
    (product) => product.id === id && canReturnProduct(product, options),
  );
}

export async function getFeaturedProducts(): Promise<readonly Product[]> {
  return catalog.filter(
    (product) => product.active && product.featured === true,
  );
}

export async function getProductsByCategory(
  category: ProductCategory,
): Promise<readonly Product[]> {
  return catalog.filter(
    (product) => product.active && product.category === category,
  );
}

export async function searchProducts(
  query: string,
): Promise<readonly Product[]> {
  const normalizedQuery = normalizeSearchQuery(query);
  if (!normalizedQuery) return [];

  const queryTokens = normalizedQuery.split(" ");

  return catalog.filter((product) => {
    if (!product.active) return false;

    const searchableText = normalizeSearchQuery(
      [
        product.name,
        product.shortDescription,
        product.category,
        ...(product.tags ?? []),
      ].join(" "),
    );

    return queryTokens.every((token) => searchableText.includes(token));
  });
}

export async function getRelatedProducts(
  product: Product,
  limit = 4,
): Promise<readonly Product[]> {
  const safeLimit = Math.max(0, Math.floor(limit));
  if (safeLimit === 0) return [];

  const sourceTags = new Set(
    (product.tags ?? []).map((tag) => normalizeSearchQuery(tag)),
  );

  return catalog
    .map((candidate, catalogIndex) => ({
      candidate,
      catalogIndex,
      categoryMatch: Number(candidate.category === product.category),
      sharedTags: (candidate.tags ?? []).filter((tag) =>
        sourceTags.has(normalizeSearchQuery(tag)),
      ).length,
    }))
    .filter(({ candidate }) => candidate.active && candidate.id !== product.id)
    .sort(
      (left, right) =>
        right.categoryMatch - left.categoryMatch ||
        right.sharedTags - left.sharedTags ||
        left.catalogIndex - right.catalogIndex,
    )
    .slice(0, safeLimit)
    .map(({ candidate }) => candidate);
}
