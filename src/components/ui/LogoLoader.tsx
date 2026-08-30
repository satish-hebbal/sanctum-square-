import type { CSSProperties } from "react";

import { cx } from "@/lib/cx";

/**
 * The loading state, for pages and for anything else with a real wait.
 *
 * There is no spinner on this site and there should not be one: a borrowed
 * circle is a second mark competing with the studio's own. Instead the logo
 * itself is the loader — it masks a gradient that sweeps behind it, so the
 * mark appears to be drawing itself while the page waits. The animation is
 * entirely CSS (`.logo-loader` in globals.css), which is what lets these be
 * server components: a loading state that had to hydrate before it could
 * appear would arrive exactly when the JavaScript has not.
 *
 * Three things to compose:
 *
 *   <LogoLoader />                    the mark alone, inside a button or a row
 *   <LoaderPage />                    a whole page segment waiting — loading.tsx
 *   <LoaderOverlay show={...} />      a frame or a section waiting in place
 *
 * **Not for images.** Every photograph on the site goes through `Figure` or
 * `Hero` with a `blurDataURL`, so a slot that is still loading already shows a
 * blurred version of the actual photograph. Covering that with a mark would
 * replace the better loading state with a worse one, and turn a quiet grid
 * into a field of flickering logos. Use these where there is nothing to show
 * yet at all.
 */

/**
 * Three sizes, no fourth. Small sits on a line of type or inside a button,
 * medium fills a frame or a section, large is for a whole page.
 */
const SIZES = {
  sm: "1.5rem",
  md: "2.5rem",
  lg: "4rem",
} as const;

export type LoaderSize = keyof typeof SIZES;

export function LogoLoader({
  size = "md",
  /** `paper` for an ink ground — the submit button. */
  tone = "ink",
  /**
   * Announced when the loader appears. Pass `null` where the surrounding UI
   * already says it: inside a button, an `aria-label` here would join the
   * button's own accessible name and it would announce as "Loading Sending".
   */
  label = "Loading",
  className,
}: {
  size?: LoaderSize;
  tone?: "ink" | "paper";
  label?: string | null;
  className?: string;
}) {
  return (
    <span
      {...(label === null
        ? { "aria-hidden": true }
        : { role: "status", "aria-label": label })}
      className={cx(
        "logo-loader",
        tone === "paper" && "logo-loader-paper",
        className,
      )}
      style={{ "--logo-loader-size": SIZES[size] } as CSSProperties}
    />
  );
}

/**
 * A route segment that has not arrived yet — the body of a `loading.tsx`.
 *
 * The header and footer are in the layout and stay put, so this only has to
 * hold the space where the page will be. It is a block rather than a viewport
 * overlay for the same reason: covering chrome that is already on screen and
 * still working would be a lie about what is waiting.
 *
 * It fades in on a delay rather than appearing at once — see
 * `.logo-loader-page` in globals.css. A navigation that resolves quickly, which
 * is most of them, never shows it at all.
 */
export function LoaderPage({ label }: { label?: string }) {
  return (
    <div className="logo-loader-page">
      <LogoLoader size="lg" label={label} />
    </div>
  );
}

/**
 * Covers whatever it sits in — a frame, a section, the viewport — and fades
 * out rather than vanishing, because a loader that disappears on the same
 * frame the content appears reads as a flicker.
 *
 * It stays mounted while hidden so the fade has something to play on, and
 * goes `aria-hidden` at the same time so the status does not linger in the
 * accessibility tree after the wait is over.
 *
 * The ground is `stone` — the tone an empty frame already shows — unless it
 * is covering the page, where it is paper.
 */
export function LoaderOverlay({
  show = true,
  fullscreen = false,
  size,
  label,
  className,
}: {
  show?: boolean;
  fullscreen?: boolean;
  size?: LoaderSize;
  label?: string;
  className?: string;
}) {
  return (
    <div
      aria-hidden={!show}
      className={cx(
        "grid place-items-center transition-opacity duration-500 ease-(--ease-out-quint)",
        fullscreen ? "fixed inset-0 z-50 bg-paper" : "absolute inset-0 bg-stone",
        show ? "opacity-100" : "pointer-events-none opacity-0",
        className,
      )}
    >
      <LogoLoader size={size ?? (fullscreen ? "lg" : "md")} label={label} />
    </div>
  );
}
