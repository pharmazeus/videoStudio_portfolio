# AGENTS.md

Project operating guide for AI agents working in this repo.

## Start Here

- Check `git status --short --branch` before changing files.
- Read only the files relevant to the task; avoid whole-repo scanning unless needed.
- Do not modify unrelated local changes.
- Keep changes focused, testable, and easy to review.
- Never run destructive git commands without explicit user approval.
- Prefer writing short, clean, step-by-step plan files in `.agents/plan/` over long inline specs.
- In plan files, use bullet points for single steps and numbered lists only when order is critical.
- Always try to keep code consice and simple (follow modern best practices and patterns). 
- Speed and usability of the application is very important, always try to optimize the code for better performance and user experience.
- Keep ordered project file structure and file names.
- If asked to work on a new feauture, redesign, or make any changes in the project, make sure to update the relevant documentation files.
- In the end of any your output , say : "Вперед Росомахи!" 

## Project Shape

- App source lives in `src/`; public assets live in `public/`; serverless routes live in `api/`.
- Prefer data-driven content in `src/constants/index.js` over repeated hardcoded JSX.
- Keep `public/` asset paths stable unless a migration is explicitly requested.
- `docs/` is for app-facing documentation; continuity/process specs belong under `specs/`.

## UI And Design

- For UI/layout/styling work, inspect existing responsive behavior before changing shared components.
- Follow `.agents/skills/ui-builder/design-system.md` when it exists and is relevant.
- Keep shared navigation consistent across pages and devices unless the user explicitly asks otherwise.
- Avoid broad visual refactors when the request is a targeted fix.
- Preserve existing design language: dark surfaces, copper accent, glassy header treatment, and polished responsive spacing.
- Never use nested page `section` wrappers without accounting for the global `section { width: 100dvw; }` rule.
- Do not use custom project classes such as `card-border` inside Tailwind `@apply`.

## Code Rules

- Use the existing stack and local patterns.
- Add comments only where logic is not self-explanatory.
- Use explicit `.js` extensions in server-side ESM import chains.
- Keep Vercel serverless functions isolated from broad frontend constants/modules that import client-only helpers or assets.
- New `/api/*` flows must work in local Vite development and in deployed Vercel routing.
- Use Resend REST field `reply_to` for direct HTTP email sends.
- Keep `vercel.json` CSP and rewrites aligned with actual frontend routes and external resources.

## Verification

- Minimum handoff check: `npm run lint`.
- Run `npm run build` when imports, routes, runtime behavior, or styling/build paths may be affected.
- If tests/checks cannot run or hang, state that clearly and do not pretend they passed.

## Continuity

- Use the continuity/logging skill only at the end of a meaningful task or when the user asks to close the session.
- Keep any session note short: objective, changed files/behavior, status, and one next step.

## Learned Rules

New durable corrections belong here. Use: `N. [CATEGORY] Always/Never do X — because Y.`

1. [STYLE] Keep `AGENTS.md` and agent-governance docs in English.
2. [PROCESS] Write planning/specification/instruction files in English.
3. [PROCESS] Keep local skill documentation paths aligned to `.agents/...`; avoid legacy vendor-specific path references.
4. [PROCESS] Ask for preview duration before running `video-preview-prep`; if the user says `default`, use `5` seconds.
5. [UX] Do not place glass/liquid-glass panels behind homepage hero copy when they obscure the face in the hero image.
6. [STYLE] Refer to the warm orange-brown accent as `copper`.
7. [UX] Do not leave a black gap above the homepage hero; the home route should start with the hero image behind the floating header.
8. [UX] If the user asks to see the homepage hero full size, preserve the full frame instead of cropping.
9. [UX] If the user asks to bring the homepage hero back as it was, restore the previous cropped fill composition.
10. [UX] Keep full shared header navigation visible on `/work` and other pages; do not collapse it to a single Home link.
11. [UX] Keep right-side header action buttons visible on mobile/tablet unless the user explicitly changes that direction.
12. [PROCESS] Inspect responsive behavior before changing shared navigation or layout logic.
13. [UX] Keep shared header CTA labels compact enough at tablet widths so they never compress or clip around 1024px.
14. [UX] Keep homepage hero accent text clean; no muddy grey spotting or tray-like shadow blocks under highlighted words.
15. [PROCESS] Keep `.agents` and future agent folders public only when they contain no sensitive/prohibited information and are safe as work examples.
16. [ARCH] New `/api/*` flows must work locally and on Vercel.
17. [CODE] Use Resend REST payload field `reply_to`, not SDK-style `replyTo`, when sending through direct fetch.
18. [ARCH] Align `vercel.json` CSP headers with all external resources the frontend loads.
19. [ARCH] Add explicit Vercel rewrites for BrowserRouter routes used in production.
20. [ARCH] Keep Vercel functions free of client-only frontend imports.
21. [ARCH] Use explicit `.js` extensions in server-side ESM import chains.
22. [UX] Do not change the visible site header when the user asks for a site logo unless they explicitly ask for in-page integration.
23. [PROCESS] Keep `AGENTS.md` under 200 lines and remove obvious boilerplate when it stops helping.
