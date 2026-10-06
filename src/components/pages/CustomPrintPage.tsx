import { FileText, Layers3, MessageSquare } from "lucide-react";
import { CustomPrintRequestForm } from "@/components/custom-print/CustomPrintRequestForm";
import { PRODUCT_MATERIALS } from "@/types/product";
import type { Locale } from "@/i18n";
import { getDictionary } from "@/i18n";

export function renderCustomPrintPage(locale: Locale) {
  const d = getDictionary(locale);
  return (
    <main className="min-h-svh bg-[#f7f7f5] text-zinc-950">
      <div className="mx-auto max-w-[90rem] px-5 py-12 sm:px-8 sm:py-16 lg:px-10 lg:py-20">
        <header className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
            {d.custom.title}
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">
            {d.custom.intro}
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-zinc-600 sm:text-lg sm:leading-8">
            {d.custom.description}
          </p>
        </header>

        <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-start lg:gap-16">
          <CustomPrintRequestForm
            materials={PRODUCT_MATERIALS}
            locale={locale}
          />

          <aside className="space-y-6 lg:sticky lg:top-8">
            <section
              aria-labelledby="request-process"
              className="rounded-xl border border-zinc-200 bg-white p-6 sm:p-7"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
                {d.custom.processEyebrow}
              </p>
              <h2
                id="request-process"
                className="mt-3 text-2xl font-semibold tracking-[-0.03em]"
              >
                {d.custom.title}
              </h2>
              <ol className="mt-7 space-y-6">
                <ProcessItem
                  icon={<FileText aria-hidden="true" className="size-4" />}
                  number="01"
                  title={d.custom.process[0].title}
                >
                  {d.custom.process[0].text}
                </ProcessItem>
                <ProcessItem
                  icon={<MessageSquare aria-hidden="true" className="size-4" />}
                  number="02"
                  title={d.custom.process[1].title}
                >
                  {d.custom.process[1].text}
                </ProcessItem>
                <ProcessItem
                  icon={<Layers3 aria-hidden="true" className="size-4" />}
                  number="03"
                  title={d.custom.process[2].title}
                >
                  {d.custom.process[2].text}
                </ProcessItem>
              </ol>
            </section>

            <div className="border-l-2 border-zinc-950 pl-4 text-sm leading-6 text-zinc-600">
              <p className="font-semibold text-zinc-950">{d.custom.file}</p>
              <p className="mt-1">{d.custom.accepted}</p>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}

function ProcessItem({
  children,
  icon,
  number,
  title,
}: {
  children: React.ReactNode;
  icon: React.ReactNode;
  number: string;
  title: string;
}) {
  return (
    <li className="flex gap-4">
      <div className="flex shrink-0 flex-col items-center gap-2">
        <span className="flex size-9 items-center justify-center rounded-md bg-[#f2f2ef] text-zinc-950">
          {icon}
        </span>
        <span className="text-[10px] font-semibold tracking-[0.16em] text-zinc-400">
          {number}
        </span>
      </div>
      <div className="pt-1">
        <h3 className="font-semibold tracking-[-0.01em]">{title}</h3>
        <p className="mt-1 text-sm leading-6 text-zinc-600">{children}</p>
      </div>
    </li>
  );
}
