import {
  getYouTubeThumbnailUrl,
  getYouTubeVideoId,
  inferYouTubeOrientationFromUrl,
} from "../lib/youtube.js";

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

export const videoTypeMeta = {
  ad: { label: "Ads", singularLabel: "Ad" },
  tutorial: { label: "Tutorials", singularLabel: "Tutorial" },
  showcase: { label: "Showcase", singularLabel: "Showcase" },
};

export const videoCatalogFilters = [
  { id: "all", label: "All" },
  { id: "ad", label: "Ads" },
  { id: "tutorial", label: "Tutorials" },
];

const generatedVideoMediaByCaseStudy = {
  "ai-reveal-ad-house-in-markham": {
    poster: "/posters/portrait/ai-reveal-ad-for-house-in-markham-poster.jpg",
    previewSrc:
      "/videos/previews/portrait/ai-reveal-ad-for-house-in-markham-preview.mp4",
    orientation: "portrait",
  },
  "brooke-street-build-preview-ad": {
    poster: "/posters/portrait/brooke-street-build-preview-ad-poster.jpg",
    previewSrc:
      "/videos/previews/portrait/brooke-street-build-preview-ad-preview.mp4",
    orientation: "portrait",
  },
  "yma-brand-positioning-reel": {
    poster: "/posters/portrait/yma-brand-positioning-reel-poster.jpg",
    previewSrc:
      "/videos/previews/portrait/yma-brand-positioning-reel-preview.mp4",
    orientation: "portrait",
  },
  "brick-cleaning-tutorial-film": {
    poster: "/posters/landscape/brick-cleaning-tutorial-film-poster.jpg",
    previewSrc:
      "/videos/previews/landscape/brick-cleaning-tutorial-film-preview.mp4",
    orientation: "landscape",
  },
  "masonry-result-showcase-ad": {
    poster: "/posters/portrait/masonry-result-showcase-ad-poster.jpg",
    previewSrc:
      "/videos/previews/portrait/masonry-result-showcase-ad-preview.mp4",
    orientation: "portrait",
  },
  "markham-house-series-part-3": {
    poster: "/posters/portrait/markham-house-cinematic-reel-poster.jpg",
    previewSrc:
      "/videos/previews/portrait/markham-house-cinematic-reel-preview.mp4",
    orientation: "portrait",
  },
  "markham-house-series-part-2": {
    poster: "/posters/portrait/markham-house-process-reel-poster.jpg",
    previewSrc:
      "/videos/previews/portrait/markham-house-process-reel-preview.mp4",
    orientation: "portrait",
  },
  "brick-factory-tour-tutorial": {
    poster: "/posters/portrait/brick-factory-tour-tutorial-poster.jpg",
    previewSrc:
      "/videos/previews/portrait/brick-factory-tour-tutorial-preview.mp4",
    orientation: "portrait",
  },
  "new-material-launch-reel": {
    poster: "/posters/portrait/new-material-launch-reel-poster.jpg",
    previewSrc:
      "/videos/previews/portrait/new-material-launch-reel-preview.mp4",
    orientation: "portrait",
  },
  "quick-result-highlight-ad": {
    poster: "/posters/portrait/quick-result-highlight-ad-poster.jpg",
    previewSrc:
      "/videos/previews/portrait/quick-result-highlight-ad-preview.mp4",
    orientation: "portrait",
  },
  "column-installation-part-2": {
    poster: "/posters/portrait/column-installation-reel-poster.jpg",
    previewSrc:
      "/videos/previews/portrait/column-installation-reel-preview.mp4",
    orientation: "portrait",
  },
};

function createVideoCaseStudy({
  slug,
  title,
  excerpt,
  challenge,
  solution,
  deliverables,
  outcomes,
  youtubeUrl,
  videoType,
  videoTags,
  series = null,
  proofNote = null,
  featured = false,
  featuredRank = null,
  orientation,
}) {
  const youtubeId = getYouTubeVideoId(youtubeUrl);
  const generatedMedia = generatedVideoMediaByCaseStudy[slug];

  return {
    slug,
    title,
    category: "Content",
    excerpt,
    challenge,
    solution,
    deliverables,
    outcomes,
    workKind: "video",
    videoType,
    videoTags,
    series,
    proofLevel: proofNote ? "public signal" : "selected",
    proofNote,
    media: {
      description: `${title} preview frame`,
      poster: generatedMedia?.poster ?? getYouTubeThumbnailUrl(youtubeId),
      previewSrc: generatedMedia?.previewSrc ?? null,
      youtubeUrl,
      youtubeId,
      orientation:
        generatedMedia?.orientation ??
        orientation ??
        inferYouTubeOrientationFromUrl(youtubeUrl),
    },
    featured,
    featuredRank,
  };
}

/**
 * Case studies are the single source of truth for Featured Work content.
 * Home cards use: `title`, `excerpt`, `featured`, `featuredRank`, `media.poster`, `videoType`.
 * Work cards use: `title`, `excerpt`, `videoType`, `series`, `proofNote`, `outcomes`, `media.poster`.
 * Case Study page uses: `challenge`, `solution`, `deliverables`, `outcomes`, `series`, and full `media`.
 *
 * Recommended pattern for a new video item:
 * Use `createVideoCaseStudy`, keep `slug` unique, and include the YouTube URL plus polished English copy.
 */
export const caseStudies = [
  createVideoCaseStudy({
    slug: "ai-reveal-ad-house-in-markham",
    title: "AI Reveal Ad for House in Markham",
    excerpt:
      "A short-form property ad that used AI animation, drone footage, and tight post-production to turn one build into a stronger promo piece.",
    challenge:
      "The property needed more than a standard jobsite recap. The client needed a reel that felt commercial, showed the craft clearly, and could earn attention quickly.",
    solution:
      "Built the edit around AI animation, professional camera work, drone coverage, layered sound design, and a more structured reveal of the house and the work behind it.",
    deliverables: [
      "Short-form ad reel",
      "AI animation accents",
      "Professional camera coverage",
      "Drone footage and sound design",
    ],
    outcomes: [
      "Gave the property a more premium short-form presentation",
      "Combined process footage and finished visuals in one clear ad",
      "Created a stronger promo asset for social distribution",
    ],
    youtubeUrl: "https://youtube.com/shorts/ZHpGl9Aw-m8",
    videoType: "ad",
    videoTags: ["ad", "real-estate", "reel", "ai-animation", "drone"],
    proofNote: "147k views on Instagram",
  }),
  createVideoCaseStudy({
    slug: "brooke-street-build-preview-ad",
    title: "Brooke Street Build Preview Ad",
    excerpt:
      "A progress-stage property ad that visualized the future result while showing the crew, scale, and pace of the build.",
    challenge:
      "The house was still in progress, so the content needed to sell the vision before the final result was physically complete.",
    solution:
      "Used AI animation to preview the future outcome, then balanced that with dynamic crew footage, drone angles, and on-site detail shots to make the work feel larger and clearer.",
    deliverables: [
      "Progress-stage ad reel",
      "AI-assisted future-state visuals",
      "Crew and site coverage",
      "Drone-backed property framing",
    ],
    outcomes: [
      "Made an unfinished project easier to market visually",
      "Showed both the crew effort and the planned result",
      "Turned an in-progress build into a stronger promotional asset",
    ],
    youtubeUrl: "https://youtube.com/shorts/P9h9_3Q8MLk",
    videoType: "ad",
    videoTags: ["ad", "real-estate", "reel", "ai-animation", "drone"],
  }),
  createVideoCaseStudy({
    slug: "yma-brand-positioning-reel",
    title: "YMA Brand Positioning Reel",
    excerpt:
      "A narrated brand reel assembled from long-range footage to give YMA a stronger media-facing introduction and clearer market positioning.",
    challenge:
      "YMA needed a stronger public-facing media asset that could present the company with more clarity than scattered project clips alone.",
    solution:
      "Shaped footage collected over time into a single narrated reel with deliberate pacing, polished color, smoother transitions, and supportive sound design.",
    deliverables: [
      "Narrated brand reel",
      "Archive and field-footage assembly",
      "Color correction and transitions",
      "Sound-supported final edit",
    ],
    outcomes: [
      "Gave YMA a clearer brand-level introduction piece",
      "Supported stronger positioning across social media",
      "Created a more useful asset for future client conversations",
    ],
    youtubeUrl: "https://youtube.com/shorts/RldM9V5XUUs",
    videoType: "ad",
    videoTags: ["ad", "narrated-ad", "brand-positioning", "reel"],
    proofNote: "340k views on Instagram",
    featured: true,
    featuredRank: 1,
  }),
  createVideoCaseStudy({
    slug: "brick-cleaning-tutorial-film",
    title: "Brick Cleaning Tutorial Film",
    excerpt:
      "A production-heavy tutorial that made a technical brick-cleaning process easier to watch, follow, and trust.",
    challenge:
      "Chemical brick cleaning is useful but not naturally attention-grabbing on camera. The tutorial needed to stay informative without feeling flat or overly technical.",
    solution:
      "Built the piece around a planned full-day shoot, the owner as the on-camera guide, voice support, motion-text callouts, AI animation, and a tighter edit rhythm.",
    deliverables: [
      "Tutorial-led YouTube cut",
      "On-location production day",
      "Voice and on-camera guidance support",
      "Motion cues, text design, and AI animation",
    ],
    outcomes: [
      "Made a technical service easier for viewers to understand",
      "Gave the owner a clearer on-camera teaching asset",
      "Turned a routine process into a stronger educational video",
    ],
    youtubeUrl: "https://youtu.be/zpUtBRHcEck",
    videoType: "tutorial",
    videoTags: ["guide", "tutorial", "youtube-video", "reel"],
    featured: true,
    featuredRank: 2,
  }),
  createVideoCaseStudy({
    slug: "masonry-result-showcase-ad",
    title: "Masonry Result Showcase Ad",
    excerpt:
      "A fast result-led ad cut that shows the build process and the final masonry finish in one clean, high-energy reel.",
    challenge:
      "The client needed a fast promotional cut that showed enough of the work process to feel credible while still landing on a strong visual payoff.",
    solution:
      "Edited the reel around quick process beats, a clear result reveal, rich color finishing, and a more commercial pace that kept the transformation easy to read.",
    deliverables: [
      "Short-form ad reel",
      "Process-to-result edit structure",
      "Color-rich finishing pass",
      "Social-ready delivery",
    ],
    outcomes: [
      "Highlighted the transformation without slowing the pace",
      "Gave the client a stronger result-first promo asset",
      "Made the finished masonry work feel more visually memorable",
    ],
    youtubeUrl: "https://youtube.com/shorts/NzxAmM4Kug8",
    videoType: "ad",
    videoTags: ["ad", "real-estate", "reel", "showcase"],
    proofNote: "348k views on Instagram",
    featured: true,
    featuredRank: 3,
  }),
  createVideoCaseStudy({
    slug: "markham-house-series-part-3",
    title: "Markham House Cinematic Reel",
    excerpt:
      "A compact cinematic cut from the Markham house project, focused on one more polished look at the build in motion.",
    challenge:
      "The reel needed to add another strong visual angle to the Markham house project without relying on a repetitive recap structure.",
    solution:
      "Kept the edit short, cinematic, and process-led, using a cleaner rhythm and carefully selected shots to make the footage feel intentional on its own.",
    deliverables: [
      "Short cinematic reel",
      "Process detail coverage",
      "Atmosphere-led edit pacing",
      "Social-ready export",
    ],
    outcomes: [
      "Added another polished visual angle to the project",
      "Kept the build process watchable without overexplaining it",
      "Delivered a clean standalone social asset",
    ],
    youtubeUrl: "https://youtube.com/shorts/DVixU5KEdMM",
    videoType: "showcase",
    videoTags: ["reel", "showcase", "work", "cinematic"],
  }),
  createVideoCaseStudy({
    slug: "markham-house-series-part-2",
    title: "Markham House Process Reel",
    excerpt:
      "A cinematic process-first cut from the Markham house project with fresh action, pacing, and a tighter on-site rhythm.",
    challenge:
      "The footage needed to feel sharp and energetic enough to stand alone while still keeping the focus on real process work.",
    solution:
      "Built the edit around new site action, tighter pacing, and a more cinematic structure so the project felt clear and visually intentional.",
    deliverables: [
      "Process-led reel",
      "Fresh site coverage",
      "Cinematic edit pass",
      "Social delivery cut",
    ],
    outcomes: [
      "Turned routine process footage into a stronger standalone reel",
      "Added visual energy without losing clarity",
      "Gave the project another usable promotional asset",
    ],
    youtubeUrl: "https://youtube.com/shorts/lMRAo-wmWnA",
    videoType: "ad",
    videoTags: ["ad", "real-estate", "reel"],
  }),
  createVideoCaseStudy({
    slug: "brick-factory-tour-tutorial",
    title: "Brick Factory Tour Tutorial",
    excerpt:
      "A tutorial-style factory tour that followed YMA through a brick production facility and kept a fast-moving shoot readable.",
    challenge:
      "The assignment involved a busy location and a moving tour, so the footage had to stay clear even while the shooting conditions changed quickly.",
    solution:
      "Captured the day in a more documentary-style way, then edited it into a tutorial-leaning walkthrough that stayed practical and easy to follow.",
    deliverables: [
      "Factory tour tutorial",
      "Fast-moving on-site coverage",
      "Documentary-style edit structure",
      "Educational social cut",
    ],
    outcomes: [
      "Turned a difficult shoot day into useful behind-the-scenes content",
      "Expanded the educational side of the content library",
      "Made the factory visit more accessible to viewers",
    ],
    youtubeUrl: "https://youtube.com/shorts/6omI3v2h4No",
    videoType: "tutorial",
    videoTags: ["tutorial", "showcase", "blog", "factory-tour"],
  }),
  createVideoCaseStudy({
    slug: "new-material-launch-reel",
    title: "New Material Launch Reel",
    excerpt:
      "A launch-style reel built to introduce a newer material through direct application footage and a sharp result reveal.",
    challenge:
      "The material was new to the market at the time, so the reel needed to quickly show what it looked like in use and why it mattered visually.",
    solution:
      "Focused on direct application footage, a clean result payoff, and a music-led edit that kept the presentation concise and audience-friendly.",
    deliverables: [
      "Material launch reel",
      "Application footage coverage",
      "Music-led pacing",
      "Result reveal edit",
    ],
    outcomes: [
      "Introduced the material in a more watchable way",
      "Gave viewers a clearer visual sense of the result",
      "Created a concise launch-ready video asset",
    ],
    youtubeUrl: "https://youtube.com/shorts/TW4ZDdtOOhI",
    videoType: "ad",
    videoTags: ["ad", "real-estate", "reel", "showcase", "material-launch"],
  }),
  createVideoCaseStudy({
    slug: "quick-result-highlight-ad",
    title: "Quick Result Highlight Ad",
    excerpt:
      "A compact result-first ad that relied on rich color, quick pacing, and a clean finish to keep the message direct.",
    challenge:
      "The brief called for a very short piece, so the reel had to feel polished and representative without relying on a longer explanation.",
    solution:
      "Leaned on saturated color, simple structure, and direct result framing to make the short format feel intentional instead of rushed.",
    deliverables: [
      "Short-form highlight ad",
      "Compact edit structure",
      "Color-forward finishing",
      "Social delivery cut",
    ],
    outcomes: [
      "Kept the message compact without losing clarity",
      "Delivered a strong first visual impression",
      "Produced a clean representative short-form asset",
    ],
    youtubeUrl: "https://youtube.com/shorts/ypTBi27T8js",
    videoType: "ad",
    videoTags: ["ad", "real-estate", "reel"],
  }),
  createVideoCaseStudy({
    slug: "column-installation-part-2",
    title: "Column Installation Reel",
    excerpt:
      "A heavy-build installation reel that keeps the focus on motion, structure, and the physical weight of the work on site.",
    challenge:
      "The footage needed to feel substantial and readable at the same time, despite the physical scale and intensity of the installation work.",
    solution:
      "Trimmed the cut around stronger follow-through moments and a tighter pace so the reel felt purposeful and complete as a standalone piece.",
    deliverables: [
      "Installation showcase reel",
      "Installation detail coverage",
      "Momentum-focused edit pass",
      "Social-ready export",
    ],
    outcomes: [
      "Presented the installation work as a strong standalone asset",
      "Made a complex on-site process easier to read",
      "Preserved the physical intensity of the project on screen",
    ],
    youtubeUrl: "https://youtube.com/shorts/7D3KGSwvBxE",
    videoType: "showcase",
    videoTags: ["reel", "work", "showcase"],
  }),
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
