"use client";

import Image from "next/image";
import { Box } from "lucide-react";
import { useState } from "react";

interface ProductImageProps {
  readonly className?: string;
  readonly compactFallback?: boolean;
  readonly name: string;
  readonly priority?: boolean;
  readonly sizes?: string;
  readonly src: string | undefined;
}

export function ProductImage({
  className = "",
  compactFallback = false,
  name,
  priority = false,
  sizes = "(min-width: 1280px) 25vw, (min-width: 768px) 50vw, 100vw",
  src,
}: ProductImageProps) {
  const [failed, setFailed] = useState(src === undefined);

  return (
    <div
      className={`relative aspect-[4/3] overflow-hidden bg-zinc-100 ${className}`}
    >
      <div
        aria-hidden={!failed}
        aria-label={failed ? `${name} image unavailable` : undefined}
        className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-6 text-center text-zinc-500"
        role={failed ? "img" : undefined}
      >
        <span
          className={`flex items-center justify-center border border-zinc-200 bg-white text-zinc-600 shadow-sm ${
            compactFallback ? "size-8 rounded-lg" : "size-12 rounded-2xl"
          }`}
        >
          <Box
            aria-hidden="true"
            className={compactFallback ? "size-4" : "size-6"}
            strokeWidth={1.5}
          />
        </span>
        <span className={compactFallback ? "sr-only" : "text-sm font-medium"}>
          {name}
        </span>
      </div>

      {!failed && src && (
        <Image
          alt={name}
          className="object-cover transition duration-300 group-hover:scale-[1.02] motion-reduce:transition-none"
          fill
          onError={() => setFailed(true)}
          priority={priority}
          sizes={sizes}
          src={src}
        />
      )}
    </div>
  );
}
