"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { siteConfig } from "@/config/site";

export function SiteHeader() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-200 bg-[#f7f7f5]">
      <div className="mx-auto flex h-16 max-w-[90rem] items-center justify-between gap-6 px-5 sm:px-8 lg:px-10">
        <Link
          className="rounded-sm text-sm font-semibold tracking-[-0.02em] text-zinc-950 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-zinc-950"
          href="/"
          onClick={() => setMenuOpen(false)}
        >
          {siteConfig.name}
        </Link>

        <nav
          aria-label="Primary navigation"
          className="hidden items-center gap-1 lg:flex"
        >
          {siteConfig.primaryNavigation.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                aria-current={active ? "page" : undefined}
                className={`rounded-md px-3 py-2 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-950 ${
                  active
                    ? "bg-zinc-950 text-white"
                    : "text-zinc-600 hover:bg-zinc-200 hover:text-zinc-950"
                }`}
                href={item.href}
                key={item.href}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <Link
          className="hidden min-h-10 items-center justify-center rounded-md bg-zinc-950 px-4 text-sm font-semibold text-white transition-colors hover:bg-zinc-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-950 lg:inline-flex"
          href="/custom-print"
        >
          Start a request
        </Link>

        <button
          aria-controls="mobile-navigation"
          aria-expanded={menuOpen}
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          className="inline-flex size-10 items-center justify-center rounded-md text-zinc-950 transition-colors hover:bg-zinc-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-950 lg:hidden"
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

      {menuOpen ? (
        <nav
          aria-label="Mobile navigation"
          className="border-t border-zinc-200 bg-[#f7f7f5] px-5 py-4 sm:px-8 lg:hidden"
          id="mobile-navigation"
        >
          <div className="mx-auto grid max-w-[90rem] gap-1">
            {siteConfig.primaryNavigation.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  aria-current={active ? "page" : undefined}
                  className={`rounded-md px-3 py-3 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-950 ${
                    active
                      ? "bg-zinc-950 text-white"
                      : "text-zinc-700 hover:bg-zinc-200 hover:text-zinc-950"
                  }`}
                  href={item.href}
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
