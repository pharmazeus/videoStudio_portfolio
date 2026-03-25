# Homepage Pricing Preview Refresh

## Objective
Refresh the homepage pricing preview so it visually aligns with the full Pricing page while keeping the homepage focused on the monthly retainer entry points.

## Requirements
- Reuse the shared `PricingPackageCard` styling and hierarchy for the 3 homepage retainer cards.
- Keep the homepage preview data-driven from the existing `monthly-retainers` pricing entries.
- Render a compact `See full pricing` CTA at the bottom of each homepage preview card.
- Add a distinct callout under the cards that clearly states one-off services are available and includes a small CTA to view available services.
- Keep the section responsive and consistent with the current dark cinematic design system.

## Acceptance
- The homepage pricing preview shows exactly 3 monthly retainer cards with the same visual language as `/pricing`.
- Each homepage preview card includes a compact `See full pricing` CTA at the bottom.
- A separate callout block explains that one-off project options are available and includes a small CTA to the pricing page.
- `/pricing` keeps its existing per-card `Select service` CTAs unchanged.
- `npm run lint` passes.
- `npm run build` passes.
