"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Check, MessageCircle } from "lucide-react";
import { siteConfig } from "@/config/site";
import {
  createWhatsAppProductInquiry,
  normalizeWhatsAppNumber,
} from "@/lib/whatsapp";
import type { Product, ProductColor } from "@/types/product";
import { ProductColorList } from "./ProductColorList";
import { ProductModelPreview } from "./ProductModelPreview";
import { ProductPrice } from "./ProductPrice";

export function ProductDetailInteraction({
  product,
}: {
  readonly product: Product;
}) {
  const [selectedColor, setSelectedColor] = useState<ProductColor | undefined>(
    product.colors?.[0],
  );
  const whatsappAvailable = Boolean(
    normalizeWhatsAppNumber(siteConfig.whatsappNumber),
  );

  function openInquiry() {
    const productUrl = createProductUrl(product.slug);
    const inquiryUrl = createWhatsAppProductInquiry({
      colorName: selectedColor?.name,
      copy: siteConfig.productInquiryCopy,
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
    <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(22rem,0.85fr)] lg:gap-14 xl:gap-20">
      <ProductModelPreview
        colors={product.colors}
        model={product.model}
        modelConfig={product.modelConfig}
        onColorChange={setSelectedColor}
        selectedColor={selectedColor}
      />

      <div className="lg:py-3">
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-zinc-500">
          {product.category}
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
              Available colors
            </h2>
            <ProductColorList colors={product.colors} />
          </section>
        )}

        <div className="mt-8 border-y border-zinc-200 py-6">
          <p className="mb-1 text-xs font-semibold uppercase tracking-[0.14em] text-zinc-500">
            Price
          </p>
          <ProductPrice currency={product.currency} price={product.price} />
        </div>

        {product.customizable && (
          <p className="mt-6 flex items-start gap-2 text-sm leading-6 text-zinc-600">
            <Check
              aria-hidden="true"
              className="mt-0.5 size-5 shrink-0 text-sky-700"
            />
            Color or size customization may be available.
          </p>
        )}

        {whatsappAvailable ? (
          <button
            aria-label={`Ask on WhatsApp about ${product.name}${selectedColor ? ` in ${selectedColor.name}` : ""}`}
            className="mt-7 inline-flex w-full min-h-11 items-center justify-center gap-2 rounded-md bg-zinc-950 px-5 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-zinc-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-950 sm:w-auto"
            onClick={openInquiry}
            type="button"
          >
            Ask on WhatsApp
            <MessageCircle aria-hidden="true" className="size-4" />
          </button>
        ) : (
          <Link
            className="mt-7 inline-flex w-full min-h-11 items-center justify-center gap-2 rounded-md bg-zinc-950 px-5 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-zinc-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-950 sm:w-auto"
            href={`/contact?product=${encodeURIComponent(product.slug)}`}
          >
            Ask about this product
            <ArrowRight aria-hidden="true" className="size-4" />
          </Link>
        )}
      </div>
    </div>
  );
}

function createProductUrl(slug: string): string | undefined {
  const productPath = `/products/${encodeURIComponent(slug)}`;

  if (siteConfig.siteUrl) {
    try {
      return new URL(productPath, siteConfig.siteUrl).toString();
    } catch {
      return undefined;
    }
  }

  if (typeof window === "undefined") return undefined;
  return new URL(productPath, window.location.origin).toString();
}
