import { ChevronDown } from "lucide-react";

export type FaqItem = {
  readonly question: string;
  readonly answer: string;
};

export function FaqAccordion({ items }: { items: readonly FaqItem[] }) {
  return (
    <div className="border-t border-zinc-200">
      {items.map((item) => (
        <details className="group border-b border-zinc-200" key={item.question}>
          <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-6 py-5 text-left text-base font-semibold text-zinc-950 marker:content-none focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-zinc-950 sm:text-lg">
            {item.question}
            <ChevronDown
              aria-hidden="true"
              className="size-5 shrink-0 text-zinc-500 transition-transform group-open:rotate-180"
              strokeWidth={1.5}
            />
          </summary>
          <p className="max-w-2xl pb-6 text-sm leading-7 text-zinc-600 sm:text-base">
            {item.answer}
          </p>
        </details>
      ))}
    </div>
  );
}
