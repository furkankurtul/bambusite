import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { ProductGrid } from "@/components/product/ProductGrid";
import type { Locale } from "@/i18n";
import { getDictionary } from "@/i18n";
import { localizedPath } from "@/i18n/routes";
import { getFeaturedProducts } from "@/lib/products";
import { resolveProductThumbnailSources } from "@/lib/products/media";

export async function renderHome(locale: Locale) {
  const d = getDictionary(locale);
  const featuredProducts = (await getFeaturedProducts()).slice(0, 4);
  const thumbnailSources =
    await resolveProductThumbnailSources(featuredProducts);
  const secondaryRoutes = ["/guide", "/faq", "/about", "/contact"] as const;

  return (
    <main className="min-h-svh bg-[#f7f7f5] text-zinc-950">
      <section className="border-b border-zinc-200 bg-white">
        <div className="mx-auto max-w-[90rem] px-5 py-14 sm:px-8 sm:py-20 lg:px-10 lg:py-24">
          <div className="max-w-3xl">
            <h1 className="max-w-2xl text-4xl font-semibold tracking-[-0.045em] sm:text-5xl lg:text-6xl">
              {d.home.title}
            </h1>
            <p className="mt-5 max-w-xl text-base leading-7 text-zinc-600 sm:text-lg sm:leading-8">
              {d.home.intro}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-zinc-950 px-5 text-sm font-semibold text-white transition-colors hover:bg-zinc-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-950"
                href={localizedPath(locale, "/products")}
              >
                {d.home.explore}
                <ArrowRight aria-hidden="true" className="size-4" />
              </Link>
              <Link
                className="inline-flex min-h-11 items-center justify-center rounded-md border border-zinc-300 px-5 text-sm font-semibold text-zinc-900 transition-colors hover:border-zinc-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-950"
                href={localizedPath(locale, "/custom-print")}
              >
                {d.home.customCta}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section
        aria-labelledby="featured-products"
        className="border-b border-zinc-200"
      >
        <div className="mx-auto max-w-[90rem] px-5 py-12 sm:px-8 sm:py-16 lg:px-10 lg:py-20">
          <SectionHeading
            actionHref={localizedPath(locale, "/products")}
            actionLabel={d.home.viewAll}
            eyebrow={d.home.catalogEyebrow}
            id="featured-products"
            title={d.home.featuredTitle}
          >
            {d.home.featuredIntro}
          </SectionHeading>
          {featuredProducts.length > 0 ? (
            <div className="mt-8">
              <ProductGrid
                locale={locale}
                products={featuredProducts}
                thumbnailSources={thumbnailSources}
              />
            </div>
          ) : (
            <p className="mt-8 text-sm text-zinc-600">{d.home.noProducts}</p>
          )}
        </div>
      </section>

      <section
        aria-labelledby="custom-print"
        className="border-b border-zinc-200 bg-white"
      >
        <div className="mx-auto max-w-[90rem] px-5 py-12 sm:px-8 sm:py-16 lg:px-10 lg:py-20">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
              {d.home.customEyebrow}
            </p>
            <h2
              id="custom-print"
              className="mt-4 text-3xl font-semibold tracking-[-0.04em] sm:text-4xl"
            >
              {d.home.customTitle}
            </h2>
            <p className="mt-4 text-base leading-7 text-zinc-600">
              {d.home.customText}
            </p>
            <Link
              className="mt-7 inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-zinc-950 px-5 text-sm font-semibold text-white transition-colors hover:bg-zinc-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-950"
              href={localizedPath(locale, "/custom-print")}
            >
              {d.home.customStart}
              <ArrowRight aria-hidden="true" className="size-4" />
            </Link>
          </div>
        </div>
      </section>

      <section aria-labelledby="more-information">
        <div className="mx-auto max-w-[90rem] px-5 py-10 sm:px-8 sm:py-12 lg:px-10">
          <h2 id="more-information" className="sr-only">
            {d.home.secondaryTitle}
          </h2>
          <ul className="grid gap-x-8 gap-y-5 sm:grid-cols-2 lg:grid-cols-4">
            {d.home.secondaryLinks.map((item, index) => (
              <li key={secondaryRoutes[index]}>
                <Link
                  className="group block rounded-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-zinc-950"
                  href={localizedPath(locale, secondaryRoutes[index])}
                >
                  <span className="inline-flex items-center gap-2 text-sm font-semibold text-zinc-950 underline decoration-zinc-300 underline-offset-8 transition-colors group-hover:decoration-zinc-950">
                    {item.title}
                    <ArrowRight aria-hidden="true" className="size-4" />
                  </span>
                  <span className="mt-3 block text-sm leading-6 text-zinc-600">
                    {item.text}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}

function SectionHeading({
  actionHref,
  actionLabel,
  children,
  eyebrow,
  id,
  title,
}: {
  readonly actionHref: string;
  readonly actionLabel: string;
  readonly children: ReactNode;
  readonly eyebrow: string;
  readonly id: string;
  readonly title: string;
}) {
  return (
    <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
      <div className="max-w-2xl">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
          {eyebrow}
        </p>
        <h2
          id={id}
          className="mt-3 text-3xl font-semibold tracking-[-0.04em] sm:text-4xl"
        >
          {title}
        </h2>
        <p className="mt-4 max-w-xl text-base leading-7 text-zinc-600">
          {children}
        </p>
      </div>
      <Link
        className="inline-flex min-h-11 shrink-0 items-center gap-2 text-sm font-semibold text-zinc-950 underline decoration-zinc-300 underline-offset-8 transition-colors hover:decoration-zinc-950 focus-visible:rounded focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-zinc-950"
        href={actionHref}
      >
        {actionLabel}
        <ArrowRight aria-hidden="true" className="size-4" />
      </Link>
    </div>
  );
}
