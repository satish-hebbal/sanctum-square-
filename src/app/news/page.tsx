import type { Metadata } from "next";

import { NewsIndex } from "@/components/news/NewsIndex";
import { Container, PageHeader, Section } from "@/components/ui/primitives";
import { news, newsCategories } from "@/content/news";

export const metadata: Metadata = {
  title: "News",
  description:
    "Project milestones and studio updates from Sanctum Square Studio.",
  alternates: { canonical: "/news" },
};

export default function NewsPage() {
  return (
    <>
      <PageHeader title="News" />
      <Section as="div" size="block" className="pt-0">
        <Container>
          <NewsIndex items={news} categories={newsCategories} />
        </Container>
      </Section>
    </>
  );
}
