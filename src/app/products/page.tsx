import type { Metadata } from "next";
import { Suspense } from "react";
import { ProductCatalog } from "@/components/catalog/ProductCatalog";
import { getProducts } from "@/lib/products";
import { resolveProductThumbnailSources } from "@/lib/products/media";

export const metadata: Metadata = {
  title: "Products",
  description:
    "Browse available 3D printed models, functional parts, and customizable designs.",
};

export default async function ProductsPage() {
  const products = await getProducts();
  const thumbnailSources = await resolveProductThumbnailSources(products);

  return (
    <main className="min-h-svh bg-[#f7f7f5]">
      <div className="mx-auto max-w-[90rem] px-5 py-12 sm:px-8 sm:py-16 lg:px-10 lg:py-20">
        <header className="mb-10 max-w-2xl sm:mb-12">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-zinc-500">
            Catalog
          </p>
          <h1 className="text-4xl font-semibold tracking-tight text-zinc-950 sm:text-5xl">
            Products
          </h1>
          <p className="mt-4 text-lg leading-8 text-zinc-600">
            Explore printed models, functional parts, and customizable designs.
          </p>
        </header>

        <Suspense fallback={<CatalogShell />}>
          <ProductCatalog
            products={products}
            thumbnailSources={thumbnailSources}
          />
        </Suspense>
      </div>
    </main>
  );
}

function CatalogShell() {
  return (
    <div aria-label="Loading catalog controls" className="space-y-8">
      <div className="space-y-5 border-b border-zinc-200 pb-7">
        <div className="h-12 max-w-md rounded-xl border border-zinc-200 bg-white" />
        <div className="flex gap-2 overflow-hidden">
          {[72, 82, 88, 104, 96].map((width) => (
            <span
              className="h-9 shrink-0 rounded-full bg-zinc-200"
              key={width}
              style={{ width }}
            />
          ))}
        </div>
      </div>
      <p className="text-sm text-zinc-500">Preparing product filters…</p>
    </div>
  );
}
