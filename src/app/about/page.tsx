import type { Metadata } from "next";
import { MapPin } from "lucide-react";

import { Figure } from "@/components/media/Figure";
import {
  Container,
  Eyebrow,
  Section,
  SectionHead,
} from "@/components/ui/primitives";
import { LogoMark } from "@/components/ui/LogoMark";
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

/**
 * Horizontal rules standing in for text, flush beside the portrait on
 * mobile — same height as the image next to it.
 */
const SCRIBBLE_ROW_COUNT = 9;
const SCRIBBLE_ROW_VB_HEIGHT = 180;
const SCRIBBLE_ROW_LENGTH = 176;
const SCRIBBLE_ROWS = Array.from({ length: SCRIBBLE_ROW_COUNT }, (_, i) => {
  const pad = 1;
  return pad + (i * (SCRIBBLE_ROW_VB_HEIGHT - pad * 2)) / (SCRIBBLE_ROW_COUNT - 1);
});

function FounderScribbleRows({ className }: { className?: string }) {
  return (
    <svg
      viewBox={`0 0 192 ${SCRIBBLE_ROW_VB_HEIGHT}`}
      preserveAspectRatio="none"
      className={className}
      aria-hidden
    >
      {SCRIBBLE_ROWS.map((y) => (
        <line
          key={y}
          x1={0}
          y1={y}
          x2={SCRIBBLE_ROW_LENGTH}
          y2={y}
          stroke="currentColor"
          strokeWidth={1}
          vectorEffect="non-scaling-stroke"
        />
      ))}
    </svg>
  );
}

/**
 * Vertical ticks standing in for text, set in a short strip flush under the
 * portrait on desktop — same width as the image above it, rather than
 * leaving the space below it empty.
 */
const SCRIBBLE_TICK_COUNT = 14;
const SCRIBBLE_VB_WIDTH = 100;
const SCRIBBLE_VB_HEIGHT = 26;
const SCRIBBLE_STROKE = 2;
const SCRIBBLE_TICKS = Array.from({ length: SCRIBBLE_TICK_COUNT }, (_, i) => {
  const pad = SCRIBBLE_STROKE / 2;
  return pad + (i * (SCRIBBLE_VB_WIDTH - pad * 2)) / (SCRIBBLE_TICK_COUNT - 1);
});

function FounderScribbleCols({ className }: { className?: string }) {
  return (
    <svg
      viewBox={`0 0 ${SCRIBBLE_VB_WIDTH} ${SCRIBBLE_VB_HEIGHT}`}
      preserveAspectRatio="none"
      className={className}
      aria-hidden
    >
      {SCRIBBLE_TICKS.map((x) => (
        <line
          key={x}
          x1={x}
          y1={0}
          x2={x}
          y2={SCRIBBLE_VB_HEIGHT}
          stroke="currentColor"
          strokeWidth={1}
          vectorEffect="non-scaling-stroke"
        />
      ))}
    </svg>
  );
}

export default function AboutPage() {
  const hubballiOffice = studio.offices.find((o) => o.city === "Hubballi");
  const hubballiMapsHref = hubballiOffice
    ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(hubballiOffice.lines.join(", "))}`
    : undefined;

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
          }}
          ratio="hero"
          sizes={SIZES.full}
          priority
          showCaption={false}
        />
        <div className="text-caption mt-4 flex items-center justify-between gap-4 text-graphite">
          <p className="inline-flex items-center gap-2">
            <LogoMark className="h-4 w-auto" />
            Sanctum Square Studio
          </p>
          {hubballiMapsHref ? (
            <a
              href={hubballiMapsHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 transition-colors duration-300 hover:text-ink"
            >
              <MapPin size={14} strokeWidth={1.5} aria-hidden />
              Hubballi office
            </a>
          ) : null}
        </div>
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
            <div className="flex items-center md:col-span-3 md:flex-col md:items-stretch">
              <Figure
                figure={{
                  media: "sanctum-square/sanjana-s-hallad-portrait",
                  alt: "Sanjana S Hallad, founder and principal architect of Sanctum Square Studio.",
                }}
                ratio="square"
                sizes="(min-width: 768px) 240px, 160px"
                className="max-w-40 shrink-0 md:max-w-60"
              />
              {/* Mobile: horizontal rows beside the portrait. */}
              <FounderScribbleRows className="h-40 min-w-0 flex-1 text-ink/15 md:hidden" />
              {/* Desktop: vertical ticks below the portrait, full section height. */}
              <FounderScribbleCols className="hidden h-16 w-full max-w-40 text-ink/15 md:block md:h-auto md:min-h-0 md:max-w-60 md:flex-1" />
            </div>

            <div className="md:col-span-8 md:col-start-5">
              <div data-reveal="up">
                <Eyebrow>{studio.founder.role}</Eyebrow>
                <h2 className="text-project mt-3">{studio.founder.name}</h2>
                <p className="text-body mt-6 text-graphite">
                  {studio.founder.bio}
                </p>
              </div>
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
