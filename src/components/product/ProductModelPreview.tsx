"use client";

import { Box } from "lucide-react";
import type { Product } from "@/types/product";
import type { ProductColor } from "@/types/product";
import { InteractiveModelPreview } from "./InteractiveModelPreview";
import type { Locale } from "@/i18n";
import { getDictionary } from "@/i18n";

interface ProductModelPreviewProps {
  readonly colors: Product["colors"];
  readonly model: Product["model"];
  readonly modelConfig: Product["modelConfig"];
  readonly onColorChange: (color: ProductColor) => void;
  readonly selectedColor: ProductColor | undefined;
  readonly locale?: Locale;
}

export function ProductModelPreview({
  colors,
  model,
  modelConfig,
  onColorChange,
  selectedColor,
  locale = "tr",
}: ProductModelPreviewProps) {
  const d = getDictionary(locale);
  return (
    <section
      aria-label={d.viewer.previewLabel}
      className="overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-950 text-white shadow-sm"
    >
      {model ? (
        <InteractiveModelPreview
          colors={colors}
          model={model}
          modelConfig={modelConfig}
          onColorChange={onColorChange}
          selectedColor={selectedColor}
          locale={locale}
        />
      ) : (
        <div className="relative flex aspect-[4/3] min-h-72 items-center justify-center overflow-hidden">
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(255,255,255,0.11),transparent_45%)]"
          />
          <div className="relative flex flex-col items-center px-8 text-center">
            <span className="mb-5 flex size-16 items-center justify-center rounded-2xl border border-white/15 bg-white/10">
              <Box aria-hidden="true" className="size-8" strokeWidth={1.5} />
            </span>
            <p className="text-xl font-semibold">{d.viewer.comingSoon}</p>
            <p className="mt-2 max-w-sm text-sm leading-6 text-zinc-300">
              {d.viewer.noModel}
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
