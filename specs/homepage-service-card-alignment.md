# Homepage Service Card Alignment

## Objective
Keep the four homepage service cards visually stable when their titles and summaries have different lengths.

## Requirements
- Structure each service card as a fixed rhythm: header, summary, footer.
- Keep the service index and title aligned at the top of the content area.
- Keep the `See prices` CTA pinned to the bottom of each card so all four buttons align on desktop.
- Clamp homepage service summaries when needed instead of allowing long copy to push the CTA down.
- Preserve the existing dark surface, copper CTA styling, hover behavior, and pricing anchor navigation.

## Acceptance
- The four service CTAs align on one horizontal line at desktop widths.
- Shorter summaries do not tighten the button upward.
- Longer summaries do not create overlap, clipping, or uneven button placement.
- Mobile stacked cards remain readable and balanced.
- `npm run lint` passes.
- `npm run build` passes.
