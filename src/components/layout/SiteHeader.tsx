"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { siteConfig } from "@/config/site";
import { getDictionary, type Locale } from "@/i18n";
import { localizedPath, switchLocalePath } from "@/i18n/routes";

export function SiteHeader() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const locale: Locale =
    pathname === "/en" || pathname.startsWith("/en/") ? "en" : "tr";
  const d = getDictionary(locale);
  const navigation = [
    { label: d.nav.products, href: "/products" },
    { label: d.nav.customPrint, href: "/custom-print" },
    { label: d.nav.guide, href: "/guide" },
    { label: d.nav.about, href: "/about" },
    { label: d.nav.faq, href: "/faq" },
    { label: d.nav.contact, href: "/contact" },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-200 bg-[#f7f7f5]">
      <div className="mx-auto flex min-h-16 max-w-[90rem] items-center gap-3 px-5 py-2 sm:gap-5 sm:px-8 lg:px-10">
        <Link
          className="shrink-0 rounded-sm text-sm font-semibold tracking-[-0.02em] text-zinc-950 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-zinc-950"
          href={localizedPath(locale)}
          onClick={() => setMenuOpen(false)}
        >
          {siteConfig.name}
        </Link>

        <nav
          aria-label={d.nav.primary}
          className="hidden min-w-0 flex-1 items-center justify-center gap-1 xl:flex"
        >
          {navigation.map((item) => {
            const active = pathname === localizedPath(locale, item.href);
            return (
              <Link
                aria-current={active ? "page" : undefined}
                className={`rounded-md px-3 py-2 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-950 ${
                  active
                    ? "bg-zinc-950 text-white"
                    : "text-zinc-600 hover:bg-zinc-200 hover:text-zinc-950"
                }`}
                href={localizedPath(locale, item.href)}
                key={item.href}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="ml-auto flex shrink-0 items-center gap-2 sm:gap-3">
          <Link
            className="hidden min-h-10 items-center justify-center rounded-md bg-zinc-950 px-4 text-sm font-semibold text-white transition-colors hover:bg-zinc-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-950 xl:inline-flex"
            href={localizedPath(locale, "/custom-print")}
          >
            {d.nav.startRequest}
          </Link>
          <div className="flex items-center gap-1 rounded-md border border-zinc-200 bg-white p-1">
            {(["tr", "en"] as const).map((target) => (
              <Link
                aria-current={locale === target ? "true" : undefined}
                aria-label={`${d.nav.switchTo} ${target === "tr" ? "Türkçe" : "English"}`}
                className={`rounded px-2 py-1 text-xs font-semibold ${locale === target ? "bg-zinc-950 text-white" : "text-zinc-600 hover:text-zinc-950"}`}
                href={switchLocalePath(pathname, "", target)}
                key={target}
                onClick={(event) => {
                  const query = window.location.search;
                  if (query) {
                    event.preventDefault();
                    window.location.assign(
                      switchLocalePath(pathname, query, target),
                    );
                  }
                }}
              >
                {target.toUpperCase()}
              </Link>
            ))}
          </div>
          <button
            aria-controls="mobile-navigation"
            aria-expanded={menuOpen}
            aria-label={menuOpen ? d.nav.close : d.nav.mobile}
            className="inline-flex size-10 items-center justify-center rounded-md text-zinc-950 transition-colors hover:bg-zinc-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-950 xl:hidden"
            onClick={() => setMenuOpen((open) => !open)}
            type="button"
          >
            {menuOpen ? (
              <X aria-hidden="true" className="size-5" />
            ) : (
              <Menu aria-hidden="true" className="size-5" />
            )}
          </button>
        </div>
      </div>

      {menuOpen ? (
        <nav
          aria-label={d.nav.mobile}
          className="border-t border-zinc-200 bg-[#f7f7f5] px-5 py-4 sm:px-8 xl:hidden"
          id="mobile-navigation"
        >
          <div className="mx-auto grid max-w-[90rem] gap-1">
            {navigation.map((item) => {
              const active = pathname === localizedPath(locale, item.href);
              return (
                <Link
                  aria-current={active ? "page" : undefined}
                  className={`rounded-md px-3 py-3 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-950 ${
                    active
                      ? "bg-zinc-950 text-white"
                      : "text-zinc-700 hover:bg-zinc-200 hover:text-zinc-950"
                  }`}
                  href={localizedPath(locale, item.href)}
                  key={item.href}
                  onClick={() => setMenuOpen(false)}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
        </nav>
      ) : null}
    </header>
  );
}
