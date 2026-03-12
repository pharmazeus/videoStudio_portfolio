# Input — Spec
# Source: custom / derived from design system
# Last updated: [DATE]

## Purpose
Text input, textarea, and select. Foundation of all forms.
Input quality directly affects perceived product quality — high precision required.

---

## Base input

```tsx
<input
  className="
    flex h-9 w-full rounded-md border border-input bg-input
    px-3 py-1 text-sm text-foreground
    placeholder:text-muted-foreground
    transition-colors duration-150
    focus-visible:outline-none focus-visible:ring-2 
    focus-visible:ring-primary focus-visible:ring-offset-0
    disabled:cursor-not-allowed disabled:opacity-50
  "
/>
```

---

## Variants by state

### Default
```
border-border bg-input
```

### Focus
```
ring-2 ring-primary ring-offset-0
border-primary (or keep border-border — project decision: [FILL IN])
```

### Error
```
border-destructive
focus-visible:ring-destructive
```

### Disabled
```
cursor-not-allowed opacity-50 bg-muted
```

### Read-only
```
cursor-default bg-muted/50 focus-visible:ring-0
```

---

## Sizes (match button sizes)

```
sm:   h-8  text-sm  px-3   → Compact forms, inline edits
md:   h-9  text-sm  px-3   → DEFAULT
lg:   h-10 text-base px-4  → Prominent forms, auth pages
```

---

## Form field structure (full anatomy)

```tsx
<div className="space-y-1.5">
  {/* Label */}
  <label 
    htmlFor="field-id"
    className="text-sm font-medium text-foreground"
  >
    Field label
    {required && <span className="text-destructive ml-0.5">*</span>}
  </label>

  {/* Input with optional icons */}
  <div className="relative">
    {/* Left icon (optional) */}
    <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
    
    <input
      id="field-id"
      className="... pl-9"  {/* add pl-9 when left icon present */}
    />
    
    {/* Right icon / action (optional) */}
    <button className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
      <Eye className="size-4" />
    </button>
  </div>

  {/* Hint text (always present, shows error when invalid) */}
  <p className={cn(
    "text-xs",
    error ? "text-destructive" : "text-muted-foreground"
  )}>
    {error ?? hint}
  </p>
</div>
```

---

## Textarea

```tsx
<textarea
  className="
    flex min-h-[80px] w-full rounded-md border border-input bg-input
    px-3 py-2 text-sm text-foreground
    placeholder:text-muted-foreground
    resize-y
    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary
    disabled:cursor-not-allowed disabled:opacity-50
  "
/>
```

### Resize rules
```
resize-y:    default — user can resize vertically
resize-none: when height is fixed by content (auto-growing textarea)
```

---

## Select

```tsx
<select className="
  flex h-9 w-full rounded-md border border-input bg-input
  px-3 py-1 text-sm text-foreground
  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary
  disabled:cursor-not-allowed disabled:opacity-50
  appearance-none cursor-pointer
">
```

For complex selects: use Radix Select or shadcn Select component.

---

## Input group (with prefix/suffix)

```tsx
{/* Prefix (e.g. URL input with https://) */}
<div className="flex rounded-md border border-input overflow-hidden focus-within:ring-2 focus-within:ring-primary">
  <span className="flex items-center px-3 bg-muted text-sm text-muted-foreground border-r border-input">
    https://
  </span>
  <input className="flex-1 h-9 px-3 text-sm bg-input focus:outline-none" />
</div>
```

---

## Rules

- ALWAYS have a visible label — never label-less inputs (use placeholder as hint only)
- ALWAYS link label to input via `htmlFor` + `id`
- ALWAYS show error state inline below the input — never toast for form errors
- NEVER use red background on error — only red border + red helper text
- Placeholder text: use for format hints ("YYYY-MM-DD"), not for labels
- Password fields: always include show/hide toggle
- Search inputs: include clear button when value is present
- Number inputs: use `inputMode="numeric"` on mobile, not `type="number"` (avoid browser spinners)

---

## Notes

- Form layout: `space-y-4` between fields, `space-y-1.5` inside each field group
- Two-column form: `grid grid-cols-2 gap-4` — collapse to single column on mobile
- Required indicator: `*` in red after label, NOT inside placeholder
