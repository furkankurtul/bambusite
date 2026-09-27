import { Box } from "lucide-react";
import type { Product } from "@/types/product";
import { InteractiveModelPreview } from "./InteractiveModelPreview";

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
  return (
    <section
      aria-label="Product 3D preview"
      className="overflow-hidden rounded-3xl border border-zinc-200 bg-zinc-950 text-white shadow-sm"
    >
      {model ? (
        <InteractiveModelPreview
          colors={colors}
          model={model}
          modelConfig={modelConfig}
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
            <p className="text-xl font-semibold">3D preview coming soon</p>
            <p className="mt-2 max-w-sm text-sm leading-6 text-zinc-300">
              This product does not have an interactive model available yet.
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
