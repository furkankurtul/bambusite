import Link from "next/link";
import type { ReactNode } from "react";
import {
  ArrowRight,
  BookOpen,
  Box,
  Boxes,
  Layers3,
  MessageCircle,
  Printer,
  Sparkles,
} from "lucide-react";
import { ProductGrid } from "@/components/product/ProductGrid";
import { siteConfig } from "@/config/site";
import type { Locale } from "@/i18n";
import { getDictionary } from "@/i18n";
import { localizedPath } from "@/i18n/routes";
import { getFeaturedProducts } from "@/lib/products";
import { resolveProductThumbnailSources } from "@/lib/products/media";
import { createWhatsAppUrl } from "@/lib/whatsapp";

export async function renderHome(locale: Locale) {
  const d = getDictionary(locale);
  const featuredProducts = (await getFeaturedProducts()).slice(0, 4);
  const thumbnailSources =
    await resolveProductThumbnailSources(featuredProducts);
  const whatsAppUrl = createWhatsAppUrl({
    phoneNumber: siteConfig.whatsappNumber,
  });

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
        aria-labelledby="custom-print"
        className="border-b border-zinc-200"
      >
        <div className="mx-auto max-w-[90rem] px-5 py-12 sm:px-8 sm:py-16 lg:px-10 lg:py-20">
          <SectionHeading
            eyebrow={d.home.customEyebrow}
            id="custom-print"
            title={d.home.customTitle}
          >
            {d.home.customText}
          </SectionHeading>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {d.home.customPaths.map((path, index) => (
              <Link
                className="group rounded-xl border border-zinc-200 bg-white p-6 transition-colors hover:border-zinc-950 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-950 sm:p-8"
                href={localizedPath(locale, "/custom-print")}
                key={path.title}
              >
                <span className="flex size-10 items-center justify-center rounded-md bg-[#f2f2ef] text-zinc-950">
                  {index === 0 ? (
                    <Layers3
                      aria-hidden="true"
                      className="size-5"
                      strokeWidth={1.5}
                    />
                  ) : (
                    <Sparkles
                      aria-hidden="true"
                      className="size-5"
                      strokeWidth={1.5}
                    />
                  )}
                </span>
                <h3 className="mt-6 text-xl font-semibold tracking-[-0.02em]">
                  {path.title}
                </h3>
                <p className="mt-3 max-w-md text-sm leading-6 text-zinc-600">
                  {path.text}
                </p>
                <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold underline decoration-zinc-300 underline-offset-8 transition-colors group-hover:decoration-zinc-950">
                  {path.action}
                  <ArrowRight aria-hidden="true" className="size-4" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section
        aria-labelledby="printing-guide"
        className="border-b border-zinc-200 bg-white"
      >
        <div className="mx-auto grid max-w-[90rem] gap-8 px-5 py-12 sm:px-8 sm:py-16 lg:grid-cols-[1fr_auto] lg:items-end lg:gap-16 lg:px-10 lg:py-20">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
              {d.home.guideEyebrow}
            </p>
            <h2
              id="printing-guide"
              className="mt-4 text-3xl font-semibold tracking-[-0.04em] sm:text-4xl"
            >
              {d.home.guideTitle}
            </h2>
            <p className="mt-4 text-base leading-7 text-zinc-600">
              {d.home.guideText}
            </p>
          </div>
          <Link
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md border border-zinc-300 bg-white px-5 text-sm font-semibold text-zinc-950 transition-colors hover:border-zinc-950 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-950"
            href={localizedPath(locale, "/guide")}
          >
            <BookOpen aria-hidden="true" className="size-4" />{" "}
            {d.home.guideAction}
          </Link>
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
            {d.home.process.map((step, index) => (
              <ProcessStep
                key={step.title}
                number={`0${index + 1}`}
                title={step.title}
              >
                {step.text}
              </ProcessStep>
            ))}
          </ol>
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
            <p className="mt-4 text-sm leading-6 text-zinc-400">
              {d.home.finalText}
            </p>
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
            {whatsAppUrl ? (
              <a
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md border border-zinc-700 px-5 text-sm font-semibold text-white transition-colors hover:border-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                href={whatsAppUrl}
                rel="noreferrer"
                target="_blank"
              >
                <MessageCircle aria-hidden="true" className="size-4" />
                {d.product.askWhatsapp}
              </a>
            ) : (
              <Link
                className="inline-flex min-h-11 items-center justify-center rounded-md border border-zinc-700 px-5 text-sm font-semibold text-white transition-colors hover:border-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                href={localizedPath(locale, "/contact")}
              >
                {d.home.contact}
              </Link>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}

function HeroPrintScene({ locale }: { readonly locale: Locale }) {
  return (
    <div
      aria-label={
        locale === "tr"
          ? "Soyut 3D baskı çalışma alanı çizimi"
          : "Abstract 3D printing workspace illustration"
      }
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
