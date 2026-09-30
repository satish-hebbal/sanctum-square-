import type { Project } from "@/lib/types";

/**
 * Project copy is drawn from the studio's own project documents. Facts —
 * client, location, dates, areas, plot counts — are quoted from those
 * documents and should only be changed against a new one.
 */
export const projects: Project[] = [
  {
    slug: "mantra-residency",
    featured: 3,
    title: "Mantra Residency",
    category: "Hospitality",
    eyebrow: "Hospitality · Renovation",
    location: "Hubli, Karnataka",
    status: "Completed",
    summary:
      "A hotel given a new architectural identity through facade redevelopment and interior upgrades, with its original structure left intact.",
    lede: "The redevelopment of Mantra Residency was driven by the need to modernise the hotel's image while preserving the strength and functionality of the existing building. Rather than undertaking a complete reconstruction, the project adopted a sustainable renovation approach — retaining the original structure and transforming its architectural character through a redesigned facade and upgraded interiors.",
    facts: [
      { label: "Client", value: "Mantra" },
      { label: "Type", value: "Hotel renovation" },
      { label: "Location", value: "Hubli, Karnataka" },
      { label: "Status", value: "Completed" },
      { label: "Completion", value: "April 2026" },
      { label: "Scope", value: "Facade · Interiors · Landscape" },
    ],
    hero: {
      media: "mantra-residency/elevation-1",
      alt: "The redesigned Mantra Residency facade at night, its vertical fins and projecting frame lit from within.",
      caption: "Redesigned elevation, night view",
    },
    sections: [
      {
        title: "Before renovation",
        body: [
          "Over time the building had lost its visual prominence and no longer reflected the evolving expectations of contemporary hospitality design. The exterior lacked a distinctive identity, while the interiors appeared dated in terms of finishes, lighting and overall ambiance.",
          "Although the structural framework remained in good condition, the property required a fresh architectural expression to improve its market presence and guest perception.",
        ],
        figures: [
          {
            media: "mantra-residency/before-renovation-street-view",
            alt: "The hotel before renovation: a plain rendered facade behind overhead cables, with mismatched shopfront signage at street level.",
            caption: "Before renovation",
          },
          {
            media: "mantra-residency/elevation",
            alt: "The building part-way through the works, its new frame going up over the existing structure.",
            caption: "During the works",
          },
        ],
      },
      {
        title: "Elevation redevelopment",
        body: [
          "The primary challenge was to create a completely renewed appearance without disturbing the existing structural system. The design team studied the building proportions and developed a facade concept that would redefine the hotel's identity while working within the existing framework.",
          "New material finishes, architectural projections and lighting features introduce depth, rhythm and elegance. The redesigned elevation transformed the perception of the building — contemporary in expression, but resting on the original structure. The project demonstrates how facade redevelopment alone can alter the character of an existing building without major structural modification.",
        ],
        figures: [
          {
            media: "mantra-residency/fine-dine",
            alt: "The illuminated entrance canopy and signage for Mantra Fine Dine and Banquets at dusk.",
            caption: "Entrance and signage",
          },
        ],
      },
      {
        title: "Interior enhancement",
        body: [
          "The interior renovation focused on aesthetics, comfort and functionality. Existing spaces were refreshed through upgraded finishes, improved lighting schemes and refined detailing.",
          "Conference rooms, circulation spaces and guest-facing interiors were redesigned to create a warm and welcoming atmosphere, so that the new interiors read as one language with the exterior transformation.",
        ],
        figures: [
          {
            media: "mantra-residency/img-9580",
            alt: "Conference room with a long stone-topped table, dark executive chairs and a wall-mounted screen framed in timber panelling.",
            caption: "Conference room",
          },
          {
            media: "mantra-residency/img-9586",
            alt: "Restaurant with teal banquettes, rust and teal upholstered chairs, and woven pendant lights hung from a suspended timber lattice.",
            caption: "Restaurant",
          },
        ],
      },
    ],
    gallery: [
      {
        media: "mantra-residency/img-9595",
        alt: "Reception lounge with a pair of grey armchairs on a patterned round rug, set before backlit Mantra Fine Dine signage on a curved slatted timber wall.",
      },
      {
        media: "mantra-residency/img-9589",
        alt: "The restaurant's long banquette running beneath a window wall, with pendant lights and a timber lattice overhead.",
      },
      {
        media: "mantra-residency/img-9591",
        alt: "Looking up at the suspended timber lattice and its cluster of woven pendant lights.",
      },
      {
        media: "mantra-residency/img-9569",
        alt: "Head of the conference room: a row of dark executive chairs before a framed artwork set into timber panelling.",
      },
      {
        media: "mantra-residency/facade-night-wide",
        alt: "The full frontage after dark, the restaurant signage and vertical fins lit along the length of the building.",
      },
    ],
  },

  {
    slug: "akshays-house",
    title: "Akshay's House",
    category: "Interiors",
    eyebrow: "Interiors · Residential",
    location: "Bengaluru, Karnataka",
    status: "Completed",
    summary:
      "A 30' × 40' duplex reworked as a minimalist family home — clean lines, neutral tones and integrated lighting throughout.",
    lede: "Akshay's House was designed as a contemporary family home that blends functionality, simplicity and elegance. Minimalist modern interiors create bright, open and clutter-free spaces while maintaining a warm and comfortable atmosphere, focusing on efficient space planning, clean lines and a cohesive aesthetic.",
    facts: [
      { label: "Client", value: "Akshay" },
      { label: "Type", value: "Residential interior design" },
      { label: "Location", value: "Bengaluru, Karnataka" },
      { label: "Status", value: "Completed" },
      { label: "Completion", value: "March 2026" },
      { label: "Area", value: "30' × 40' duplex" },
    ],
    hero: {
      media: "akshay-s-house/living-1",
      alt: "Living room with exposed timber ceiling beams, low seating and daylight across a pale stone floor.",
      caption: "Living area",
    },
    sections: [
      {
        title: "Design concept",
        body: [
          "The interiors follow a minimalist approach, using neutral colours, natural textures and clean lines to create a calm and elegant atmosphere. Modern ceiling details, integrated lighting and customised furniture carry the functional load while keeping the look simple.",
        ],
      },
      {
        title: "Living and dining",
        body: [
          "Living and dining were designed as interconnected zones to create openness and continuity. Carefully selected finishes, contemporary furnishings and ambient lighting make a welcoming social environment while maximising natural light and visual space.",
        ],
        figures: [
          {
            media: "akshay-s-house/living-2",
            alt: "Living room seen from the entry, with a textured feature wall, arched mirror and timber beams overhead.",
            caption: "Living, toward the entry",
          },
          {
            media: "akshay-s-house/dining",
            alt: "Dining table beside the kitchen, framed by a timber-lined stair and full-height cabinetry.",
            caption: "Dining",
          },
        ],
      },
      {
        title: "Bedrooms",
        body: [
          "The three bedrooms provide comfort, privacy and function within a unified design language. Custom wardrobes, optimised storage and modern finishes make efficient use of space, while soft tones and warm textures create a personal retreat in each room.",
        ],
        figures: [
          {
            media: "akshay-s-house/bedroom-2",
            alt: "Bedroom with an upholstered headboard, patterned wallpaper and a recessed display niche.",
            caption: "Primary bedroom",
          },
          {
            media: "akshay-s-house/bedroom-study",
            alt: "Bedroom with a built-in study desk and a timber-framed television panel.",
            caption: "Bedroom with study",
          },
        ],
      },
      {
        title: "Kitchen, materials and finishes",
        body: [
          "The kitchen was planned around efficiency, organisation and appearance — modular cabinetry, streamlined storage and durable materials integrated with the wider interior theme.",
          "Throughout the home, a curated palette of neutral shades, wood finishes, textured laminates and contemporary materials is paired with concealed storage, sleek detailing and layered lighting, producing the sophisticated, clutter-free character the brief called for.",
        ],
        figures: [
          {
            media: "akshay-s-house/kitchen",
            alt: "Galley kitchen with handleless cabinetry, a stone worktop and a black extractor hood.",
            caption: "Kitchen",
          },
        ],
      },
    ],
    gallery: [
      {
        media: "akshay-s-house/lounge",
        alt: "Upper lounge with a suspended chandelier, planting and a glass balustrade.",
      },
      {
        media: "akshay-s-house/lounge-1",
        alt: "Lounge landing with patterned wall panelling and a curved seat.",
      },
      {
        media: "akshay-s-house/bedroom-png",
        alt: "Bedroom with a green feature wall, open shelving and layered curtains.",
      },
      {
        media: "akshay-s-house/bedroom",
        alt: "Bedroom with an arched mural headboard, dark joinery and a timber ceiling detail.",
      },
      {
        media: "akshay-s-house/balcony",
        alt: "Covered terrace with a hanging cane chair, planting along the parapet and a pergola overhead.",
      },
    ],
  },

  {
    slug: "rotson-sales-lounge",
    title: "Rotson Sales Lounge",
    category: "Commercial",
    eyebrow: "Commercial",
    location: "Hubli, Karnataka",
    status: "Ongoing",
    summary:
      "A two-floor sales and marketing destination built around a central 3D project model and an island seating arrangement.",
    lede: "The Rotson Sales Lounge is envisioned as a premium destination that blends hospitality, marketing and customer engagement. The interior concept works through refined materials, ambient lighting, elegant finishes and carefully curated spatial planning, with every element designed to support customer interaction while keeping a professional and welcoming atmosphere.",
    facts: [
      { label: "Client", value: "Rotson Group" },
      { label: "Type", value: "Sales and marketing centre" },
      { label: "Location", value: "Hubli, Karnataka" },
      { label: "Status", value: "Ongoing" },
      { label: "Floors", value: "Ground and first" },
      { label: "Scope", value: "Interior design · Space planning" },
    ],
    hero: {
      media: "rotsons-sales-lounge/3",
      alt: "The marketing floor at dusk, with the lit project model at its centre and the city visible through full-height glazing.",
      caption: "Marketing floor and model platform",
    },
    sections: [
      {
        title: "Ground floor — arrival and client interaction",
        body: [
          "The ground floor is the first point of contact and is designed to establish a lasting impression. The reception acts as a welcoming focal point in a clean, contemporary language that reflects the brand.",
          "Adjacent to it, a waiting lounge gives visitors a relaxed environment ahead of consultations, and a dedicated discussion room offers privacy for one-on-one meetings, project presentations and decision-making.",
        ],
        figures: [
          {
            media: "rotsons-sales-lounge/5",
            alt: "Discussion area with a glass-topped table, armchairs and a framed display wall.",
            caption: "Discussion room",
          },
          {
            media: "rotsons-sales-lounge/4",
            alt: "The lounge in daylight, with modular seating arranged around the model platform.",
            caption: "Lounge, daylight",
          },
        ],
      },
      {
        title: "First floor — marketing experience centre",
        body: [
          "The first floor is conceived as an interactive marketing and engagement hub. The central marketing lounge invites visitors to explore the project in a comfortable setting, and an integrated café bar creates an informal but refined space for discussion.",
          "An executive lounge accommodates premium client meetings and personalised consultations, with multiple discussion zones planned across the floor to support different levels of engagement.",
        ],
        figures: [
          {
            media: "rotsons-sales-lounge/2",
            alt: "Café bar with counter seating, hanging planters and a view over the city at dusk.",
            caption: "Café bar",
          },
        ],
      },
      {
        title: "The model platform",
        body: [
          "The centrally located 3D project model platform is the focal attraction of the marketing zone. Island seating wraps the model to encourage interaction, discussion and exploration, letting visitors read the development in the round rather than across a table.",
        ],
        figures: [
          {
            media: "rotsons-sales-lounge/1",
            alt: "The project model on its tapered plinth, ringed by curved sofas beneath a recessed light cove.",
            caption: "Model platform and island seating",
          },
        ],
      },
    ],
    gallery: [
      {
        media: "rotsons-sales-lounge/6",
        alt: "Executive lounge with a timber ceiling, bar counter and workstations along the glazed wall.",
      },
      {
        media: "rotsons-sales-lounge/7",
        alt: "Café bar seen from the lounge, with stone walls, pendant lighting and hanging greenery.",
      },
    ],
  },

  {
    slug: "triumph-salon",
    title: "Triumph Salon",
    category: "Commercial",
    eyebrow: "Commercial · Interiors",
    location: "Hubli, Karnataka",
    status: "Completed",
    summary:
      "A salon fit-out planned around the flow from reception to service, with styling, wash, treatment and retail zones.",
    lede: "Triumph Salon was designed as a modern and welcoming grooming space that combines style, comfort and functionality. The design creates a premium customer experience while keeping salon operations efficient, using contemporary materials, warm lighting and well-planned spaces that support both customer comfort and staff workflow.",
    facts: [
      { label: "Client", value: "Triumph Salon" },
      { label: "Type", value: "Salon interior design and fit-out" },
      { label: "Location", value: "Hubli, Karnataka" },
      { label: "Status", value: "Completed" },
      { label: "Completion", value: "December 2025" },
      { label: "Scope", value: "Interior design · Space planning" },
    ],
    hero: {
      media: "triumph-salon/styling-stations-hires",
      alt: "Styling stations set into lit arched mirrors, with chairs raised on a shallow platform.",
      caption: "Styling stations",
    },
    sections: [
      {
        title: "Requirements",
        body: [
          "The brief set out an inviting reception, a comfortable waiting lounge, multiple styling and haircut stations, a dedicated hair wash and treatment area, grooming and beauty zones, product display and retail, efficient storage, lighting suited to styling work, durable and easily maintained materials, and comfortable circulation throughout.",
        ],
      },
      {
        title: "Design solution",
        body: [
          "The layout was planned to give a smooth flow from reception through to the service areas, with the reception and waiting area making the first impression.",
          "Styling stations were designed for efficiency and comfort, with large mirrors and lighting placed for the work itself. The hair wash area is treated as a quieter, more relaxing room, while retail displays keep salon products visible without crowding the floor.",
        ],
        figures: [
          {
            media: "triumph-salon/1",
            alt: "Waiting lounge with green armchairs against a ribbed timber wall and sheer full-height curtains.",
            caption: "Waiting lounge",
          },
          {
            media: "triumph-salon/2",
            alt: "Treatment room with a massage bed, a round mirror and a stone-topped wash counter.",
            caption: "Treatment room",
          },
        ],
      },
      {
        title: "Outcome",
        body: [
          "The completed salon reflects a contemporary and professional image aligned with the brand. The interiors improve customer comfort and staff productivity, and give the business an environment that carries the standard of service it offers.",
        ],
        figures: [
          {
            media: "triumph-salon/3",
            alt: "Reception counter and retail display beneath a curved ceiling with circular light coves.",
            caption: "Reception and retail",
          },
        ],
      },
    ],
    gallery: [
      {
        media: "triumph-salon/5",
        alt: "The salon shopfront at night, lit from within behind full-height glazing.",
      },
      {
        media: "triumph-salon/4",
        alt: "The styling floor from the entrance, mirrors receding down the room.",
      },
    ],
  },

  {
    slug: "prakash-kore-residence",
    featured: 2,
    title: "Prakash Kore Residence",
    category: "Residential",
    eyebrow: "Residential · Architecture",
    location: "Hubli, Karnataka",
    status: "Ongoing",
    summary:
      "Architectural planning and elevation design for a family home, zoned for privacy and set up for cross ventilation and daylight.",
    lede: "The Prakash Kore Residence is designed as a contemporary living environment that combines functionality, aesthetics and long-term comfort. The project focuses on efficient spatial planning, abundant natural light, cross ventilation and a strong visual identity through its modern architectural expression.",
    facts: [
      { label: "Client", value: "Prakash Kore" },
      { label: "Type", value: "Residential architecture" },
      { label: "Location", value: "Hubli, Karnataka" },
      { label: "Status", value: "Ongoing" },
      { label: "Scope", value: "Planning · Elevation design" },
    ],
    hero: {
      media: "prakash-kori/elevation",
      alt: "The full street elevation at dusk, with timber screening, planted balconies and a lit entrance.",
      caption: "Street elevation",
    },
    sections: [
      {
        title: "Planning concept",
        body: [
          "The plan was developed around the family's daily routine, allowing movement between spaces while holding privacy where it is needed. Zoning separates public, semi-private and private areas to make the most of the site.",
          "Living and dining are open and interconnected to encourage family interaction and a sense of space. Bedrooms are positioned for privacy, ventilation and daylight through the day, and the kitchen is planned for efficiency with direct connection to the service areas. Circulation, integrated storage and future adaptability were given particular attention.",
        ],
      },
      {
        title: "Elevation design",
        body: [
          "The elevation follows a contemporary line — clean geometry, balanced proportions and a restrained material palette, designed to hold its own on the street while sitting comfortably with its neighbours.",
          "Modern textures, subtle architectural detail and well-placed openings shape the facade. Large windows bring in light and air, and the balance of solid and open elements gives the elevation depth without ornament.",
        ],
        figures: [
          {
            media: "prakash-kori/compound",
            alt: "The compound wall and gate, with timber-battened screening and a stone nameplate at the entrance.",
            caption: "Compound and entrance",
          },
        ],
      },
      {
        title: "On site",
        body: [
          "Construction is under way, with foundation and column work in progress on site.",
        ],
        figures: [
          {
            media: "prakash-kori/in-progerss/whatsapp-image-2026-08-04-at-9-10-04-am",
            alt: "The site during construction, with reinforcement cages and formwork above the plinth.",
            caption: "Under construction, August 2026",
          },
        ],
      },
    ],
    gallery: [],
  },

  {
    slug: "srinivasan-madhavan-residence",
    title: "Srinivasan Madhavan Residence",
    category: "Interiors",
    eyebrow: "Interiors · Residential",
    location: "Bengaluru, Karnataka",
    status: "Ongoing",
    summary:
      "Contemporary interiors around a double-height entrance wall, teak joinery and a bay window seat in the bedroom.",
    lede: "This residential interior project in Bengaluru is envisioned as a blend of contemporary elegance and traditional warmth. The approach creates sophisticated, functional and timeless living spaces through natural materials, refined detailing and balanced proportion.",
    facts: [
      { label: "Client", value: "Mr. Srinivasan Madhavan" },
      { label: "Type", value: "Residential interior design" },
      { label: "Location", value: "Bengaluru, Karnataka" },
      { label: "Status", value: "Ongoing" },
      { label: "Scope", value: "Interior design · Execution" },
    ],
    hero: {
      media: "mr-srinivasan-madhavan-residence/living",
      alt: "Living room with a full-height stone feature wall, low timber media unit and a coffered ceiling.",
      caption: "Living room",
    },
    sections: [
      {
        title: "The double-height entrance",
        body: [
          "A key highlight of the residence is the double-height entrance wall, designed to make a striking first impression on entering the home. An elegant feature wallpaper adds grandeur and visual depth, and lighting is planned to accentuate its texture and pattern, turning the entrance into a focal point.",
        ],
        figures: [
          {
            media: "mr-srinivasan-madhavan-residence/whatsapp-image-2026-08-11-at-12-07-44-pm",
            alt: "The exterior double-height bay, faced in a tall patterned panel set between plain rendered walls.",
            caption: "Double-height bay, exterior",
          },
        ],
      },
      {
        title: "Material palette",
        body: [
          "The interiors work in a warm palette of rich brown tones, natural teak finishes and crisp white surfaces. Teak doors and windows bring authenticity and durability, while white walls and ceilings hold the brightness and keep the rooms open.",
          "Contemporary furnishings, subtle textures and carefully selected materials sit alongside the traditional wooden elements, balancing modern living against classic detailing.",
        ],
        figures: [
          {
            media: "mr-srinivasan-madhavan-residence/tv-unit",
            alt: "Media wall in stone and timber with open display shelving running the length of the room.",
            caption: "Media wall",
          },
          {
            media: "mr-srinivasan-madhavan-residence/dining",
            alt: "Dining area with a slatted screen, pendant cluster and a stone-clad wall behind.",
            caption: "Dining",
          },
        ],
      },
      {
        title: "Bay window",
        body: [
          "The bay window in the bedroom is positioned to take natural light and the view out. It works as a seating nook — a corner for reading or quiet moments — while adding to the sense of space in the room.",
        ],
        figures: [
          {
            media: "mr-srinivasan-madhavan-residence/bay-window",
            alt: "Bedroom bay window fitted with a cushioned seat, framed by full-height curtains and wall lights.",
            caption: "Bay window seat",
          },
        ],
      },
    ],
    gallery: [
      {
        media: "mr-srinivasan-madhavan-residence/in-progress/whatsapp-image-2026-08-11-at-12-09-27-pm-1",
        alt: "Ceiling framework being installed on site ahead of finishes.",
      },
    ],
  },

  {
    slug: "rajashekar-umarani-residence",
    featured: 1,
    title: "Rajashekar Umarani Residence",
    category: "Interiors",
    eyebrow: "Interiors · Residential",
    location: "Hubli, Karnataka",
    status: "Ongoing",
    summary:
      "Contemporary interiors built on decorative wall moulding, wooden textures and integrated lighting across every room.",
    lede: "The Rajashekar Umarani Residence is an ongoing interior project focused on a modern, elegant and functional home. It combines clean lines, warm materials, decorative wall treatments and integrated lighting, following a contemporary and minimal aesthetic where neutral tones, wooden textures and subtle detailing carry the warmth.",
    facts: [
      { label: "Client", value: "Rajashekar Umarani" },
      { label: "Type", value: "Residential interior design" },
      { label: "Location", value: "Hubli, Karnataka" },
      { label: "Status", value: "Ongoing" },
      { label: "Scope", value: "Interior design · Execution" },
    ],
    hero: {
      media: "umarani/whatsapp-image-2026-08-11-at-12-07-07-pm-1",
      alt: "Living room with panelled walls, a low sofa, wall sconces and a dark rug on a timber floor.",
      caption: "Living room",
    },
    sections: [
      {
        title: "Living room and media wall",
        body: [
          "The living room is a welcoming and refined space with the emphasis on comfort and visual balance. Decorative wall moulding adds depth and character, while contemporary furniture and warm lighting settle the room.",
          "The television wall acts as the key feature of the living area — wooden finishes, moulding, storage and subtle lighting combining into a clean focal point that keeps the space organised.",
        ],
        figures: [
          {
            media: "umarani/whatsapp-image-2026-08-11-at-12-07-06-pm",
            alt: "Media wall with a wide low unit, concealed cove lighting and floor-length curtains.",
            caption: "Media wall",
          },
        ],
      },
      {
        title: "Dining and kitchen",
        body: [
          "The dining area is designed for everyday meals and family gatherings, with decorative wall detailing and ambient lighting. Its finishes are coordinated with the living area so the two rooms read as one.",
          "The kitchen is planned for efficient use, easy movement and practical storage, with modern cabinetry and coordinated finishes keeping the appearance clean.",
        ],
        figures: [
          {
            media: "umarani/whatsapp-image-2026-08-11-at-12-07-06-pm-1",
            alt: "Dining table set beneath recessed lighting, with tall timber doors and integrated joinery behind.",
            caption: "Dining",
          },
          {
            media: "umarani/1",
            alt: "L-shaped kitchen in cream cabinetry with a dark stone worktop and a window over the sink.",
            caption: "Kitchen",
          },
        ],
      },
      {
        title: "Bedrooms",
        body: [
          "The bedrooms are treated as calm, comfortable personal spaces. Simple wall treatments, wardrobes, warm finishes and soft lighting keep them relaxed while holding the contemporary character of the rest of the house.",
        ],
        figures: [
          {
            media: "umarani/chatgpt-image-aug-11-2026-03-56-45-pm",
            alt: "Bedroom with panelled walls, a slim headboard and daylight from a timber-framed window.",
            caption: "Bedroom",
          },
          {
            media: "umarani/chatgpt-image-aug-11-2026-12-53-28-pm",
            alt: "Bedroom with full-height wardrobes, decorative wall discs and a light grey bed.",
            caption: "Bedroom with wardrobes",
          },
        ],
      },
      {
        title: "On site",
        body: [
          "Final detailing and finishing works are in progress. Wall moulding has been set out and installed ahead of paint and lighting.",
        ],
        figures: [
          {
            media: "umarani/in-progress/living",
            alt: "Wall moulding installed and primed in the living room, before paint and flooring.",
            caption: "Moulding installation",
          },
        ],
      },
    ],
    gallery: [
      {
        media: "umarani/whatsapp-image-2026-08-11-at-12-07-07-pm",
        alt: "Bedroom with a panelled headboard wall, framed art and sheer curtains.",
      },
      {
        media: "umarani/2",
        alt: "Entry console in cream and timber, with a stone top and a tall slim window above.",
      },
      {
        media: "umarani/chatgpt-image-aug-11-2026-03-59-32-pm",
        alt: "Wardrobe run in cream cabinetry with slim vertical handles beside a teak door.",
      },
    ],
  },

  {
    slug: "sanctum-square-office",
    featured: 4,
    title: "Sanctum Square Office",
    category: "Commercial",
    eyebrow: "Commercial · Interiors",
    location: "Hubli, Karnataka",
    status: "Completed",
    summary:
      "The studio's own office, organised into four zones — workspace, waiting, meeting and cabin — in one consistent language.",
    lede: "Sanctum Square Office is the studio's own office, designed as a professional, functional and contemporary work environment. The planning makes the available space efficient while creating a comfortable and visually refined atmosphere for daily work and client meetings.",
    facts: [
      { label: "Client", value: "Sanctum Square Studio" },
      { label: "Type", value: "Office interior design" },
      { label: "Location", value: "Hubli, Karnataka" },
      { label: "Status", value: "Completed" },
      { label: "Zones", value: "Workspace · Waiting · Meeting · Cabin" },
    ],
    hero: {
      media: "sanctum-square/whatsapp-image-2026-08-11-at-12-13-47-pm",
      alt: "Waiting area with a curved red velvet sofa on a patterned rug, seen through a glass partition.",
      caption: "Waiting area",
    },
    sections: [
      {
        title: "Workspace and cabin",
        body: [
          "The main workspace is planned for efficient and comfortable daily working. Workstations are arranged to give adequate circulation and a productive environment, supported by practical storage, clean furniture lines and well-planned lighting.",
          "The cabin provides a private workspace, combining function with a more considered interior character — furniture, finishes and lighting selected for focused work and private discussion.",
        ],
        figures: [
          {
            media: "sanctum-square/workspace",
            alt: "Workstations along a glazed wall, with task chairs and a run of desks under linear lighting.",
            caption: "Workspace",
          },
          {
            media: "sanctum-square/whatsapp-image-2026-08-11-at-12-13-28-pm",
            alt: "Private cabin with a timber desk against a window, vertical blinds and a linear ceiling light.",
            caption: "Cabin",
          },
        ],
      },
      {
        title: "Meeting space",
        body: [
          "The meeting space is designed for client discussions, formal meetings and collaborative work — comfortable seating and a focused setting, supported by appropriate lighting and a clean, professional backdrop.",
        ],
        figures: [
          {
            media: "sanctum-square/whatsapp-image-2026-08-11-at-12-12-34-pm",
            alt: "Meeting room with a long tapered table, a circular timber display panel and a wall-mounted screen.",
            caption: "Meeting room",
          },
        ],
      },
      {
        title: "Waiting and reception",
        body: [
          "The waiting area makes a professional first impression for visitors. Comfortable seating, contemporary finishes and minimal decoration give a refined environment that reflects the identity of the office.",
          "Across all four zones, the consistent use of materials, furniture and lighting creates one identity through the whole office rather than four separately styled rooms.",
        ],
        figures: [
          {
            media: "sanctum-square/whatsapp-image-2026-08-11-at-12-13-00-pm",
            alt: "Reception counter with a planted trough above and a warm-toned ceiling running the length of the room.",
            caption: "Reception",
          },
        ],
      },
    ],
    gallery: [
      {
        media: "sanctum-square/whatsapp-image-2026-08-11-at-12-12-17-pm",
        alt: "Corridor lined with glass partitions and recessed linear lighting.",
      },
      {
        media: "sanctum-square/whatsapp-image-2026-08-11-at-12-12-45-pm",
        alt: "Meeting room seen from the doorway, with the table set against a glazed partition wall.",
      },
    ],
  },

  {
    slug: "residential-extension",
    featured: 5,
    title: "Residential Extension",
    category: "Residential",
    eyebrow: "Residential · Extension",
    location: "Hubli, Karnataka",
    status: "Completed",
    summary:
      "A ground-floor residence extended upward with a new first floor, alongside interior design and execution throughout.",
    lede: "This project involved the vertical extension of an existing ground-floor residence with the addition of a new first floor, combined with comprehensive interior design and execution. The design responds to the client's evolving space requirements while maintaining a harmonious relationship with the existing structure.",
    facts: [
      { label: "Type", value: "Residential extension and interiors" },
      { label: "Location", value: "Hubli, Karnataka" },
      { label: "Status", value: "Completed" },
      { label: "Scope", value: "Architecture · Interiors · Execution" },
    ],
    hero: {
      media: "residential-extension-and-interior-design/whatsapp-image-2026-08-11-at-12-11-54-pm-2",
      alt: "Double-height timber feature wall lit by slim vertical fittings, with a dark sofa and planting at its base.",
      caption: "Timber feature wall",
    },
    sections: [
      {
        title: "Architectural extension",
        body: [
          "The existing ground-floor structure was retained as the base of the project, with the first-floor addition designed as a seamless extension of the residence. The approach focused on keeping structural and visual continuity between the existing and new portions of the building.",
          "The new floor was planned for efficient use of space and a contemporary character, adding comfortable rooms without compromising how the original ground floor works.",
        ],
        figures: [
          {
            media: "residential-extension-and-interior-design/exterior-entrance",
            alt: "The completed house from the entrance path, the new upper floor set back behind a mature tree.",
            caption: "The house after extension",
          },
          {
            media: "residential-extension-and-interior-design/whatsapp-image-2026-08-11-at-12-11-54-pm-1",
            alt: "The new stair rising against a textured wall, with a starburst light fitting above the landing.",
            caption: "New stair",
          },
        ],
      },
      {
        title: "Interior design",
        body: [
          "The interiors were designed with a modern and refined approach, balancing appearance against everyday function. Each space was planned according to its purpose, with coordinated materials, colours, lighting, furniture and storage.",
          "The overall design combines clean forms, contemporary finishes and functional detailing. Neutral tones and carefully selected materials keep the interior calm and cohesive, while feature walls, lighting and furniture give individual rooms their own character.",
        ],
        figures: [
          {
            media: "residential-extension-and-interior-design/whatsapp-image-2026-08-11-at-12-11-54-pm-3",
            alt: "Living room with a deep blue sectional sofa, framed art and the open stair behind.",
            caption: "Living room",
          },
        ],
      },
      {
        title: "Outcome",
        body: [
          "The project transformed a single-floor residence into a complete two-level home, adding usable space through the first-floor extension and giving the whole house a cohesive contemporary character.",
        ],
        figures: [
          {
            media: "residential-extension-and-interior-design/whatsapp-image-2026-08-11-at-12-17-08-pm-1",
            alt: "Covered balcony with a hanging cane chair, perforated screen and planting along the parapet.",
            caption: "Balcony",
          },
        ],
      },
    ],
    gallery: [
      {
        media: "residential-extension-and-interior-design/whatsapp-image-2026-08-11-at-12-17-08-pm",
        alt: "Built-in bookshelf with diamond-shaped compartments against a teal wall.",
      },
      {
        media: "residential-extension-and-interior-design/whatsapp-image-2026-08-11-at-12-18-18-pm",
        alt: "Stone seated figure set among dense planting in the garden.",
      },
    ],
  },
];

const bySlug = new Map(projects.map((p) => [p.slug, p]));

export function getProject(slug: string): Project | undefined {
  return bySlug.get(slug);
}

/** Home page selection, ordered by the `featured` rank. */
export const featuredProjects = projects
  .filter((p) => p.featured !== undefined)
  .sort((a, b) => (a.featured ?? 0) - (b.featured ?? 0));

/**
 * The home page hero cycles these, in order — the five projects the studio
 * asked to lead with, and the same five the featured section below repeats.
 * The first one is the LCP image on every visit.
 */
export const heroSlides = featuredProjects;

/** Projects run in a loop, so the last one points back at the first. */
export function getNextProject(slug: string) {
  const i = projects.findIndex((p) => p.slug === slug);
  if (i === -1) return projects[0];
  return projects[(i + 1) % projects.length];
}
