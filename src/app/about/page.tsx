import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Boxes, Lightbulb, Wrench } from "lucide-react";

export const metadata: Metadata = {
  title: "About 3D Printing",
  description:
    "Learn about the catalog's focus on 3D printed products, custom production, prototypes, and functional parts.",
};

export default function AboutPage() {
  return (
    <main className="min-h-svh bg-[#f7f7f5] text-zinc-950">
      <section className="border-b border-zinc-200">
        <div className="mx-auto max-w-[90rem] px-5 py-12 sm:px-8 sm:py-16 lg:px-10 lg:py-20">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
              About 3D printing
            </p>
            <h1 className="mt-4 text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">
              Digital ideas, made physical.
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-zinc-600 sm:text-lg sm:leading-8">
              This catalog is a place to explore 3D printed products and begin a
              custom production request. It brings together hobby pieces,
              practical objects, prototypes, and parts designed for a specific
              use.
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
              What it is for
            </p>
            <h2
              id="what-we-make"
              className="mt-3 text-3xl font-semibold tracking-[-0.04em] sm:text-4xl"
            >
              A flexible way to make specific things.
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
              title="Products for everyday use"
            >
              Browse objects for play, display, organization, and other
              practical needs.
            </FocusCard>
            <FocusCard
              icon={
                <Lightbulb
                  aria-hidden="true"
                  className="size-5"
                  strokeWidth={1.5}
                />
              }
              title="Custom production and prototyping"
            >
              Start from an existing model or an early idea when a standard
              product is not the right fit.
            </FocusCard>
            <FocusCard
              icon={
                <Wrench
                  aria-hidden="true"
                  className="size-5"
                  strokeWidth={1.5}
                />
              }
              title="Functional parts"
            >
              Explore parts, accessories, and small objects made for a
              particular space, task, or project.
            </FocusCard>
          </div>
        </div>
      </section>

      <section aria-labelledby="start-here" className="bg-zinc-950 text-white">
        <div className="mx-auto flex max-w-[90rem] flex-col items-start justify-between gap-8 px-5 py-12 sm:px-8 sm:py-16 lg:flex-row lg:items-end lg:px-10 lg:py-20">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-400">
              Start here
            </p>
            <h2
              id="start-here"
              className="mt-4 text-3xl font-semibold tracking-[-0.04em] sm:text-4xl"
            >
              Find a product or make something of your own.
            </h2>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-white px-5 text-sm font-semibold text-zinc-950 transition-colors hover:bg-zinc-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              href="/products"
            >
              Explore products{" "}
              <ArrowRight aria-hidden="true" className="size-4" />
            </Link>
            <Link
              className="inline-flex min-h-11 items-center justify-center rounded-md border border-zinc-700 px-5 text-sm font-semibold text-white transition-colors hover:border-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              href="/custom-print"
            >
              Request a custom print
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
