import Link from "next/link";
import { ArrowRight, Boxes, Lightbulb, Wrench } from "lucide-react";
import type { Locale } from "@/i18n";
import { getDictionary } from "@/i18n";
import { localizedPath } from "@/i18n/routes";

export function renderAboutPage(locale: Locale) {
  const d = getDictionary(locale);
  return (
    <main className="min-h-svh bg-[#f7f7f5] text-zinc-950">
      <section className="border-b border-zinc-200">
        <div className="mx-auto max-w-[90rem] px-5 py-12 sm:px-8 sm:py-16 lg:px-10 lg:py-20">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
              {d.about.eyebrow}
            </p>
            <h1 className="mt-4 text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">
              {d.about.title}
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-zinc-600 sm:text-lg sm:leading-8">
              {d.about.intro}
            </p>
          </div>
        </div>
      </section>

      <section
        aria-labelledby="what-we-make"
        className="border-b border-zinc-200 bg-white"
      >
        <div className="mx-auto max-w-[90rem] px-5 py-12 sm:px-8 sm:py-16 lg:px-10 lg:py-20">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
              {d.about.focusEyebrow}
            </p>
            <h2
              id="what-we-make"
              className="mt-3 text-3xl font-semibold tracking-[-0.04em] sm:text-4xl"
            >
              {d.about.focusTitle}
            </h2>
          </div>
          <div className="mt-8 grid border-l border-t border-zinc-200 md:grid-cols-3">
            <FocusCard
              icon={
                <Boxes
                  aria-hidden="true"
                  className="size-5"
                  strokeWidth={1.5}
                />
              }
              title={d.about.cards[0].title}
            >
              {d.about.cards[0].text}
            </FocusCard>
            <FocusCard
              icon={
                <Lightbulb
                  aria-hidden="true"
                  className="size-5"
                  strokeWidth={1.5}
                />
              }
              title={d.about.cards[1].title}
            >
              {d.about.cards[1].text}
            </FocusCard>
            <FocusCard
              icon={
                <Wrench
                  aria-hidden="true"
                  className="size-5"
                  strokeWidth={1.5}
                />
              }
              title={d.about.cards[2].title}
            >
              {d.about.cards[2].text}
            </FocusCard>
          </div>
        </div>
      </section>

      <section aria-labelledby="start-here" className="bg-zinc-950 text-white">
        <div className="mx-auto flex max-w-[90rem] flex-col items-start justify-between gap-8 px-5 py-12 sm:px-8 sm:py-16 lg:flex-row lg:items-end lg:px-10 lg:py-20">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-400">
              {d.about.startEyebrow}
            </p>
            <h2
              id="start-here"
              className="mt-4 text-3xl font-semibold tracking-[-0.04em] sm:text-4xl"
            >
              {d.about.startTitle}
            </h2>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-white px-5 text-sm font-semibold text-zinc-950 transition-colors hover:bg-zinc-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              href={localizedPath(locale, "/products")}
            >
              {d.home.explore}{" "}
              <ArrowRight aria-hidden="true" className="size-4" />
            </Link>
            <Link
              className="inline-flex min-h-11 items-center justify-center rounded-md border border-zinc-700 px-5 text-sm font-semibold text-white transition-colors hover:border-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              href={localizedPath(locale, "/custom-print")}
            >
              {d.home.customCta}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

function FocusCard({
  children,
  icon,
  title,
}: {
  children: React.ReactNode;
  icon: React.ReactNode;
  title: string;
}) {
  return (
    <div className="border-b border-r border-zinc-200 p-6 sm:p-8">
      <div className="flex size-10 items-center justify-center rounded-md bg-[#f2f2ef] text-zinc-950">
        {icon}
      </div>
      <h3 className="mt-6 text-lg font-semibold tracking-[-0.02em]">{title}</h3>
      <p className="mt-3 text-sm leading-6 text-zinc-600">{children}</p>
    </div>
  );
}
