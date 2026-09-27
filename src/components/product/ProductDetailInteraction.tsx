"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Check, MessageCircle } from "lucide-react";
import { createPublicUrl } from "@/config/deployment";
import { siteConfig } from "@/config/site";
import {
  createWhatsAppProductInquiry,
  normalizeWhatsAppNumber,
} from "@/lib/whatsapp";
import type { Product, ProductColor } from "@/types/product";
import { ProductColorList } from "./ProductColorList";
import { ProductModelPreview } from "./ProductModelPreview";
import { ProductPrice } from "./ProductPrice";
import { ProductGallery, type ProductGalleryItem } from "./ProductGallery";
import type { Locale } from "@/i18n";
import { getDictionary } from "@/i18n";
import { localizedPath } from "@/i18n/routes";

export function ProductDetailInteraction({
  product,
  locale = "tr",
  galleryItems,
}: {
  readonly product: Product;
  readonly locale?: Locale;
  readonly galleryItems: readonly ProductGalleryItem[];
}) {
  const d = getDictionary(locale);
  const [selectedColor, setSelectedColor] = useState<ProductColor | undefined>(
    product.colors?.[0],
  );
  const whatsappAvailable = Boolean(
    normalizeWhatsAppNumber(siteConfig.whatsappNumber),
  );

  function openInquiry() {
    const productUrl = createProductUrl(product.slug, locale);
    const inquiryUrl = createWhatsAppProductInquiry({
      colorName: selectedColor?.name,
      copy: d.inquiry,
      material: product.material,
      phoneNumber: siteConfig.whatsappNumber,
      productName: product.name,
      productUrl,
    });

    if (inquiryUrl) {
      window.open(inquiryUrl, "_blank", "noopener,noreferrer");
    }
  }

  return (
    <>
      <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(22rem,0.85fr)] lg:gap-14 xl:gap-20">
        <ProductGallery items={galleryItems} productName={product.name} />
        <div className="lg:py-3">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-zinc-500">
            {d.categories[product.category]}
          </p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-zinc-950 sm:text-5xl">
            {product.name}
          </h1>
          <p className="mt-5 text-lg leading-8 text-zinc-600">
            {product.shortDescription}
          </p>

          {!product.model && product.colors && product.colors.length > 0 && (
            <section aria-labelledby="available-colors" className="mt-8">
              <h2
                className="mb-3 text-sm font-semibold text-zinc-950"
                id="available-colors"
              >
                {d.product.availableColors}
              </h2>
              <ProductColorList colors={product.colors} />
            </section>
          )}

          <div className="mt-8 border-y border-zinc-200 py-6">
            <p className="mb-1 text-xs font-semibold uppercase tracking-[0.14em] text-zinc-500">
              {d.product.price}
            </p>
            <ProductPrice currency={product.currency} price={product.price} />
          </div>

          {product.customizable && (
            <p className="mt-6 flex items-start gap-2 text-sm leading-6 text-zinc-600">
              <Check
                aria-hidden="true"
                className="mt-0.5 size-5 shrink-0 text-sky-700"
              />
              {d.product.customizable}
            </p>
          )}

          {whatsappAvailable ? (
            <button
              aria-label={`${d.product.askWhatsapp}: ${product.name}${selectedColor ? `, ${selectedColor.name}` : ""}`}
              className="mt-7 inline-flex w-full min-h-11 items-center justify-center gap-2 rounded-md bg-zinc-950 px-5 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-zinc-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-950 sm:w-auto"
              onClick={openInquiry}
              type="button"
            >
              {d.product.askWhatsapp}
              <MessageCircle aria-hidden="true" className="size-4" />
            </button>
          ) : (
            <Link
              className="mt-7 inline-flex w-full min-h-11 items-center justify-center gap-2 rounded-md bg-zinc-950 px-5 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-zinc-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-950 sm:w-auto"
              href={`${localizedPath(locale, "/contact")}?product=${encodeURIComponent(product.slug)}`}
            >
              {d.product.askAbout}
              <ArrowRight aria-hidden="true" className="size-4" />
            </Link>
          )}
        </div>
      </div>

      <section
        aria-labelledby="product-model-heading"
        className="mt-20 border-t border-zinc-200 pt-10 sm:mt-24"
      >
        <div className="mb-7">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-zinc-500">
            {d.product.model}
          </p>
          <h2
            id="product-model-heading"
            className="text-2xl font-semibold tracking-tight text-zinc-950 sm:text-3xl"
          >
            {locale === "tr" ? "3D model ön izlemesi" : "Interactive 3D model"}
          </h2>
        </div>
        <div className="max-w-5xl">
          <ProductModelPreview
            colors={product.colors}
            model={product.model}
            modelConfig={product.modelConfig}
            onColorChange={setSelectedColor}
            selectedColor={selectedColor}
            locale={locale}
          />
        </div>
      </section>
    </>
  );
}

function createProductUrl(slug: string, locale: Locale): string | undefined {
  const productPath = localizedPath(
    locale,
    `/products/${encodeURIComponent(slug)}`,
  );
  return createPublicUrl(productPath, siteConfig.siteUrl);
}
