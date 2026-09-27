import { formatProductPrice } from "@/lib/products/price";
import type { Product } from "@/types/product";
import type { Locale } from "@/i18n";
import { getDictionary } from "@/i18n";

interface ProductPriceProps {
  readonly currency: Product["currency"];
  readonly price: Product["price"];
  readonly locale?: Locale;
}

export function ProductPrice({
  currency,
  price,
  locale = "tr",
}: ProductPriceProps) {
  const d = getDictionary(locale);
  if (price === undefined || currency === undefined) {
    return (
      <span className="text-sm font-semibold text-zinc-700">
        {d.product.quote}
      </span>
    );
  }

  return (
    <span className="text-base font-semibold text-zinc-950">
      {formatProductPrice(price, currency)}
    </span>
  );
}
