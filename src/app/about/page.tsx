import type { Metadata } from "next";

import { Figure } from "@/components/media/Figure";
import {
  Container,
  DataList,
  Eyebrow,
  Section,
  SectionHead,
} from "@/components/ui/primitives";
import { studio } from "@/content/studio";
import { SIZES } from "@/lib/media";

export const metadata: Metadata = {
  title: "About",
  description: studio.description,
  alternates: { canonical: "/about" },
};

const SUBNAV = [
  { label: "Practice", href: "#practice" },
  { label: "Founder", href: "#founder" },
  { label: "Services", href: "#services" },
];

export default function AboutPage() {
  return (
    <>
      <Container as="header" className="pt-(--spacing-block)">
        <nav aria-label="On this page">
          <ul className="flex flex-wrap gap-x-8 gap-y-2">
            {SUBNAV.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="text-nav text-graphite uppercase transition-colors duration-300 hover:text-ink"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <h1 className="text-title mt-(--spacing-block)" data-reveal="up">
          Firm background
        </h1>
      </Container>

      <Section size="block">
        <Container>
          <p className="text-statement max-w-4xl" data-reveal="up">
            {studio.statement}
          </p>
        </Container>
      </Section>

      <Container>
        <Figure
          figure={{
            media: "sanctum-square/whatsapp-image-2026-08-11-at-12-12-17-pm",
            alt: "Corridor in the studio's own office, lined with glass partitions and recessed linear lighting.",
            caption: "Sanctum Square Studio — Hubballi office",
          }}
          ratio="hero"
          sizes={SIZES.full}
          priority
        />
      </Container>

      <Section size="section" id="practice" className="scroll-mt-24">
        <Container>
          <div className="grid gap-8 md:grid-cols-12 md:gap-(--spacing-col-gap)">
            <Eyebrow className="md:col-span-3">Practice</Eyebrow>
            <div
              className="space-y-6 md:col-span-8 md:col-start-5"
              data-reveal-group
            >
              {studio.practice.map((paragraph, i) => (
                <p key={i} className="text-lead max-w-2xl" data-reveal="up">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      <Section
        size="section"
        id="founder"
        className="scroll-mt-24 border-t border-hairline"
      >
        <Container>
          <div className="grid gap-(--spacing-block) md:grid-cols-12 md:gap-(--spacing-col-gap)">
            {/*
              The only portrait the studio has supplied is 409px square, taken
              from their profile deck. Held to a narrow measure it stays sharp
              on a 2x screen — and a restrained headshot is the right register
              here anyway. Swap in a larger original and this can grow.
            */}
            <div className="md:col-span-3">
              <Figure
                figure={{
                  media: "sanctum-square/sanjana-s-hallad-portrait",
                  alt: "Sanjana S Hallad, founder and principal architect of Sanctum Square Studio.",
                }}
                ratio="square"
                sizes="220px"
                className="max-w-55"
              />
            </div>

            <div className="md:col-span-8 md:col-start-5">
              <div data-reveal="up">
                <Eyebrow>{studio.founder.role}</Eyebrow>
                <h2 className="text-project mt-3">{studio.founder.name}</h2>
                <p className="text-body mt-6 text-graphite">
                  {studio.founder.bio}
                </p>
              </div>

              <DataList className="mt-10" items={studio.founder.credits} />
            </div>
          </div>
        </Container>
      </Section>

      <Section size="section" id="services" className="scroll-mt-24">
        <Container>
          <SectionHead title="Services" rule={false} />

          <ul
            className="grid gap-x-(--spacing-col-gap) sm:grid-cols-2 lg:grid-cols-4"
            data-reveal-group
          >
            {studio.services.map((service, i) => (
              <li
                key={service}
                className="border-t border-hairline py-6"
                data-reveal="up"
              >
                <span className="text-eyebrow block text-graphite tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-section mt-2 block">{service}</span>
              </li>
            ))}
          </ul>
        </Container>
      </Section>
    </>
  );
}
