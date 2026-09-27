import Link from "next/link";
import { ArrowLeft, SearchX } from "lucide-react";

export default function ProductNotFound() {
  return (
    <main className="flex min-h-svh items-center bg-[#f7f7f5] px-5 py-16 sm:px-8">
      <div className="mx-auto w-full max-w-xl rounded-2xl border border-zinc-200 bg-white px-6 py-14 text-center shadow-sm sm:px-10">
        <span className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-zinc-100 text-zinc-600">
          <SearchX aria-hidden="true" className="size-7" />
        </span>
        <p className="mt-6 text-sm font-semibold uppercase tracking-[0.16em] text-zinc-500">
          Product unavailable
        </p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-zinc-950">
          We couldn&apos;t find this product.
        </h1>
        <p className="mt-4 text-base leading-7 text-zinc-600">
          It may no longer be available, or the address may be incorrect.
        </p>
        <Link
          className="mt-7 inline-flex min-h-11 items-center gap-2 rounded-md bg-zinc-950 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-zinc-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-950"
          href="/products"
        >
          <ArrowLeft aria-hidden="true" className="size-4" />
          Back to products
        </Link>
      </div>
    </main>
  );
}
