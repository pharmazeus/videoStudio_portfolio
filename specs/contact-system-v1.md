# Contact System V1

## Objective
Replace the Contact page `mailto:` submission with a real same-origin API flow that sends one notification email through Resend while preserving the existing pricing-prefill experience and graceful manual fallbacks.

## Scope
- `POST /api/contact` Vercel endpoint in `api/contact.js`
- Vite local middleware so `/api/contact` works on local `vite dev` and `vite preview`
- optional local mock mode via `CONTACT_API_MOCK` for contact UI testing without sending email
- server-safe contact config split out of `src/constants/index.js`
- explicit `.js` extensions in the server-side ESM import chain so the Vercel Node runtime can load the function
- shared contact validation + email payload helpers
- Contact page async submit states
- inline Contact page success/error feedback that never depends on a clipped floating toast
- direct fallback channels for Gmail, Telegram, and Instagram
- tests for helpers, API, Contact page, and safe-link allowlist updates

## Public API Contract
- `POST /api/contact`
- `200 { ok: true }`
- `400 { ok: false, error: "validation" }`
- `405 { ok: false, error: "method_not_allowed" }`
- `500 { ok: false, error: "send_failed" }`

## Validation Rules
- `name`: required, trimmed, 2-120 chars
- `email`: required, trimmed, valid format, max 160 chars
- `company`: optional, trimmed, max 160 chars
- `projectType`: required, one of `content | website | automation | mixed-scope`
- `message`: required, trimmed, 10-4000 chars
- `service`: optional, trimmed, max 160 chars
- `website`: honeypot; if non-empty, reject as validation failure

## Contact Routing
- Sender: `CONTACT_FROM_EMAIL`
- Recipient: `CONTACT_TO_EMAIL`
- Reply-To: visitor-submitted email, sent as Resend REST field `reply_to`
- Manual fallback email: `mailto:vladmaidanskyi46@gmail.com`
- Secondary channels: Telegram and Instagram

## Acceptance Criteria
- Contact page submits to `/api/contact` with JSON payload.
- Contact page submission is fully client-handled after hydration and does not reload, redirect, or change scroll position after success/failure.
- Local `vite dev` serves `/api/contact` through the same handler so the form does not 404 on `localhost`.
- Local `vite preview` can serve `/api/contact` through the same handler, or through `CONTACT_API_MOCK=true` for UI-only testing.
- Production Vercel routing serves direct BrowserRouter page loads such as `/contact` and `/work/:slug` without 404ing.
- Plain Node import of `api/contact.js` succeeds under the repo’s `"type": "module"` setting.
- Existing Pricing query params still prefill `projectType` and selected service context.
- Entered values remain in the form after any failed submit.
- Successful submit clears user-entered values.
- Successful submit shows an inline “Message sent. I'll reply soon.” status that is visible on mobile, tablet, and desktop.
- Outgoing contact emails include the submitted visitor email as a clickable `mailto:` link in the HTML body and as visible plain text in the text body.
- Missing env vars or provider failures surface as `500 send_failed` publicly and show a useful fallback message in the UI.
- `Book a Call` is removed.
- `npm run lint`, `npm run test`, and `npm run build` pass.
