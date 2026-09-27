import type { ProductCurrency } from "@/types/product";

export const PRODUCT_PRICE_FALLBACK = "Request quote";

export function formatProductPrice(
  price: number,
  currency: ProductCurrency,
): string {
  return new Intl.NumberFormat("en", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(price);
}
