# Pricing Page Refresh

## Objective
Refresh the Pricing page so it feels more premium, remains fully responsive, and stays aligned with the portfolio's dark cinematic design system.

## Requirements
- Keep the existing route and page section order.
- Keep pricing content data-driven from `src/constants/index.js`.
- Fix the right-edge clipping by using viewport-safe wrappers and auto-fit grids.
- Add restrained copper gradient background depth behind the page content.
- Redesign package cards with a subtle shine-border treatment, featured badge, icon-led feature list, and stronger price hierarchy.
- Add a bottom `Select service` CTA to the main pricing package cards only.
- Route the CTA to `/contact` using query params for `projectType` and `service`.
- Prefill the Contact page with the matching project type, selected service context, and a light editable message starter.
- Keep add-ons simpler than the main package cards.
- Update the top intro copy and mixed-scope CTA block copy with the approved wording.
- Do not migrate the repo to TypeScript or a full shadcn structure for this task.

## Acceptance
- `/pricing` shows no horizontal overflow at mobile or desktop sizes.
- Package cards wrap cleanly at narrow and wide widths.
- Featured packages feel visually elevated without breaking the current visual language.
- Main pricing cards show a `Select service` CTA and add-ons do not.
- Selecting a pricing card opens `/contact` with correct prefilled scope and service context.
- `npm run lint` passes.
- `npm run build` passes.
