"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import NextImage from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";

import { media } from "@/content/media.generated";
import { cx } from "@/lib/cx";
import { IMAGE_QUALITY, SIZES } from "@/lib/media";
import type { Project } from "@/lib/types";
import { Container } from "@/components/ui/primitives";

const INTERVAL = 6000;

/**
 * Home page lead.
 *
 * The photographs are shown whole. An earlier version ran them full-bleed
 * under `object-cover` with a slow Ken Burns pan, which meant every slide was
 * a crop of a crop — the studio's own note was that the images were "zoomed on
 * one part". So the frame is fixed, the image is contained inside it, and
 * whatever the source ratio is, the entire photograph is on screen at once.
 *
 * The frame is a fixed height so the page below it does not jump every six
 * seconds — the five slides run from a 1.8 landscape to a 0.75 upright, and a
 * frame that resized to each would move everything under it by 200px a turn.
 * What is left over around an image is the page's own paper rather than a
 * grey mount, so it reads as margin instead of as a letterbox.
 *
 * The caption sits under the frame rather than over the image, so no part of
 * a photograph is ever covered by type and no scrim is needed.
 */
export function Hero({ slides }: { slides: Project[] }) {
  const [index, setIndex] = useState(0);
  // Only slides that have been reached are mounted. Stacking all five would
  // put every one of them in the viewport at once, which defeats lazy loading
  // and costs a phone four images it may never see.
  const [mounted, setMounted] = useState(1);
  const [paused, setPaused] = useState(false);
  // Set once the reader works the arrows or the dots. From that point the
  // slideshow stops advancing on its own: someone who has just pressed "next"
  // to look at a photograph does not want it taken away six seconds later.
  const [taken, setTaken] = useState(false);

  const indexRef = useRef(0);

  const go = useCallback(
    (next: number) => {
      const i = (next + slides.length) % slides.length;
      if (i === indexRef.current) return;
      indexRef.current = i;
      setIndex(i);
      // Stepping back from the first slide jumps to the last, so mount
      // everything up to it rather than only as far as the timer had reached.
      setMounted((m) => Math.max(m, i + 1));
    },
    [slides.length],
  );

  /** Manual navigation: move, and hand control over for good. */
  const take = useCallback(
    (next: number) => {
      setTaken(true);
      go(next);
    },
    [go],
  );

  useEffect(() => {
    // Warm the second slide once the page is idle so the first advance does
    // not land on an empty frame.
    const idle = window.setTimeout(() => setMounted((m) => Math.max(m, 2)), 2000);
    return () => window.clearTimeout(idle);
  }, []);

  // Autoplay runs regardless of prefers-reduced-motion. A crossfade between
  // photographs is not the parallax/zoom/slide motion that preference exists
  // to suppress — and this carousel is the only way a phone visitor sees the
  // other four featured projects (the manual dots are desktop-only), so
  // freezing it on slide one previously meant they could never see the rest.
  // Hover and focus still pause it, and the arrows stop it outright.
  useEffect(() => {
    if (taken || paused || slides.length < 2) return;
    const t = window.setTimeout(() => go(index + 1), INTERVAL);
    return () => window.clearTimeout(t);
  }, [index, taken, paused, go, slides.length]);

  const current = slides[index];

  return (
    <section
      aria-label="Featured projects"
      aria-roledescription="carousel"
      className="flex w-full flex-col bg-paper"
      /*
        Pause on hover, but only for an actual pointer. A tap on a phone also
        fires `mouseenter`, and with no matching `mouseleave` the slideshow
        would stop for good the first time a reader touched it.
      */
      onPointerEnter={(e) => {
        if (e.pointerType === "mouse") setPaused(true);
      }}
      onPointerLeave={(e) => {
        if (e.pointerType === "mouse") setPaused(false);
      }}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
      // Once a control has focus, the arrow keys drive the carousel — the
      // convention for anything with a next and a previous.
      onKeyDown={(e) => {
        if (e.key === "ArrowLeft") {
          e.preventDefault();
          take(index - 1);
        } else if (e.key === "ArrowRight") {
          e.preventDefault();
          take(index + 1);
        }
      }}
    >
      <div id="hero-slides" className="hero-frame relative w-full bg-paper">
        {slides.slice(0, mounted).map((project, i) => {
          const record = media[project.hero.media];
          return (
            <div
              key={project.slug}
              aria-hidden={i !== index}
              className={cx(
                "absolute inset-0 transition-opacity duration-1000 ease-(--ease-out-quint)",
                i === index ? "opacity-100" : "opacity-0",
              )}
            >
              <NextImage
                src={record.src}
                alt={project.hero.alt}
                fill
                sizes={SIZES.viewport}
                quality={IMAGE_QUALITY}
                priority={i === 0}
                placeholder="blur"
                blurDataURL={record.blurDataURL}
                className="object-contain"
              />
            </div>
          );
        })}
      </div>

      <Container>
        {/*
          On a phone the caption and the controls each get their own line: two
          44px arrows and a counter alongside a 32px title would leave the
          title about half the screen to wrap into. From `md` they share one.
        */}
        <div className="flex flex-col gap-6 pt-6 pb-(--spacing-block) md:flex-row md:items-end md:justify-between md:gap-10 md:pt-8">
          <Link href={`/projects/${current.slug}`} className="group block">
            <p className="text-eyebrow text-graphite uppercase">
              {current.eyebrow}
            </p>
            <h1 className="text-hero mt-3 max-w-3xl">
              <span className="bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_1px] bg-position-[0_100%] bg-no-repeat transition-[background-size] duration-700 ease-(--ease-out-quint) group-hover:bg-[length:100%_1px]">
                {current.title}
              </span>
            </h1>
          </Link>

          <div className="flex shrink-0 items-center justify-between gap-6 md:justify-end md:pb-1">
            {/* Progress dots double as a way in to any one slide. No room for
                five of them beside the arrows on a phone. */}
            <div className="hidden items-center gap-2 md:flex">
              {slides.map((slide, i) => (
                <button
                  key={slide.slug}
                  type="button"
                  onClick={() => take(i)}
                  aria-label={`Show ${slide.title}`}
                  aria-current={i === index}
                  className="py-3"
                >
                  <span className="block h-px w-7 overflow-hidden bg-ink/20">
                    <span
                      className={cx(
                        "block h-full bg-ink",
                        i < index && "w-full",
                        i >= index && "w-0",
                      )}
                      style={
                        i === index && !taken
                          ? {
                              animation: `hero-dash-fill ${INTERVAL}ms linear forwards`,
                              animationPlayState: paused ? "paused" : "running",
                            }
                          : i === index
                            ? { width: "100%" }
                            : undefined
                      }
                    />
                  </span>
                </button>
              ))}
            </div>

            <p className="text-eyebrow text-graphite tabular-nums">
              {String(index + 1).padStart(2, "0")} /{" "}
              {String(slides.length).padStart(2, "0")}
            </p>

            {/*
              The reason these exist: without them the only way to reach the
              fifth project was to sit through four six-second waits. The
              negative margin pulls the 44px tap targets back so the icons
              still line up with the counter and the page gutter.
            */}
            <div className="-my-3 -mr-3 flex items-center">
              <button
                type="button"
                onClick={() => take(index - 1)}
                aria-label="Previous project"
                aria-controls="hero-slides"
                className="group flex size-11 items-center justify-center text-graphite transition-colors duration-300 hover:text-ink"
              >
                <ArrowLeft
                  size={18}
                  strokeWidth={1.25}
                  aria-hidden
                  className="transition-transform duration-500 ease-(--ease-out-quint) group-hover:-translate-x-1"
                />
              </button>
              <button
                type="button"
                onClick={() => take(index + 1)}
                aria-label="Next project"
                aria-controls="hero-slides"
                className="group flex size-11 items-center justify-center text-graphite transition-colors duration-300 hover:text-ink"
              >
                <ArrowRight
                  size={18}
                  strokeWidth={1.25}
                  aria-hidden
                  className="transition-transform duration-500 ease-(--ease-out-quint) group-hover:translate-x-1"
                />
              </button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
