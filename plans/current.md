# Current Execution State

## Current objective
Maintain the first production-ready video catalog on `/work` and the new local `video-preview-prep` skill that will replace temporary placeholders with real preview assets.

## Success criteria
- Core routes remain live and navigable: `/`, `/work`, `/work/:slug`, `/services`, `/pricing`, `/about`, `/contact`.
- `/work` shows 11 currently available video case studies with working `All`, `Ads`, and `Tutorials` filters.
- `/work` uses generated local preview clips when available, falls back to generated posters, and only uses a placeholder as the final reserve state.
- `/work` cards use a fixed-height, media-first layout with a shared media viewport, compact copy, and bounded overflow behavior.
- `/work/:slug` detail pages render generated preview clips or posters from `caseStudies` with orientation-aware presentation.
- Homepage featured work reflects real video case studies.
- The local `video-preview-prep` skill exists with bundled scripts, eval scaffolding, and output manifest structure.
- Verification passes for `npm run lint` and `npm run build`.

## Constraints
- Keep visual direction dark, cinematic, and clean.
- Keep `caseStudies` as the single source of truth for portfolio content.
- Keep all portfolio copy truthful and English-only.
- Do not invent business metrics, outcomes, or urgency.
- Leave room for future optional `media.previewSrc` clips and future web/automation case studies.
- Keep the video-prep workflow local-first: Node scripts plus `ffmpeg/ffprobe`, no MCP in v1.
- Ask the user for preview duration before each `video-preview-prep` run; if they say `default`, use `5` seconds.

## Known blockers
- Four unavailable video projects were removed from the active catalog and can be restored later if assets return.
- Non-video portfolio work for websites and automation is still being prepared.
- Real production contact channels (email/booking URL) are placeholders and should still be replaced.

## Next concrete step
Review the fixed-height `/work` cards in the live UI and decide whether the desktop text-scroll zone needs any further polish or whether some excerpts should be shortened at the content layer.

## Relevant files
- `Videos.md`
- `.agents/skills/video-preview-prep/SKILL.md`
- `.agents/skills/video-preview-prep/references/asset-spec.md`
- `.agents/skills/video-preview-prep/evals/evals.json`
- `.agents/skills/video-preview-prep/scripts/inspect-video.js`
- `.agents/skills/video-preview-prep/scripts/make-preview.js`
- `.agents/skills/video-preview-prep/scripts/extract-poster.js`
- `.agents/skills/video-preview-prep/scripts/prepare-video-assets.js`
- `.agents/skills/video-preview-prep/scripts/print-case-study-patch.js`
- `.agents/skills/conversion-copywriter/SKILL.md`
- `specs/video-work-catalog.md`
- `specs/video-preview-prep-skill.md`
- `public/videos/previews/manifest.json`
- `public/videos/previews/portrait/ai-reveal-ad-for-house-in-markham-preview.mp4`
- `public/posters/portrait/ai-reveal-ad-for-house-in-markham-poster.jpg`
- `public/videos/previews/portrait/`
- `public/videos/previews/landscape/`
- `public/posters/portrait/`
- `public/posters/landscape/`
- `src/constants/index.js`
- `src/lib/youtube.js`
- `src/pages/HomePage.jsx`
- `src/pages/WorkPage.jsx`
- `src/pages/CaseStudyPage.jsx`
- `src/index.css`
- `src/sections/VideoShowcase.jsx`
- `src/components/VideoPreviewCard.jsx`
