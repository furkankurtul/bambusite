import { formatPrintTime, formatProductDimensions } from "@/lib/products/utils";
import type { Product } from "@/types/product";

interface ProductDetailsProps {
  readonly product: Product;
}

export function ProductDetails({ product }: ProductDetailsProps) {
  const dimensions = formatProductDimensions(product.dimensions);
  const printTime = formatPrintTime(product.printTime);
  const details = [
    ["Category", product.category],
    ["Material", product.material],
    ["Dimensions", dimensions],
    ["Estimated print time", printTime],
    ["Customizable", product.customizable ? "Available" : "Standard design"],
    ["3D model", product.model ? "Available" : "Coming soon"],
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
