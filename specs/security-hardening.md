# Security Hardening Spec

## Objective
Harden the public Vite portfolio repo so public GitHub visibility and browser delivery stay safe by default without changing the current route structure or design direction.

## Scope
- Add repo-level security policy and automation.
- Add Vercel security headers.
- Centralize external-link allowlisting.
- Add tests for the new link-safety behavior.

## Acceptance Criteria
- Unknown or unsafe external URLs never render as clickable raw links.
- Allowed YouTube, Instagram, LinkedIn, `cal.com`, and approved `mailto:` links still work.
- CI runs lint, tests, build, and dependency audit.
- CodeQL and Dependabot configs exist in the repo.
- Vercel header config exists in `vercel.json`.

## Out of Scope
- HSTS
- backend secret storage
- user-generated HTML sanitization work that does not exist in this repo today
