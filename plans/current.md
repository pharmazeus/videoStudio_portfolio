# Current Execution State

## Current objective
Branch `prices-per-service-card`: `src/` restructure complete (HomePage, CaseStudyPage, NavBar split into folders; constants split into 8 domain files + barrel). Next step is user-side runtime QA in the browser before deciding whether to commit and merge.

## Success criteria
- HomePage `/` renders with all 7 sections; GSAP figures animate (orange floats up/rotates, dark floats down/rotates); pause/resume on tab visibility change; service cards fade in via IntersectionObserver; "See prices" navigates to `/pricing#<category>`; orange play button smooth-scrolls to Services Overview.
- CaseStudyPage `/work/<slug>` renders; hero video plays; video error falls back to poster.
- NavBar mobile menu (375px viewport): toggle opens menu; body scroll lock holds; pointer swipe works with velocity + snap; wheel-scroll snap works; tap on a dot switches slide; route change closes menu and resets `activeSlide`.
- All other routes (`/work`, `/services`, `/pricing`, `/about`, `/recruiters`, `/contact`) render unchanged.
- Visual diff before/after this branch: pixel-identical.

## Constraints
- Pure file reorganization — no behavior, no CSS class, no route change.
- Do not rename CSS classes (`home-hero*`, `home-service-card*`, `home-section*`, `homepage-atmosphere*`, `figure-orange`, `figure-dark`, `home-pricing-preview-*`, `navbar-*`, `long-term-client-*`).
- `App.jsx` and `SiteLayout.jsx` unchanged — folder pattern resolves via Vite (verified by build).

## Known blockers
- `src/pages/ContactPage/ContactPage.test.jsx` fails with `@testing-library/user-event` module resolution error. **Pre-existing** (identical failure on base commit), unrelated to this refactor. Fix candidates: `rm -rf node_modules package-lock.json && npm install`, or pin `@testing-library/user-event` to a known-good version.

## Next concrete step
User runtime QA in browser at all 8 routes + mobile NavBar (375px). The plan's Verification section (`/Users/vladislavmaydanskiy/.claude/plans/src-deep-spark.md`) lists exactly what to check. If all clean, commit the changeset.

## Relevant files
- `src/pages/HomePage/` (new — `index.jsx` + 7 sections + `components/ServiceCard.jsx` + `constants.js`)
- `src/pages/CaseStudyPage/` (new — `index.jsx` + `components/CaseStudyHeroMedia.jsx`)
- `src/components/NavBar/` (new — `index.jsx` + `NavBarHeader.jsx` + `NavBarMobileMenu.jsx` + `useNavBarGestures.js`)
- `src/constants/` (new domain files: `hero.js`, `services.js`, `pricing.js`, `video.js`, `caseStudies.js`, `home.js`, `about.js`, `recruiter.js`; `index.js` is now a barrel)
- Deleted: `src/pages/HomePage.jsx`, `src/pages/CaseStudyPage.jsx`, `src/components/NavBar.jsx`
- Unchanged: `src/App.jsx`, `src/components/SiteLayout.jsx`, `src/sections/*`, all other pages, all CSS
