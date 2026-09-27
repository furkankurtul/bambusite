import { Box, Cuboid } from "lucide-react";
import type { Product } from "@/types/product";

interface ProductModelPreviewProps {
  readonly colors: Product["colors"];
  readonly model: Product["model"];
  readonly modelConfig: Product["modelConfig"];
}

export function ProductModelPreview({
  colors,
  model,
  modelConfig,
}: ProductModelPreviewProps) {
  const hasModel = model !== undefined;
  const modelUnit = modelConfig?.unit ?? "mm";

  return (
    <section
      aria-label="Product 3D preview"
      className="relative flex aspect-[4/3] min-h-72 overflow-hidden rounded-3xl border border-zinc-200 bg-zinc-950 text-white shadow-sm"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(255,255,255,0.11),transparent_45%)]"
      />
      <div className="relative flex flex-1 flex-col items-center justify-center px-8 text-center">
        <span className="mb-5 flex size-16 items-center justify-center rounded-2xl border border-white/15 bg-white/10">
          {hasModel ? (
            <Cuboid aria-hidden="true" className="size-8" strokeWidth={1.5} />
          ) : (
            <Box aria-hidden="true" className="size-8" strokeWidth={1.5} />
          )}
        </span>
        <p className="text-xl font-semibold">
          {hasModel ? "Interactive 3D preview" : "3D preview coming soon"}
        </p>
        <p className="mt-2 max-w-sm text-sm leading-6 text-zinc-300">
          {hasModel
            ? "This product has a model configured for the interactive viewer planned for the next release."
            : "This product does not have an interactive model available yet."}
        </p>
        {hasModel && (
          <p className="mt-5 text-xs font-medium uppercase tracking-[0.16em] text-zinc-400">
            {colors?.length ?? 0} color options · Model units: {modelUnit}
          </p>
        )}
      </div>
    </section>
  );
}
