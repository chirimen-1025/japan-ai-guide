import type { Metadata } from "next";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { SITE_URL } from "@/lib/site-config";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Japan AI Guide — Free tools for planning your Japan trip",
    template: "%s | Japan AI Guide",
  },
  description:
    "Free tools and guides for traveling Japan: a trip planner, budget calculator, Japanese phrase generator, culture guide, and travel articles — built for first-time visitors.",
  openGraph: {
    type: "website",
    siteName: "Japan AI Guide",
    title: "Japan AI Guide — Free tools for planning your Japan trip",
    description:
      "Free tools and guides for traveling Japan: a trip planner, budget calculator, Japanese phrase generator, and more.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Japan AI Guide" }],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og-image.png"],
  },
  alternates: { canonical: "/" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // Sitewide structured data: helps Google understand this is a single
  // organization/website (not a random page) and can surface a sitelinks
  // search box. Kept minimal and honest — no claims this project can't back.
  const organizationLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Japan AI Guide",
    url: SITE_URL,
    logo: `${SITE_URL}/icon.svg`,
  };
  // No SearchAction here: the site doesn't have a working search endpoint
  // yet, and a potentialAction that doesn't actually work would be a false
  // claim in the structured data rather than a genuine feature.
  const websiteLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Japan AI Guide",
    url: SITE_URL,
  };

  return (
    <html lang="en" className="h-full antialiased" suppressHydrationWarning>
      <head>
        {/* Google Fonts: the one external host the deploy CSP allows.
            Requires network access at page-load time (fine on a real
            deploy); falls back to system serif/sans/mono if blocked.
            This is the root layout (wraps every route), so the
            no-page-custom-font rule — written for Pages Router's
            per-page _document.js — doesn't apply here; it loads
            site-wide, not per-page. */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600&family=Figtree:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500;600&family=Zen+Kaku+Gothic+New:wght@500;700&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-paper text-ink">
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
        {/* Cloudflare Web Analytics: privacy-friendly, cookieless page-view counter.
            Cloudflare states it does not track individual visitors; see /privacy. */}
        <script
          type="module"
          src="https://static.cloudflareinsights.com/beacon.min.js"
          data-cf-beacon='{"token": "31c64bb3fbcd424b850e5ed954859d30"}'
        />
      </body>
    </html>
  );
}
