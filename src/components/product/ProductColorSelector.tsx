import { Check } from "lucide-react";
import type { ProductColor } from "@/types/product";
import type { Locale } from "@/i18n";
import { getDictionary } from "@/i18n";

interface ProductColorSelectorProps {
  readonly colors: readonly ProductColor[];
  readonly onChange: (color: ProductColor) => void;
  readonly selectedColor: ProductColor;
  readonly locale?: Locale;
}

export function ProductColorSelector({
  colors,
  onChange,
  selectedColor,
  locale = "tr",
}: ProductColorSelectorProps) {
  const d = getDictionary(locale);
  return (
    <div>
      <div className="flex items-baseline justify-between gap-4">
        <p className="text-sm font-semibold text-zinc-950">
          {d.product.availableColors}
        </p>
        <p aria-live="polite" className="text-xs text-zinc-500">
          {locale === "tr" ? "Seçili" : "Selected"}: {selectedColor.name}
        </p>
      </div>
      <div
        aria-label={d.viewer.color}
        className="mt-3 flex flex-wrap gap-2"
        role="group"
      >
        {colors.map((color) => {
          const selected = color.hex === selectedColor.hex;

          return (
            <button
              aria-label={`${color.name}${selected ? (locale === "tr" ? ", seçili" : ", selected") : ""}`}
              aria-pressed={selected}
              className={`inline-flex items-center gap-2 rounded-full border py-2 pl-2 pr-3 text-sm font-medium transition ${
                selected
                  ? "border-zinc-950 bg-zinc-950 text-white"
                  : "border-zinc-300 bg-white text-zinc-700 hover:border-zinc-500"
              }`}
              key={`${color.name}-${color.hex}`}
              onClick={() => onChange(color)}
              type="button"
            >
              <span
                aria-hidden="true"
                className="size-5 rounded-full border border-black/15 shadow-sm"
                style={{ backgroundColor: color.hex }}
              />
              <span>{color.name}</span>
              {selected && <Check aria-hidden="true" className="size-3.5" />}
            </button>
          );
        })}
      </div>
    </div>
  );
}
