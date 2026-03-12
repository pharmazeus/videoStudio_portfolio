---
name: conversion-copywriter
description: Write or rewrite persuasive, truthful English copy for product messaging, offers, landing pages, hero sections, CTAs, case studies, testimonials, ads, sales emails, demo scripts, and skill or product showcases. Use this skill whenever the user asks to write copy, rewrite this, make text sharper, punchier, clearer, more persuasive, or more conversion-focused. Also use it for headlines, subheadlines, hooks, value propositions, product or service descriptions, testimonial cleanup, case-study summaries, outreach copy, ad variants, and short video or script messaging even if the user does not explicitly say copywriting.
compatibility:
  - node (optional, for scripts/build-brief.js)
---

Write copy that earns attention without faking proof. Prioritize clarity, specificity, relevance, and truthful persuasion over hype.

## What this skill is for
Use this skill when the task is to create or improve copy for:
- hero sections
- headlines and subheadlines
- CTA labels and CTA blocks
- product, service, offer, or feature descriptions
- case studies and testimonial rewrites
- landing pages and sales sections
- short sales emails or outreach intros
- ad copy and short-form hooks
- demo scripts, portfolio blurbs, and skill or product showcases

Default output language is English unless the user explicitly asks for another language.

## Operating sequence
1. Extract the brief before writing:
   - audience
   - offer
   - problem or pain
   - desired outcome
   - proof or evidence
   - objections or friction
   - CTA
2. If the brief is messy, normalize it first. Use `scripts/build-brief.js` when the user input is fragmented or spread across notes.
3. Pick the right structure for the asset type.
4. Draft fast, then tighten aggressively.
5. Run a final 4C pass: clear, concise, compelling, credible.
6. Never invent proof, urgency, metrics, testimonials, or customer outcomes.

## Truthfulness guardrails
- Do not fabricate metrics, timelines, results, testimonials, logos, or adoption claims.
- Do not add fake scarcity such as countdowns, "only 3 spots left," or false urgency unless the user explicitly provides that fact.
- Do not hide the offer behind clever wording. The reader should know what is being offered and why it matters.
- If proof is missing, write clean copy without pretending certainty. You may signal where proof should be inserted.
- Prefer concrete outcomes over inflated adjectives.

## Structure selection
Use the lightest structure that fits the asset.

- `AIDA`: landing sections, pitch copy, hero-to-CTA flows.
  - Attention: hook the right reader.
  - Interest: show why this matters now.
  - Desire: turn features into outcomes.
  - Action: ask for one clear next step.
- `PAS`: pain-led hooks, ads, sales emails, rewrite requests that feel bland.
  - Problem: name the friction.
  - Agitation: show the cost of leaving it unresolved.
  - Solution: present the offer as a credible path forward.
- `FAB`: product and service descriptions.
  - Feature: what it is.
  - Advantage: why it is better or easier.
  - Benefit: what the buyer gets.
- `BAB`: case studies, transformation stories, portfolio blurbs.
  - Before: the weak starting point.
  - After: the stronger state.
  - Bridge: what changed and how.
- `4C` cleanup pass: every final draft must be clear, concise, compelling, and credible.

## Anti-patterns
Avoid copy that sounds expensive but says nothing.

Do not use:
- vague hype like "innovative," "revolutionary," or "next-generation" without substance
- feature dumps without user outcome
- generic startup jargon
- soft CTA verbs when a concrete action is possible
- filler intros that delay the point
- empty superlatives like "best-in-class"
- fake proof or fake certainty

## Output modes
Match the response to the request.

- `from-scratch`: build the asset from a raw brief.
- `rewrite`: keep the meaning, improve the wording.
- `shorten`: preserve substance, remove drag.
- `sharpen`: increase clarity, specificity, and force.
- `tone-shift`: keep the offer, change the voice.
- `multi-variant`: provide 3-5 distinct options when the user is choosing direction.

## Asset workflow
Read only the reference you need.

- Read `references/research-foundations.md` when you need the underlying persuasion principles and source-backed rules.
- Read `references/asset-playbooks.md` when you need structure for a specific asset type.
- Read `references/before-after-patterns.md` when rewriting weak copy or explaining why one version works better.

## Default drafting rules
- Lead with the reader's outcome or pain relevance, not your internal process.
- State the offer early.
- Use plain language with strong verbs.
- Make the first line carry real informational value.
- Prefer specificity over cleverness.
- Keep rhythm tight. Cut throat-clearing and repeated ideas.
- Use proof where available: customer result, operational fact, concrete differentiator, delivery detail.
- End with a specific CTA.

## Response templates
Use the smallest template that solves the request.

### Hero section
Use this when the user asks for hero copy, homepage messaging, or a value proposition.

```markdown
Headline: ...
Subheadline: ...
Primary CTA: ...
Secondary CTA: ...
```

### Product or service block
```markdown
Headline: ...
Body: ...
CTA: ...
```

### Case-study summary
```markdown
Title: ...
Summary: ...
Proof to insert or use: ...
CTA: ...
```

### Rewrite response
```markdown
Rewritten copy:
...

Why it works:
- ...
- ...
```

### Multi-variant response
```markdown
Option 1: ...
Option 2: ...
Option 3: ...
Recommended: Option X
Reason: ...
```

## If information is missing
If a missing field blocks quality, do one of the following:
- ask one targeted follow-up question
- or proceed with a clearly labeled assumption when the risk is low
- or provide a draft with `[proof placeholder]` or `[audience placeholder]` markers instead of inventing facts

## Final self-check
Before sending the copy, verify:
- The audience is obvious.
- The offer is obvious.
- The first line is useful.
- The copy says something specific.
- The CTA is actionable.
- No invented proof slipped in.
- The draft matches the asset type instead of forcing one generic pattern.
