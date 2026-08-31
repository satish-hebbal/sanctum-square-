import NextImage from "next/image";

import { media } from "@/content/media.generated";
import { cx } from "@/lib/cx";
import { IMAGE_QUALITY } from "@/lib/media";
import type { Figure as FigureData } from "@/lib/types";

/**
 * Every image on the site, shown whole.
 *
 * Slots used to be cropped to a fixed ratio under `object-cover` — a 3:2
 * landscape on desktop, a 4:5 upright on a phone — which meant a portrait
 * photograph lost its top and bottom and a wide render lost its sides. The
 * studio's note was that images looked "zoomed on one part", and that crop was
 * the cause. Nothing is cropped now.
 *
 * Two presentations, because a grid and an article want different things:
 *
 *   Editorial slots (hero, landscape, wide, portrait, natural) take the
 *   image's own proportions. The image is as wide as its column, and the
 *   column is capped by `MAX_HEIGHT` so a tall upright still clears one phone
 *   screen — the second half of the studio's note was that reading an image
 *   took a scroll up and down.
 *
 *   Grid slots (card, square) keep a fixed box and sit the image inside it. A
 *   grid of natural-height images leaves the captions under them at different
 *   heights, which reads as broken rather than as rhythm. What is left over
 *   around the image is paper, not a grey mount, so an upright photograph in a
 *   landscape box looks inset rather than letterboxed.
 */
const RATIOS = {
  card: "aspect-[4/5] sm:aspect-[4/3]",
  square: "aspect-square",
} as const;

/** Slots that keep a fixed box. Everything else takes the image's own ratio. */
type BoxedRatio = keyof typeof RATIOS;

export type Ratio =
  | BoxedRatio
  | "hero"
  | "landscape"
  | "wide"
  | "portrait"
  | "natural";

const isBoxed = (r: Ratio): r is BoxedRatio => r === "card" || r === "square";

/**
 * The tallest an uncropped image may stand. Below the frame there is still a
 * caption and the page's own rhythm, so this leaves room for them rather than
 * filling the screen edge to edge.
 */
const MAX_HEIGHT = "78svh";

export function Figure({
  figure,
  ratio = "landscape",
  sizes,
  priority = false,
  className,
  captionClassName,
  showCaption = true,
  reveal = true,
}: {
  figure: FigureData;
  ratio?: Ratio;
  /** Always set this — it decides which file the browser actually downloads. */
  sizes: string;
  priority?: boolean;
  className?: string;
  captionClassName?: string;
  showCaption?: boolean;
  reveal?: boolean;
}) {
  const record = media[figure.media];
  const boxed = isBoxed(ratio);
  const backdrop = figure.backdrop ? media[figure.backdrop] : null;

  // A drawing laid over its own photograph. The plate keeps its box: the
  // photograph behind it is a ground, not the subject.
  if (backdrop) {
    return (
      <figure className={cx("w-full", className)}>
        <div
          className={cx("relative overflow-hidden bg-ink", RATIOS.card)}
          {...(reveal ? { "data-reveal": "mask" } : {})}
        >
          <NextImage
            src={backdrop.src}
            alt=""
            aria-hidden
            fill
            sizes={sizes}
            quality={IMAGE_QUALITY}
            priority={priority}
            loading={priority ? undefined : "lazy"}
            placeholder="blur"
            blurDataURL={backdrop.blurDataURL}
            className="object-cover"
          />
          {/* Card sized to the drawing's own aspect ratio, floating on the
              photograph rather than stretched to fill it. */}
          <div className="absolute inset-0 flex items-center justify-center p-5 sm:p-8">
            <div className="flex h-full items-center border border-hairline bg-paper p-2 sm:p-3">
              <NextImage
                src={record.src}
                alt={figure.alt}
                width={record.width}
                height={record.height}
                sizes={sizes}
                quality={IMAGE_QUALITY}
                loading="lazy"
                placeholder="blur"
                blurDataURL={record.blurDataURL}
                className="h-full w-auto object-contain"
              />
            </div>
          </div>
        </div>
        {showCaption && figure.caption ? (
          <figcaption
            className={cx("text-caption mt-4 text-graphite", captionClassName)}
          >
            {figure.caption}
          </figcaption>
        ) : null}
      </figure>
    );
  }

  return (
    <figure className={cx("w-full", className)}>
      <div
        className={cx(
          "relative mx-auto w-full overflow-hidden bg-paper",
          boxed && RATIOS[ratio],
        )}
        /*
          Capping the height alone would clamp the box while its width stayed
          at 100%, and the image would sit in it with a band down either side.
          Capping the *width* at the height limit times the image's own ratio
          constrains the same dimension with no band at all: the frame simply
          becomes as narrow as a full-height copy of this particular image.
        */
        style={
          boxed
            ? undefined
            : {
                maxWidth: `calc(${MAX_HEIGHT} * ${record.width} / ${record.height})`,
              }
        }
        {...(reveal ? { "data-reveal": "mask" } : {})}
      >
        <NextImage
          src={record.src}
          alt={figure.alt}
          {...(boxed
            ? { fill: true }
            : { width: record.width, height: record.height })}
          sizes={sizes}
          quality={IMAGE_QUALITY}
          priority={priority}
          loading={priority ? undefined : "lazy"}
          placeholder="blur"
          blurDataURL={record.blurDataURL}
          className={cx(
            "object-contain",
            boxed ? "h-full w-full" : "h-auto w-full",
          )}
        />
      </div>

      {showCaption && figure.caption ? (
        <figcaption
          className={cx("text-caption mt-4 text-graphite", captionClassName)}
        >
          {figure.caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
