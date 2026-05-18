import {
  getYouTubeThumbnailUrl,
  getYouTubeVideoId,
  inferYouTubeOrientationFromUrl,
} from "../lib/youtube.js";
import { generatedVideoMediaByCaseStudy } from "./video.js";

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
