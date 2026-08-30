import Link from "next/link";
import { ArrowRight, ArrowUpRight, Mail, Phone } from "lucide-react";

import { nav, studio } from "@/content/studio";
import { socialIcons } from "@/components/ui/icons";
import { Container, Eyebrow } from "@/components/ui/primitives";

export function Footer() {
  return (
    <footer className="border-t border-hairline">
      <Container>
        <div className="grid gap-(--spacing-block) py-(--spacing-section) md:grid-cols-12 md:gap-(--spacing-col-gap)">
          <div className="md:col-span-5">
            {/* A second route home. The header logo was the only one on the
                site, which is a lot to rest on a 28px mark. */}
            <Link
              href="/"
              aria-label={`${studio.name} — home`}
              className="flex items-center gap-4 transition-opacity duration-300 hover:opacity-60"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/logo-mark.svg"
                alt=""
                width={34}
                height={33}
                className="h-8 w-auto"
              />
              <span className="text-[1.0625rem] leading-none font-medium tracking-[0.18em] uppercase">
                {studio.name}
              </span>
            </Link>
            <p className="text-body mt-6 max-w-80 text-graphite">
              {studio.motto}
            </p>
            <p className="text-small mt-3 max-w-80 text-graphite">
              Offices in {studio.offices.map((o) => o.city).join(" and ")}.
            </p>
          </div>

          <nav aria-label="Footer" className="md:col-span-3">
            <ul>
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="group flex items-center justify-between border-b border-hairline py-4 text-section transition-opacity duration-300 hover:opacity-60"
                  >
                    {item.label}
                    <ArrowRight
                      size={16}
                      strokeWidth={1.25}
                      aria-hidden
                      className="transition-transform duration-500 ease-(--ease-out-quint) group-hover:translate-x-1"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-4">
            <Eyebrow>Contact</Eyebrow>
            <div className="text-body mt-5 space-y-2">
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
            </div>

            <Eyebrow className="mt-10">Follow</Eyebrow>
            <ul className="text-body mt-5 space-y-2">
              {studio.social.map((s) => {
                const Mark = socialIcons[s.label as keyof typeof socialIcons];
                return (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noreferrer"
                      className="group inline-flex items-center gap-2.5 transition-opacity duration-300 hover:opacity-60"
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
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t border-hairline py-8 sm:flex-row sm:items-center sm:justify-between">
          <Eyebrow>
            © {studio.legalName} {new Date().getFullYear()}
          </Eyebrow>
          <Eyebrow>
            {studio.offices.map((o) => o.city).join(" · ")}
          </Eyebrow>
        </div>
      </Container>
    </footer>
  );
}
