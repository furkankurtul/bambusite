import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getAllProducts,
  getFeaturedProducts,
  getProducts,
  searchProducts,
} from "@/lib/products";
import { runProductArchitectureChecks } from "@/lib/products/checks";
import { formatProductDimensions } from "@/lib/products/utils";

export default async function ProductRepositoryCheckPage() {
  if (process.env.NODE_ENV !== "development") notFound();

  const [allProducts, activeProducts, featuredProducts, dragonResults, checks] =
    await Promise.all([
      getAllProducts(),
      getProducts(),
      getFeaturedProducts(),
      searchProducts("dragon"),
      runProductArchitectureChecks(),
    ]);

  return (
    <main className="mx-auto max-w-4xl space-y-8 px-6 py-10">
      <div className="space-y-2">
        <Link className="text-sky-800 underline" href="/">
          Back to foundation
        </Link>
        <h1 className="text-3xl font-semibold">Product repository check</h1>
        <p className="text-zinc-600">
          Development only. {allProducts.length} total, {activeProducts.length}{" "}
          active, and {featuredProducts.length} featured products loaded.
        </p>
      </div>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Architecture assertions</h2>
        <ul className="list-disc space-y-1 pl-5">
          {checks.map((check) => (
            <li key={check.name}>
              {check.passed ? "Pass" : "Fail"}: {check.name}
            </li>
          ))}
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Search sanity check</h2>
        <p>
          “dragon” matched:{" "}
          {dragonResults.map((product) => product.slug).join(", ")}
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">All sample products</h2>
        <ul className="space-y-3">
          {allProducts.map((product) => (
            <li className="rounded border border-zinc-300 p-3" key={product.id}>
              <strong>{product.name}</strong> — {product.category} —{" "}
              {product.slug}
              <div className="text-sm text-zinc-600">
                {product.active ? "Active" : "Inactive"};{" "}
                {product.model ? "STL configured" : "No STL"};{" "}
                {formatProductDimensions(product.dimensions) ?? "No dimensions"}
                ;{" "}
                {product.price === undefined
                  ? "Quote only"
                  : `${product.price} ${product.currency}`}
              </div>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
