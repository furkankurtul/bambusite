import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Product } from "@/types/product";
import { ProductGrid } from "./ProductGrid";
import type { Locale } from "@/i18n";
import { getDictionary } from "@/i18n";
import { localizedPath } from "@/i18n/routes";

interface RelatedProductsProps {
  readonly products: readonly Product[];
  readonly thumbnailSources: Readonly<Record<string, string>>;
  readonly locale: Locale;
}

export function RelatedProducts({
  products,
  thumbnailSources,
  locale,
}: RelatedProductsProps) {
  const d = getDictionary(locale);
  if (products.length === 0) return null;

  return (
    <section aria-labelledby="related-products-heading">
      <div className="mb-7 flex items-end justify-between gap-4">
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-zinc-500">
            {d.product.related}
          </p>
          <h2
            className="text-2xl font-semibold tracking-tight text-zinc-950 sm:text-3xl"
            id="related-products-heading"
          >
            {d.product.related}
          </h2>
        </div>
        <Link
          className="hidden items-center gap-1 rounded-md text-sm font-semibold text-zinc-700 hover:text-zinc-950 sm:inline-flex"
          href={localizedPath(locale, "/products")}
        >
          {d.home.viewAll}
          <ArrowRight aria-hidden="true" className="size-4" />
        </Link>
      </div>
      <ProductGrid
        products={products}
        thumbnailSources={thumbnailSources}
        locale={locale}
      />
    </section>
  );
}
