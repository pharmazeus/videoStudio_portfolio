# Contact System V1

## Objective
Replace the Contact page `mailto:` submission with a real same-origin API flow that sends one notification email through Resend while preserving the existing pricing-prefill experience and graceful manual fallbacks.

## Scope
- `POST /api/contact` Vercel endpoint in `api/contact.js`
- Vite dev middleware so `/api/contact` also works on local `vite dev`
- shared contact validation + email payload helpers
- Contact page async submit states
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
- Local `vite dev` serves `/api/contact` through the same handler so the form does not 404 on `localhost`.
- Existing Pricing query params still prefill `projectType` and selected service context.
- Entered values remain in the form after any failed submit.
- Successful submit clears user-entered values.
- Outgoing contact emails include the submitted visitor email as a clickable `mailto:` link in the HTML body and as visible plain text in the text body.
- Missing env vars or provider failures surface as `500 send_failed` publicly and show a useful fallback message in the UI.
- `Book a Call` is removed.
- `npm run lint`, `npm run test`, and `npm run build` pass.
