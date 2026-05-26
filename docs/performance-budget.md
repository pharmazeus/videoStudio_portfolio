# Performance Budget

## Core Web Vitals Targets

- Mobile Vercel Speed Insights Real Experience Score: `>= 93`.
- Desktop Vercel Speed Insights Real Experience Score: `>= 93`.
- Cumulative Layout Shift: `< 0.1`.
- Largest Contentful Paint: `< 2.5s`.
- Total Blocking Time Lighthouse proxy: `< 200ms`.

## Implementation Rules

- Keep layout space reserved before images, videos, cards, or client proof sections load.
- Use responsive local image sources for poster-heavy sections.
- Keep below-fold video previews unloaded until their cards are near the viewport.
- Prefer idle-time route prefetching over immediate post-load prefetching.
- Avoid external font CSS on the critical path unless the font is self-hosted and subsetted.
- On service-heavy pages, avoid repeated backdrop/filter blur on card grids; use solid layered surfaces, reserved dimensions, and `content-visibility` for below-fold cards instead.
- Service card images should use responsive poster variants, including a `640px` middle size for laptop cards that render around `500-600px` wide.
- Avoid text baked into service imagery so cards stay legible when cropped or scaled.
- Use `ResponsiveImage`'s optional `sources` prop when adding modern image formats so WebP/AVIF can sit before the JPEG fallback without changing existing call sites.

## Verification

- Run `npm run lint`.
- Run `npm run build`.
- Run Lighthouse mobile against a production preview before relying on Vercel field data.
- Remember that Vercel Speed Insights uses recent real-user data, so the dashboard may lag behind the deployed fix.
