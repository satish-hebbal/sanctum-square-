"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import type { ReactNode } from "react";

import { Figure } from "@/components/media/Figure";
import { refreshReveal } from "@/components/motion/ScrollReveal";
import { Eyebrow } from "@/components/ui/primitives";
import { formatNewsDate, newsHref } from "@/content/news";
import { cx } from "@/lib/cx";
import type { NewsCategory, NewsItem } from "@/lib/types";
import { SIZES } from "@/lib/media";

/** Wraps the card in a link only where the entry has somewhere to go. */
function MaybeLink({
  href,
  children,
}: {
  href?: string;
  children: ReactNode;
}) {
  if (!href) return <div className="block">{children}</div>;
  return (
    <Link href={href} className="group block">
      {children}
    </Link>
  );
}

const HOVER_ZOOM =
  "overflow-hidden [&_img]:transition-transform [&_img]:duration-700 [&_img]:ease-(--ease-out-quint) group-hover:[&_img]:scale-[1.03]";

export function NewsIndex({
  items,
  categories,
}: {
  items: NewsItem[];
  categories: readonly NewsCategory[];
}) {
  const [active, setActive] = useState<NewsCategory | null>(null);

  const shown = useMemo(
    () => (active ? items.filter((i) => i.category === active) : items),
    [items, active],
  );

  useEffect(refreshReveal, [active]);

  const [lead, ...rest] = shown;

  return (
    <>
      {/* A single category makes the bar a label, not a choice. Leave it out. */}
      {categories.length > 1 ? (
        <>
          <ul className="-mx-1 flex flex-wrap items-center gap-x-1 gap-y-2">
            {[null, ...categories].map((category) => {
              const selected = active === category;
              return (
                <li key={category ?? "all"}>
                  <button
                    type="button"
                    onClick={() => setActive(category)}
                    aria-pressed={selected}
                    className={cx(
                      "text-nav bg-[linear-gradient(currentColor,currentColor)] bg-position-[0_100%] bg-no-repeat px-1 py-2 uppercase transition-[background-size,color] duration-300 ease-(--ease-out-quint)",
                      selected
                        ? "bg-[length:100%_1px] text-ink"
                        : "bg-[length:0%_1px] text-graphite hover:text-ink",
                    )}
                  >
                    {category ?? "All"}
                  </button>
                </li>
              );
            })}
          </ul>
          <hr className="mt-6 h-px w-full border-0 bg-hairline" />
        </>
      ) : null}

      <div key={active ?? "all"}>
        {lead ? (
          <article className="mt-(--spacing-block)">
            <MaybeLink href={newsHref(lead)}>
              <div className="grid gap-8 md:grid-cols-12 md:gap-(--spacing-col-gap)">
                <div className="md:col-span-7">
                  <Figure
                    figure={lead.figure}
                    ratio="landscape"
                    sizes={SIZES.lead}
                    priority
                    showCaption={false}
                    reveal={false}
                    className={HOVER_ZOOM}
                  />
                </div>

                <div className="md:col-span-4 md:col-start-9 md:self-center">
                  <Eyebrow>
                    {lead.category} · {formatNewsDate(lead.date)}
                  </Eyebrow>
                  <h2 className="text-project mt-3">{lead.title}</h2>
                  <p className="text-body mt-5 text-graphite">{lead.excerpt}</p>
                </div>
              </div>
            </MaybeLink>
          </article>
        ) : null}

        {rest.length ? (
          <div
            className="mt-(--spacing-section) grid gap-x-(--spacing-col-gap) gap-y-(--spacing-block) sm:grid-cols-2 lg:grid-cols-3"
            data-reveal-group
          >
            {rest.map((item) => (
              <article key={item.slug} data-reveal="up">
                <MaybeLink href={newsHref(item)}>
                  <Figure
                    figure={item.figure}
                    ratio="card"
                    sizes={SIZES.third}
                    showCaption={false}
                    reveal={false}
                    className={HOVER_ZOOM}
                  />
                  <Eyebrow className="mt-5">
                    {item.category} · {formatNewsDate(item.date)}
                  </Eyebrow>
                  <h2 className="text-section mt-2">{item.title}</h2>
                  <p className="text-small mt-3 text-graphite">{item.excerpt}</p>
                </MaybeLink>
              </article>
            ))}
          </div>
        ) : null}
      </div>
    </>
  );
}
