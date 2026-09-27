import { formatPrintTime, formatProductDimensions } from "@/lib/products/utils";
import type { Product } from "@/types/product";
import type { Locale } from "@/i18n";
import { getDictionary } from "@/i18n";

interface ProductDetailsProps {
  readonly product: Product;
  readonly locale?: Locale;
}

export function ProductDetails({
  product,
  locale = "tr",
}: ProductDetailsProps) {
  const d = getDictionary(locale);
  const dimensions = formatProductDimensions(product.dimensions);
  const printTime = formatPrintTime(product.printTime);
  const details = [
    [d.product.category, d.categories[product.category]],
    [
      d.product.material,
      product.material ? d.materials[product.material] : undefined,
    ],
    [d.product.dimensions, dimensions],
    [d.product.printTime, printTime],
    [
      d.product.customizable,
      product.customizable
        ? d.product.customAvailable
        : d.product.standardDesign,
    ],
    [
      d.product.model,
      product.model ? d.product.modelAvailable : d.product.comingSoon,
    ],
  ].filter((entry): entry is [string, string] => entry[1] !== undefined);

  return (
    <dl className="grid gap-px overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-200 sm:grid-cols-2 lg:grid-cols-3">
      {details.map(([label, value]) => (
        <div className="bg-white p-5" key={label}>
          <dt className="text-xs font-semibold uppercase tracking-[0.12em] text-zinc-500">
            {label}
          </dt>
          <dd className="mt-2 text-sm font-semibold text-zinc-950">{value}</dd>
        </div>
      ))}
    </dl>
  );
}
