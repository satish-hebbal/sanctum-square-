# Sanctum Square

Portfolio site for Sanctum Square Studio — architecture, interiors and design,
Bengaluru and Hubballi.

Next.js 16 (App Router) · TypeScript · Tailwind CSS v4 · GSAP · Lenis.

**Content source of truth is the studio's own documents** in `res/` and
`assets/source/` — above all `res/SANCTUM SQUARE STUDIO.pdf`, the profile deck.
Where the deck and the
[Figma](https://www.figma.com/design/LSL8fLIaoJySJLb2pFk88C/arch?node-id=17-2)
disagree, the deck wins; the Figma is the visual design only. That is why the
brand line reads "Architecture · Interiors · Construction" and not "· Design".

```bash
npm install
npm run dev
```

The encoded images in `public/media` and their manifest are committed, so a
fresh clone builds straight away. `npm run media` is only needed after changing
something in `assets/source` — which is *not* committed, being 58 MB of
originals. Keep a copy of that folder somewhere durable.

| Script             | Purpose                                          |
| ------------------ | ------------------------------------------------ |
| `npm run dev`      | Dev server                                       |
| `npm run build`    | Production build                                 |
| `npm run start`    | Serve the production build                       |
| `npm run media`    | Re-encode images and regenerate the manifest     |
| `npm run check:css`| Structural check on globals.css (runs pre-build) |

| `npm run typecheck`| Types only, no emit                              |

---

## A note on globals.css

`npm run check:css` runs before every build, and it earned its place. An edit
once closed `@layer components` early, which left every rule after it nested
inside an `@keyframes` block — where CSS is silently ignored. The hero
collapsed to nothing, and the build, the types and the browser tests all still
passed, because the dead rules included the ones that *hide* content, so
"nothing is hidden" passed for the wrong reason.

The check asserts braces balance and that nothing but keyframe selectors lives
inside `@keyframes`. If you restructure that file and it complains, believe it.

## Design system

Everything visual is defined once, in the `@theme` block at the top of
[`src/app/globals.css`](src/app/globals.css): colour, the type ramp, the
spacing scale and the page grid. The values mirror the Figma library
(`00 · Style Guide`) one for one.

The rules the design runs on:

- **Gallery white.** No colour accents. Ink, graphite, two paper tones, a
  hairline.
- **No radii, no shadows.** Reset globally. Hairlines do the structural work.
- **One typeface.** Inter at 300/400/500. The design gets its variety from
  size, tracking and whitespace, not from a second face. To swap it, change the
  `next/font` import in [`src/app/layout.tsx`](src/app/layout.tsx) — the
  `--font-sans` token flows everywhere from there.
- **Fluid type.** Each size is one `clamp()` between the 390 and 1440 artboards
  rather than a set of breakpoint overrides, so a heading is never re-guessed
  per screen. Anything 15px or under stays fixed.
- **Three spacing steps.** `--spacing-block`, `--spacing-section`,
  `--spacing-page`. If a gap needs a fourth value, the layout is usually wrong.

Pages compose the primitives in
[`src/components/ui/primitives.tsx`](src/components/ui/primitives.tsx) —
`Container`, `Section`, `Rule`, `Eyebrow`, `SectionHead`, `PageHeader`,
`TextLink`, `Button`, `DataList` — rather than inventing their own spacing.
That is what keeps the site consistent as pages are added.

---

## Content

All copy lives in [`src/content/`](src/content/) as typed TypeScript. There is
no CMS; editing a project means editing one object.

| File          | Holds                                                     |
| ------------- | --------------------------------------------------------- |
| `studio.ts`   | Firm statement, founder, services, offices, contact, nav, in-progress list |
| `projects.ts` | The ten projects, their facts, body sections and galleries |
| `news.ts`     | Dated project milestones                                   |
| `media.generated.ts` | Generated. Do not edit.                             |

Project copy is quoted from the studio's own project documents. Facts — client,
location, dates, plot counts — should only change against a new document.

### Adding a project

1. Drop the photographs in `assets/source/<Project Name>/`.
2. `npm run media` — the console prints the key for each image.
3. Add an object to `projects` in `projects.ts`, using those keys. TypeScript
   will reject a key that does not exist, so an image reference cannot rot.

`featured` puts a project on the home page, ordered by its number. Keep the
featured set disjoint from `heroSlides` at the bottom of the same file, or a
project appears twice in the first screen and a half.

### Work with no photography yet

`inProgress` in `studio.ts` holds projects the studio has named but not yet
photographed — currently Dr Kori's Residence, Mixed-Use Building G+3 and the
3 BHK villa in Bengaluru. They render as a plain list at the foot of
`/projects` rather than as cards, because an imageless card in an image-driven
grid reads as a mistake. Move an entry into `projects.ts` as a full project the
moment its photographs arrive.

### Drawings vs photographs

A figure can set `fit: "contain"`. Photographs fill their frame; plans and
elevations must not be cropped. Setting it on the figure rather than at each
call site means the drawing is treated correctly on the home page, in the
project grid, on its own page and in the news feed — see the Igatpuri master
plan.

---

## Images

Source media is 58 MB of PNG and JPEG, some of it 6 MB a frame. That never
reaches the browser.

`scripts/process-images.mjs` encodes each file to a web master capped at 2560px
on the long edge, at quality 82 with maximum effort, and writes
`src/content/media.generated.ts` with each image's dimensions and a 16px inline
blur placeholder. **58.1 MB becomes 6.1 MB — 89% smaller — with no visible loss
at any size the site displays.**

Each image is encoded both as WebP and as mozjpeg and the smaller file wins, so
no image ships larger than the file the studio supplied. (One already-tuned
JPEG does come out smaller as JPEG.) Re-runs are cached by size and mtime;
outputs whose source disappeared are pruned.

At request time `next/image` resizes that master and re-encodes it to AVIF.
Because the master has already been through one lossy pass, quality is set to
88 rather than the default 75 — see
[`src/lib/media.ts`](src/lib/media.ts) for the reasoning and the cost.

Every image goes through
[`Figure`](src/components/media/Figure.tsx), which carries intrinsic dimensions
from the manifest. **Measured CLS is 0 on every page.**

Ratios are declared per breakpoint inside `Figure`. A 3:2 landscape crop is
right on a desktop and wastes a phone screen, so most slots stand upright on
mobile and lie down from `md` up.

Always pass `sizes`, and take it from `SIZES` in [`src/lib/media.ts`](src/lib/media.ts)
rather than writing one inline. `sizes` is read by the preload scanner before
any stylesheet applies, so a `var(--spacing-gutter)` inside it never resolves —
the browser discards the entry and silently falls back to `100vw`, fetching a
wider file than the slot needs. That cost every card on the site a 1280px
image where 1080px would do.

Some images were recovered from the studio's PDFs with PyMuPDF rather than
supplied as files — the founder portrait, the Mantra "before" photograph, the
office workspace, and a few exteriors. They are lower resolution than the
standalone photography, so each is displayed at a size that keeps it sharp.
"Higher-resolution originals wanted" below lists them.

The three progress videos in `assets/source` are listed at the foot of the
manifest but deliberately **not** copied into `public/media` — no page uses
them, and 3.7 MB of unreferenced files should not ship to a mostly mobile
audience. Putting one on a project page is a deliberate change: poster frame,
no autoplay on cellular.

---

## Motion

- **Lenis** smooths the wheel on pointer devices only. On touch, the browser's
  own momentum scrolling is faster and more correct than anything synthesised,
  so it is left alone. GSAP's ticker drives the loop so the two never contend
  for rAF. See [`SmoothScroll.tsx`](src/components/motion/SmoothScroll.tsx).
- **The mobile menu is a native `<details>`**, not React state. A `<summary>`
  toggles the instant the HTML parses; wired to `useState` it did nothing until
  ~210KB of JavaScript had hydrated, which on a phone is seconds of tapping a
  button that appears broken. JavaScript now only improves it — scroll lock,
  Escape, close-after-navigation. Its reveal is CSS keyed off `[open]`, so the
  cascade plays with no JavaScript at all. There is deliberately no
  hide-on-scroll on the header: it took the menu button off-screen with it, and
  the transform it needed made the header a containing block, which collapsed
  the fixed panel to a 1px strip.
- **GSAP + ScrollTrigger** run one reveal system for the whole site.
  Markup opts in with an attribute and pages carry no animation code:

  ```html
  <div data-reveal="up">        <!-- rises into place -->
  <div data-reveal="mask">      <!-- image settles out of a slow scale -->
  <div data-reveal-group>       <!-- staggers its data-reveal children -->
  ```

  Content that appears without a route change — the filtered project grid —
  calls `refreshReveal()`.

- **The loading state is the logo.** There is no spinner: `.logo-loader` masks
  a sweeping gradient with the same `/logo-mark.svg` the header renders, so the
  mark appears to draw itself while something is on its way. Two places use it,
  because those are the two places on the site where a reader actually waits:
  [`app/loading.tsx`](src/app/loading.tsx) covers every route change — one
  answer to "the page is coming" for the whole site, rather than a file per
  segment — and the enquiry form’s submit button, which is a real round trip to
  a webhook or an email API.

  It fades in on a 160ms delay. Next swaps the fallback in the instant a
  navigation suspends, and most navigations here resolve far faster than that,
  so an undelayed loader would strobe on every tap — which reads as a fault
  rather than as care. Only a real wait ever becomes visible.

  **Not for images.** Every photograph goes through `Figure` or `Hero` with a
  `blurDataURL`, so a slot still loading already shows a blurred version of the
  actual photograph. A mark on top of that would replace the better loading
  state with a worse one and turn a quiet grid into a field of flickering
  logos. `LoaderOverlay` in
  [`LogoLoader.tsx`](src/components/ui/LogoLoader.tsx) exists for a frame that
  has nothing to show at all; nothing needs it yet.

  Under `prefers-reduced-motion` the band stops travelling and the mark
  breathes instead — a frozen loader tells a reader nothing.

### Autoplay runs under prefers-reduced-motion too

The home page hero used to stop advancing entirely for a reader with
`prefers-reduced-motion: reduce` set — and since the manual dots are
desktop-only (`hidden md:flex`), that reader had no way to see five of the six
featured projects at all. It sat frozen on the first slide indefinitely.

A crossfade between photographs is not the parallax, zoom or slide motion that
preference exists to suppress, so the interval in
[`Hero.tsx`](src/components/home/Hero.tsx) now runs regardless of it — hover
and focus still pause it. The crossfade itself still shortens to a near-instant
snap under reduced motion, via the global `transition-duration: 0.01ms`
override in `globals.css`; only the freeze was the bug.

### No reader ever loses content to an animation

This is the rule [`ScrollReveal.tsx`](src/components/motion/ScrollReveal.tsx)
exists to keep, and it is worth understanding before changing anything there.

An earlier version hid every reveal target with CSS the instant the page
painted, then revealed it once a ~70 KB GSAP bundle had downloaded and run.
The hide and the reveal depended on different things, so on a slow connection
the page sat blank for as long as the bundle took — and if that request ever
failed, permanently. An invisible paragraph is a far worse failure than a
missing fade.

Three things now enforce it:

1. **The hide expires on its own.** The resting state is a delayed CSS
   animation that ends visible, so the page reveals itself with no JavaScript
   at all. GSAP stamps `data-reveal-claimed` to cancel it and take over — and
   if the fallback got there first, the element is left alone rather than
   snapped back to hidden for an entrance the reader already missed.
2. **A sweep** forces anything on screen but still invisible back into view,
   covering a trigger positioned against a layout that has since moved.
3. **ScrollTrigger is refreshed as images land**, because each one shifts every
   trigger beneath it.

Verified by loading with every `.js` request aborted, with JavaScript disabled,
and on throttled 3G — see below.

## Enquiry form

[`src/app/contact/actions.ts`](src/app/contact/actions.ts) is a server action
with validation, a honeypot and in-place field errors. Delivery is
provider-agnostic — set **one** of these (see `.env.example`):

- `ENQUIRY_WEBHOOK_URL` — POSTs the enquiry as JSON (Zapier, Make, n8n, a CRM)
- `RESEND_API_KEY` + `ENQUIRY_FROM_EMAIL` — sends it as email

With neither set the form does not pretend to work: it tells the visitor it is
not connected yet and points at the studio's email address, which is on the
same page. **Set one of these before launch.**

---

## Verified

28 automated checks against the production build, on a 390x844 phone (CPU
throttled 6x) and a 1440 desktop:

- All routes 200, unknown paths 404. Build clean; 19 routes prerendered static.
- **Every page fully revealed after scrolling it** — zero elements left hidden.
- Content still visible with **every `.js` request aborted**, with **JavaScript
  disabled**, on **throttled 3G**, and under `prefers-reduced-motion`.
- **No console errors on any page**, including hydration warnings.
- Mobile menu fills the screen, locks page scroll, closes on Escape and
  releases the lock. Hero advances after a touch tap. Rapid filter switching
  leaves nothing hidden. Form flags its three required fields.
- Cards request 1080px on a phone, not 1280px.
- News dates hold in a timezone west of UTC.

Layout swept at 320, 390, 844 (landscape), 768, 1280 and 2560 — no horizontal
scroll, no clipped text, no collapsed blocks at any of them.

**CLS is 0 on every page.** LCP 100–180 ms locally; 387–653 KB per page on
mobile, of which ~210 KB is JavaScript (React, GSAP, Lenis).

## Before launch

1. **Connect the enquiry form** (above). Until then it refuses to submit.
2. **`NEXT_PUBLIC_SITE_URL`** feeds canonical URLs, `sitemap.xml` and
   `robots.txt`. Set it to the live origin.
3. **Confirm one thing:** the profile deck lists "Dr Kori's Residence — Hubli,
   4 BHK villa" as ongoing, and `assets/source` has a separate "Prakash Kore
   Residence — Hubli, ongoing". These may be the same project under two names.
   If they are, drop the `inProgress` entry.

### Higher-resolution originals wanted

All of these work at the size they are displayed; better originals would let
them run larger.

| Image | Have | Wanted for |
| --- | --- | --- |
| Sanjana S Hallad portrait | 409x409, from the deck | About page — currently held to ~220px |
| Mantra Residency, before renovation | 539x718 phone photo | The before/after pair on the project page |
| Sanctum Square office, workspace | 480x640, from the deck | The workspace section, which has no other image |
| Residential Extension, exterior | 549x731 | The only exterior of a project that is *about* its exterior |
| Akshay's House, terrace | 844x475 | Gallery |

### Photography needed before these become project pages

- **Dr Kori's Residence** — 4 BHK villa, Hubli
- **Mixed-Use Building G+3** — Shakti Colony, Hubli
- **3 BHK Villa, Bengaluru** — interiors and facade design

### Still open

**News.** Every entry is a real project milestone from the studio's documents —
nothing is invented. The page also supports `Press`, `Awards` and `Lectures`,
and the filter bar shows a category only once an entry uses it, so real
coverage can be added without touching the layout.
