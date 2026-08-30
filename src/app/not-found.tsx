import { Container, Eyebrow, Section, TextLink } from "@/components/ui/primitives";

export default function NotFound() {
  return (
    <Section size="page">
      <Container>
        <Eyebrow>Error 404</Eyebrow>
        <h1 className="text-title mt-3">This page could not be found</h1>
        <p className="text-lead mt-6 max-w-lg text-graphite">
          The page may have moved, or the address may be mistyped.
        </p>
        <div className="mt-10 flex flex-wrap gap-x-12 gap-y-4">
          <TextLink href="/projects">All projects</TextLink>
          <TextLink href="/contact">Contact the studio</TextLink>
        </div>
      </Container>
    </Section>
  );
}
