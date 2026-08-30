export const studio = {
  name: "Sanctum Square",
  legalName: "Sanctum Square Studio",
  /** Brand line and motto as written in the studio's own profile deck. */
  tagline: "Architecture · Interiors · Construction",
  motto: "Designing with passion, building with precision.",
  description:
    "Design-led architecture, interiors and construction practice with offices in Bengaluru and Hubballi.",

  /** Home page opening statement. */
  statement:
    "Sanctum Square Studio is a design-led architecture and interior practice built on the belief that every space should feel purposeful, calm, and deeply connected to the people who use it. At every scale, the studio blends thoughtful planning with refined aesthetics to create environments that balance function, emotion, and timeless style.",

  /**
   * Continues from `statement`, which the About page uses as its opening.
   * Keep the two disjoint — repeating the opening as the first body
   * paragraph is what made the page read as filler.
   */
  practice: [
    "With experience across residential, commercial, retail, corporate, and facade design, the firm works from spatial layouts through to material expression and interior styling — partnering closely with clients so that every detail aligns with their vision while upholding high design standards.",
    "Rooted in sincerity and backed by strong technical understanding, the studio transforms ideas into spaces that feel both grounded and elevated. Offices in Bengaluru and Hubballi, with work across Karnataka and Maharashtra.",
    "At Sanctum Square Studio, design is more than a service — it is a mindful collaboration where soul meets structure.",
  ],

  founder: {
    name: "Sanjana S Hallad",
    role: "Founder & Principal Architect",
    bio: "A graduate of MS Ramaiah School of Architecture, Bengaluru (2018), Sanjana brings a calm, thoughtful, and contemporary design approach to the studio. Before founding her own practice, she contributed to and consulted on projects across Bengaluru, Mumbai and Hyderabad — spanning residences, corporate offices, retail spaces, institutional campuses, residential interiors and landscape design.",
    credits: [
      {
        label: "Corporate",
        value: "India Business Centre, Kalyan Jewellers Mumbai — 50,000 sft",
      },
      { label: "Institutional", value: "Jain Design College" },
      { label: "Landscape", value: "Business parks including Oracle" },
      { label: "Renovation", value: "Century Club, Bengaluru" },
      { label: "Interiors", value: "20+ residences, luxury villas and gated communities" },
    ],
  },

  services: [
    "Architectural Design",
    "Township Planning",
    "Facade Design",
    "Interior Design",
    "Furniture Sourcing",
    "Interior Execution",
    "Interior Styling",
    "Landscape Design Consultation",
  ],

  offices: [
    {
      city: "Bengaluru",
      lines: ["Sanctum Square, Mahalaxmipuram,", "WOC Road, Bengaluru, Karnataka 560086"],
    },
    {
      city: "Hubballi",
      lines: [
        "Sanctum Square, Shirur Park Extension,",
        "Vidya Nagar (above Yousta), Hubballi, Karnataka 580021",
      ],
    },
  ],

  contact: {
    email: "info@sanctumsquare.com",
    phone: "+91 8660 080 775",
    /** Digits only, for the tel: href. */
    phoneHref: "+918660080775",
    website: "www.sanctumsquare.com",
  },

  social: [
    { label: "Instagram", href: "https://www.instagram.com/sanctumsquare" },
    { label: "LinkedIn", href: "https://www.linkedin.com/company/sanctumsquare" },
  ],
} as const;

/**
 * Named in the studio profile as ongoing, but with no photography supplied
 * yet. They are listed on /projects rather than given a page of their own —
 * an image-driven portfolio should not carry a project with no images. Move an
 * entry into `projects.ts` as soon as its photographs arrive.
 */
export const inProgress = [
  {
    title: "Dr Kori's Residence",
    detail: "4 BHK villa residence",
    location: "Hubli, Karnataka",
  },
  {
    title: "Mixed-Use Building G+3",
    detail: "Shakti Colony",
    location: "Hubli, Karnataka",
  },
  {
    title: "3 BHK Villa",
    detail: "Interiors and facade design",
    location: "Bengaluru, Karnataka",
  },
] as const;

export const nav = [
  { label: "Projects", href: "/projects" },
  { label: "About", href: "/about" },
  { label: "News", href: "/news" },
  { label: "Contact", href: "/contact" },
] as const;

/** Options in the enquiry form's project type field. */
export const projectTypes = [
  "Architecture",
  "Interior design",
  "Facade design",
  "Township planning",
  "Landscape consultation",
  "Other",
] as const;

export const budgetRanges = [
  "Under ₹10 lakh",
  "₹10–25 lakh",
  "₹25–50 lakh",
  "₹50 lakh–1 crore",
  "Above ₹1 crore",
  "Not yet decided",
] as const;
