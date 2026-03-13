# Video Work Catalog

## Objective
Ship the first production-ready video-first `/work` catalog using real YouTube-backed case studies.

## Scope
- Populate `caseStudies` with the currently available video entries derived from `Videos.md`.
- Keep `caseStudies` as the single source of truth for home, work, and case-study pages.
- Use YouTube thumbnails in v1 instead of local preview clips.
- Add `/work` filters for `All`, `Ads`, and `Tutorials`.
- Keep series entries as separate cards with related-series linking on detail pages.
- Add a temporary orientation-aware placeholder treatment on `/work` so portrait and landscape cards can be evaluated before real preview assets arrive.

## Content Rules
- All catalog copy is written in English using the local `conversion-copywriter` workflow.
- Use only proof explicitly present in `Videos.md`.
- Do not invent leads, sales, ROI, or conversion claims.
- If proof is missing, frame value through clarity, production quality, and process visibility.

## Acceptance Criteria
- `/work` shows only currently available video case studies.
- `Ads` and `Tutorials` filters work without removing showcase videos from `All`.
- `/work` clearly shows portrait and landscape card variants through temporary placeholders.
- Each card links to `/work/:slug` and the live YouTube video.
- Each case-study page renders without a local preview clip.
- Related content prioritizes the same series, then the same video type.
- Homepage featured work reflects the new video case studies without regressions.
