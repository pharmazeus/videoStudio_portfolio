# Homepage Hero + Long-term Clients Refresh

## Summary
- Brighten the homepage hero without changing the hero asset or route structure.
- Add a staged 3-line headline with a restrained 3D-style treatment and a slow mount-only reveal.
- Carry the same accent language into shared headings, pills, and CTA states.
- Replace the generic testimonial presentation with a Long-term Clients section that preserves the existing reveal flow and ships with one YMA Masonry card.

## Implementation Notes
- Hero uses layered gradient overlays plus image brightness/scale easing instead of a single heavy black wash.
- Hero copy sits directly over the image; do not add a glass/liquid-glass panel behind the text.
- The warm orange-brown accent used across hero and header is named `copper` and should stay restrained.
- Header styling should use a liquid-glass shell with a subtle copper sheen, active-page state, and clean centered alignment.
- The home route should not inherit the shared top content padding from secondary pages; the hero image needs to start at the top of the viewport under the floating header.
- Hero media keeps its composed fill/crop framing.
- The shared header navigation should remain fully populated on `/work` and other internal pages, with only the current page emphasized.
- Shared heading system lives in `src/index.css` and is consumed by `SectionTitle`, `TitleHeader`, and `CTAButton`.
- `#testimonials` remains the section anchor and keeps title reveal, button appearance timing, hidden cards, and staggered card entrance.
- Client data is now company-first: company name, logo path, relationship label, and optional note/review.
- YMA Masonry uses a collaboration note, not a quoted testimonial.

## Acceptance Criteria
- The hero image subject is more visible on first homepage load while text remains readable.
- The face in the hero image stays unobstructed by any hero text panel.
- The hero image keeps the intended filled composition rather than switching to a full-frame fit.
- The middle hero line feels visually deeper than the surrounding lines.
- The header no longer reads as a flat black strip and stays visually centered/aligned at the top of the page.
- No black spacer appears above the hero image when the homepage is scrolled all the way to the top.
- The Work page shows the same full navigation set as the homepage instead of collapsing to a single Home link.
- Shared sections across the site show the updated heading and accent treatment.
- The clients section still reveals via the existing section trigger, then allows note expansion only when note content exists.
- Lint and build pass.
