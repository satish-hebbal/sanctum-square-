import type { MetadataRoute } from "next";

// `||`, not `??`: an env var Vercel collected an empty value for is set to
// `""` rather than left unset, and `"" ?? fallback` is still `""`.
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.sanctumsquare.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
