import type { MediaKey } from "@/content/media.generated";

/** The filter set on /projects. Order here is the order shown. */
export const CATEGORIES = [
  "Residential",
  "Commercial",
  "Hospitality",
  "Interiors",
  "Urban Planning",
] as const;

export type Category = (typeof CATEGORIES)[number];

export type Figure = {
  media: MediaKey;
  /** Describes the image for screen readers and when it fails to load. */
  alt: string;
  /** Shown under the image. Omit where the image speaks for itself. */
  caption?: string;
  /**
   * Photographs fill their frame; drawings must not. Setting "contain" here
   * rather than at each call site means a plan is never cropped, wherever in
   * the site it happens to appear.
   */
  fit?: "cover" | "contain";
  /**
   * A photograph shown full-bleed behind a contained drawing, instead of flat
   * stone. The drawing then sits on a bordered paper card over that photo —
   * a plan floating on the landscape it belongs to, rather than on empty grey.
   */
  backdrop?: MediaKey;
};

export type ProjectSection = {
  title: string;
  body: string[];
  figures?: Figure[];
};

/** Left-hand label / right-hand value rows in the project fact table. */
export type Fact = {
  label: string;
  value: string;
};

export type Project = {
  slug: string;
  title: string;
  category: Category;
  /** Uppercase label above the title. Kept short — two terms at most. */
  eyebrow: string;
  location: string;
  status: "Completed" | "Ongoing";
  /** One sentence. Used on cards and as the meta description. */
  summary: string;
  /** Opening paragraph on the project page. */
  lede: string;
  facts: Fact[];
  hero: Figure;
  /**
   * A plan, elevation or diagram shown as a small inset on the full-bleed
   * project-page hero — bottom-right, over the photograph. For orientation at
   * a glance, not for reading: a drawing dense enough to need study belongs
   * in a section figure instead, sized to be legible, in addition to this.
   * Only the project detail page renders it; card and home-page treatments of
   * the hero are unaffected.
   */
  heroOverlay?: Figure;
  sections: ProjectSection[];
  gallery: Figure[];
  /** Featured projects appear on the home page, in this order. */
  featured?: number;
};

export type NewsCategory = "News" | "Press" | "Awards" | "Lectures";

export type NewsItem = {
  slug: string;
  category: NewsCategory;
  /** ISO date. Rendered as "July 2026". */
  date: string;
  title: string;
  excerpt: string;
  figure: Figure;
  /** Links the entry to a project page where one exists. */
  project?: string;
};
