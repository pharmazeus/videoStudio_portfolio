# Current Execution State

## Current objective
Refresh the homepage pricing preview so it matches the Pricing page card system and clearly signals that one-off services are available too.

## Success criteria
- Homepage pricing preview shows exactly 3 monthly retainer cards using the same visual language as `/pricing`.
- Each homepage pricing card shows a compact `See full pricing` CTA at the bottom.
- The section includes a distinct one-off-services callout with clear, confident copy and its own small CTA to the pricing page.
- Verification passes for `npm run lint` and `npm run build`.

## Constraints
- Keep homepage pricing preview limited to monthly retainers; introduce one-off work through supporting copy while routing full pricing details through the card CTAs.
- Reuse the existing `PricingPackageCard` component and pricing visual language instead of creating a disconnected homepage card style.
- Keep routes, pricing data shape, and `/pricing` CTA behavior unchanged.

## Known blockers
- No code blockers. Manual browser QA is still needed to confirm spacing and hierarchy across responsive breakpoints.

## Next concrete step
Open `/` and `/pricing` in a real browser, then verify the refreshed homepage pricing section at 375px, 768px, 1024px, and 1280px for card height consistency, per-card CTA placement, and the new one-off callout button spacing/readability.

## Relevant files
- `src/pages/HomePage.jsx`
- `src/components/PricingPackageCard.jsx`
- `src/index.css`
- `specs/homepage-pricing-preview-refresh.md`
