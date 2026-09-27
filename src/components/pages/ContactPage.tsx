import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, AtSign, Camera, MessageCircle, Send } from "lucide-react";
import { siteConfig } from "@/config/site";
import {
  getConfiguredEmailHref,
  getConfiguredExternalUrl,
} from "@/lib/site-links";
import { createWhatsAppUrl } from "@/lib/whatsapp";
import type { Locale } from "@/i18n";
import { getDictionary } from "@/i18n";
import { localizedPath } from "@/i18n/routes";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch through the configured email, Instagram, WhatsApp, or a custom print request.",
};

export function renderContactPage(locale: Locale) {
  const d = getDictionary(locale);
  const contactMethods = [
    {
      label: "Instagram",
      href: getConfiguredExternalUrl(siteConfig.instagramUrl) ?? "",
      description:
        locale === "tr"
          ? "Instagram üzerinden takip edin veya mesaj gönderin."
          : "Follow along or send a message through Instagram.",
      icon: Camera,
      external: true,
    },
    {
      label: "WhatsApp",
      href: createWhatsAppUrl({ phoneNumber: siteConfig.whatsappNumber }) ?? "",
      description:
        locale === "tr"
          ? "WhatsApp üzerinden görüşme başlatın."
          : "Start a conversation through WhatsApp.",
      icon: MessageCircle,
      external: true,
    },
    {
      label: "Email",
      href: getConfiguredEmailHref(siteConfig.email) ?? "",
      description: siteConfig.email,
      icon: AtSign,
      external: false,
    },
  ] as const;
  const availableMethods = contactMethods.filter(
    (method) => method.href.trim().length > 0,
  );

  return (
    <main className="min-h-svh bg-[#f7f7f5] text-zinc-950">
      <div className="mx-auto max-w-[90rem] px-5 py-12 sm:px-8 sm:py-16 lg:px-10 lg:py-20">
        <header className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
            {d.contact.title}
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">
            {d.contact.intro}
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-zinc-600 sm:text-lg sm:leading-8">
            {d.contact.intro}
          </p>
        </header>

        <section aria-labelledby="contact-methods" className="mt-12 sm:mt-16">
          <h2
            id="contact-methods"
            className="text-2xl font-semibold tracking-[-0.03em]"
          >
            {d.contact.available}
          </h2>
          {availableMethods.length > 0 ? (
            <ul className="mt-6 grid gap-3 md:grid-cols-3">
              {availableMethods.map((method) => {
                const Icon = method.icon;
                return (
                  <li key={method.label}>
                    <a
                      className="group flex min-h-40 flex-col justify-between rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm transition hover:border-zinc-950 hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-950"
                      href={method.href}
                      rel={method.external ? "noreferrer" : undefined}
                      target={method.external ? "_blank" : undefined}
                    >
                      <span className="flex size-10 items-center justify-center rounded-md bg-[#f2f2ef] text-zinc-950">
                        <Icon
                          aria-hidden="true"
                          className="size-5"
                          strokeWidth={1.5}
                        />
                      </span>
                      <span className="mt-6">
                        <span className="flex items-center gap-2 font-semibold">
                          <span>{method.label}</span>
                          <ArrowRight
                            aria-hidden="true"
                            className="size-4 text-zinc-400 transition-transform group-hover:translate-x-1 group-hover:text-zinc-950"
                          />
                        </span>
                        <span className="mt-2 block text-sm leading-6 text-zinc-600">
                          {method.description}
                        </span>
                      </span>
                    </a>
                  </li>
                );
              })}
            </ul>
          ) : (
            <p className="mt-6 rounded-lg border border-zinc-200 bg-white p-6 text-sm leading-6 text-zinc-600">
              {d.contact.noConfig}
            </p>
          )}
        </section>

        <section
          aria-labelledby="contact-custom-print"
          className="mt-12 rounded-xl bg-zinc-950 p-6 text-white sm:mt-16 sm:p-10"
        >
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-xl">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-400">
                {d.contact.customRequest}
              </p>
              <h2
                id="contact-custom-print"
                className="mt-3 text-2xl font-semibold tracking-[-0.03em] sm:text-3xl"
              >
                {d.contact.customText}
              </h2>
              <p className="mt-3 text-sm leading-6 text-zinc-400">
                {d.custom.accepted}
              </p>
            </div>
            <Link
              className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-md bg-white px-5 text-sm font-semibold text-zinc-950 transition-colors hover:bg-zinc-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              href={localizedPath(locale, "/custom-print")}
            >
              {d.contact.request} <Send aria-hidden="true" className="size-4" />
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
