import type { Metadata } from "next";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { deploymentConfig } from "@/config/deployment";
import { LocaleDocument } from "@/components/layout/LocaleDocument";
import { siteConfig } from "@/config/site";
import { getConfiguredExternalUrl } from "@/lib/site-links";
import "./globals.css";

const metadataBase = getConfiguredExternalUrl(
  deploymentConfig.siteUrl || siteConfig.siteUrl,
);

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  ...(metadataBase ? { metadataBase: new URL(metadataBase) } : {}),
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="tr" className="h-full antialiased" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html:
              'document.documentElement.lang = window.location.pathname === "/en" || window.location.pathname.startsWith("/en/") ? "en" : "tr";',
          }}
        />
      </head>
      <body className="min-h-full font-sans">
        <div className="flex min-h-svh flex-col">
          <SiteHeader />
          <LocaleDocument />
          <div className="flex-1">{children}</div>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
