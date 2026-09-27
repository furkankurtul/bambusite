"use client";

import Image from "next/image";
import { Box } from "lucide-react";
import { useState } from "react";

interface ProductImageProps {
  readonly name: string;
  readonly src: string | undefined;
}

export function ProductImage({ name, src }: ProductImageProps) {
  const [failed, setFailed] = useState(src === undefined);

  return (
    <div className="relative aspect-[4/3] overflow-hidden bg-zinc-100">
      <div
        aria-hidden={!failed}
        aria-label={failed ? `${name} image unavailable` : undefined}
        className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-6 text-center text-zinc-500"
        role={failed ? "img" : undefined}
      >
        <span className="flex size-12 items-center justify-center rounded-2xl border border-zinc-200 bg-white text-zinc-600 shadow-sm">
          <Box aria-hidden="true" className="size-6" strokeWidth={1.5} />
        </span>
        <span className="text-sm font-medium">{name}</span>
      </div>

      {!failed && src && (
        <Image
          alt={name}
          className="object-cover transition duration-300 group-hover:scale-[1.02] motion-reduce:transition-none"
          fill
          onError={() => setFailed(true)}
          sizes="(min-width: 1280px) 25vw, (min-width: 768px) 50vw, 100vw"
          src={src}
        />
      )}
    </div>
  );
}
