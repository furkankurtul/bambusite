import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { FaqAccordion } from "@/components/information/FaqAccordion";

export const metadata: Metadata = {
  title: "Frequently Asked Questions",
  description:
    "Answers to common questions about custom 3D printing, materials, models, colors, and production details.",
};

const faqItems = [
  {
    question: "What materials can be printed?",
    answer:
      "Material options depend on the project and its intended use. The custom print request form lists the currently available preferences, and the final choice can be discussed before printing.",
  },
  {
    question: "Can I choose a custom color?",
    answer:
      "You can share a preferred color in your request. Color availability and the best material for the project can be confirmed as part of the print details.",
  },
  {
    question: "Can I send my own STL file?",
    answer:
      "Yes. You can attach an STL file to a custom print request, along with any details that help explain how you want the finished piece to be used.",
  },
  {
    question: "How long does printing take?",
    answer:
      "Print time depends on the model's size, shape, material, quantity, and selected settings. A more specific timeline can be discussed after the project is reviewed.",
  },
  {
    question: "Can you create custom designs?",
    answer:
      "You can describe your idea in a custom print request. The information needed to move from an idea to a printable model depends on the project, so the next steps are considered case by case.",
  },
  {
    question: "What file formats are accepted?",
    answer:
      "The request form accepts STL, 3MF, OBJ, and STEP files. Include any relevant notes about the model, dimensions, or intended use with your request.",
  },
  {
    question: "What sizes can be printed?",
    answer:
      "Suitable print size depends on the model, its geometry, material, and the available printing setup. Share approximate dimensions so the project can be reviewed appropriately.",
  },
  {
    question: "Will the physical color exactly match the screen?",
    answer:
      "Screen settings, lighting, material finish, and the printing process can all affect how color appears. A physical print may differ from the color shown on a display.",
  },
] as const;

export default function FaqPage() {
  return (
    <main className="min-h-svh bg-[#f7f7f5] text-zinc-950">
      <div className="mx-auto max-w-[90rem] px-5 py-12 sm:px-8 sm:py-16 lg:px-10 lg:py-20">
        <header className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
            FAQ
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">
            Common questions about 3D printing.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-zinc-600 sm:text-lg sm:leading-8">
            A few practical answers about models, materials, color, and custom
            print requests.
          </p>
        </header>

        <section
          aria-labelledby="faq-list"
          className="mt-12 max-w-4xl sm:mt-16"
        >
          <h2 id="faq-list" className="sr-only">
            Frequently asked questions
          </h2>
          <FaqAccordion items={faqItems} />
        </section>

        <section
          aria-labelledby="faq-cta"
          className="mt-12 rounded-xl bg-zinc-950 p-6 text-white sm:mt-16 sm:p-10"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-400">
            Still have a project in mind?
          </p>
          <div className="mt-4 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <h2
              id="faq-cta"
              className="max-w-xl text-2xl font-semibold tracking-[-0.03em] sm:text-3xl"
            >
              Share the details of your model or idea to get the conversation
              started.
            </h2>
            <Link
              className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-md bg-white px-5 text-sm font-semibold text-zinc-950 transition-colors hover:bg-zinc-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              href="/custom-print"
            >
              Custom print request{" "}
              <ArrowRight aria-hidden="true" className="size-4" />
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
