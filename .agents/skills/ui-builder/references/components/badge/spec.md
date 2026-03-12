# Badge — Spec
# Source: custom / derived from design system

## Purpose
Small inline label for status, category, count, or tag.
Should be glanceable — not interactive by default.

---

## Variants

### default
```
inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium
bg-primary/10 text-primary border border-primary/20
```

### secondary
```
bg-muted text-muted-foreground border border-border
```

### success
```
bg-green-500/10 text-green-600 border border-green-500/20
dark: bg-green-500/10 text-green-400
```

### warning
```
bg-yellow-500/10 text-yellow-600 border border-yellow-500/20
```

### error / destructive
```
bg-destructive/10 text-destructive border border-destructive/20
```

### outline
```
bg-transparent text-foreground border border-border
```

---

## Sizes
```
sm:  px-1.5 py-0  text-[10px]  → Compact UI, table cells
md:  px-2.5 py-0.5 text-xs    → DEFAULT
lg:  px-3   py-1   text-sm    → Prominent badges, standalone labels
```

---

## With dot indicator
```tsx
<span className="inline-flex items-center gap-1.5 ...">
  <span className="size-1.5 rounded-full bg-green-500" />
  Active
</span>
```

## Rules
- Max 2-3 words in a badge — never a full sentence
- NEVER make badges interactive (no onClick) — use a Button with badge styling instead
- Status badges: always use semantic colors (green=active, red=error, yellow=pending)
- Count badges (notification dot): use `rounded-full size-5` with `bg-destructive`
