"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import gsap from "gsap";

import { beginIntro, endIntro } from "@/components/motion/intro-signal";

/**
 * The opening reveal.
 *
 * A paper curtain covers the page. The studio lock-up assembles in the middle
 * of the screen — mark first, wordmark wiping in behind it — then makes its
 * way into the header in two separate moves: straight up the centre line,
 * shrinking to header size, and then, as a distinct second beat, left into its
 * corner. The menu button and nav ride in on that leftward move.
 *
 * Two moves rather than one diagonal, because the diagonal read as drift. The
 * right angle is deliberate on a site whose whole layout is built from
 * hairlines and margins, and the pause between the two beats is what makes it
 * look decided rather than merely eased.
 *
 * The element that flies is **the real header lock-up**, not a copy of it.
 * It is measured where it already sits, offset to the centre of the screen,
 * and then animated back to a zero transform. So it lands on itself, exactly,
 * at every viewport width and font size — there is no second set of numbers to
 * keep in sync with the header's layout, and nothing to re-tune when the
 * header changes. A cloned lock-up would need both.
 *
 * Same contract as the scroll reveals: **the curtain must never be able to
 * outlive its own removal.** It is a CSS animation that expires on its own
 * (globals.css), so if this bundle is slow or never arrives the page appears
 * anyway. GSAP stamps `data-intro-claimed` to cancel that and take over — and
 * if the fallback already started fading, GSAP stands down rather than
 * slamming the curtain shut again for an entrance the reader has half seen.
 *
 * It plays on a real page load only. A client-side navigation never remounts
 * the layout, so the site is not re-introduced to someone already inside it,
 * and a reload that restores a scroll position skips it too.
 */

/** Off-centre by this much of the viewport: optical centre sits above true centre. */
const OPTICAL_RISE = 0.04;

/**
 * How far the lock-up is blown up while it is centre screen — wanted, then
 * what will actually fit.
 *
 * The lock-up is sized by its own content, not by the viewport, so the wanted
 * scale is the same 221px of wordmark on a 320px phone as on a 430px one. At
 * 1.6x that is 354px, which runs off both edges of the smaller screen — and
 * `overflow-x: hidden` on the body means it would be silently sliced rather
 * than merely overflowing. So the width it lands at is capped, and on a narrow
 * phone the zoom quietly gives way instead of the wordmark.
 */
const SCALE_SMALL = 1.6;
const SCALE_LARGE = 1.85;

/** Widest the blown-up lock-up may get: a share of the screen, and a ceiling. */
const MAX_WIDTH_RATIO = 0.82;
const MAX_WIDTH_PX = 640;

/** Layout effects warn during SSR; this component renders on the server. */
const useIsomorphicLayoutEffect =
  typeof window === "undefined" ? useEffect : useLayoutEffect;

/**
 * Module scope, not refs: these have to survive React's development remount,
 * where every effect is mounted, cleaned up and mounted again before a frame
 * is painted.
 *
 * That remount is why there is no cleanup on the effect below. Tearing the
 * timeline down and letting the second mount restart it double-plays the
 * reveal; finishing it early on teardown — which is what this file did at
 * first — meant the whole thing was over inside 300ms and **the intro never
 * appeared in `next dev` at all**, only in a production build. So the first
 * pass owns the reveal outright and later passes keep their hands off it.
 *
 * Nothing leaks: this is the root layout, which only unmounts when the
 * document goes away, and `beginIntro` expires on its own regardless.
 */
let played = false;
let active: gsap.core.Timeline | null = null;

export function Intro() {
  const curtainRef = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    const curtain = curtainRef.current;
    if (!curtain) return;

    /** Take the curtain out of the way for good. */
    const dismiss = () => {
      curtain.setAttribute("data-intro-claimed", "");
      curtain.style.display = "none";
      endIntro();
    };

    if (played) {
      // A development remount. If the first pass is still playing, leave it
      // entirely alone; if it finished or stood down, make sure the curtain
      // is out of the way.
      if (!active) dismiss();
      return;
    }
    played = true;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const restoredScroll = window.scrollY > 4;
    // The CSS fallback got here first — hydration was slow. The reader has
    // already seen the page start to appear; snapping it back to hide it again
    // would be worse than no intro at all.
    const alreadyFading =
      parseFloat(getComputedStyle(curtain).opacity) < 0.95;

    const header = document.querySelector<HTMLElement>("[data-intro-header]");
    const lockup = document.querySelector<HTMLElement>("[data-intro-lockup]");
    const mark = lockup?.querySelector<HTMLElement>("[data-intro-mark]") ?? null;
    const word = lockup?.querySelector<HTMLElement>("[data-intro-word]") ?? null;

    if (
      reduced ||
      restoredScroll ||
      alreadyFading ||
      !header ||
      !lockup ||
      !mark ||
      !word
    ) {
      dismiss();
      return;
    }

    curtain.setAttribute("data-intro-claimed", "");
    beginIntro();

    let tl: gsap.core.Timeline | null = null;

    try {
      const chrome = gsap.utils.toArray<HTMLElement>(
        "[data-intro-chrome]",
        header,
      );

      // Measure where the lock-up already is, then work out the offset that
      // puts its centre at the centre of the screen.
      const box = lockup.getBoundingClientRect();
      const dx = window.innerWidth / 2 - (box.left + box.width / 2);
      const dy =
        window.innerHeight / 2 -
        (box.top + box.height / 2) -
        window.innerHeight * OPTICAL_RISE;
      const wanted = window.innerWidth < 640 ? SCALE_SMALL : SCALE_LARGE;
      const fits =
        Math.min(window.innerWidth * MAX_WIDTH_RATIO, MAX_WIDTH_PX) / box.width;
      // Never below 1: shrinking the lock-up to fit would play the reveal
      // backwards, which is worse than not zooming at all.
      const scale = Math.max(1, Math.min(wanted, fits));

      /*
        The header is `sticky z-50`, which makes it a stacking context — its
        children cannot climb out of it on their own, so the lock-up can only
        clear the curtain if the whole header does. Inline, because a Tailwind
        utility sits in the `utilities` cascade layer and would beat any rule
        of ours in `components` no matter how specific.
      */
      gsap.set(header, { zIndex: 100 });
      gsap.set(chrome, { opacity: 0 });
      gsap.set(lockup, { x: dx, y: dy, scale, willChange: "transform" });
      gsap.set(mark, { opacity: 0, scale: 0.86, y: 4 });
      gsap.set(word, {
        opacity: 0,
        x: -6,
        // Negative on the vertical edges so the clip runs past the ascenders
        // and descenders instead of shaving them as it passes.
        clipPath: "inset(-15% 100% -15% 0%)",
      });

      const settle = () => {
        // Clear every trace: a lingering transform keeps the lock-up on its
        // own composited layer, where the type renders a shade softer than
        // the rest of the header for the whole of the reader's visit.
        gsap.set([lockup, mark, word], { clearProps: "all" });
        gsap.set(chrome, { clearProps: "opacity" });
        gsap.set(header, { clearProps: "zIndex" });
        curtain.style.display = "none";
        active = null;
        endIntro();
      };

      /*
        Two rules shape the timing here.

        The lock-up has to reach header height before the page behind it
        appears. An earlier cut faded the curtain while it was still out in
        the middle of the screen, which floated dark ink type over half a
        second of revealing photograph and left the tagline unreadable against
        it. Once the lock-up is at `y: 0` it is inside the header, which is
        opaque paper and sits above the curtain, so from that moment it has its
        own ground no matter what the page does.

        And the two travel moves must not blur into one. They are separate
        tweens with a beat between them, not a single eased diagonal: the
        lock-up rises, arrives, and only then goes left.
      */
      tl = gsap.timeline({ defaults: { ease: "power3.out" }, onComplete: settle })
        .to(mark, { opacity: 1, scale: 1, y: 0, duration: 0.36 }, 0)
        .to(
          word,
          {
            opacity: 1,
            x: 0,
            clipPath: "inset(-15% -5% -15% 0%)",
            duration: 0.42,
          },
          0.06,
        )
        // Up the centre line, shrinking to header size as it goes. `x` is
        // deliberately untouched — it stays centred for the whole of this move.
        .to(
          lockup,
          { y: 0, scale: 1, duration: 0.54, ease: "power3.inOut" },
          0.38,
        )
        // The page starts to arrive now that the lock-up is on the header.
        .to(curtain, { opacity: 0, duration: 0.34, ease: "power2.inOut" }, 0.94)
        // Hand off to the scroll reveals on the same beat, so the first screen
        // rises in as the curtain clears rather than sitting there already
        // finished when it lifts.
        .call(endIntro, undefined, 0.94)
        // Second beat: left into the corner.
        .to(lockup, { x: 0, duration: 0.38, ease: "power3.inOut" }, 0.96)
        // The menu button and nav come in on that leftward move, so the header
        // finishes assembling in one gesture.
        .to(
          chrome,
          { opacity: 1, duration: 0.36, stagger: 0.045, ease: "power2.out" },
          1.02,
        );

      active = tl;

    } catch (error) {
      // A failed entrance must not be able to hold the page behind a curtain.
      console.error("Opening reveal unavailable", error);
      tl?.kill();
      gsap.set([lockup, mark, word], { clearProps: "all" });
      gsap.set(header, { clearProps: "zIndex" });
      document
        .querySelectorAll<HTMLElement>("[data-intro-chrome]")
        .forEach((el) => {
          el.style.opacity = "1";
        });
      dismiss();
    }
  }, []);

  return <div ref={curtainRef} className="intro-curtain" aria-hidden />;
}
