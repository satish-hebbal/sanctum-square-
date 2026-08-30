"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import NextImage from "next/image";

import { media } from "@/content/media.generated";
import { cx } from "@/lib/cx";
import { IMAGE_QUALITY, SIZES } from "@/lib/media";
import type { Project } from "@/lib/types";
import { Container } from "@/components/ui/primitives";

const INTERVAL = 6000;

export function Hero({ slides }: { slides: Project[] }) {
  const [index, setIndex] = useState(0);
  // Only slides that have been reached are mounted. Stacking all six would put
  // every one of them in the viewport at once, which defeats lazy loading and
  // costs a phone five images it may never see.
  const [mounted, setMounted] = useState(1);
  const [paused, setPaused] = useState(false);

  const go = useCallback(
    (next: number) => {
      const i = (next + slides.length) % slides.length;
      setIndex(i);
      setMounted((m) => Math.max(m, i + 1));
    },
    [slides.length],
  );

  useEffect(() => {
    // Warm the second slide once the page is idle so the first advance does
    // not land on an empty frame.
    const idle = window.setTimeout(() => setMounted((m) => Math.max(m, 2)), 2000);
    return () => window.clearTimeout(idle);
  }, []);

  // Autoplay runs regardless of prefers-reduced-motion. A crossfade between
  // photographs is not the parallax/zoom/slide motion that preference exists
  // to suppress — and this carousel is the only way a phone visitor sees five
  // of the six featured projects (the manual dots are desktop-only), so
  // freezing it on slide one for reduced-motion readers previously meant they
  // could never see the rest. Hover and focus still pause it.
  useEffect(() => {
    if (paused || slides.length < 2) return;
    const t = window.setTimeout(() => go(index + 1), INTERVAL);
    return () => window.clearTimeout(t);
  }, [index, paused, go, slides.length]);

  const current = slides[index];

  return (
    <section
      aria-label="Featured projects"
      aria-roledescription="carousel"
      className="hero-height relative w-full overflow-hidden bg-stone"
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
    >
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
              className="object-cover"
            />
          </div>
        );
      })}

      {/* Carries the caption. Taller on a phone, where the type is bigger. */}
      <div
        aria-hidden
        className="hero-scrim absolute inset-x-0 bottom-0 h-3/4 md:h-2/3"
      />

      <Container className="absolute inset-x-0 bottom-0">
        <p className="text-eyebrow mb-3 text-white/70 tabular-nums md:hidden">
          {String(index + 1).padStart(2, "0")} /{" "}
          {String(slides.length).padStart(2, "0")}
        </p>

        <div className="flex items-end justify-between gap-6 pb-8 md:pb-12">
          <Link href={`/projects/${current.slug}`} className="group block">
            <p className="text-eyebrow text-white/75 uppercase">
              {current.eyebrow}
            </p>
            <h1 className="text-hero mt-3 max-w-3xl text-white">
              <span className="bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_1px] bg-position-[0_100%] bg-no-repeat transition-[background-size] duration-700 ease-(--ease-out-quint) group-hover:bg-[length:100%_1px]">
                {current.title}
              </span>
            </h1>
          </Link>

          <div className="hidden shrink-0 items-center gap-6 pb-2 md:flex">
            <div className="flex items-center gap-2">
              {slides.map((slide, i) => (
                <button
                  key={slide.slug}
                  type="button"
                  onClick={() => go(i)}
                  aria-label={`Show ${slide.title}`}
                  aria-current={i === index}
                  className="py-3"
                >
                  <span
                    className={cx(
                      "block h-px w-7 transition-colors duration-500",
                      i === index ? "bg-white" : "bg-white/40",
                    )}
                  />
                </button>
              ))}
            </div>
            <p className="text-eyebrow text-white/75 tabular-nums">
              {String(index + 1).padStart(2, "0")} /{" "}
              {String(slides.length).padStart(2, "0")}
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
