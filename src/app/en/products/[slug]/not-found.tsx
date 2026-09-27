import Link from "next/link";
import { ArrowLeft, SearchX } from "lucide-react";
import { getDictionary } from "@/i18n";
import { localizedPath } from "@/i18n/routes";

export default function EnglishProductNotFound() {
  const d = getDictionary("en");
  return (
    <main className="flex min-h-svh items-center bg-[#f7f7f5] px-5 py-16 sm:px-8">
      <div className="mx-auto w-full max-w-xl rounded-2xl border border-zinc-200 bg-white px-6 py-14 text-center shadow-sm sm:px-10">
        <SearchX aria-hidden="true" className="mx-auto size-8 text-zinc-600" />
        <p className="mt-6 text-sm font-semibold uppercase tracking-[0.16em] text-zinc-500">
          {d.product.invalidTitle}
        </p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-zinc-950">
          {d.product.invalidTitle}
        </h1>
        <p className="mt-4 text-base leading-7 text-zinc-600">
          {d.product.invalidText}
        </p>
        <Link
          className="mt-7 inline-flex min-h-11 items-center gap-2 rounded-md bg-zinc-950 px-5 py-3 text-sm font-semibold text-white"
          href={localizedPath("en", "/products")}
        >
          <ArrowLeft aria-hidden="true" className="size-4" />
          {d.product.back}
        </Link>
      </div>
    </main>
  );
}
