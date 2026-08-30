/**
 * Encodes the client's original media into web-ready masters and writes a
 * typed manifest the app imports.
 *
 *   assets/source/<FOLDER>/<file>.png  ->  public/media/<folder>/<file>.webp
 *                                     ->  src/content/media.generated.ts
 *
 * Why a master rather than a full responsive set: next/image already derives
 * every width it needs from a single source. Our job is only to stop a 6 MB
 * screenshot-grade PNG from being the thing it derives them from. We cap the
 * long edge at 2560px and encode at quality 82 with max effort, which is
 * visually indistinguishable from the original at any size the site displays
 * while cutting the payload by roughly an order of magnitude.
 *
 * WebP wins on nearly everything, but a handful of the studio's photos arrive
 * as already-tuned JPEGs that WebP would inflate — so each image is encoded
 * both ways and the smaller file wins. The manifest records which one shipped.
 *
 * The manifest carries intrinsic width/height (so no layout shift) and a tiny
 * inline blur placeholder (so images fade in from something rather than white).
 *
 * Run: npm run media
 */

import { createHash } from "node:crypto";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import sharp from "sharp";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const SOURCE_DIR = path.join(ROOT, "assets", "source");
const OUT_DIR = path.join(ROOT, "public", "media");
const MANIFEST = path.join(ROOT, "src", "content", "media.generated.ts");
const CACHE = path.join(ROOT, "node_modules", ".cache", "sanctum-media.json");

const MAX_EDGE = 2560;
const QUALITY = 82;
const BLUR_WIDTH = 16;

const IMAGE_EXT = new Set([".png", ".jpg", ".jpeg", ".webp", ".tif", ".tiff"]);
const VIDEO_EXT = new Set([".mp4", ".webm", ".mov"]);

/** Folder and file names arrive with spaces, capitals, apostrophes and typos. */
function slugify(value) {
  return value
    .normalize("NFKD")
    .replace(/[‘’']/g, "")
    .replace(/&/g, "and")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

async function walk(dir, base = dir) {
  const out = [];
  for (const entry of await fs.readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...(await walk(full, base)));
    else out.push({ full, rel: path.relative(base, full) });
  }
  return out;
}

/** Key mirrors the source tree so content files read as paths, not hashes. */
function keyFor(rel) {
  const parts = rel.split(path.sep);
  const file = parts.pop();
  const name = slugify(path.basename(file, path.extname(file)));
  return [...parts.map(slugify), name].filter(Boolean).join("/");
}

async function fingerprint(file) {
  const { size, mtimeMs } = await fs.stat(file);
  return createHash("sha1")
    .update(`${size}:${Math.round(mtimeMs)}:${MAX_EDGE}:${QUALITY}`)
    .digest("hex");
}

async function readCache() {
  try {
    return JSON.parse(await fs.readFile(CACHE, "utf8"));
  } catch {
    return {};
  }
}

async function encodeImage(src, destNoExt) {
  const base = () => {
    const p = sharp(src, { failOn: "none" }).rotate();
    return p.resize({
      width: MAX_EDGE,
      height: MAX_EDGE,
      fit: "inside",
      withoutEnlargement: true,
    });
  };

  const webp = await base()
    .webp({ quality: QUALITY, effort: 6 })
    .toBuffer({ resolveWithObject: true });

  // An already-optimised JPEG can come out of WebP *larger* than it went in.
  // Encode a mozjpeg master too and keep whichever is actually smaller, so no
  // image on the site is ever bigger than the file the studio handed us.
  let best = { data: webp.data, info: webp.info, ext: "webp" };
  if (!webp.info.hasAlpha) {
    const jpeg = await base()
      .jpeg({ quality: QUALITY, mozjpeg: true, progressive: true })
      .toBuffer({ resolveWithObject: true });
    if (jpeg.data.length < best.data.length) {
      best = { data: jpeg.data, info: jpeg.info, ext: "jpg" };
    }
  }

  const dest = `${destNoExt}.${best.ext}`;
  await fs.mkdir(path.dirname(dest), { recursive: true });
  await fs.writeFile(dest, best.data);

  const blur = await sharp(src, { failOn: "none" })
    .rotate()
    .resize({ width: BLUR_WIDTH })
    .webp({ quality: 40, alphaQuality: 40 })
    .toBuffer();

  return {
    ext: best.ext,
    width: best.info.width,
    height: best.info.height,
    bytes: best.data.length,
    blurDataURL: `data:image/webp;base64,${blur.toString("base64")}`,
    sourceBytes: (await fs.stat(src)).size,
  };
}

function formatBytes(n) {
  if (n > 1024 * 1024) return `${(n / 1024 / 1024).toFixed(1)} MB`;
  return `${Math.round(n / 1024)} KB`;
}

async function main() {
  try {
    await fs.access(SOURCE_DIR);
  } catch {
    console.error(`No source media at ${path.relative(ROOT, SOURCE_DIR)}`);
    process.exitCode = 1;
    return;
  }

  const cache = await readCache();
  const nextCache = {};
  const entries = [];
  const videos = [];
  const written = new Set();

  const files = (await walk(SOURCE_DIR)).sort((a, b) =>
    a.rel.localeCompare(b.rel),
  );

  let reused = 0;
  let encoded = 0;
  let sourceTotal = 0;
  let outputTotal = 0;

  // `BEDROOM.jpg` and `bedroom.png` slugify to the same key. Keep both by
  // falling back to the original extension, and say so rather than silently
  // dropping one of the studio's photographs.
  const claimed = new Set();
  const uniqueKey = (base, ext) => {
    if (!claimed.has(base)) {
      claimed.add(base);
      return base;
    }
    let candidate = `${base}-${ext.replace(".", "")}`;
    let n = 2;
    while (claimed.has(candidate)) candidate = `${base}-${ext.replace(".", "")}-${n++}`;
    claimed.add(candidate);
    console.warn(`  name clash: ${base} -> ${candidate}`);
    return candidate;
  };

  for (const { full, rel } of files) {
    const ext = path.extname(full).toLowerCase();
    const key = uniqueKey(keyFor(rel), ext);

    if (VIDEO_EXT.has(ext)) {
      // Noted but not copied. The studio's progress clips are 3.7 MB and no
      // page references them, and shipping unreferenced megabytes to a mostly
      // mobile audience is exactly what the rest of this script exists to
      // avoid. Using one should be a deliberate change — a poster frame, no
      // autoplay on cellular — not a side effect of dropping a file in.
      videos.push({ key, source: path.relative(ROOT, full) });
      continue;
    }

    if (!IMAGE_EXT.has(ext)) continue;

    const hash = await fingerprint(full);
    const destNoExt = path.join(OUT_DIR, key);
    const cached = cache[key];
    let record;

    if (cached?.hash === hash && cached.record?.ext) {
      try {
        await fs.access(`${destNoExt}.${cached.record.ext}`);
        record = cached.record;
        reused += 1;
      } catch {
        /* output was deleted — fall through and re-encode */
      }
    }

    if (!record) {
      record = await encodeImage(full, destNoExt);
      encoded += 1;
      console.log(
        `  ${key}  ${record.width}x${record.height}  ` +
          `${formatBytes(record.sourceBytes)} -> ${formatBytes(record.bytes)}`,
      );
    }

    sourceTotal += record.sourceBytes;
    outputTotal += record.bytes;
    nextCache[key] = { hash, record };
    entries.push({ key, record });
    written.add(path.join(OUT_DIR, `${key}.${record.ext}`));
  }

  // Drop outputs whose source was renamed, removed, or changed format.
  let pruned = 0;
  for (const { full } of await walk(OUT_DIR).catch(() => [])) {
    if (written.has(full)) continue;
    await fs.rm(full, { force: true });
    pruned += 1;
  }

  entries.sort((a, b) => a.key.localeCompare(b.key));
  videos.sort((a, b) => a.key.localeCompare(b.key));

  const body = entries
    .map(
      ({ key, record }) =>
        `  "${key}": {\n` +
        `    src: "/media/${key}.${record.ext}",\n` +
        `    width: ${record.width},\n` +
        `    height: ${record.height},\n` +
        `    blurDataURL:\n      "${record.blurDataURL}",\n` +
        `  },`,
    )
    .join("\n");

  const videoBody = videos
    .map(({ key, source }) => `//   ${key}  (${source.split(path.sep).join("/")})`)
    .join("\n");

  const file = `// Generated by scripts/process-images.mjs — do not edit by hand.
// Run \`npm run media\` after changing anything in assets/source.

export type MediaRecord = {
  src: string;
  width: number;
  height: number;
  blurDataURL: string;
};

export const media = {
${body}
} as const satisfies Record<string, MediaRecord>;

// Video in assets/source, deliberately not copied into public/media. To use
// one, copy it in and reference it explicitly — see scripts/process-images.mjs.
${videoBody}

export type MediaKey = keyof typeof media;
`;

  await fs.mkdir(path.dirname(MANIFEST), { recursive: true });
  await fs.writeFile(MANIFEST, file, "utf8");
  await fs.mkdir(path.dirname(CACHE), { recursive: true });
  await fs.writeFile(CACHE, JSON.stringify(nextCache), "utf8");

  const saved = sourceTotal > 0 ? 1 - outputTotal / sourceTotal : 0;
  console.log(
    `\n${entries.length} images (${encoded} encoded, ${reused} cached), ` +
      `${videos.length} videos left in source` +
      (pruned ? `, ${pruned} stale file(s) pruned` : "") +
      `\n` +
      `${formatBytes(sourceTotal)} -> ${formatBytes(outputTotal)} ` +
      `(${Math.round(saved * 100)}% smaller)\n` +
      `manifest: ${path.relative(ROOT, MANIFEST)}`,
  );
}

await main();
