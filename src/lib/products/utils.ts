import type { ProductDimensions } from "@/types/product";

const HEX_COLOR_PATTERN = /^#(?:[\da-f]{3}|[\da-f]{6})$/i;
const PRODUCT_SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export function isValidHexColor(value: string): boolean {
  return HEX_COLOR_PATTERN.test(value);
}

export function isValidProductSlug(value: string): boolean {
  return PRODUCT_SLUG_PATTERN.test(value);
}

export function normalizeSearchQuery(value: string): string {
  return value.trim().toLocaleLowerCase("en").replace(/\s+/g, " ");
}

export function formatProductDimensions(
  dimensions: ProductDimensions | undefined,
): string | undefined {
  if (!dimensions) return undefined;

  const values = [dimensions.width, dimensions.height, dimensions.depth].filter(
    (value): value is number => value !== undefined,
  );

  if (values.length === 0) return undefined;

  return `${values.join(" × ")} ${dimensions.unit}`;
}
