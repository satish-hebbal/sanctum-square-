import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";

import { Footer } from "@/components/chrome/Footer";
import { Header } from "@/components/chrome/Header";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { studio } from "@/content/studio";

import "./globals.css";

/**
 * One family, three weights. The design system leans on size, tracking and
 * whitespace rather than typographic variety, so a second face would only
 * dilute it. Swapping the studio onto a different grotesque later is a change
 * to this import and the `--font-sans` token — nothing else.
 */
const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  display: "swap",
  variable: "--font-inter",
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.sanctumsquare.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${studio.name} — Architecture, Interiors, Design`,
    template: `%s — ${studio.name}`,
  },
  description: studio.description,
  openGraph: {
    type: "website",
    siteName: studio.legalName,
    title: `${studio.name} — Architecture, Interiors, Design`,
    description: studio.description,
    locale: "en_IN",
  },
  twitter: { card: "summary_large_image" },
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#fffdf7",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        {/*
          With scripting off, the reveal animations are never going to run, so
          there is no reason to make a reader wait out the CSS fallback delay —
          drop it to zero and the page is simply finished on arrival.

          This is a stylesheet rather than a script on purpose: anything that
          mutates <html> before React hydrates puts the server and client
          markup out of step, which is a hydration error on every page.
        */}
        <noscript>
          <style>{`:root{--reveal-fallback-delay:0s}`}</style>
        </noscript>
      </head>
      <body>
        <a
          href="#main"
          className="text-nav sr-only uppercase focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-100 focus:bg-ink focus:px-4 focus:py-3 focus:text-paper"
        >
          Skip to content
        </a>

        <SmoothScroll />
        <ScrollReveal />

        <Header />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
