"use client";

import { useState } from "react";
import { ProductImage } from "./ProductImage";

export interface ProductGalleryItem {
  readonly id: string;
  readonly src?: string;
}

interface ProductGalleryProps {
  readonly items: readonly ProductGalleryItem[];
  readonly productName: string;
}

export function ProductGallery({ items, productName }: ProductGalleryProps) {
  const [selectedId, setSelectedId] = useState(items[0]?.id);
  const selectedItem = items.find((item) => item.id === selectedId) ?? items[0];

  if (!selectedItem) return null;

  return (
    <div className="space-y-4">
      <ProductImage
        className="rounded-3xl border border-zinc-200"
        key={selectedItem.id}
        name={productName}
        sizes="(min-width: 1024px) 70vw, 100vw"
        src={selectedItem.src}
      />

      {items.length > 1 && (
        <div
          aria-label={`${productName} images`}
          className="flex gap-3"
          role="group"
        >
          {items.map((item, index) => {
            const selected = item.id === selectedItem.id;

            return (
              <button
                aria-label={`Show ${productName} image ${index + 1}`}
                aria-pressed={selected}
                className={`w-24 shrink-0 overflow-hidden rounded-xl border-2 bg-white transition ${
                  selected
                    ? "border-zinc-950"
                    : "border-transparent hover:border-zinc-300"
                }`}
                key={item.id}
                onClick={() => setSelectedId(item.id)}
                type="button"
              >
                <ProductImage
                  compactFallback
                  key={item.id}
                  name={`${productName} image ${index + 1}`}
                  sizes="96px"
                  src={item.src}
                />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
