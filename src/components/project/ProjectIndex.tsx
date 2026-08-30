"use client";

import { useEffect, useMemo, useState } from "react";

import { refreshReveal } from "@/components/motion/ScrollReveal";
import { ProjectCard } from "@/components/project/ProjectCard";
import { cx } from "@/lib/cx";
import { CATEGORIES, type Category, type Project } from "@/lib/types";
import { SIZES } from "@/lib/media";

const CARD_SIZES = SIZES.third;

export function ProjectIndex({ projects }: { projects: Project[] }) {
  const [active, setActive] = useState<Category | null>(null);

  // Only offer a category the studio actually has work in.
  const available = useMemo(() => {
    const used = new Set(projects.map((p) => p.category));
    return CATEGORIES.filter((c) => used.has(c));
  }, [projects]);

  const shown = useMemo(
    () => (active ? projects.filter((p) => p.category === active) : projects),
    [projects, active],
  );

  // The grid below is keyed on the filter, so switching replaces every card
  // with a fresh node. Those nodes start hidden and need triggers of their own.
  useEffect(refreshReveal, [active]);

  return (
    <>
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <ul className="-mx-1 flex flex-wrap items-center gap-x-1 gap-y-2">
          {[null, ...available].map((category) => {
            const selected = active === category;
            return (
              <li key={category ?? "all"}>
                <button
                  type="button"
                  onClick={() => setActive(category)}
                  aria-pressed={selected}
                  className={cx(
                    "text-nav px-1 py-2 uppercase transition-colors duration-300",
                    selected ? "text-ink" : "text-graphite hover:text-ink",
                  )}
                >
                  {category ?? "All"}
                </button>
              </li>
            );
          })}
        </ul>

        <p className="text-eyebrow text-graphite uppercase" aria-live="polite">
          {shown.length} {shown.length === 1 ? "Project" : "Projects"}
        </p>
      </div>

      <hr className="mt-6 h-px w-full border-0 bg-hairline" />

      {/*
        Keying the grid on the filter remounts the cards, so the reveal state
        resets and a freshly filtered set animates in rather than appearing
        half-faded from the previous pass.
      */}
      <div
        key={active ?? "all"}
        className="mt-(--spacing-block) grid gap-x-(--spacing-col-gap) gap-y-(--spacing-block) sm:grid-cols-2 lg:grid-cols-3"
        data-reveal-group
      >
        {shown.map((project, i) => (
          <ProjectCard
            key={project.slug}
            project={project}
            sizes={CARD_SIZES}
            // Only the first card is above the fold on a phone. Preloading
            // three makes the other two compete with it for a narrow pipe.
            priority={i === 0}
            titleAs="h2"
          />
        ))}
      </div>
    </>
  );
}
