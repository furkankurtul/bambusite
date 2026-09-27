import {
  formatProductPrice,
  PRODUCT_PRICE_FALLBACK,
} from "@/lib/products/price";
import type { Product } from "@/types/product";

interface ProductPriceProps {
  readonly currency: Product["currency"];
  readonly price: Product["price"];
}

export function ProductPrice({ currency, price }: ProductPriceProps) {
  if (price === undefined || currency === undefined) {
    return (
      <span className="text-sm font-semibold text-zinc-700">
        {PRODUCT_PRICE_FALLBACK}
      </span>
    );
  }

  return (
    <span className="text-base font-semibold text-zinc-950">
      {formatProductPrice(price, currency)}
    </span>
  );
}
