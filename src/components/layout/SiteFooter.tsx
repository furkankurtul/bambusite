import Link from "next/link";
import { ArrowUpRight, AtSign, Camera, MessageCircle } from "lucide-react";
import { siteConfig } from "@/config/site";
import {
  getConfiguredEmailHref,
  getConfiguredExternalUrl,
} from "@/lib/site-links";
import { createWhatsAppUrl } from "@/lib/whatsapp";

export function SiteFooter() {
  const instagramUrl = getConfiguredExternalUrl(siteConfig.instagramUrl);
  const emailHref = getConfiguredEmailHref(siteConfig.email);
  const whatsAppUrl = createWhatsAppUrl({
    phoneNumber: siteConfig.whatsappNumber,
  });

  const contactLinks = [
    instagramUrl
      ? { label: "Instagram", href: instagramUrl, icon: Camera, external: true }
      : undefined,
    whatsAppUrl
      ? {
          label: "WhatsApp",
          href: whatsAppUrl,
          icon: MessageCircle,
          external: true,
        }
      : undefined,
    emailHref
      ? { label: "Email", href: emailHref, icon: AtSign, external: false }
      : undefined,
  ].filter((link): link is NonNullable<typeof link> => Boolean(link));

  return (
    <footer className="border-t border-zinc-800 bg-zinc-950 text-white">
      <div className="mx-auto grid max-w-[90rem] gap-10 px-5 py-10 sm:px-8 sm:py-12 lg:grid-cols-[1.25fr_0.75fr_0.75fr] lg:px-10">
        <div className="max-w-sm">
          <Link
            className="rounded-sm text-base font-semibold tracking-[-0.02em] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            href="/"
          >
            {siteConfig.name}
          </Link>
          <p className="mt-4 text-sm leading-6 text-zinc-400">
            Explore 3D printed products or start a custom print request for a
            model or idea of your own.
          </p>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">
            Explore
          </p>
          <ul className="mt-4 space-y-3">
            {siteConfig.primaryNavigation.map((item) => (
              <li key={item.href}>
                <Link
                  className="rounded-sm text-sm text-zinc-300 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
                  href={item.href}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">
            Contact
          </p>
          {contactLinks.length > 0 ? (
            <ul className="mt-4 space-y-3">
              {contactLinks.map(({ external, href, icon: Icon, label }) => (
                <li key={label}>
                  <a
                    className="inline-flex items-center gap-2 rounded-sm text-sm text-zinc-300 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
                    href={href}
                    rel={external ? "noreferrer" : undefined}
                    target={external ? "_blank" : undefined}
                  >
                    <Icon
                      aria-hidden="true"
                      className="size-4"
                      strokeWidth={1.5}
                    />
                    {label}
                    <ArrowUpRight aria-hidden="true" className="size-3.5" />
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <Link
              className="mt-4 inline-flex rounded-sm text-sm text-zinc-300 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
              href="/contact"
            >
              Contact options
            </Link>
          )}
        </div>
      </div>
      <div className="border-t border-zinc-800">
        <div className="mx-auto flex max-w-[90rem] flex-col gap-2 px-5 py-5 text-xs text-zinc-500 sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-10">
          <p>3D printed products and custom print requests.</p>
          <p>
            © {new Date().getFullYear()} {siteConfig.name}
          </p>
        </div>
      </div>
    </footer>
  );
}
