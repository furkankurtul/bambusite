import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Product } from "@/types/product";
import { ProductColorPreview } from "./ProductColorPreview";
import { ProductImage } from "./ProductImage";
import { ProductPrice } from "./ProductPrice";
import { getDictionary, type Locale } from "@/i18n";
import { localizedPath } from "@/i18n/routes";
import { getLocalizedProduct } from "@/lib/products/localized";

interface ProductCardProps {
  readonly product: Product;
  readonly thumbnailSrc: string | undefined;
  readonly locale: Locale;
}

export function ProductCard({
  product,
  thumbnailSrc,
  locale,
}: ProductCardProps) {
  const d = getDictionary(locale);
  const displayProduct = getLocalizedProduct(product, locale);
  const detailHref = localizedPath(locale, `/products/${product.slug}`);

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-zinc-300 hover:shadow-md motion-reduce:transform-none motion-reduce:transition-none">
      <Link
        aria-label={`${d.product.view} ${displayProduct.name}`}
        className="block focus-visible:outline-offset-[-3px]"
        href={detailHref}
        prefetch={false}
      >
        <ProductImage name={displayProduct.name} src={thumbnailSrc} />
      </Link>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="mb-4 flex items-start justify-between gap-3">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-zinc-500">
            {d.categories[product.category]}
          </p>
          {product.customizable && (
            <span className="rounded-full bg-zinc-100 px-2.5 py-1 text-[0.6875rem] font-semibold text-zinc-600">
              {d.product.customizable}
            </span>
          )}
        </div>

        <h2 className="text-xl font-semibold tracking-tight text-zinc-950">
          <Link
            className="rounded-sm hover:underline hover:underline-offset-4"
            href={detailHref}
            prefetch={false}
          >
            {displayProduct.name}
          </Link>
        </h2>
        <p className="mt-2 line-clamp-2 text-sm leading-6 text-zinc-600">
          {displayProduct.shortDescription}
        </p>

        <div className="mt-5 flex min-h-6 items-center justify-between gap-4">
          <ProductColorPreview colors={product.colors} locale={locale} />
          {product.material && (
            <span className="text-xs font-medium text-zinc-500">
              {product.material}
            </span>
          )}
        </div>

        <div className="mt-5 flex items-center justify-between gap-4 border-t border-zinc-100 pt-5">
          <ProductPrice
            currency={product.currency}
            price={product.price}
            locale={locale}
          />
          <Link
            aria-label={`${d.product.details.replace("{name}", displayProduct.name)}`}
            className="inline-flex items-center gap-1 rounded-md text-sm font-semibold text-zinc-800 transition hover:text-zinc-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-950"
            href={detailHref}
            prefetch={false}
          >
            {d.product.view}
            <ArrowUpRight aria-hidden="true" className="size-4" />
          </Link>
        </div>
      </div>
    </article>
  );
}
