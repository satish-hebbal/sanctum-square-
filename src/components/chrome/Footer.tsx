import Link from "next/link";
import { ArrowRight, ArrowUpRight, Mail, Phone } from "lucide-react";

import { nav, studio } from "@/content/studio";
import { socialIcons } from "@/components/ui/icons";
import { Container, Eyebrow } from "@/components/ui/primitives";
import { LogoMark } from "@/components/ui/LogoMark";

/**
 * Site footer.
 *
 * Desktop is four groups on one line: the brand block, then Menu, Contact and
 * Follow as equally weighted label-led columns. They all open with an eyebrow
 * sitting on the wordmark's line, and every link inside them is the same 15px
 * — the columns used to run 20px ruled rows against 15px text against 11px
 * labels, three weights starting at three different heights, which is what
 * made the whole band read as noise.
 *
 * Mobile keeps the ruled nav rows: at 44px they are the tap target, and the
 * hairlines are the only thing separating four links in a single column.
 */
export function Footer() {
  return (
    <footer className="overflow-x-clip border-t border-hairline">
      <Container>
        <div className="relative isolate grid gap-(--spacing-block) py-(--spacing-section) md:grid-cols-12 md:gap-(--spacing-col-gap)">
          {/* The mark once more, filling the empty lower right the stacked
              mobile columns leave behind and bleeding off the gutter. Struck
              into the paper rather than printed on it — see .footer-mark —
              and behind the links; the desktop grid has no such gap. */}
          <span
            aria-hidden
            className="footer-mark pointer-events-none absolute bottom-0 -z-10 right-[calc(var(--spacing-gutter)*-1)] w-64 translate-x-[60px] md:hidden"
          />
          <div className="md:col-span-5 xl:col-span-4">
            {/* A second route home. The header logo was the only one on the
                site, which is a lot to rest on a 28px mark. */}
            <Link
              href="/"
              aria-label={`${studio.name} — home`}
              className="flex items-center gap-4 transition-opacity duration-300 hover:opacity-60"
            >
              <LogoMark className="h-8 w-auto" />
              <span className="text-[1.0625rem] leading-none font-medium tracking-[0.18em] uppercase">
                {studio.name}
              </span>
            </Link>
            <p className="text-body mt-6 max-w-72 text-graphite">
              {studio.motto}
            </p>
          </div>

          {/* The three link columns are padded down by the difference between
              an 11px eyebrow and the 32px logo lockup, so their labels sit on
              the wordmark's line rather than floating above it. */}
          <nav
            aria-label="Footer"
            className="md:col-span-3 md:pt-1.5 xl:col-span-2 xl:col-start-6"
          >
            <Eyebrow>Menu</Eyebrow>
            <ul className="mt-5 md:space-y-2">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="group flex items-center justify-between border-b border-hairline py-4 text-section transition-opacity duration-300 hover:opacity-60 md:block md:border-b-0 md:py-0 md:text-body"
                  >
                    {item.label}
                    <ArrowRight
                      size={16}
                      strokeWidth={1.25}
                      aria-hidden
                      className="transition-transform duration-500 ease-(--ease-out-quint) group-hover:translate-x-1 md:hidden"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Side by side once there is room for the email address to sit on
              one line beside its icon; stacked below that. */}
          <div className="grid gap-y-10 md:col-span-4 md:pt-1.5 xl:col-span-5 xl:col-start-8 xl:grid-cols-2 xl:gap-x-(--spacing-col-gap)">
            <div>
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
            </div>

            <div>
              <Eyebrow>Follow</Eyebrow>
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
        </div>

        <div className="flex flex-col gap-3 py-8 sm:flex-row sm:items-center sm:justify-between">
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
