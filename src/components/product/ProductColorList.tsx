import type { ProductColor } from "@/types/product";

interface ProductColorListProps {
  readonly colors: readonly ProductColor[];
}

export function ProductColorList({ colors }: ProductColorListProps) {
  return (
    <ul className="flex flex-wrap gap-2.5" role="list">
      {colors.map((color) => (
        <li
          className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white py-2 pl-2 pr-3 text-sm font-medium text-zinc-700"
          key={`${color.name}-${color.hex}`}
        >
          <span
            aria-hidden="true"
            className="size-5 rounded-full border border-black/15 shadow-sm"
            style={{ backgroundColor: color.hex }}
          />
          <span>{color.name}</span>
          <span className="sr-only">Color value {color.hex}</span>
        </li>
      ))}
    </ul>
  );
}
