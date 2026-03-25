# Site Logo Refresh

## Objective
Create a browser-facing logo asset for the site and replace the leftover default Vite browser branding without changing the visible in-page header.

## Requirements
- Keep the visible site header unchanged.
- Keep the browser logo aligned to the current design system: dark surfaces, cool-light contrast, and restrained copper accenting.
- Provide a standalone SVG mark that can be used as the browser favicon.
- Replace the default `Vite + React` document title and favicon with project-specific branding.

## Acceptance
- The browser tab uses the custom site mark as favicon.
- The browser title is no longer `Vite + React`.
- The visible site header remains unchanged.
- `npm run lint` passes.
- `npm run build` passes.
