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
  if (
    !dimensions ||
    dimensions.width === undefined ||
    dimensions.height === undefined ||
    dimensions.depth === undefined
  )
    return undefined;

  return `${dimensions.width} × ${dimensions.depth} × ${dimensions.height} ${dimensions.unit}`;
}

export function formatPrintTime(
  minutes: number | undefined,
): string | undefined {
  if (minutes === undefined || minutes <= 0) return undefined;

  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  if (hours === 0) return `${remainingMinutes} min`;
  if (remainingMinutes === 0) return `${hours} hr`;
  return `${hours} hr ${remainingMinutes} min`;
}
