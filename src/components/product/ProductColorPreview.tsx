import type { ProductColor } from "@/types/product";
import type { Locale } from "@/i18n";
import { getDictionary } from "@/i18n";
import { getLocalizedColorName } from "@/i18n/colors";

interface ProductColorPreviewProps {
  readonly colors: readonly ProductColor[] | undefined;
  readonly limit?: number;
  readonly locale?: Locale;
}

export function ProductColorPreview({
  colors,
  limit = 4,
  locale = "tr",
}: ProductColorPreviewProps) {
  const d = getDictionary(locale);
  if (!colors || colors.length === 0) return null;

  const visibleColors = colors.slice(0, limit);
  const remainingCount = colors.length - visibleColors.length;

  return (
    <div
      className="flex items-center gap-2"
      aria-label={d.product.availableColors}
    >
      <ul className="flex -space-x-1" role="list">
        {visibleColors.map((color) => (
          <li
            className="size-5 rounded-full border-2 border-white shadow-[0_0_0_1px_rgba(24,24,27,0.18)]"
            key={`${color.name}-${color.hex}`}
            style={{ backgroundColor: color.hex }}
            title={getLocalizedColorName(color.name, locale)}
          >
            <span className="sr-only">
              {getLocalizedColorName(color.name, locale)}
            </span>
          </li>
        ))}
      </ul>
      {remainingCount > 0 && (
        <span className="text-xs font-medium text-zinc-500">
          +{remainingCount}
          <span className="sr-only">
            {" "}
            {locale === "tr" ? "daha fazla renk" : "more colors"}
          </span>
        </span>
      )}
    </div>
  );
}
