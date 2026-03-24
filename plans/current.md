# Current Execution State

## Current objective
Harden the public portfolio repo and runtime link handling while preserving the recent homepage, pricing, and shared navigation work already in progress.

## Success criteria
- Repo-level security guardrails exist: `SECURITY.md`, Vercel headers, CI, CodeQL, and Dependabot configuration.
- External links only allow approved `https` hosts and approved `mailto:` destinations, with unsafe values degrading safely instead of rendering as raw links.
- Verification passes for `npm run lint`, `npm run test`, `npm run build`, and `npm run security:deps`.
- Remaining deployment verification is limited to checking live Vercel response headers after deploy.

## Constraints
- Keep the current route structure, shared UI patterns, and existing in-progress homepage/pricing/header changes intact.
- Keep `.agents` public by choice, but only with scrubbed, public-safe content.
- Do not introduce backend-only secret assumptions into this static frontend repo.

## Known blockers
- Live response-header verification cannot be completed locally because the new `vercel.json` headers need a deployed Vercel environment to inspect with `curl -I`.

## Next concrete step
Deploy the current branch to Vercel, then run `curl -I` against `/`, `/work`, `/contact`, and one `/work/:slug` page to confirm the CSP and related headers are present without breaking thumbnails, previews, or external CTA flows.

## Relevant files
- `SECURITY.md`
- `.github/workflows/ci.yml`
- `.github/workflows/codeql.yml`
- `vercel.json`
- `src/lib/safeExternalLink.js`
- `src/components/CTAButton.jsx`
- `src/components/VideoPreviewCard.jsx`
