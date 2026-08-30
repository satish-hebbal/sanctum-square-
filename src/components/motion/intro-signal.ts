/**
 * A one-shot signal between the opening reveal and the scroll reveals.
 *
 * Without it, every `data-reveal` element above the fold plays its entrance
 * while the intro curtain is still covering the page — so the curtain lifts on
 * content that has already finished arriving, and the first screen looks
 * static. `ScrollReveal` therefore holds its scan until the curtain is on its
 * way out.
 *
 * A module variable rather than an attribute on <html>: nothing here is
 * allowed to change server-rendered markup, and this is read once, by one
 * component, in the same tick.
 *
 * `beginIntro` arms its own expiry. If the intro throws halfway through, the
 * waiters still run — a stalled signal must never be able to keep content
 * hidden.
 */

const EXPIRY_MS = 3000;

let running = false;
let expiry = 0;
const waiters = new Set<() => void>();

export function beginIntro() {
  running = true;
  window.clearTimeout(expiry);
  expiry = window.setTimeout(endIntro, EXPIRY_MS);
}

export function endIntro() {
  if (!running) return;
  running = false;
  window.clearTimeout(expiry);
  const pending = [...waiters];
  waiters.clear();
  pending.forEach((fn) => fn());
}

/**
 * Runs `fn` once the curtain is clearing — or immediately, if no intro is
 * playing (every client-side navigation after the first). Returns an unsubscribe.
 */
export function whenIntroClears(fn: () => void): () => void {
  if (!running) {
    fn();
    return () => {};
  }
  waiters.add(fn);
  return () => {
    waiters.delete(fn);
  };
}
