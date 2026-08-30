"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { nav, studio } from "@/content/studio";
import { cx } from "@/lib/cx";
import { ArrowNE, Container } from "@/components/ui/primitives";
import { LogoMark } from "@/components/ui/LogoMark";
import { ThemeToggle } from "@/components/chrome/ThemeToggle";

function isActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

/**
 * Site header.
 *
 * The mobile menu is a native <details>, not React state, and that is the
 * whole point: a <summary> toggles the instant the HTML parses. Wiring it to
 * `useState` meant nothing happened until ~210KB of JavaScript had downloaded
 * and hydrated — on a phone on a slow connection that is seconds of tapping a
 * button that does nothing, which is indistinguishable from a broken menu.
 *
 * JavaScript still runs, but only to *improve* it: lock the page behind the
 * overlay, close on Escape, close after a client-side navigation. If none of
 * that arrives, the menu still opens, closes and navigates.
 *
 * There is deliberately no hide-on-scroll here. It used to retreat off-screen
 * on the way down, which took the menu button with it — and it required a
 * transform on the header, which made it a containing block and collapsed the
 * fixed panel to a 1px strip.
 */
export function Header() {
  const pathname = usePathname();
  const detailsRef = useRef<HTMLDetailsElement>(null);
  const [open, setOpen] = useState(false);
  /**
   * Bumped on every open, and used as a `key` on the panel's contents so React
   * builds the list from scratch each time.
   *
   * The staggered entrance is a CSS animation keyed off `[open]`, and it stops
   * replaying once the menu has been closed by *navigating* from it — tapping
   * a link rather than the close button, which is what visitors actually do.
   * After that, reopening creates the animations already in a `finished`
   * state: no `animationstart` fires, and the items simply appear. The closed
   * state is correct (`display: none`, animations cancelled), so this is
   * Chrome holding stale animation state on the reused <li> nodes rather than
   * anything the markup can express.
   *
   * New nodes cannot carry stale state, so this sidesteps it outright. It
   * costs four list items and two links per open, and it leaves the no-script
   * path exactly as it was: the animation is still pure CSS, still keyed off
   * `[open]`, and this only ever improves it.
   */
  const [session, setSession] = useState(0);

  const close = useCallback(() => {
    if (detailsRef.current) detailsRef.current.open = false;
    setOpen(false);
  }, []);

  // Close after navigating, since a client-side route change leaves the
  // element open.
  useEffect(() => {
    close();
  }, [pathname, close]);

  // Hold the page still behind the overlay, and let Escape close it.
  useEffect(() => {
    if (!open) return;

    // The scrolling element is <html>, not <body> — locking only the body
    // leaves the page free to scroll away underneath the open menu.
    const root = document.documentElement;
    const prevRoot = root.style.overflow;
    const prevBody = document.body.style.overflow;
    root.style.overflow = "hidden";
    document.body.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);

    return () => {
      root.style.overflow = prevRoot;
      document.body.style.overflow = prevBody;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, close]);

  return (
    <header className="sticky top-0 z-50 bg-paper" data-intro-header>
      <Container>
        <div className="flex h-16 items-center justify-between sm:h-22 md:h-20">
          {/*
            The opening reveal animates this exact element from the middle of
            the screen into place — see components/motion/Intro.tsx. It is
            measured where it already sits, so the landing needs no numbers
            of its own and nothing here has to be kept in sync with it.
          */}
          <Link
            href="/"
            className="flex items-center gap-3 sm:gap-4"
            aria-label={`${studio.name} — home`}
            data-intro-lockup
          >
            <LogoMark className="h-7 w-auto sm:h-8" data-intro-mark />
            <span className="flex flex-col" data-intro-word>
              <span className="text-[0.9375rem] leading-none font-medium tracking-[0.18em] uppercase sm:text-[1.0625rem]">
                {studio.name}
              </span>
              <span className="text-eyebrow mt-1.5 hidden text-graphite uppercase sm:block">
                {studio.tagline}
              </span>
            </span>
          </Link>

          <div className="flex items-center gap-2 sm:gap-4">
            <nav aria-label="Primary" className="hidden md:block" data-intro-chrome>
              <ul className="flex items-center gap-10">
                {nav.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={
                        isActive(pathname, item.href) ? "page" : undefined
                      }
                      className={cx(
                        "text-nav uppercase transition-colors duration-300",
                        isActive(pathname, item.href)
                          ? "text-ink"
                          : "text-graphite hover:text-ink",
                      )}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <ThemeToggle data-intro-chrome />

            <details
              ref={detailsRef}
              className="site-menu md:hidden"
              data-intro-chrome
              onToggle={(e) => {
                const isOpen = (e.currentTarget as HTMLDetailsElement).open;
                setOpen(isOpen);
                if (isOpen) setSession((n) => n + 1);
              }}
            >
              {/*
                A 44px target, held off the right edge — flush against it on iOS
                the hit area overlaps the system back-swipe zone and taps get
                eaten. `touch-action: manipulation` drops the double-tap delay.
              */}
              <summary
                aria-label="Menu"
                className="flex size-11 cursor-pointer touch-manipulation items-center justify-center select-none"
              >
                {/*
                  Three bars rather than two icons swapped over, so the control
                  folds into the cross instead of cutting to it. Drawn here in
                  spans because it has to animate: lucide gives back finished
                  SVG paths, and a Menu glyph cannot become an X glyph.
                */}
                <span className="menu-icon" aria-hidden>
                  <span />
                  <span />
                  <span />
                </span>
              </summary>

              <div
                id="site-menu"
                className="fixed inset-x-0 top-16 bottom-0 z-40 overflow-y-auto overscroll-contain bg-paper sm:top-22"
              >
                <Container
                  key={session}
                  className="flex min-h-full flex-col justify-between gap-(--spacing-block) py-(--spacing-block)"
                >
                  <nav aria-label="Primary">
                    <ul>
                      {nav.map((item) => (
                        <li
                          key={item.href}
                          className="site-menu-item border-b border-hairline"
                        >
                          <Link
                            href={item.href}
                            onClick={close}
                            aria-current={
                              isActive(pathname, item.href) ? "page" : undefined
                            }
                            className={cx(
                              "text-project flex items-center justify-between gap-4 py-5",
                              isActive(pathname, item.href)
                                ? "text-ink"
                                : "text-graphite",
                            )}
                          >
                            {item.label}
                            <ArrowNE className="size-[0.55em]" />
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </nav>

                  <div className="site-menu-foot text-body text-graphite">
                    <a href={`mailto:${studio.contact.email}`} className="block">
                      {studio.contact.email}
                    </a>
                    <a
                      href={`tel:${studio.contact.phoneHref}`}
                      className="mt-1 block"
                    >
                      {studio.contact.phone}
                    </a>
                  </div>
                </Container>
              </div>
            </details>
          </div>
        </div>
      </Container>

      <div className="h-px w-full bg-hairline" data-intro-chrome />
    </header>
  );
}
