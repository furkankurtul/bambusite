import Link from "next/link";
import { siteConfig } from "@/config/site";

export default function Home() {
  return (
    <main className="mx-auto flex min-h-svh max-w-3xl flex-col justify-center gap-6 px-6 py-16 sm:px-10">
      <p className="text-sm font-semibold uppercase tracking-widest text-zinc-600">
        Foundation ready
      </p>
      <h1 className="text-3xl font-semibold leading-tight sm:text-5xl">
        {siteConfig.name} — Development Foundation
      </h1>
      <p className="max-w-xl text-lg leading-relaxed text-zinc-600">
        Next.js, TypeScript, and Tailwind CSS are ready. Product catalog
        features and the interactive STL viewer will be built in future tasks.
      </p>
      {process.env.NODE_ENV === "development" && (
        <div className="flex flex-col items-start gap-2">
          <Link
            className="rounded text-sky-800 underline underline-offset-4"
            href="/dev/three"
            prefetch={false}
          >
            Open the development 3D sanity check
          </Link>
          <Link
            className="rounded text-sky-800 underline underline-offset-4"
            href="/dev/products"
            prefetch={false}
          >
            Open the product repository check
          </Link>
        </div>
      )}
    </main>
  );
}
