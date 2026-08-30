"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { whenIntroClears } from "@/components/motion/intro-signal";

/**
 * One reveal system for the whole site.
 *
 * Markup opts in with `data-reveal` and gets the same entrance everywhere —
 * which is the point. Pages carry no animation code, so a section added later
 * behaves like every section already there.
 *
 *   data-reveal="up"      text and small blocks rise into place
 *   data-reveal="mask"    an image settles out of a slow scale
 *   data-reveal-group     staggers the direct `data-reveal` children within
 *
 * Content that appears without a route change — the filtered project grid —
 * calls `refreshReveal()`.
 *
 * The one rule this file exists to keep: **no reader ever loses content to an
 * animation.** Three things enforce it, because an invisible paragraph is a
 * far worse failure than a missing fade:
 *
 *  1. The hidden state is a CSS animation that expires on its own (see
 *     globals.css), so if this bundle is slow or never arrives the page still
 *     reveals itself.
 *  2. Once GSAP claims an element it owns it, so a sweep watches anything on
 *     screen that is still invisible and forces it back.
 *  3. Images landing late move every trigger beneath them, so ScrollTrigger is
 *     refreshed as they arrive rather than once at startup.
 *
 * On a first load the scan waits for the opening reveal to start clearing its
 * curtain (`whenIntroClears`), so the first screen arrives as the curtain
 * lifts instead of having finished behind it. That wait cannot strand
 * anything: the signal expires on its own, and the CSS fallback below is
 * still running underneath regardless.
 *
 * Nothing here runs under prefers-reduced-motion: the CSS resting state is
 * already the finished state.
 */

const REFRESH_EVENT = "sanctum:reveal-refresh";

/** Re-scans the document for markup that entered without a route change. */
export function refreshReveal() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event(REFRESH_EVENT));
  }
}

export function ScrollReveal() {
  const pathname = usePathname();
  const [revision, setRevision] = useState(0);

  useEffect(() => {
    const bump = () => setRevision((r) => r + 1);
    window.addEventListener(REFRESH_EVENT, bump);
    return () => window.removeEventListener(REFRESH_EVENT, bump);
  }, []);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let cleanup = () => {};
    let cancelled = false;

    const start = () => {
      if (cancelled) return;

      try {
        gsap.registerPlugin(ScrollTrigger);

        const triggers: ScrollTrigger[] = [];
        const done = new WeakSet<Element>();
        /** Claimed but not yet revealed. The sweep below watches these. */
        const pending = new Set<HTMLElement>();

        const innerOf = (el: HTMLElement) =>
          el.dataset.reveal === "mask"
            ? (el.firstElementChild as HTMLElement | null)
            : null;

        const show = (el: HTMLElement) => {
          gsap.set(el, { opacity: 1, y: 0 });
          const inner = innerOf(el);
          if (inner) gsap.set(inner, { scale: 1 });
          el.setAttribute("data-reveal-claimed", "");
          pending.delete(el);
        };

        /**
         * Takes an element over from the CSS fallback. Returns false if the
         * fallback already revealed it — in that case it stays visible rather
         * than being snapped back to hidden for an entrance the reader has
         * already missed.
         */
        const claim = (el: HTMLElement) => {
          done.add(el);
          if (parseFloat(getComputedStyle(el).opacity) > 0.05) {
            show(el);
            return false;
          }
          gsap.set(el, {
            opacity: 0,
            y: el.dataset.reveal === "up" ? 20 : 0,
          });
          const inner = innerOf(el);
          if (inner) gsap.set(inner, { scale: 1.06 });
          el.setAttribute("data-reveal-claimed", "");
          pending.add(el);
          return true;
        };

        const track = (t: ScrollTrigger | undefined) => {
          if (t) triggers.push(t);
        };

        const settle = (els: HTMLElement[]) => () => els.forEach((el) => pending.delete(el));

        const scan = () => {
          gsap.utils.toArray<HTMLElement>("[data-reveal-group]").forEach((group) => {
            const items = gsap.utils
              .toArray<HTMLElement>("[data-reveal]", group)
              .filter((el) => !done.has(el));
            if (!items.length) return;

            const animate = items.filter((el) => claim(el));
            if (!animate.length) return;

            track(
              gsap.to(animate, {
                opacity: 1,
                y: 0,
                duration: 0.9,
                ease: "power3.out",
                stagger: 0.08,
                onComplete: settle(animate),
                scrollTrigger: { trigger: group, start: "top 90%", once: true },
              }).scrollTrigger,
            );
          });

          gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
            if (done.has(el)) return;
            if (!claim(el)) return;

            const trigger = { trigger: el, start: "top 92%", once: true };

            if (el.dataset.reveal === "mask") {
              // The frame fades; the picture inside relaxes out of its scale, so
              // the crop holds still and only the image moves.
              track(
                gsap.to(el, {
                  opacity: 1,
                  duration: 1,
                  ease: "power2.out",
                  onComplete: settle([el]),
                  scrollTrigger: trigger,
                }).scrollTrigger,
              );

              const inner = innerOf(el);
              if (inner) {
                track(
                  gsap.to(inner, {
                    scale: 1,
                    duration: 1.6,
                    ease: "power3.out",
                    scrollTrigger: { ...trigger },
                  }).scrollTrigger,
                );
              }
              return;
            }

            track(
              gsap.to(el, {
                opacity: 1,
                y: 0,
                duration: 0.9,
                ease: "power3.out",
                onComplete: settle([el]),
                scrollTrigger: trigger,
              }).scrollTrigger,
            );
          });
        };

        scan();

        /**
         * Anything the reader can actually see must be visible, whatever the
         * trigger thinks. This catches a trigger positioned against a layout
         * that has since moved underneath it.
         */
        const sweep = () => {
          if (!pending.size) return;
          const limit = window.innerHeight + 200;
          for (const el of [...pending]) {
            if (!el.isConnected) {
              pending.delete(el);
              continue;
            }
            if (el.getBoundingClientRect().top < limit) show(el);
          }
        };

        let raf = 0;
        const onScroll = () => {
          if (raf) return;
          raf = window.requestAnimationFrame(() => {
            raf = 0;
            sweep();
          });
        };
        window.addEventListener("scroll", onScroll, { passive: true });
        window.addEventListener("resize", onScroll, { passive: true });

        // Images land late and move every trigger beneath them. Refresh as they
        // arrive, coalesced so a gallery does not refresh once per file.
        let refreshTimer = 0;
        const scheduleRefresh = () => {
          window.clearTimeout(refreshTimer);
          refreshTimer = window.setTimeout(() => {
            ScrollTrigger.refresh();
            sweep();
          }, 200);
        };
        document.addEventListener("load", scheduleRefresh, true);
        window.addEventListener("load", scheduleRefresh);

        const guards = [
          window.setTimeout(sweep, 1500),
          window.setTimeout(sweep, 4000),
        ];

        cleanup = () => {
          window.removeEventListener("scroll", onScroll);
          window.removeEventListener("resize", onScroll);
          window.removeEventListener("load", scheduleRefresh);
          document.removeEventListener("load", scheduleRefresh, true);
          window.clearTimeout(refreshTimer);
          guards.forEach((t) => window.clearTimeout(t));
          if (raf) window.cancelAnimationFrame(raf);
          triggers.forEach((t) => t.kill());
          gsap.killTweensOf("[data-reveal]");
        };
      } catch (error) {
        // If the motion layer cannot start, the page must not stay blank.
        console.error("Reveal animations unavailable", error);
        document.querySelectorAll<HTMLElement>("[data-reveal]").forEach((el) => {
          el.style.opacity = "1";
          el.style.transform = "none";
          const inner = el.firstElementChild as HTMLElement | null;
          if (inner) inner.style.transform = "none";
          el.setAttribute("data-reveal-claimed", "");
        });
      }
    };

    // Immediate on every navigation after the first; on a first load it holds
    // until the opening curtain is on its way out.
    //
    // Deferred: when no intro plays, `whenIntroClears` fires `start`
    // synchronously inside this effect, which can run before React finishes
    // hydrating subtrees streamed in behind this one — GSAP would then set
    // style/attributes on nodes mid-hydration and React logs a mismatch for
    // an entrance that hasn't actually gone wrong. Neither a single
    // `requestAnimationFrame` nor a bare `setTimeout(fn, 0)` was reliably
    // enough slack on this page — React's own scheduler can still have
    // hydration work queued behind either. A short real delay gives it
    // running room; it's still well under what a reader would notice as a
    // late entrance.
    let timer = 0;
    const unwait = whenIntroClears(() => {
      timer = window.setTimeout(start, 100);
    });

    return () => {
      cancelled = true;
      window.clearTimeout(timer);
      unwait();
      cleanup();
    };
  }, [pathname, revision]);

  return null;
}
