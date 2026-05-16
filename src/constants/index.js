import {
  getYouTubeThumbnailUrl,
  getYouTubeVideoId,
  inferYouTubeOrientationFromUrl,
} from "../lib/youtube.js";
import {
  contactDetails as contactDetailsConfig,
  contactDirectChannels as contactDirectChannelsConfig,
  contactFormOptions as contactFormOptionsConfig,
} from "../lib/contactConfig.js";

export const navLinks = [
  { label: "Home", path: "/" },
  { label: "Work", path: "/work" },
  { label: "Services", path: "/services" },
  { label: "Pricing", path: "/pricing" },
  { label: "About", path: "/about" },
  { label: "Contact", path: "/contact" },
];

export const heroContent = {
  headline: {
    intro: "I help businesses",
    focus: "look clear online",
    outro: "and turn attention into action.",
  },
  subheadline: "Make your offer clear, trusted, and easy to act on.",
  primaryCta: { label: "Start a Project", path: "/contact" },
  secondaryCta: { label: "See My Work", path: "/work" },
};

export const homeSections = [
  { id: "hero", label: "Hero" },
  { id: "featured-work", label: "Featured Work" },
  { id: "services-overview", label: "Services Overview" },
  { id: "final-cta", label: "Final CTA" },
];

export const services = [
  {
    slug: "web-development",
    title: "Web Development & Launch",
    image: "/posters/services/web-app-development.jpg",
    imageAlt:
      "Dark studio desk with laptop and phone showing abstract website and app interfaces.",
    summary:
      "Custom websites, landing pages, and lightweight web apps built for conversion, speed, and a clean launch. This is the foundation everything else plugs into.",
    deliverables: [
      "Custom landing pages",
      "Business and portfolio websites",
      "Presentation-style sites",
      "Lightweight web apps",
      "Responsive, SEO-ready builds",
    ],
    outcomes: [
      "Clearer offer messaging",
      "Stronger conversion paths",
      "Faster launch cycles",
    ],
  },
  {
    slug: "video-editing",
    title: "Video Editing",
    image: "/posters/services/video-editing.jpg",
    imageAlt:
      "Cinematic editing desk with color grading controls and a video timeline.",
    summary:
      "Post-production for short-form and long-form video: edit, color, sound design, motion graphics, and platform-ready cutdowns.",
    deliverables: [
      "Short-form social edits",
      "Promo and brand films",
      "Tutorials and long-form cuts",
      "Color grading and sound design",
      "Motion graphics and titles",
    ],
    outcomes: [
      "Higher-quality content assets",
      "Stronger pacing and retention",
      "Faster turnaround on social cuts",
    ],
  },
  {
    slug: "video-production",
    title: "Video Production & Filming",
    image: "/posters/services/video-filming.jpg",
    imageAlt:
      "Professional cinema camera on a dark production set with warm studio lights.",
    summary:
      "On-location shoots covering products, projects, properties, and teams — professional camera work, drone coverage, and a shotlist tuned for the edit.",
    deliverables: [
      "Half-day and full-day shoots",
      "On-location and on-site coverage",
      "Drone and aerial footage",
      "Multi-scene production",
      "Creative direction and shotlists",
    ],
    outcomes: [
      "Sharper, more usable raw footage",
      "Consistent visual quality across projects",
      "An asset library ready for ongoing content",
    ],
  },
  {
    slug: "brand-content-growth",
    title: "Brand Content Growth",
    image: "/posters/services/brand-content.jpg",
    imageAlt:
      "Brand content planning table with a camera, phone previews, and moodboard materials.",
    summary:
      "Ongoing content systems that grow a brand over time: planning, batching, recurring shoots, and consistent output across social and web.",
    deliverables: [
      "Content planning and calendar",
      "Batched shoot blocks",
      "Recurring monthly retainers",
      "Social-first cutdowns and story assets",
      "Performance review and iteration",
    ],
    outcomes: [
      "Consistent presence across channels",
      "Compounding brand recognition",
      "Less guesswork month over month",
    ],
  },
];

export const pricingCategories = [
  {
    slug: "web-offers",
    title: "Website Services",
    description:
      "Conversion-focused website packages, from landing pages to full business sites and custom builds.",
  },
  {
    slug: "monthly-retainers",
    title: "Brand Content Retainers",
    description:
      "Ongoing video and content systems for businesses that need consistent monthly output.",
  },
  {
    slug: "one-off-projects",
    title: "Video Projects",
    description:
      "Production and post packages for focused campaigns and standalone video deliverables.",
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
  "markham-house-reveal-ad": {
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
    slug: "markham-house-reveal-ad",
    title: "Markham House Reveal Ad",
    excerpt:
      "A short-form property ad built around an animated reveal, drone footage, and tight post-production to turn one build into a stronger promo piece.",
    challenge:
      "The property needed more than a standard jobsite recap. The client needed a reel that felt commercial, showed the craft clearly, and could earn attention quickly.",
    solution:
      "Built the edit around an animated reveal sequence, professional camera work, drone coverage, layered sound design, and a more structured presentation of the house and the work behind it.",
    deliverables: [
      "Short-form ad reel",
      "Motion graphics accents",
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
    videoTags: ["ad", "real-estate", "reel", "motion-graphics", "drone"],
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
      "Used motion graphics to preview the future outcome, then balanced that with dynamic crew footage, drone angles, and on-site detail shots to make the work feel larger and clearer.",
    deliverables: [
      "Progress-stage ad reel",
      "Animated future-state visualization",
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
    videoTags: ["ad", "real-estate", "reel", "motion-graphics", "drone"],
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
      "Built the piece around a planned full-day shoot, the owner as the on-camera guide, voice support, motion-text callouts, motion graphics, and a tighter edit rhythm.",
    deliverables: [
      "Tutorial-led YouTube cut",
      "On-location production day",
      "Voice and on-camera guidance support",
      "Motion cues, text design, and graphics",
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

export const longTermClients = [
  {
    company: "YMA Masonry",
    logoPath: "/images/yma-logo.png",
    logoShellClassName: "long-term-client-logo-shell--wide",
    logoClassName: "long-term-client-logo--wide",
    relationshipLabel: "Ongoing video partner since 2023",
    note:
      "Working together since 2023 across multiple video projects, delivery goals, and content use cases. The collaboration is still active, with continued video support as new projects and marketing needs come up.",
    instagramUrl: "https://www.instagram.com/yma_masonry/",
  },
];

export const faqs = [
  {
    question: "Do you only offer video editing?",
    answer:
      "No. Video editing is one part of the work. I also build websites, run on-location shoots, and manage ongoing brand content so presentation and growth improve together.",
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
      "Yes. Many projects start with one priority — usually a website launch or first video set — and expand into ongoing content and production as results come in.",
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
    icon: "Compass",
    title: "Find the clearest business priority",
    description:
      "We identify what people need to understand first: the offer, the proof, the service path, or the next action.",
  },
  {
    step: "02",
    icon: "PenTool",
    title: "Shape the message and assets",
    description:
      "The website structure, video direction, and content plan are built around one practical communication goal.",
  },
  {
    step: "03",
    icon: "Hammer",
    title: "Build and publish the usable version",
    description:
      "I create the pages, edits, and supporting content with clear milestones and a clean path to launch.",
  },
  {
    step: "04",
    icon: "Rocket",
    title: "Launch and refine",
    description:
      "Once the work is live, we tighten weak points and turn the strongest material into ongoing output.",
  },
];

export const socialLinks = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/pharma.zeus?igsh=OGg2YjdhcmlmOGYw&utm_source=qr",
    icon: "insta",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/vladyslav-maidansky-full-stack-developer/",
    icon: "linkedin",
  },
];

export const contactFormOptions = contactFormOptionsConfig;

export const valueStrip = [
  "Clear offer, polished website, useful content assets",
  "Video and web working together instead of scattered pieces",
  "Built for local businesses, founders, and lean teams",
];

export const whyWorkWithMe = [
  {
    icon: "Workflow",
    title: "One partner for the visible parts of growth",
    description:
      "Your website, videos, and recurring content should explain the same offer instead of feeling like separate projects.",
  },
  {
    icon: "Target",
    title: "Commercial clarity before polish",
    description:
      "The work starts with what the client needs to understand, believe, and do next. The visuals support that path.",
  },
  {
    icon: "Package",
    title: "Assets your team can actually use",
    description:
      "Every page, edit, and content piece is shaped for practical use: campaigns, sales conversations, launches, and daily brand presence.",
  },
];

export const recruiterPortfolio = {
  hero: {
    eyebrow: "Recruiter Portfolio",
    title: "Full-stack depth, kept separate from the client-facing pitch.",
    description:
      "This page is for recruiters and technical reviewers who want the broader engineering story behind the portfolio: product thinking, frontend execution, serverless routing, integrations, tests, and production hygiene.",
  },
  technicalHighlights: [
    {
      title: "Interactive frontend systems",
      description:
        "React and Vite interfaces with routed pages, reusable components, responsive layouts, and GSAP-driven interaction where motion helps the story.",
    },
    {
      title: "Production-minded app structure",
      description:
        "Data-driven content, case-study templates, media preview cards, pricing flows, contact routing, and deployment-specific rewrites are kept organized instead of hardcoded page by page.",
    },
    {
      title: "Serverless and integration work",
      description:
        "Contact submissions run through a Vercel serverless function with validation, normalized payloads, Resend REST email delivery, and local/testable helper modules.",
    },
    {
      title: "Quality and maintainability",
      description:
        "Tests cover contact-form behavior, safe external links, and contact payload handling. Lint/build checks stay part of the handoff process.",
    },
  ],
  capabilityGroups: [
    {
      title: "Frontend",
      items: [
        "React component architecture",
        "Responsive UI systems",
        "Tailwind CSS styling",
        "Motion with GSAP",
        "Accessible links, forms, and navigation",
      ],
    },
    {
      title: "Backend / integration",
      items: [
        "Vercel serverless routes",
        "Request validation",
        "Email delivery through Resend REST",
        "Environment-based configuration",
        "Local and deployed route parity",
      ],
    },
    {
      title: "Product execution",
      items: [
        "Offer and pricing structure",
        "Case-study content systems",
        "Video/media catalog workflows",
        "Conversion-focused contact paths",
        "Recruiter/client audience separation",
      ],
    },
  ],
  evidence: [
    "This site is both a client-facing business presence and a live product surface.",
    "The contact flow is implemented as a real API path, not a static mail link.",
    "The work catalog uses reusable data and card components for future expansion.",
    "Production routing is accounted for in Vercel so direct page URLs resolve correctly.",
  ],
};

export const contactDetails = contactDetailsConfig;

export const contactDirectChannels = contactDirectChannelsConfig;
