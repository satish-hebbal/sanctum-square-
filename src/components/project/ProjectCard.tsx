import Link from "next/link";

import { Figure } from "@/components/media/Figure";
import { Eyebrow, StatusDot } from "@/components/ui/primitives";
import { cx } from "@/lib/cx";
import type { Project } from "@/lib/types";

export function ProjectCard({
  project,
  sizes,
  priority = false,
  className,
  /**
   * On /projects the cards are the page's top-level content and sit directly
   * under the h1, so they are h2 there. On the home page they sit inside a
   * section that already has its own h2, so they stay h3. Passing the level
   * keeps the document outline from skipping a rank.
   */
  titleAs: Title = "h3",
}: {
  project: Project;
  sizes: string;
  priority?: boolean;
  className?: string;
  titleAs?: "h2" | "h3";
}) {
  return (
    <article className={cx("group", className)} data-reveal="up">
      <Link href={`/projects/${project.slug}`} className="block">
        <div className="overflow-hidden">
          <Figure
            figure={project.hero}
            ratio="card"
            sizes={sizes}
            priority={priority}
            showCaption={false}
            reveal={false}
            className="[&_img]:transition-transform [&_img]:duration-700 [&_img]:ease-(--ease-out-quint) group-hover:[&_img]:scale-[1.03]"
          />
        </div>

        <Eyebrow className="mt-5">{project.eyebrow}</Eyebrow>
        <Title className="text-section mt-2">{project.title}</Title>
        <p className="text-small mt-1 flex items-center gap-1.5 text-graphite">
          {project.location} ·
          {project.status === "Ongoing" && <StatusDot />}
          {project.status}
        </p>
      </Link>
    </article>
  );
}
