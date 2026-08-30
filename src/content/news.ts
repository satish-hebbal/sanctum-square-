import type { NewsItem } from "@/lib/types";

/**
 * Every entry below is a project milestone taken from the studio's own project
 * documents — nothing here is invented.
 *
 * The page also supports "Press", "Awards" and "Lectures" categories, and the
 * filter bar only shows a category once an entry uses it. Add real coverage,
 * awards or talks as they happen and the filter appears on its own.
 */
export const news: NewsItem[] = [
  {
    slug: "igatpuri-hills-master-plan",
    category: "News",
    date: "2026-08-11",
    title: "Igatpuri Hills master plan enters detailed planning",
    excerpt:
      "The contour-sensitive township in Maharashtra sets out 657 residential plots across a land use split of 48% plots, 26% roads, 15% amenity and 10% green area, with the road hierarchy following the site's natural gradients.",
    figure: {
      media: "igatpuri/master-plan-igt-23-04-26-4-17-page",
      alt: "The Igatpuri Hills master plan drawing, showing zoning, green corridors and the contour-following road network.",
      fit: "contain",
    },
    project: "igatpuri-hills-township",
  },
  {
    slug: "rotson-sales-lounge-model-platform",
    category: "News",
    date: "2026-06-25",
    title: "Rotson Sales Lounge takes shape around its model platform",
    excerpt:
      "The two-floor sales centre in Hubli is being built around a central 3D project model with island seating, supported by a café bar, executive lounge and discussion zones across the first floor.",
    figure: {
      media: "rotsons-sales-lounge/1",
      alt: "The project model on its tapered plinth, ringed by curved sofas beneath a recessed light cove.",
    },
    project: "rotson-sales-lounge",
  },
  {
    slug: "mantra-residency-facade-complete",
    category: "News",
    date: "2026-04-30",
    title: "Mantra Residency facade redevelopment completes",
    excerpt:
      "The hotel's new elevation was delivered without altering the existing structural system, giving the building a contemporary identity in Hubli through material, projection and lighting alone.",
    figure: {
      media: "mantra-residency/elevation-1",
      alt: "The redesigned Mantra Residency facade at night, its vertical fins and projecting frame lit from within.",
    },
    project: "mantra-residency",
  },
  {
    slug: "akshays-house-complete",
    category: "News",
    date: "2026-03-31",
    title: "Akshay's House handed over in Bengaluru",
    excerpt:
      "The 30' × 40' duplex was completed as a minimalist family home, with clean lines, concealed storage and layered lighting across the living, dining, kitchen and three bedrooms.",
    figure: {
      media: "akshay-s-house/living-1",
      alt: "Living room with exposed timber ceiling beams, low seating and daylight across a pale stone floor.",
    },
    project: "akshays-house",
  },
  {
    slug: "sanctum-square-office-hubballi",
    category: "News",
    date: "2026-02-01",
    title: "The studio's own office opens in Hubballi",
    excerpt:
      "Organised into workspace, waiting, meeting and cabin zones, the office was designed as a single continuous interior language — and doubles as the studio's own reference project.",
    figure: {
      media: "sanctum-square/whatsapp-image-2026-08-11-at-12-13-47-pm",
      alt: "Waiting area with a curved red velvet sofa on a patterned rug, seen through a glass partition.",
    },
    project: "sanctum-square-office",
  },
  {
    slug: "triumph-salon-fit-out-complete",
    category: "News",
    date: "2025-12-20",
    title: "Triumph Salon completes fit-out",
    excerpt:
      "The salon opened in Hubli with reception and waiting, multiple styling stations, a dedicated wash and treatment area, and a retail display planned along the customer route.",
    figure: {
      media: "triumph-salon/4",
      alt: "Styling stations set into lit arched mirrors, with chairs raised on a shallow platform.",
    },
    project: "triumph-salon",
  },
];

/** Only categories actually in use, so the filter never offers an empty view. */
export const newsCategories = [
  ...new Set(news.map((item) => item.category)),
] as const;

/**
 * Formatted in UTC deliberately. These dates are bare `YYYY-MM-DD`, which
 * parses as UTC midnight — so west of Greenwich the local date is the day
 * before, and "2026-02-01" renders as January on the client and February on
 * the server. That is a hydration mismatch for every reader in the Americas.
 */
export function formatNewsDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", {
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}

/**
 * Entries point at the project they report on rather than at a stub article
 * page. A one-paragraph page that exists only to hold one paragraph is filler;
 * the project it belongs to is the thing a reader actually wants. Give an item
 * a `body` and add a route here when there is a real article to publish.
 */
export function newsHref(item: NewsItem) {
  return item.project ? `/projects/${item.project}` : undefined;
}
