---
name: video-preview-prep
description: Prepare site-ready video preview assets from raw source videos for this portfolio. Use this skill whenever the user wants to compress videos, generate preview clips, extract posters, batch-process raw footage, convert vertical or horizontal videos to website-ready preview assets, or create media paths and manifest rows for `caseStudies`.
compatibility:
  - node
  - ffmpeg (required at runtime)
  - ffprobe (required at runtime)
---

Prepare portfolio preview assets with a repeatable local workflow. This skill does not compress video "by itself" - it orchestrates bundled scripts that call local `ffmpeg` and `ffprobe`.

## What this skill is for
Use this skill when the user asks to:
- compress raw videos
- generate short preview clips
- extract poster frames
- batch-prepare preview assets
- adapt vertical or horizontal footage for the website
- generate manifest rows or `media` blocks for `caseStudies`

## Runtime contract
- `ffmpeg` and `ffprobe` must be installed on the machine.
- If either binary is missing, stop immediately and report the blocker clearly.
- Default runtime is Node scripts in `scripts/`.
- Do not introduce MCP for this workflow in v1.
- Before executing the skill, ask the user how many seconds the preview clip should be.
- If the user answers `default`, interpret that as `5` seconds.

## Operating sequence
1. Ask the user for the preview duration in seconds.
2. If the user says `default`, lock the duration to `5` seconds.
3. Inspect the source video first.
4. Determine orientation:
   - use explicit user input if provided
   - otherwise infer from source dimensions
5. Choose the export preset:
   - `portrait` => `720x1280`
   - `landscape` => `1280x720`
6. Export a muted preview clip.
7. Extract a poster frame.
8. Produce a manifest row for later app integration.
9. Report what was generated, skipped, or blocked.

## Input modes
- Single file input
- Directory input for batch preparation
- Optional JSON manifest mapping `slug -> sourcePath`
- Optional orientation override: `portrait`, `landscape`, or `auto`

## Output contract
- Preview clip: `public/videos/previews/<orientation>/<slug>-preview.mp4`
- Poster: `public/posters/<orientation>/<slug>-poster.jpg`
- Sidecar manifest: `public/videos/previews/manifest.json`
- Optional `media` snippet printed for `caseStudies`

## Default rules
- Preview duration must be explicitly confirmed with the user before execution.
- If the user says `default`, use `5` seconds.
- Preview FPS: `30` by default.
- Preview output is muted and loop-friendly.
- Poster format: `jpg`
- Poster timestamp: `1.0s` by default.
- If a source is shorter than the requested preview duration, export the available duration.
- Never overwrite outputs unless `--force` is passed.
- One source unit produces one preview export; do not auto-merge multiple files into one asset.

## Orientation policy
- `portrait` if source height is greater than width.
- `landscape` if source width is greater than or equal to height.
- If forced orientation conflicts with source orientation, use centered crop as the default fit strategy.

## Script entrypoints
- `scripts/inspect-video.js`
- `scripts/make-preview.js`
- `scripts/extract-poster.js`
- `scripts/prepare-video-assets.js`
- `scripts/print-case-study-patch.js`

Run each script with `--help` first when you need usage details.

## Folder conventions
- `public/videos/previews/portrait/`
- `public/videos/previews/landscape/`
- `public/posters/portrait/`
- `public/posters/landscape/`

## When information is missing
- If the user has not confirmed the preview duration yet, ask before running any export command.
- If `slug` is missing, generate it from the source filename in kebab-case.
- If orientation is ambiguous or metadata is unreadable, stop and report instead of guessing.
- If the user has not yet chosen specific source files, explain the expected input layout and wait.

## Reporting format
When you finish a run, report:
- inspected file count
- chosen orientation per asset
- generated preview paths
- generated poster paths
- skipped files and why
- blockers, if any

## References
- Read `references/asset-spec.md` for presets, naming, and manifest structure.
- Read `evals/evals.json` when creating or expanding test coverage.
