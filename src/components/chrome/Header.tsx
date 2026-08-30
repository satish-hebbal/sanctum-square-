"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

import { nav, studio } from "@/content/studio";
import { cx } from "@/lib/cx";
import { Container } from "@/components/ui/primitives";

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
    <header className="sticky top-0 z-50 bg-paper">
      <Container>
        <div className="flex h-16 items-center justify-between sm:h-22">
          <Link
            href="/"
            className="flex items-center gap-3 sm:gap-4"
            aria-label={`${studio.name} — home`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo-mark.svg"
              alt=""
              width={34}
              height={33}
              className="h-7 w-auto sm:h-8"
            />
            <span className="flex flex-col">
              <span className="text-[0.9375rem] leading-none font-medium tracking-[0.18em] uppercase sm:text-[1.0625rem]">
                {studio.name}
              </span>
              <span className="text-eyebrow mt-1.5 hidden text-graphite uppercase sm:block">
                {studio.tagline}
              </span>
            </span>
          </Link>

          <nav aria-label="Primary" className="hidden md:block">
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

          <details
            ref={detailsRef}
            className="site-menu md:hidden"
            onToggle={(e) => setOpen((e.currentTarget as HTMLDetailsElement).open)}
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
              <Menu
                size={22}
                strokeWidth={1.25}
                aria-hidden
                className="site-menu-closed"
              />
              <X
                size={22}
                strokeWidth={1.25}
                aria-hidden
                className="site-menu-open"
              />
            </summary>

            <div
              id="site-menu"
              className="fixed inset-x-0 top-16 bottom-0 z-40 overflow-y-auto overscroll-contain bg-paper sm:top-22"
            >
              <Container className="flex min-h-full flex-col justify-between gap-(--spacing-block) py-(--spacing-block)">
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
                            "text-project block py-5",
                            isActive(pathname, item.href)
                              ? "text-ink"
                              : "text-graphite",
                          )}
                        >
                          {item.label}
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
      </Container>

      <div className="h-px w-full bg-hairline" />
    </header>
  );
}
