import type { MetadataRoute } from "next";

import { projects } from "@/content/projects";

// `||`, not `??`: an env var Vercel collected an empty value for is set to
// `""` rather than left unset, and `"" ?? fallback` is still `""`.
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.sanctumsquare.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/projects", "/about", "/news", "/contact"].map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: path === "" ? 1 : 0.8,
  }));

  const projectRoutes = projects.map((project) => ({
    url: `${siteUrl}/projects/${project.slug}`,
    lastModified: new Date(),
    changeFrequency: "yearly" as const,
    priority: 0.7,
  }));

  return [...routes, ...projectRoutes];
}
