import type { ProductColor } from "@/types/product";

interface ProductColorPreviewProps {
  readonly colors: readonly ProductColor[] | undefined;
  readonly limit?: number;
}

export function ProductColorPreview({
  colors,
  limit = 4,
}: ProductColorPreviewProps) {
  if (!colors || colors.length === 0) return null;

  const visibleColors = colors.slice(0, limit);
  const remainingCount = colors.length - visibleColors.length;

  return (
    <div className="flex items-center gap-2" aria-label="Available colors">
      <ul className="flex -space-x-1" role="list">
        {visibleColors.map((color) => (
          <li
            className="size-5 rounded-full border-2 border-white shadow-[0_0_0_1px_rgba(24,24,27,0.18)]"
            key={`${color.name}-${color.hex}`}
            style={{ backgroundColor: color.hex }}
            title={color.name}
          >
            <span className="sr-only">
              {color.name}: {color.hex}
            </span>
          </li>
        ))}
      </ul>
      {remainingCount > 0 && (
        <span className="text-xs font-medium text-zinc-500">
          +{remainingCount}
          <span className="sr-only"> more colors</span>
        </span>
      )}
    </div>
  );
}
