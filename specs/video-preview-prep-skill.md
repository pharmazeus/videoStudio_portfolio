# Video Preview Prep Skill

## Objective
Create a local `video-preview-prep` skill that turns raw source videos into website-ready preview clips, posters, and manifest rows for the portfolio.

## Scope
- Add a local skill package under `.agents/skills/video-preview-prep/`.
- Bundle Node scripts that call `ffmpeg` and `ffprobe`.
- Define portrait and landscape export presets.
- Generate preview clips, posters, and a manifest under `public/`.
- Keep app integration manual in v1 by printing reusable `media` blocks instead of editing `caseStudies`.

## Operational Rules
- `ffmpeg` and `ffprobe` are required runtime dependencies.
- The skill must fail loudly and clearly if those binaries are missing.
- Before each execution, the agent must ask the user for the preview duration in seconds.
- If the user replies with `default`, the skill uses a `5` second preview.
- Always inspect source media before exporting.
- Never overwrite outputs unless `--force` is passed.
- One source file maps to one preview export.

## Acceptance Criteria
- The skill package includes `SKILL.md`, `references/asset-spec.md`, `evals/evals.json`, and working scripts.
- `inspect-video.js` reports width, height, duration, fps, bitrate, and orientation.
- `make-preview.js` and `extract-poster.js` produce actionable errors when dependencies are missing.
- `prepare-video-assets.js` writes `public/videos/previews/manifest.json`.
- `print-case-study-patch.js` outputs a reusable `media` block for `caseStudies`.
