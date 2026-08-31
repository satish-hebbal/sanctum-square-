import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";

import { Figure } from "@/components/media/Figure";
import {
  Container,
  DataList,
  Eyebrow,
  Rule,
  Section,
} from "@/components/ui/primitives";
import { media } from "@/content/media.generated";
import { getNextProject, getProject, projects } from "@/content/projects";
import { SIZES } from "@/lib/media";


type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};

  return {
    title: project.title,
    description: project.summary,
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: {
      title: project.title,
      description: project.summary,
      images: [{ url: media[project.hero.media].src }],
    },
  };
}

export default async function ProjectPage({ params }: Params) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const next = getNextProject(project.slug);

  return (
    <article>
      {/* Hero runs to the full width of the viewport, past the page gutter. */}
      <Figure
        figure={
          // Where a project carries a plan, show it here over its own
          // photograph rather than the photograph alone — matching the
          // home page's featured treatment.
          project.heroOverlay
            ? { ...project.heroOverlay, backdrop: project.hero.media }
            : project.hero
        }
        ratio="hero"
        sizes={SIZES.viewport}
        priority
        showCaption={false}
        reveal={false}
        className="bg-stone"
      />

      <Section size="section">
        <Container>
          {/* Deep in a project, the way out is back to the list far more often
              than back to the home page — and the logo was the only route to
              either. */}
          <Link
            href="/projects"
            className="text-nav group mb-(--spacing-block) inline-flex items-center gap-2 uppercase text-graphite transition-colors duration-300 hover:text-ink"
          >
            <ArrowLeft
              size={14}
              strokeWidth={1.5}
              aria-hidden
              className="transition-transform duration-500 ease-(--ease-out-quint) group-hover:-translate-x-1"
            />
            All projects
          </Link>

          <div className="grid gap-(--spacing-block) md:grid-cols-12 md:gap-(--spacing-col-gap)">
            <div className="md:col-span-7" data-reveal="up">
              <Eyebrow>{project.eyebrow}</Eyebrow>
              <h1 className="text-hero mt-3">{project.title}</h1>
              <p className="text-lead mt-8 max-w-2xl text-graphite">
                {project.lede}
              </p>
            </div>

            <div className="md:col-span-4 md:col-start-9" data-reveal="up">
              <DataList items={project.facts} />
            </div>
          </div>
        </Container>
      </Section>

      <Container>
        <Rule />
      </Container>

      <Section size="section">
        <Container>
          <div className="space-y-(--spacing-section)">
            {project.sections.map((section) => (
              <section key={section.title}>
                <div className="grid gap-8 md:grid-cols-12 md:gap-(--spacing-col-gap)">
                  <h2
                    className="text-section md:col-span-3"
                    data-reveal="up"
                  >
                    {section.title}
                  </h2>
                  <div
                    className="space-y-6 md:col-span-8 md:col-start-5"
                    data-reveal-group
                  >
                    {section.body.map((paragraph, i) => (
                      <p key={i} className="text-body max-w-2xl" data-reveal="up">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>

                {section.figures?.length ? (
                  <div
                    className={
                      section.figures.length > 1
                        ? "mt-(--spacing-block) grid gap-(--spacing-col-gap) sm:grid-cols-2"
                        : "mt-(--spacing-block)"
                    }
                  >
                    {section.figures.map((figure) => (
                      <Figure
                        key={figure.media}
                        figure={figure}
                        ratio={
                          section.figures!.length > 1 ? "card" : "landscape"
                        }
                        sizes={
                          section.figures!.length > 1 ? SIZES.half : SIZES.body
                        }
                      />
                    ))}
                  </div>
                ) : null}
              </section>
            ))}
          </div>
        </Container>
      </Section>

      {project.gallery.length ? (
        <Section size="block" aria-label="Gallery">
          <Container>
            <div
              className="grid gap-(--spacing-col-gap) sm:grid-cols-2"
              data-reveal-group
            >
              {project.gallery.map((figure) => (
                <Figure
                  key={figure.media}
                  figure={figure}
                  ratio="card"
                  sizes={SIZES.half}
                />
              ))}
            </div>
          </Container>
        </Section>
      ) : null}

      <Section size="block" className="border-t border-hairline">
        <Container>
          <Link
            href={`/projects/${next.slug}`}
            className="group flex items-end justify-between gap-6"
          >
            <span>
              <Eyebrow as="span" className="block">
                Next project
              </Eyebrow>
              <span className="text-project mt-2 block">{next.title}</span>
            </span>
            <ArrowRight
              size={28}
              strokeWidth={1}
              aria-hidden
              className="mb-2 shrink-0 transition-transform duration-500 ease-(--ease-out-quint) group-hover:translate-x-2"
            />
          </Link>
        </Container>
      </Section>
    </article>
  );
}
