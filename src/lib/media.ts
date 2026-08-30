/**
 * Encoder quality for every image the site serves.
 *
 * The source masters are already WebP q82 (see scripts/process-images.mjs), so
 * next/image is re-encoding an image that has been through one lossy pass
 * A high setting here keeps that second pass from compounding visibly on the
 * large hero crops and on the master plan, where fine linework is the content.
 *
 * It costs about 5 KB on a hero and 40 KB on the plan against the default 75 —
 * worth it for a portfolio where the photographs are the product.
 *
 * Any value used here must also be listed in `images.qualities` in
 * next.config.ts, or the optimiser rejects the request.
 */
export const IMAGE_QUALITY = 88;

/**
 * The `sizes` attribute for every image slot on the site.
 *
 * These must be plain CSS lengths. `sizes` is read by the preload scanner
 * before any stylesheet is applied, so `var(--spacing-gutter)` inside a
 * `calc()` here does not resolve — the browser discards the entry and falls
 * back to `100vw`, quietly downloading a wider file than the slot needs. That
 * is worst exactly where it hurts most: a phone on a slow connection.
 *
 * Each value rounds the gutter *down* so the request errs slightly large.
 * Over-fetching costs a few KB; under-fetching is a visibly soft image.
 */
export const SIZES = {
  /** Edge to edge, past the page gutter. */
  viewport: "100vw",
  /** The full page measure, inside the gutters. */
  full:
    "(min-width: 1440px) 1320px, (min-width: 768px) calc(100vw - 4rem), calc(100vw - 2rem)",
  /** Two per row from 640 up. */
  half: "(min-width: 640px) calc(50vw - 3rem), calc(100vw - 2rem)",
  /** Three per row from 1024, two from 640. */
  third:
    "(min-width: 1024px) calc(33vw - 2rem), (min-width: 640px) calc(50vw - 3rem), calc(100vw - 2rem)",
  /** The body column on a project page. */
  body: "(min-width: 1440px) 900px, (min-width: 768px) 68vw, calc(100vw - 2rem)",
  /** Two-thirds measure — the third featured project on the home page. */
  twoThirds: "(min-width: 768px) 68vw, calc(100vw - 2rem)",
  /** A side column: the founder portrait, the contact photograph. */
  side: "(min-width: 768px) 44vw, calc(100vw - 2rem)",
  /** The upright plate a drawing sits in. */
  plate: "(min-width: 768px) 48vw, calc(100vw - 2rem)",
  /** The news lead image. */
  lead: "(min-width: 768px) 58vw, calc(100vw - 2rem)",
} as const;
