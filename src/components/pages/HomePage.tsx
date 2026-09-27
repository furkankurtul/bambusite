import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import {
  ArrowRight,
  Box,
  Boxes,
  Layers3,
  Printer,
  Ruler,
  Sparkles,
} from "lucide-react";
import { ProductGrid } from "@/components/product/ProductGrid";
import { getFeaturedProducts } from "@/lib/products";
import { resolveProductThumbnailSources } from "@/lib/products/media";
import { PRODUCT_CATEGORIES } from "@/types/product";
import type { Locale } from "@/i18n";
import { getDictionary } from "@/i18n";
import { localizedPath } from "@/i18n/routes";

export const metadata: Metadata = {
  title: "3D Printed Products and Custom Prints",
  description:
    "Explore ready-to-print products or request a custom 3D print for your next idea.",
};

export async function renderHome(locale: Locale) {
  const d = getDictionary(locale);
  const featuredProducts = (await getFeaturedProducts()).slice(0, 4);
  const thumbnailSources =
    await resolveProductThumbnailSources(featuredProducts);

  return (
    <main className="min-h-svh bg-[#f7f7f5] text-zinc-950">
      <section className="border-b border-zinc-200">
        <div className="mx-auto grid max-w-[90rem] gap-10 px-5 py-12 sm:px-8 sm:py-16 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-16 lg:px-10 lg:py-24">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
              {d.home.eyebrow}
            </p>
            <h1 className="mt-5 max-w-xl text-4xl font-semibold tracking-[-0.045em] sm:text-5xl lg:text-6xl">
              {d.home.title}
            </h1>
            <p className="mt-6 max-w-lg text-base leading-7 text-zinc-600 sm:text-lg sm:leading-8">
              {d.home.intro}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-zinc-950 px-5 text-sm font-semibold text-white transition-colors hover:bg-zinc-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-950"
                href={localizedPath(locale, "/products")}
              >
                {d.home.explore}{" "}
                <ArrowRight aria-hidden="true" className="size-4" />
              </Link>
              <Link
                className="inline-flex min-h-11 items-center justify-center rounded-md border border-zinc-300 bg-white px-5 text-sm font-semibold text-zinc-900 transition-colors hover:border-zinc-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-950"
                href={localizedPath(locale, "/custom-print")}
              >
                {d.home.customCta}
              </Link>
            </div>
          </div>
          <HeroPrintScene locale={locale} />
        </div>
      </section>

      <section
        aria-labelledby="featured-products"
        className="border-b border-zinc-200 bg-white"
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
                products={featuredProducts}
                thumbnailSources={thumbnailSources}
                locale={locale}
              />
            </div>
          ) : (
            <p className="mt-8 text-sm text-zinc-600">{d.home.noProducts}</p>
          )}
        </div>
      </section>

      <section
        aria-labelledby="categories"
        className="border-b border-zinc-200"
      >
        <div className="mx-auto max-w-[90rem] px-5 py-12 sm:px-8 sm:py-16 lg:px-10 lg:py-20">
          <SectionHeading
            eyebrow={d.home.categoriesEyebrow}
            id="categories"
            title={d.home.categoriesTitle}
          >
            {d.home.categoriesIntro}
          </SectionHeading>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {PRODUCT_CATEGORIES.map((category, index) => (
              <li key={category}>
                <Link
                  className="group flex min-h-28 items-center justify-between rounded-lg border border-zinc-200 bg-white p-5 transition-colors hover:border-zinc-950 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-950"
                  href={`${localizedPath(locale, "/products")}?category=${encodeURIComponent(category)}`}
                >
                  <span className="flex items-center gap-4">
                    <CategoryIcon index={index} />
                    <span className="text-base font-semibold">
                      {d.categories[category]}
                    </span>
                  </span>
                  <ArrowRight
                    aria-hidden="true"
                    className="size-4 text-zinc-400 transition-transform group-hover:translate-x-1 group-hover:text-zinc-950"
                  />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section
        aria-labelledby="how-it-works"
        className="bg-zinc-950 text-white"
      >
        <div className="mx-auto max-w-[90rem] px-5 py-12 sm:px-8 sm:py-16 lg:px-10 lg:py-20">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-400">
              {d.home.processEyebrow}
            </p>
            <h2
              id="how-it-works"
              className="mt-4 text-3xl font-semibold tracking-[-0.04em] sm:text-4xl"
            >
              {d.home.processTitle}
            </h2>
          </div>
          <ol className="mt-10 grid gap-8 md:grid-cols-3">
            <ProcessStep number="01" title={d.home.process[0].title}>
              {d.home.process[0].text}
            </ProcessStep>
            <ProcessStep number="02" title={d.home.process[1].title}>
              {d.home.process[1].text}
            </ProcessStep>
            <ProcessStep number="03" title={d.home.process[2].title}>
              {d.home.process[2].text}
            </ProcessStep>
          </ol>
        </div>
      </section>

      <section
        aria-labelledby="custom-print"
        className="border-b border-zinc-200 bg-white"
      >
        <div className="mx-auto max-w-[90rem] px-5 py-12 sm:px-8 sm:py-16 lg:px-10 lg:py-20">
          <div className="grid overflow-hidden rounded-xl border border-zinc-200 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="p-7 sm:p-10 lg:p-12">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
                {d.home.customEyebrow}
              </p>
              <h2
                id="custom-print"
                className="mt-4 max-w-xl text-3xl font-semibold tracking-[-0.04em] sm:text-4xl"
              >
                {d.home.customTitle}
              </h2>
              <p className="mt-5 max-w-xl text-base leading-7 text-zinc-600">
                {d.home.customText}
              </p>
              <Link
                className="mt-8 inline-flex min-h-11 items-center gap-2 rounded-md bg-zinc-950 px-5 text-sm font-semibold text-white transition-colors hover:bg-zinc-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-950"
                href={localizedPath(locale, "/custom-print")}
              >
                {d.home.customStart}{" "}
                <ArrowRight aria-hidden="true" className="size-4" />
              </Link>
            </div>
            <div className="flex min-h-64 items-center justify-center border-t border-zinc-200 bg-[#f2f2ef] p-8 lg:min-h-full lg:border-l lg:border-t-0">
              <div className="relative flex size-48 items-center justify-center rounded-full border border-zinc-300 bg-white">
                <Ruler
                  aria-hidden="true"
                  className="size-10 text-zinc-950"
                  strokeWidth={1.5}
                />
                <div className="absolute -left-3 top-8 flex size-12 items-center justify-center rounded-md border border-zinc-300 bg-[#f7f7f5]">
                  <Layers3
                    aria-hidden="true"
                    className="size-5"
                    strokeWidth={1.5}
                  />
                </div>
                <div className="absolute -bottom-2 right-1 flex size-12 items-center justify-center rounded-md bg-zinc-950 text-white">
                  <Printer
                    aria-hidden="true"
                    className="size-5"
                    strokeWidth={1.5}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        aria-labelledby="why-3d-printing"
        className="border-b border-zinc-200"
      >
        <div className="mx-auto max-w-[90rem] px-5 py-12 sm:px-8 sm:py-16 lg:px-10 lg:py-20">
          <SectionHeading
            eyebrow={d.home.whyEyebrow}
            id="why-3d-printing"
            title={d.home.whyTitle}
          >
            {d.home.whyIntro}
          </SectionHeading>
          <div className="mt-8 grid border-l border-t border-zinc-200 md:grid-cols-3">
            <Benefit
              icon={
                <Sparkles
                  aria-hidden="true"
                  className="size-5"
                  strokeWidth={1.5}
                />
              }
              title={d.home.benefits[0].title}
            >
              {d.home.benefits[0].text}
            </Benefit>
            <Benefit
              icon={
                <Printer
                  aria-hidden="true"
                  className="size-5"
                  strokeWidth={1.5}
                />
              }
              title={d.home.benefits[1].title}
            >
              {d.home.benefits[1].text}
            </Benefit>
            <Benefit
              icon={
                <Boxes
                  aria-hidden="true"
                  className="size-5"
                  strokeWidth={1.5}
                />
              }
              title={d.home.benefits[2].title}
            >
              {d.home.benefits[2].text}
            </Benefit>
          </div>
        </div>
      </section>

      <section aria-labelledby="final-cta" className="bg-zinc-950 text-white">
        <div className="mx-auto flex max-w-[90rem] flex-col items-start justify-between gap-8 px-5 py-12 sm:px-8 sm:py-16 lg:flex-row lg:items-end lg:px-10 lg:py-20">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-400">
              {d.home.finalEyebrow}
            </p>
            <h2
              id="final-cta"
              className="mt-4 text-3xl font-semibold tracking-[-0.04em] sm:text-4xl"
            >
              {d.home.finalTitle}
            </h2>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              className="inline-flex min-h-11 items-center justify-center rounded-md bg-white px-5 text-sm font-semibold text-zinc-950 transition-colors hover:bg-zinc-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              href={localizedPath(locale, "/products")}
            >
              {d.nav.products}
            </Link>
            <Link
              className="inline-flex min-h-11 items-center justify-center rounded-md border border-zinc-700 px-5 text-sm font-semibold text-white transition-colors hover:border-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              href={localizedPath(locale, "/custom-print")}
            >
              {d.nav.customPrint}
            </Link>
            <Link
              className="inline-flex min-h-11 items-center justify-center rounded-md border border-zinc-700 px-5 text-sm font-semibold text-white transition-colors hover:border-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              href={localizedPath(locale, "/contact")}
            >
              {d.home.contact}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

function HeroPrintScene({ locale }: { readonly locale: Locale }) {
  return (
    <div
      aria-label="Abstract 3D printing workspace illustration"
      className="relative isolate min-h-80 overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950 p-6 text-white sm:min-h-96 sm:p-8"
      role="img"
    >
      <div className="absolute inset-x-6 bottom-8 border-t border-zinc-700 sm:inset-x-8" />
      <div className="absolute bottom-8 left-1/2 h-44 w-40 -translate-x-1/2 rounded-t-[2rem] border border-zinc-600 bg-zinc-900 sm:h-52 sm:w-48">
        <div className="absolute left-1/2 top-6 h-16 w-16 -translate-x-1/2 rounded-md border border-zinc-500 bg-zinc-800" />
        <div className="absolute bottom-0 left-0 right-0 h-2 border-t border-zinc-500 bg-zinc-800" />
      </div>
      <div className="absolute bottom-[8.65rem] left-1/2 z-10 h-24 w-4 -translate-x-1/2 rounded-full bg-white sm:bottom-[10.6rem]" />
      <div className="absolute bottom-24 left-1/2 z-20 h-5 w-5 -translate-x-1/2 rounded-sm bg-white shadow-[0_8px_0_0_rgba(255,255,255,0.16)] sm:bottom-28" />
      <div className="absolute bottom-10 left-1/2 z-20 flex h-12 w-24 -translate-x-1/2 items-center justify-center rounded-md border border-zinc-500 bg-zinc-800">
        <Box
          aria-hidden="true"
          className="size-6 text-white"
          strokeWidth={1.5}
        />
      </div>
      <div className="absolute left-6 top-6 flex items-center gap-2 text-xs font-medium text-zinc-400 sm:left-8 sm:top-8">
        <span className="size-2 rounded-full bg-white" />
        {locale === "tr" ? "Katman katman" : "Layer by layer"}
      </div>
      <div className="absolute right-6 top-6 rounded-md border border-zinc-700 px-3 py-2 text-xs text-zinc-300 sm:right-8 sm:top-8">
        0.20 mm
      </div>
      <div className="absolute bottom-8 left-6 hidden text-xs leading-5 text-zinc-400 sm:left-8 sm:block">
        {locale === "tr" ? "Dijital model" : "Digital model"}
        <br />
        {locale === "tr" ? "Fiziksel ürün" : "Physical object"}
      </div>
    </div>
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
  actionHref?: string;
  actionLabel?: string;
  children: ReactNode;
  eyebrow: string;
  id: string;
  title: string;
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
      {actionHref && actionLabel ? (
        <Link
          className="inline-flex min-h-11 shrink-0 items-center gap-2 text-sm font-semibold text-zinc-950 underline decoration-zinc-300 underline-offset-8 transition-colors hover:decoration-zinc-950 focus-visible:rounded focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-zinc-950"
          href={actionHref}
        >
          {actionLabel}
          <ArrowRight aria-hidden="true" className="size-4" />
        </Link>
      ) : null}
    </div>
  );
}

function CategoryIcon({ index }: { index: number }) {
  const Icon = [Box, Layers3, Boxes][index % 3];
  return (
    <span className="flex size-10 items-center justify-center rounded-md bg-[#f2f2ef] text-zinc-900">
      <Icon aria-hidden="true" className="size-5" strokeWidth={1.5} />
    </span>
  );
}

function ProcessStep({
  children,
  number,
  title,
}: {
  children: ReactNode;
  number: string;
  title: string;
}) {
  return (
    <li className="border-t border-zinc-700 pt-5">
      <span className="text-xs font-semibold tracking-[0.18em] text-zinc-400">
        {number}
      </span>
      <h3 className="mt-5 text-xl font-semibold tracking-[-0.02em]">{title}</h3>
      <p className="mt-3 max-w-sm text-sm leading-6 text-zinc-400">
        {children}
      </p>
    </li>
  );
}

function Benefit({
  children,
  icon,
  title,
}: {
  children: ReactNode;
  icon: ReactNode;
  title: string;
}) {
  return (
    <div className="border-b border-r border-zinc-200 bg-white p-6 sm:p-8">
      <div className="flex size-10 items-center justify-center rounded-md bg-[#f2f2ef]">
        {icon}
      </div>
      <h3 className="mt-6 text-lg font-semibold tracking-[-0.02em]">{title}</h3>
      <p className="mt-3 text-sm leading-6 text-zinc-600">{children}</p>
    </div>
  );
}
