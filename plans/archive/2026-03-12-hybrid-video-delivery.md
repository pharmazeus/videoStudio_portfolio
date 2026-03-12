# Hybrid Video Delivery Plan

Date: 2026-03-12  
Status: Implemented

## Summary
This implementation adopts a hybrid delivery model:
- On-site local preview clips for fast browsing
- Full versions opened on YouTube via explicit CTA

Coverage:
- Home page renders up to 6 featured video cards
- Dedicated `/video-showcase` page renders a denser catalog

## Implemented Decisions
- Canonical shared model created in `src/constants/index.js`:
  - `id`, `title`, `previewSrc`, `poster`, `youtubeUrl`, `details`, `placement`, `order`
- Home rendering:
  - filters `placement === "home"`
  - sorts by `order`
  - limits to first 6 items
- Catalog rendering:
  - filters `placement === "catalog"`
  - sorts by `order`
  - renders full filtered list
- Reusable card contract:
  - local preview `<video>`
  - metadata block
  - `Watch Full Video on YouTube` CTA
  - CTA opens in new tab with `target="_blank"` and `rel="noopener noreferrer"`

## Performance Behavior
- Default video preload set to `none`
- Preview activation driven by `IntersectionObserver` with near-viewport root margin
- Desktop behavior:
  - muted autoplay only when card is near/in viewport
  - pauses when card leaves viewport
- Mobile behavior:
  - no eager autoplay logic
  - playback is user-driven through native controls
- Posters are mandatory in the catalog model and provided for all items

## UI Consistency
- Home and catalog use the same reusable preview card pattern
- Shared visual language preserved:
  - dark card surfaces
  - existing spacing rhythm
  - section shell + gridline motif
  - consistent CTA styling

## Validation Checklist
- Functional:
  - home shows featured set (max 6)
  - catalog page shows full catalog placement set
  - each CTA links to YouTube
- Performance:
  - initial load avoids eager video fetching (`preload="none"`)
  - viewport-based activation works through observer
- Regression:
  - route structure preserved (`/` and `/video-showcase`)
  - lint/build pass required after changes

## Assumptions
- YouTube links are currently placeholder-valid IDs and can be replaced by final unlisted links anytime.
- v1 keeps external YouTube opening (no modal/embed player in-page).
