export const navLinks = [
  { label: "Home", path: "/" },
  { label: "Work", path: "/work" },
  { label: "Services", path: "/services" },
  { label: "Pricing", path: "/pricing" },
  { label: "About", path: "/about" },
  { label: "Contact", path: "/contact" },
];

export const heroContent = {
  headline: "I build digital systems for modern brands.",
  subheadline:
    "From content and websites to AI-assisted workflows, I help businesses present better, move faster, and operate smarter.",
  primaryCta: { label: "Start a Project", path: "/contact" },
  secondaryCta: { label: "See My Work", path: "/work" },
};

export const homeSections = [
  { id: "hero", label: "Hero" },
  { id: "value-strip", label: "Value Strip" },
  { id: "featured-work", label: "Featured Work" },
  { id: "services-overview", label: "Services Overview" },
  { id: "why-work", label: "Why Work With Me" },
  { id: "process", label: "Process" },
  { id: "pricing-preview", label: "Pricing Preview" },
  { id: "testimonials-proof", label: "Testimonials / Proof" },
  { id: "faq", label: "FAQ" },
  { id: "final-cta", label: "Final CTA" },
];

export const services = [
  {
    slug: "content-creative",
    title: "Content & Creative",
    summary:
      "Short-form content, brand visuals, editing, drone work, and creative direction for businesses that need stronger attention and presentation.",
    deliverables: [
      "Short-form videos",
      "Promo videos",
      "Creative direction",
      "Drone/location visuals",
      "Social-first visual packages",
    ],
    outcomes: [
      "Sharper brand presentation",
      "Consistent social output",
      "Higher-quality content assets",
    ],
  },
  {
    slug: "web-launch-assets",
    title: "Web & Launch Assets",
    summary:
      "Landing pages, portfolio websites, business sites, and lightweight web experiences designed to clarify the offer and improve conversion.",
    deliverables: [
      "Landing pages",
      "Portfolio websites",
      "Small business websites",
      "Presentation-style websites",
      "Lightweight web apps",
    ],
    outcomes: [
      "Clearer offer messaging",
      "Stronger conversion paths",
      "Faster launch cycles",
    ],
  },
  {
    slug: "ai-automation-systems",
    title: "AI & Automation Systems",
    summary:
      "Workflow automations, AI-assisted content systems, and lightweight internal tools that reduce repetitive work and make execution more efficient.",
    deliverables: [
      "Workflow automations",
      "Content operations systems",
      "Agent-assisted task flows",
      "Lightweight internal tools",
      "AI-enhanced creative workflows",
    ],
    outcomes: [
      "Less manual admin work",
      "Faster execution",
      "Cleaner day-to-day operations",
    ],
  },
];

export const pricingCategories = [
  {
    slug: "monthly-retainers",
    title: "Monthly Retainers",
    description:
      "Ongoing content production for businesses that need consistent output.",
  },
  {
    slug: "one-off-projects",
    title: "One-Off Projects",
    description:
      "Production packages for focused campaigns and single deliverables.",
  },
  {
    slug: "web-offers",
    title: "Website Services",
    description:
      "Conversion-focused website packages with practical scope for local businesses.",
  },
  {
    slug: "automation-offers",
    title: "Automation Services",
    description:
      "Workflow and AI-assisted automation offers with custom scope where needed.",
  },
];

export const pricingPackages = [
  {
    slug: "starter-content-pack",
    name: "Starter Content Pack",
    category: "monthly-retainers",
    billingType: "monthly",
    startingPrice: 900,
    currency: "CAD",
    priceRange: [900, 1200],
    includes: [
      "4 short-form videos / month",
      "1 shoot session",
      "Basic editing and captions",
      "1 light revision round",
    ],
    featured: false,
    customQuoteRequired: false,
  },
  {
    slug: "growth-content-pack",
    name: "Growth Content Pack",
    category: "monthly-retainers",
    billingType: "monthly",
    startingPrice: 1700,
    currency: "CAD",
    priceRange: [1700, 2200],
    includes: [
      "8 short-form videos / month",
      "1-2 shoot sessions",
      "Stronger edit polish",
      "Simple social cutdowns",
      "Priority over Starter clients",
    ],
    featured: true,
    customQuoteRequired: false,
  },
  {
    slug: "brand-engine-pack",
    name: "Brand Engine Pack",
    category: "monthly-retainers",
    billingType: "monthly",
    startingPrice: 2900,
    currency: "CAD",
    priceRange: [2900, 3600],
    includes: [
      "12 short-form videos / month",
      "15-20 story assets",
      "Multiple shoot blocks",
      "Planning and batching support",
      "Faster turnaround",
    ],
    featured: false,
    customQuoteRequired: false,
  },
  {
    slug: "single-reel-social-ad",
    name: "Single Reel / Social Ad",
    category: "one-off-projects",
    billingType: "one-off",
    startingPrice: 300,
    currency: "CAD",
    priceRange: [300, 450],
    includes: [
      "Filmed + edited short-form piece",
      "Social platform export",
      "Basic caption styling",
    ],
    featured: false,
    customQuoteRequired: false,
  },
  {
    slug: "half-day-shoot-edit",
    name: "Half-day Shoot + Edit",
    category: "one-off-projects",
    billingType: "one-off",
    startingPrice: 750,
    currency: "CAD",
    priceRange: [750, 1000],
    includes: [
      "One efficient production block",
      "Content batching from one location",
      "Edited deliverables for social",
    ],
    featured: false,
    customQuoteRequired: false,
  },
  {
    slug: "full-day-shoot-edit",
    name: "Full-day Shoot + Edit",
    category: "one-off-projects",
    billingType: "one-off",
    startingPrice: 1350,
    currency: "CAD",
    priceRange: [1350, 1800],
    includes: [
      "Full-day capture",
      "Higher deliverable volume",
      "Multi-scene coverage",
    ],
    featured: false,
    customQuoteRequired: false,
  },
  {
    slug: "promo-brand-film",
    name: "Promo / Brand Film",
    category: "one-off-projects",
    billingType: "one-off",
    startingPrice: 1500,
    currency: "CAD",
    priceRange: [1500, 3000],
    includes: [
      "Cinematic promo build",
      "Pre-production alignment",
      "Custom edit approach",
    ],
    featured: false,
    customQuoteRequired: true,
  },
  {
    slug: "landing-page-sprint",
    name: "Landing Page Sprint",
    category: "web-offers",
    billingType: "project",
    startingPrice: 650,
    currency: "CAD",
    priceRange: [650, 900],
    includes: [
      "1 custom landing page",
      "Responsive build",
      "Contact form",
      "Basic SEO setup",
      "1 revision round",
    ],
    featured: false,
    customQuoteRequired: false,
  },
  {
    slug: "starter-website",
    name: "Starter Website",
    category: "web-offers",
    billingType: "project",
    startingPrice: 1200,
    currency: "CAD",
    priceRange: [1200, 1700],
    includes: [
      "3-5 pages",
      "Responsive design",
      "Contact form",
      "Basic SEO structure",
      "1-2 revision rounds",
    ],
    featured: false,
    customQuoteRequired: false,
  },
  {
    slug: "business-website",
    name: "Business Website",
    category: "web-offers",
    billingType: "project",
    startingPrice: 2200,
    currency: "CAD",
    priceRange: [2200, 3000],
    includes: [
      "5-8 pages",
      "Service structure + content hierarchy",
      "Lead capture forms",
      "Basic integrations",
      "2 revision rounds",
    ],
    featured: true,
    customQuoteRequired: false,
  },
  {
    slug: "custom-website-advanced-build",
    name: "Custom Website / Advanced Build",
    category: "web-offers",
    billingType: "project",
    startingPrice: null,
    currency: "CAD",
    priceRange: null,
    includes: [
      "Advanced animations",
      "Custom CMS",
      "Ecommerce or dashboards",
      "Heavy integrations",
    ],
    featured: false,
    customQuoteRequired: true,
  },
  {
    slug: "workflow-audit-automation-planning",
    name: "Workflow Audit / Automation Planning",
    category: "automation-offers",
    billingType: "project",
    startingPrice: 150,
    currency: "CAD",
    priceRange: [150, 250],
    includes: [
      "Workflow review",
      "Bottleneck mapping",
      "Tool recommendations",
      "Implementation summary",
    ],
    featured: false,
    customQuoteRequired: false,
  },
  {
    slug: "simple-automation-setup",
    name: "Simple Automation Setup",
    category: "automation-offers",
    billingType: "project",
    startingPrice: 450,
    currency: "CAD",
    priceRange: [450, 800],
    includes: [
      "1 simple workflow",
      "Basic testing",
      "Light documentation",
      "Post-launch support window",
    ],
    featured: false,
    customQuoteRequired: false,
  },
  {
    slug: "connected-automation-system",
    name: "Connected Automation System",
    category: "automation-offers",
    billingType: "project",
    startingPrice: 1200,
    currency: "CAD",
    priceRange: [1200, 2500],
    includes: [
      "2-4 connected workflows",
      "Workflow mapping",
      "Implementation + testing",
      "Handoff walkthrough",
    ],
    featured: true,
    customQuoteRequired: false,
  },
  {
    slug: "ai-advanced-automation-system",
    name: "AI / Advanced Automation System",
    category: "automation-offers",
    billingType: "project",
    startingPrice: null,
    currency: "CAD",
    priceRange: null,
    includes: [
      "AI classification or routing",
      "Agent workflows",
      "Dashboards / internal tools",
      "Custom API logic",
    ],
    featured: false,
    customQuoteRequired: true,
  },
];

export const addOns = [
  { name: "Drone footage", startingPrice: 200, priceRange: [200, 350] },
  { name: "Extra revision round", startingPrice: 75, priceRange: [75, 125] },
  { name: "Rush delivery", label: "+25% to +35%" },
  { name: "Extra cut / version", startingPrice: 75, priceRange: [75, 150] },
  { name: "Raw footage handoff", startingPrice: 200, priceRange: [200, 350] },
  {
    name: "Thumbnail / cover design",
    startingPrice: 20,
    priceRange: [20, 40],
  },
  { name: "Travel fee", customQuoteRequired: true },
  { name: "Copy support", startingPrice: 100, priceRange: [100, 300] },
  {
    name: "Additional website page",
    startingPrice: 150,
    priceRange: [150, 300],
  },
  {
    name: "Monthly monitoring / support",
    startingPrice: 100,
    priceRange: [100, 300],
  },
];

/**
 * Case studies are the single source of truth for Featured Work content.
 * Home cards use: `title`, `excerpt`, `category`, `featured`, `featuredRank`, `media.poster`.
 * Work cards use: `title`, `excerpt`, `category`, `proofLevel`, `outcomes`, `media.poster`.
 * Case Study page uses: `challenge`, `solution`, `deliverables`, `outcomes`, and full `media`.
 *
 * Recommended pattern for a new item:
 * Copy an existing case object, keep `slug` unique, and include full `media` object.
 */
export const caseStudies = [
  {
    slug: "BLA BLA",
    title: "At Cinema Content Engine",
    category: "Content",
    excerpt:
      "Built a repeatable monthly short-keep output consistent and premium.",
    challenge:
      "The team needed stronger social consistency and better visual quality without heavy in-house production overhead.",
    solution:
      "Created a lean shoot-and-edit cadence with reusable hooks, captions, and delivery templates across short-form channels.",
    deliverables: [
      "Monthly content shoot blocks",
      "8 short-form edits",
      "1 promo cut",
      "Caption-ready exports",
    ],
    outcomes: [
      "Clearer premium visual positioning",
      "Faster posting rhythm",
      "Reusable content operations workflow",
    ],
    media: {
      description: "Placeholder video metadata for At Cinema case study.",
      poster: "/images/video-placeholder.svg",
      previewSrc: "/images/screen.mp4",
      youtubeUrl: "",
    },
    featured: true,
    featuredRank: 1,
    proofLevel: "selected",
  },
];

export const getFeaturedCaseStudies = (limit = 3) =>
  caseStudies
    .filter((item) => item.featured)
    .sort(
      (a, b) =>
        (a.featuredRank ?? Number.MAX_SAFE_INTEGER) -
        (b.featuredRank ?? Number.MAX_SAFE_INTEGER),
    )
    .slice(0, limit);

export const getCaseStudyBySlug = (slug) =>
  caseStudies.find((item) => item.slug === slug);

export const testimonials = [
  {
    name: "Maya R.",
    mentions: "@maya-r",
    review:
      "The biggest win was clarity. We finally had content, website updates, and workflows moving together instead of separately.",
    role: "Founder, Local Wellness Studio",
    quote:
      "The biggest win was clarity. We finally had content, website updates, and workflows moving together instead of separately.",
    imgPath: "/images/client1.png",
  },
  {
    name: "Daniel T.",
    mentions: "@daniel-t",
    review:
      "The site and content now reflect how we actually work. We get better-fit inquiries and spend less time explaining basic scope.",
    role: "Owner, Construction Services",
    quote:
      "The site and content now reflect how we actually work. We get better-fit inquiries and spend less time explaining basic scope.",
    imgPath: "/images/client3.png",
  },
  {
    name: "Sofia L.",
    mentions: "@sofia-l",
    review:
      "Execution got faster across the board. The workflow cleanup saved our team hours every week.",
    role: "Marketing Lead, Property Team",
    quote:
      "Execution got faster across the board. The workflow cleanup saved our team hours every week.",
    imgPath: "/images/client2.png",
  },
];

export const faqs = [
  {
    question: "Do you only offer video editing?",
    answer:
      "No. Content is one part of the system. I also build websites and lightweight automation so presentation and operations improve together.",
  },
  {
    question: "What type of clients are the best fit?",
    answer:
      "Local service businesses, construction and trades, property-adjacent brands, founders, and small teams that need stronger digital presence without hiring a full agency.",
  },
  {
    question: "How does pricing work?",
    answer:
      "The site uses starting prices in CAD. Final quotes are based on scope, production load, travel, revisions, and timeline.",
  },
  {
    question: "Can we start with one service and expand later?",
    answer:
      "Yes. Many projects start with one priority area and expand into a connected content, web, and systems scope as results come in.",
  },
  {
    question: "Do you work on retainers and one-off projects?",
    answer:
      "Yes. Monthly retainers and focused one-off projects are both available depending on your immediate goal.",
  },
  {
    question: "How quickly can we launch?",
    answer:
      "Timelines depend on scope, but lean projects can move quickly once requirements and assets are aligned.",
  },
];

export const processSteps = [
  {
    step: "01",
    title: "Scope the priority",
    description:
      "We identify the highest-impact bottleneck in your content, website, or workflow.",
  },
  {
    step: "02",
    title: "Build the core assets",
    description:
      "I execute the first layer of deliverables with clear milestones and communication.",
  },
  {
    step: "03",
    title: "Connect the system",
    description:
      "Content, web, and automation are aligned into one practical execution flow.",
  },
  {
    step: "04",
    title: "Launch and refine",
    description:
      "We track what works, tighten weak points, and improve performance over time.",
  },
];

export const socialLinks = [
  { label: "Instagram", href: "https://instagram.com/", icon: "insta" },
  { label: "LinkedIn", href: "https://www.linkedin.com/", icon: "linkedin" },
  { label: "X", href: "https://x.com/", icon: "x" },
];

export const contactFormOptions = [
  { value: "content", label: "Content" },
  { value: "website", label: "Website" },
  { value: "automation", label: "Automation" },
  { value: "mixed-scope", label: "Mixed Scope" },
];

export const valueStrip = [
  "Content + Web + Automation under one execution layer",
  "Conversion-first structure with practical scope",
  "Built for modern local businesses and lean teams",
];

export const whyWorkWithMe = [
  {
    title: "One operator, connected execution",
    description:
      "You do not need three separate freelancers to move one digital priority forward.",
  },
  {
    title: "Commercial clarity over creative noise",
    description:
      "Work is framed around business outcomes, clear offers, and conversion paths.",
  },
  {
    title: "Built to be useful day-to-day",
    description:
      "Every deliverable is designed to help your team execute faster, not just look better.",
  },
];

export const contactDetails = {
  email: "hello@digitalsystemscreator.com",
  bookingUrl: "https://cal.com/",
  quoteMailto:
    "mailto:hello@digitalsystemscreator.com?subject=Request%20a%20Quote",
};
