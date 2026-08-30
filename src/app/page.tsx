import Link from "next/link";

import { Hero } from "@/components/home/Hero";
import { Figure } from "@/components/media/Figure";
import {
  Container,
  Eyebrow,
  Section,
  SectionHead,
  TextLink,
} from "@/components/ui/primitives";
import { formatNewsDate, news, newsHref } from "@/content/news";
import { featuredProjects, heroSlides } from "@/content/projects";
import { studio } from "@/content/studio";
import { SIZES } from "@/lib/media";

const FULL = {
  wrap: "",
  ratio: "hero",
  sizes: SIZES.full,
} as const;

/**
 * Featured projects step down in width as you scroll — full, full, two-thirds.
 * The change of measure is what stops three stacked photographs from reading
 * as a list.
 */
const FEATURED_WIDTHS = [
  FULL,
  FULL,
  {
    wrap: "md:max-w-[70%]",
    ratio: "hero",
    sizes: SIZES.twoThirds,
  },
] as const;

/**
 * A drawing is not a photograph and does not survive a 16:9 crop. Contained
 * figures get a narrow upright plate instead — the way a plan is printed in a
 * monograph — so the sheet is large enough to actually read.
 */
const PLATE = {
  wrap: "md:max-w-[46%]",
  ratio: "portrait",
  sizes: SIZES.plate,
} as const;

export default function HomePage() {
  const latest = news.slice(0, 3);

  return (
    <>
      <Hero slides={heroSlides} />

      <Section size="section">
        <Container>
          <div className="md:grid md:grid-cols-12 md:gap-(--spacing-col-gap)">
            <div className="md:col-span-9 lg:col-span-8">
              <p className="text-statement" data-reveal="up">
                {studio.statement}
              </p>
              <div className="mt-10" data-reveal="up">
                <TextLink href="/about">Firm background</TextLink>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <Section size="block" aria-labelledby="featured-heading">
        <Container>
          <h2 id="featured-heading" className="sr-only">
            Featured projects
          </h2>

          <div className="space-y-(--spacing-section)">
            {featuredProjects.slice(0, 3).map((project, i) => {
              const width =
                project.hero.fit === "contain"
                  ? PLATE
                  : (FEATURED_WIDTHS[i] ?? FULL);
              return (
                <article key={project.slug} className={width.wrap}>
                  <Link
                    href={`/projects/${project.slug}`}
                    className="group block"
                  >
                    <div data-reveal="up">
                      <Eyebrow>{project.eyebrow}</Eyebrow>
                      <h3 className="text-project mt-2 mb-8">
                        <span className="bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_1px] bg-position-[0_100%] bg-no-repeat transition-[background-size] duration-700 ease-(--ease-out-quint) group-hover:bg-[length:100%_1px]">
                          {project.title}
                        </span>
                      </h3>
                    </div>

                    <Figure
                      figure={
                        // Where a project carries a plan, show it here over
                        // its own photograph rather than the photograph alone.
                        project.heroOverlay
                          ? {
                              ...project.heroOverlay,
                              backdrop: project.hero.media,
                            }
                          : project.hero
                      }
                      ratio={width.ratio}
                      sizes={width.sizes}
                      showCaption={false}
                      className="overflow-hidden [&_img]:transition-transform [&_img]:duration-700 [&_img]:ease-(--ease-out-quint) group-hover:[&_img]:scale-[1.02]"
                    />
                  </Link>
                </article>
              );
            })}
          </div>

          <div className="mt-(--spacing-block)" data-reveal="up">
            <TextLink href="/projects">All projects</TextLink>
          </div>
        </Container>
      </Section>

      <Section size="section" aria-labelledby="news-heading">
        <Container>
          <SectionHead
            title="News"
            action={
              <span className="hidden sm:block">
                <TextLink href="/news">All news</TextLink>
              </span>
            }
          />

          <div
            className="grid gap-(--spacing-block) sm:grid-cols-2 lg:grid-cols-3 lg:gap-(--spacing-col-gap)"
            data-reveal-group
          >
            {latest.map((item) => {
              const href = newsHref(item);
              const card = (
                <>
                  <Figure
                    figure={item.figure}
                    ratio="card"
                    sizes={SIZES.third}
                    showCaption={false}
                    reveal={false}
                    className="overflow-hidden [&_img]:transition-transform [&_img]:duration-700 [&_img]:ease-(--ease-out-quint) group-hover:[&_img]:scale-[1.03]"
                  />
                  <Eyebrow className="mt-5">
                    {item.category} · {formatNewsDate(item.date)}
                  </Eyebrow>
                  <h3 className="text-section mt-2">{item.title}</h3>
                </>
              );

              return (
                <article key={item.slug} data-reveal="up">
                  {href ? (
                    <Link href={href} className="group block">
                      {card}
                    </Link>
                  ) : (
                    card
                  )}
                </article>
              );
            })}
          </div>

          <div className="mt-(--spacing-block) sm:hidden" data-reveal="up">
            <TextLink href="/news">All news</TextLink>
          </div>
        </Container>
      </Section>
    </>
  );
}
