# Current Execution State

## Current objective
Pre-launch hardening for the `refactoring-ui` branch is complete locally; next step is to merge the PR into `main` and verify the production deploy on Vercel.

## Success criteria
- PR opened from `refactoring-ui` into `main` with the full pre-launch hardening changeset.
- Vercel preview deploy of the PR loads cleanly: `/`, `/work`, `/about`, `/contact` render without console errors.
- `/api/contact` POST returns `200 ok` on a real submission; 4th submission within 60s from the same IP returns `429 rate_limited`.
- Production headers include `Strict-Transport-Security: max-age=31536000; includeSubDomains; preload` and `Content-Security-Policy` no longer contains `mailto:` in `form-action`.
- Initial JS payload on `/` is materially smaller than before (lazy routes confirmed via Network tab — non-Home routes load their own chunk only on navigation).
- Lighthouse mobile Performance score > 80 on the deployed preview.
- No horizontal scroll on iPhone 12 viewport; hero image visible; header nav fully functional on mobile.

## Constraints
- Do not touch unrelated branches.
- Public contact API contract is now: `200 ok` / `400 validation` / `405 method_not_allowed` / `429 rate_limited` / `500 send_failed`.
- Keep the existing routing, layout, and design tokens intact — this PR is hardening, not redesign.

## Known blockers
- Local `npm run test` cannot start: jsdom `CustomElementRegistry.js` MODULE_NOT_FOUND. Environmental (corrupt or version-mismatched `node_modules`), not a code regression. Lint and build pass. Fix candidates for the next session: `rm -rf node_modules package-lock.json && npm install`, or pin `jsdom` to a known-good major in `package.json`, or switch the test environment to `happy-dom`.
- The current Resend API key may have appeared in screenshots/dev logs before this hardening pass. Rotation in [resend.com/api-keys](https://resend.com/api-keys) and updating Vercel project env (`RESEND_API_KEY`, both Production and Preview) is a recommended pre-launch step. User action, not automatable here.

## Next concrete step
Open the created PR and confirm the Vercel preview deploy URL renders. Then run the `/contact` rate-limit smoke test on the preview (4 rapid POSTs from the same IP — 4th should return 429), check response headers for HSTS, and run a mobile Lighthouse audit on the preview URL.

## Relevant files
- `api/contact.js`
- `src/lib/contactForm.js`
- `src/pages/ContactPage.jsx`
- `src/App.jsx`
- `src/pages/HomePage.jsx`
- `src/index.css`
- `index.html`
- `vite.config.js`
- `vercel.json`
- `.gitignore`
- `.env.example`
