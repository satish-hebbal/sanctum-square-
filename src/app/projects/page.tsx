import type { Metadata } from "next";

import { ProjectIndex } from "@/components/project/ProjectIndex";
import {
  Container,
  Eyebrow,
  PageHeader,
  Section,
  SectionHead,
} from "@/components/ui/primitives";
import { projects } from "@/content/projects";
import { inProgress } from "@/content/studio";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Architecture, interiors, facade and township work across Karnataka and Maharashtra.",
  alternates: { canonical: "/projects" },
};

export default function ProjectsPage() {
  return (
    <>
      <PageHeader title="Projects" />
      <Section as="div" size="block" className="pt-0">
        <Container>
          <ProjectIndex projects={projects} />
        </Container>
      </Section>

      {/*
        Work the studio has named but not yet photographed. A list keeps it on
        the record without putting an imageless card in an image-driven grid.
      */}
      <Section size="section" aria-label="Also in progress">
        <Container>
          <SectionHead title="Also in progress" rule={false} />
          <ul className="grid gap-x-(--spacing-col-gap) sm:grid-cols-2 lg:grid-cols-3">
            {inProgress.map((item) => (
              <li key={item.title} className="border-t border-hairline py-6">
                <Eyebrow>{item.detail}</Eyebrow>
                <h3 className="text-section mt-2">{item.title}</h3>
                <p className="text-small mt-1 text-graphite">
                  {item.location} · Ongoing
                </p>
              </li>
            ))}
          </ul>
        </Container>
      </Section>
    </>
  );
}
