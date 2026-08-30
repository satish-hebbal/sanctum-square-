import type { Metadata } from "next";

import { EnquiryForm } from "@/components/contact/EnquiryForm";
import { Mail, Phone, ArrowUpRight } from "lucide-react";

import { Figure } from "@/components/media/Figure";
import { socialIcons } from "@/components/ui/icons";
import {
  Container,
  DataList,
  PageHeader,
  Section,
  SectionHead,
} from "@/components/ui/primitives";
import { studio } from "@/content/studio";
import { SIZES } from "@/lib/media";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Studio offices in Bengaluru and Hubballi. For new projects, collaborations and enquiries.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  const details = [
    ...studio.offices.map((office) => ({
      label: office.city,
      value: (
        <span className="block">
          {office.lines.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </span>
      ),
    })),
    {
      label: "General",
      value: (
        <span className="block space-y-2">
          <a
            href={`mailto:${studio.contact.email}`}
            className="flex items-center gap-2.5 transition-opacity duration-300 hover:opacity-60"
          >
            <Mail
              size={15}
              strokeWidth={1.25}
              aria-hidden
              className="shrink-0 text-graphite"
            />
            {studio.contact.email}
          </a>
          <a
            href={`tel:${studio.contact.phoneHref}`}
            className="flex items-center gap-2.5 transition-opacity duration-300 hover:opacity-60"
          >
            <Phone
              size={15}
              strokeWidth={1.25}
              aria-hidden
              className="shrink-0 text-graphite"
            />
            {studio.contact.phone}
          </a>
        </span>
      ),
    },
    {
      label: "Follow",
      value: (
        <span className="block space-y-2">
          {studio.social.map((s) => {
            const Mark = socialIcons[s.label as keyof typeof socialIcons];
            return (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2.5 transition-opacity duration-300 hover:opacity-60"
              >
                {Mark ? (
                  <Mark
                    size={15}
                    strokeWidth={1.25}
                    aria-hidden
                    className="shrink-0 text-graphite"
                  />
                ) : null}
                {s.label}
                <ArrowUpRight
                  size={13}
                  strokeWidth={1.25}
                  aria-hidden
                  className="text-graphite"
                />
              </a>
            );
          })}
        </span>
      ),
    },
  ];

  return (
    <>
      <PageHeader
        title="Contact"
        intro="For new projects, collaborations, and enquiries about the studio's work."
      />

      <Section as="div" size="block" className="pt-0">
        <Container>
          <div className="grid gap-(--spacing-block) md:grid-cols-12 md:gap-(--spacing-col-gap)">
            <div className="md:col-span-6" data-reveal="up">
              <DataList items={details} />
            </div>

            <div className="md:col-span-5 md:col-start-8">
              <Figure
                figure={{
                  media: "sanctum-square/whatsapp-image-2026-08-11-at-12-13-00-pm",
                  alt: "Reception at the Hubballi studio, with a planted trough above the counter.",
                  caption: "Hubballi studio",
                }}
                ratio="portrait"
                sizes={SIZES.side}
                priority
              />
            </div>
          </div>
        </Container>
      </Section>

      <Section size="section" className="border-t border-hairline">
        <Container>
          {/* Head and form share one measure so the rule ends where the
              fields do rather than running past them. */}
          <div className="md:max-w-3xl">
            <SectionHead title="Start a project" />
            <EnquiryForm />
          </div>
        </Container>
      </Section>
    </>
  );
}
