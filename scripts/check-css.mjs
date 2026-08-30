/**
 * Structural check on globals.css.
 *
 * This exists because of a real bug: an edit closed `@layer components` a
 * block early, and every rule after it — the hero height, the whole reveal
 * system — ended up nested inside an `@keyframes` block. CSS nested there is
 * silently ignored. The hero collapsed to nothing and the site still built,
 * type-checked and passed its browser tests, because the dead rules included
 * the ones that hide content, so "nothing is hidden" passed for the wrong
 * reason.
 *
 * Two assertions, no dependencies:
 *   1. braces balance
 *   2. nothing but keyframe selectors lives inside @keyframes
 *
 * Run: npm run check:css   (and it runs before every build)
 */

import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const FILE = path.join(ROOT, "src", "app", "globals.css");

const source = await fs.readFile(FILE, "utf8");
// Blank out comments so braces and selectors inside them do not count.
const css = source.replace(/\/\*[\s\S]*?\*\//g, (m) => m.replace(/[^\n]/g, " "));

const problems = [];

/* 1 — braces balance ------------------------------------------------------ */
let depth = 0;
let line = 1;
for (const ch of css) {
  if (ch === "\n") line += 1;
  else if (ch === "{") depth += 1;
  else if (ch === "}") {
    depth -= 1;
    if (depth < 0) {
      problems.push(`line ${line}: unmatched "}"`);
      depth = 0;
    }
  }
}
if (depth !== 0) {
  problems.push(`${depth} unclosed block(s) — a "}" is missing`);
}

/* 2 — only keyframe selectors inside @keyframes --------------------------- */
const KEYFRAME_SELECTOR = /^(from|to|-?\d+(\.\d+)?%)(\s*,\s*(from|to|-?\d+(\.\d+)?%))*$/;

let d = 0;
let keyframesAt = null; // depth at which the current @keyframes opened
const lines = css.split("\n");

for (const [i, raw] of lines.entries()) {
  const text = raw.trim();

  if (keyframesAt !== null && d === keyframesAt + 1 && text.includes("{")) {
    const selector = text.slice(0, text.indexOf("{")).trim();
    if (selector && !KEYFRAME_SELECTOR.test(selector)) {
      problems.push(
        `line ${i + 1}: "${selector}" is inside @keyframes — it will be ignored. ` +
          `Close the @keyframes block above it.`,
      );
    }
  }

  const opensKeyframes = /^@keyframes\s/.test(text);
  for (const ch of raw) {
    if (ch === "{") {
      if (opensKeyframes && keyframesAt === null) keyframesAt = d;
      d += 1;
    } else if (ch === "}") {
      d -= 1;
      if (keyframesAt !== null && d <= keyframesAt) keyframesAt = null;
    }
  }
}

const rel = path.relative(ROOT, FILE);
if (problems.length) {
  console.error(`\n${rel} — ${problems.length} problem(s):\n`);
  for (const p of problems) console.error(`  ${p}`);
  console.error("");
  process.exit(1);
}

console.log(`${rel}: structure ok`);
