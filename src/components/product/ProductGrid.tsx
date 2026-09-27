import type { Product } from "@/types/product";
import { ProductCard } from "./ProductCard";
import type { Locale } from "@/i18n";

interface ProductGridProps {
  readonly products: readonly Product[];
  readonly thumbnailSources: Readonly<Record<string, string>>;
  readonly locale: Locale;
}

export function ProductGrid({
  products,
  thumbnailSources,
  locale,
}: ProductGridProps) {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          thumbnailSrc={thumbnailSources[product.id]}
          locale={locale}
        />
      ))}
    </div>
  );
}
