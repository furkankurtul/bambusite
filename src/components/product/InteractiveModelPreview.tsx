"use client";

import dynamic from "next/dynamic";
import { LoaderCircle } from "lucide-react";
import type { Product, ProductColor } from "@/types/product";

const ModelViewer = dynamic(
  () =>
    import("@/components/three/ModelViewer").then(
      (module) => module.ModelViewer,
    ),
  {
    ssr: false,
    loading: () => (
      <div className="flex aspect-[4/3] min-h-72 items-center justify-center bg-zinc-100 text-zinc-700">
        <p
          className="flex items-center gap-2 text-sm font-medium"
          role="status"
        >
          <LoaderCircle
            aria-hidden="true"
            className="size-5 animate-spin motion-reduce:animate-none"
          />
          Preparing 3D viewer…
        </p>
      </div>
    ),
  },
);

interface InteractiveModelPreviewProps {
  readonly colors: Product["colors"];
  readonly model: NonNullable<Product["model"]>;
  readonly modelConfig: Product["modelConfig"];
  readonly onColorChange: (color: ProductColor) => void;
  readonly selectedColor: ProductColor | undefined;
}

export function InteractiveModelPreview(props: InteractiveModelPreviewProps) {
  return <ModelViewer key={props.model} {...props} />;
}
