import type { Locale } from "@/i18n";
import type { Product } from "@/types/product";

export function getLocalizedProduct(product: Product, locale: Locale) {
  const content = product.localized?.[locale];
  return {
    ...product,
    name: content?.name ?? product.name,
    shortDescription: content?.shortDescription ?? product.shortDescription,
    description: content?.description ?? product.description,
  };
}
