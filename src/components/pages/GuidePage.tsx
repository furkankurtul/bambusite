import { BookOpen } from "lucide-react";
import type { Locale } from "@/i18n";
import { getDictionary } from "@/i18n";

export function renderGuidePage(locale: Locale) {
  const d = getDictionary(locale);

  return (
    <main className="min-h-svh bg-[#f7f7f5] text-zinc-950">
      <div className="mx-auto max-w-[90rem] px-5 py-12 sm:px-8 sm:py-16 lg:px-10 lg:py-20">
        <header className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
            {d.guide.eyebrow}
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">
            {d.guide.title}
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-zinc-600 sm:text-lg sm:leading-8">
            {d.guide.intro}
          </p>
        </header>

        <div className="mt-12 space-y-12 sm:mt-16 sm:space-y-16">
          {d.guide.sections.map((section) => (
            <section aria-labelledby={section.title} key={section.title}>
              <h2
                id={section.title}
                className="text-2xl font-semibold tracking-[-0.03em] sm:text-3xl"
              >
                {section.title}
              </h2>
              <div className="mt-6 grid gap-4 lg:grid-cols-3">
                {section.topics.map((topic) => (
                  <article
                    className="rounded-xl border border-zinc-200 bg-white p-6 sm:p-7"
                    key={topic.title}
                  >
                    <BookOpen
                      aria-hidden="true"
                      className="size-5 text-zinc-600"
                      strokeWidth={1.5}
                    />
                    <h3 className="mt-5 text-lg font-semibold tracking-[-0.02em]">
                      {topic.title}
                    </h3>
                    <p className="mt-3 text-sm leading-6 text-zinc-600">
                      {topic.text}
                    </p>
                    <ul className="mt-5 space-y-2 border-t border-zinc-200 pt-5 text-sm leading-6 text-zinc-600">
                      {topic.points.map((point) => (
                        <li className="flex gap-2" key={point}>
                          <span
                            aria-hidden="true"
                            className="mt-2 size-1.5 shrink-0 rounded-full bg-zinc-950"
                          />
                          {point}
                        </li>
                      ))}
                    </ul>
                  </article>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}
