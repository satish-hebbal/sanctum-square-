import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";

import { Footer } from "@/components/chrome/Footer";
import { Header } from "@/components/chrome/Header";
import { Intro } from "@/components/motion/Intro";
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

// `||`, not `??`: Vercel's import UI sets an env var it collected an empty
// value for to `""` rather than leaving it unset, and `"" ?? fallback` is
// still `""` — which crashes `new URL()` below.
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.sanctumsquare.com";

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
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fffdf7" },
    { media: "(prefers-color-scheme: dark)", color: "#171512" },
  ],
  colorScheme: "light dark",
};

/**
 * Applies a saved manual theme choice before first paint, so a reader who
 * has overridden their OS preference does not see a flash of the wrong
 * theme while React hydrates. The CSS in globals.css handles every other
 * case (no override at all) on its own via `prefers-color-scheme` — this
 * script exists only for the override, and only ever sets one attribute.
 */
const THEME_INIT_SCRIPT =
  `(function(){try{var t=localStorage.getItem('theme');if(t==='light'||t==='dark'){document.documentElement.setAttribute('data-theme',t);}}catch(e){}})();`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <head>
        {/*
          Sets `data-theme` before hydration when a reader has manually
          overridden their OS preference — see THEME_INIT_SCRIPT above.
          `suppressHydrationWarning` on <html> is the one exception to the
          "no script mutates <html> before hydration" rule below: a manual
          theme choice is *expected* to differ between the server markup and
          the client on first paint, so this tells React not to treat that
          one attribute as a mismatch rather than working around a problem
          that does not apply here.
        */}
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />

        {/*
          With scripting off, the reveal animations are never going to run, so
          there is no reason to make a reader wait out the CSS fallback delay —
          drop it to zero and the page is simply finished on arrival.

          This is a stylesheet rather than a script on purpose: anything that
          mutates <html> before React hydrates puts the server and client
          markup out of step, which is a hydration error on every page.
        */}
        <noscript>
          <style>{`:root{--reveal-fallback-delay:0s}.intro-curtain{display:none}`}</style>
        </noscript>
      </head>
      <body>
        <a
          href="#main"
          className="text-nav sr-only uppercase focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-100 focus:bg-ink focus:px-4 focus:py-3 focus:text-paper"
        >
          Skip to content
        </a>

        {/*
          Before ScrollReveal: the opening reveal announces itself in a layout
          effect, which React flushes ahead of every passive effect, so the
          reveals know to hold whichever order these sit in. Reading top to
          bottom in the order they play is simply clearer.
        */}
        <Intro />
        <SmoothScroll />
        <ScrollReveal />

        <Header />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
