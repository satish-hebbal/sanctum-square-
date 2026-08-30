import NextImage from "next/image";

import { media } from "@/content/media.generated";
import { cx } from "@/lib/cx";
import { IMAGE_QUALITY } from "@/lib/media";
import type { Figure as FigureData } from "@/lib/types";

/**
 * Source photography arrives in every ratio there is — 16:9 renders, portrait
 * phone shots, a square plan drawing. Cropping each slot to a fixed ratio is
 * what makes the grid read as one set rather than ten.
 *
 * Ratios are declared per breakpoint: a 3:2 landscape crop is right on a
 * desktop but wastes a phone screen, so most slots stand up on mobile and
 * lie down from `md` up.
 */
const RATIOS = {
  hero: "aspect-[4/5] md:aspect-[16/9]",
  landscape: "aspect-[4/5] md:aspect-[3/2]",
  wide: "aspect-[3/4] md:aspect-[16/9]",
  card: "aspect-[4/5] sm:aspect-[4/3]",
  portrait: "aspect-[4/5]",
  square: "aspect-square",
  /** Lets the image keep its own proportions. For plans and drawings. */
  natural: "",
} as const;

export type Ratio = keyof typeof RATIOS;

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
  const natural = ratio === "natural";
  const contain = figure.fit === "contain";
  const backdrop = figure.backdrop ? media[figure.backdrop] : null;

  return (
    <figure className={cx("w-full", className)}>
      <div
        className={cx(
          "relative overflow-hidden",
          backdrop ? "bg-ink" : "bg-stone",
          RATIOS[ratio],
        )}
        {...(reveal ? { "data-reveal": "mask" } : {})}
      >
        {backdrop ? (
          <>
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
              {/* Natural sizing rather than `fill`: the image scales to the
                  frame's height and the paper card shrink-wraps its width, so
                  the border sits tight to the sheet and the padding actually
                  reads as a margin. `fill` would cover the padding box. */}
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
          </>
        ) : (
          <NextImage
            src={record.src}
            alt={figure.alt}
            {...(natural
              ? { width: record.width, height: record.height }
              : { fill: true })}
            sizes={sizes}
            quality={IMAGE_QUALITY}
            priority={priority}
            loading={priority ? undefined : "lazy"}
            placeholder="blur"
            blurDataURL={record.blurDataURL}
            className={cx(
              "h-full w-full",
              contain || natural ? "object-contain" : "object-cover",
              natural && "relative",
              // A drawing sits in its frame rather than filling it, so give it
              // air instead of letting the crop run to the edge.
              contain && !natural && "p-4 sm:p-8",
            )}
          />
        )}
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
