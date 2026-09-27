import "server-only";

import type { Product } from "@/types/product";
import { resolvePublicAsset } from "@/lib/public-assets";

export async function resolveProductThumbnailSources(
  products: readonly Product[],
): Promise<Readonly<Record<string, string>>> {
  const entries = await Promise.all(
    products.map(
      async (product) =>
        [product.id, await resolvePublicAsset(product.thumbnail)] as const,
    ),
  );

  return Object.fromEntries(
    entries.filter(
      (entry): entry is readonly [string, string] => entry[1] !== undefined,
    ),
  );
}

export async function resolveProductImageSources(
  paths: readonly string[],
): Promise<Readonly<Record<string, string>>> {
  const uniquePaths = [...new Set(paths)];
  const entries = await Promise.all(
    uniquePaths.map(
      async (publicPath) =>
        [publicPath, await resolvePublicAsset(publicPath)] as const,
    ),
  );

  return Object.fromEntries(
    entries.filter(
      (entry): entry is readonly [string, string] => entry[1] !== undefined,
    ),
  );
}
