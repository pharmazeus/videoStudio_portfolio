# Homepage FAQ Reference Redesign

## Objective

Refresh the homepage FAQ into a reusable, reference-inspired section while preserving the site's existing dark cinematic design language.

## Decisions

- Use a reusable `FaqSection` component fed by `src/constants/index.js` FAQ data.
- Keep the real site navigation unchanged; do not recreate the mockup's internal mobile header.
- Use the existing copper accent, black surfaces, cool light text, `SectionTitle`, and `CTAButton`.
- Open the first FAQ item by default and keep accordion behavior accessible with button controls and ARIA state.
- Add a bottom contact CTA that points to `/contact` with the label `Scope my project`.

## Acceptance Criteria

- Homepage FAQ visually reads as a polished dark/copper accordion section.
- FAQ questions remain data-driven and reusable outside the homepage.
- The section works on mobile and desktop without clipped text or layout overlap.
- Focus states, button semantics, and expanded state are preserved.
- `npm run lint`, focused section tests, full tests, and `npm run build` pass before handoff.
