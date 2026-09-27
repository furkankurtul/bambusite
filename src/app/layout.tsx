import type { Metadata } from "next";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { deploymentConfig } from "@/config/deployment";
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
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full font-sans">
        <div className="flex min-h-svh flex-col">
          <SiteHeader />
          <div className="flex-1">{children}</div>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
