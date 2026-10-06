import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { FaqAccordion } from "@/components/information/FaqAccordion";
import type { Locale } from "@/i18n";
import { getDictionary } from "@/i18n";
import { localizedPath } from "@/i18n/routes";

export function renderFaqPage(locale: Locale) {
  const d = getDictionary(locale);
  return (
    <main className="min-h-svh bg-[#f7f7f5] text-zinc-950">
      <div className="mx-auto max-w-[90rem] px-5 py-12 sm:px-8 sm:py-16 lg:px-10 lg:py-20">
        <header className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
            {d.nav.faq}
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">
            {d.faq.title}
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-zinc-600 sm:text-lg sm:leading-8">
            {d.faq.intro}
          </p>
        </header>

        <section
          aria-labelledby="faq-list"
          className="mt-12 max-w-4xl sm:mt-16"
        >
          <h2 id="faq-list" className="sr-only">
            {d.faq.title}
          </h2>
          <FaqAccordion items={d.faq.items} />
        </section>

        <section
          aria-labelledby="faq-cta"
          className="mt-12 rounded-2xl bg-zinc-950 p-6 text-white sm:mt-16 sm:p-10"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-400">
            {d.faq.ctaTitle}
          </p>
          <div className="mt-4 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <h2
              id="faq-cta"
              className="max-w-xl text-2xl font-semibold tracking-[-0.03em] sm:text-3xl"
            >
              {d.faq.ctaText}
            </h2>
            <Link
              className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-md bg-white px-5 text-sm font-semibold text-zinc-950 transition-colors hover:bg-zinc-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              href={localizedPath(locale, "/custom-print")}
            >
              {d.faq.cta} <ArrowRight aria-hidden="true" className="size-4" />
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
