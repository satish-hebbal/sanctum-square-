import Link from "next/link";
import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";

import { cx } from "@/lib/cx";

/**
 * The vocabulary every page is built from. Pages compose these rather than
 * inventing spacing, weights or rules of their own — that is what keeps the
 * site consistent as it grows.
 */

/* -------------------------------------------------------------------------- */
/* Layout                                                                     */
/* -------------------------------------------------------------------------- */

/** Page gutter and max width. Everything sits inside one of these. */
export function Container({
  children,
  className,
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: ElementType;
}) {
  return (
    <Tag
      className={cx(
        "mx-auto w-full max-w-(--container-page) px-(--spacing-gutter)",
        className,
      )}
    >
      {children}
    </Tag>
  );
}

/** Vertical rhythm. Three steps, no ad-hoc values. */
export function Section({
  children,
  className,
  size = "section",
  as: Tag = "section",
  ...rest
}: {
  children: ReactNode;
  className?: string;
  size?: "block" | "section" | "page";
  as?: ElementType;
} & Omit<ComponentPropsWithoutRef<"section">, "className" | "children">) {
  const pad = {
    block: "py-(--spacing-block)",
    section: "py-(--spacing-section)",
    page: "py-(--spacing-page)",
  }[size];

  return (
    <Tag className={cx(pad, className)} {...rest}>
      {children}
    </Tag>
  );
}

/** The hairline that does the structural work in place of borders and boxes. */
export function Rule({ className }: { className?: string }) {
  return <hr className={cx("h-px w-full border-0 bg-hairline", className)} />;
}

/* -------------------------------------------------------------------------- */
/* Type                                                                       */
/* -------------------------------------------------------------------------- */

/** Uppercase category label. The only place tracking goes positive. */
export function Eyebrow({
  children,
  className,
  as: Tag = "p",
}: {
  children: ReactNode;
  className?: string;
  as?: ElementType;
}) {
  return (
    <Tag className={cx("text-eyebrow text-graphite uppercase", className)}>
      {children}
    </Tag>
  );
}

/**
 * A section title sitting above a full-width hairline — the pattern the
 * Figma uses for News, Services and the project body.
 */
export function SectionHead({
  title,
  action,
  className,
  rule = true,
}: {
  title: string;
  action?: ReactNode;
  className?: string;
  /**
   * Set false when the content below opens with its own top hairline — a
   * bordered list or table. Two rules a gap apart read as a mistake, so the
   * list's own border becomes the head's rule and the spacing tightens to
   * where that rule would have sat.
   */
  rule?: boolean;
}) {
  return (
    <div className={cx(rule ? "mb-(--spacing-block)" : "mb-6", className)}>
      <div className="flex items-baseline justify-between gap-6">
        <h2 className="text-title">{title}</h2>
        {action}
      </div>
      {rule ? <Rule className="mt-6" /> : null}
    </div>
  );
}

/**
 * The masthead every non-home page opens with, so Projects, About, News and
 * Contact all begin at the same place on the page.
 */
export function PageHeader({
  title,
  intro,
  children,
}: {
  title: string;
  intro?: string;
  children?: ReactNode;
}) {
  return (
    <Container as="header" className="pt-(--spacing-block) pb-(--spacing-block)">
      <h1 className="text-title max-w-4xl" data-reveal="up">
        {title}
      </h1>
      {intro ? (
        <p className="text-lead mt-6 max-w-2xl text-graphite" data-reveal="up">
          {intro}
        </p>
      ) : null}
      {children ? <div className="mt-(--spacing-block)">{children}</div> : null}
    </Container>
  );
}

/* -------------------------------------------------------------------------- */
/* Links and actions                                                          */
/* -------------------------------------------------------------------------- */

/**
 * Text link whose rule retracts to the right and redraws from the left on
 * hover. No colour change — the underline and a north-east arrow carry the
 * affordance.
 *
 * Sized as a plain inline-block: an inline-flex box here shrinks to its
 * min-content and breaks two-word labels across lines.
 */
/**
 * North-east arrow. Sized in `em` so it tracks whatever type it sits in, and
 * drawn in `currentColor` so it inherits the link's colour rather than
 * introducing one of its own.
 */
export function ArrowNE({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 12 12"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.25"
      className={cx("inline-block size-[0.7em] align-baseline", className)}
    >
      <path d="M2 10 10 2M4 2h6v6" />
    </svg>
  );
}

export function TextLink({
  href,
  children,
  className,
  external,
}: {
  href: string;
  children: ReactNode;
  className?: string;
  external?: boolean;
}) {
  const inner = (
    <span className="text-section relative inline-block pb-2 whitespace-nowrap">
      {children}
      <ArrowNE className="ml-2" />
      <span
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-px origin-right scale-x-100 bg-ink transition-transform duration-300 ease-(--ease-out-quint) group-hover:scale-x-0"
      />
      <span
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-ink transition-transform duration-300 ease-(--ease-out-quint) group-hover:scale-x-100 group-hover:delay-300"
      />
    </span>
  );

  const classes = cx("group inline-block", className);

  if (external) {
    return (
      <a href={href} className={classes} target="_blank" rel="noreferrer">
        {inner}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {inner}
    </Link>
  );
}

/** The single filled button on the site, used to submit the enquiry form. */
export function Button({
  children,
  className,
  ...rest
}: ComponentPropsWithoutRef<"button">) {
  return (
    <button
      className={cx(
        "text-nav inline-flex items-center justify-center bg-ink px-10 py-4 uppercase text-paper",
        "transition-opacity duration-300 hover:opacity-70",
        "disabled:pointer-events-none disabled:opacity-40",
        className,
      )}
      {...rest}
    >
      {children}
    </button>
  );
}

/* -------------------------------------------------------------------------- */
/* Data                                                                       */
/* -------------------------------------------------------------------------- */

/**
 * Label / value rows separated by hairlines. Used for project facts, the
 * founder's credits and the office addresses, so all three read alike.
 */
export function DataList({
  items,
  className,
}: {
  items: readonly { label: string; value: ReactNode }[];
  className?: string;
}) {
  return (
    <dl className={cx("w-full", className)}>
      {items.map((item, i) => (
        <div
          key={`${item.label}-${i}`}
          className="grid grid-cols-1 gap-1 border-t border-hairline py-5 sm:grid-cols-[9rem_1fr] sm:gap-6"
        >
          <dt className="text-eyebrow pt-1 text-graphite uppercase">
            {item.label}
          </dt>
          <dd className="text-body">{item.value}</dd>
        </div>
      ))}
    </dl>
  );
}
