# Conversion Copywriter Skill Spec

## Objective
Create a reusable local skill for writing and rewriting persuasive, truthful English copy across product, service, sales, portfolio, and showcase contexts.

## Scope
The skill should support:
- hero sections, headlines, subheadlines, and CTAs
- product and service descriptions
- case-study summaries and testimonial cleanup
- sales emails, ad copy, and short demo/video scripts
- copy rewrites that need sharper positioning, cleaner language, and stronger conversion intent

## Research basis
The skill codifies practical guidance from:
- Google Search Central on helpful, reliable, people-first content
- Mailchimp style guidance on clarity, tone, and descriptive CTA language
- Shopify guidance on benefit-led, audience-aware, scannable product copy
- Nielsen Norman Group guidance on clearly stating what a company does

## Deliverables
- `SKILL.md` with trigger guidance, workflow, structures, guardrails, and response templates
- `references/` with principle summary, asset playbooks, and before/after rewrite patterns
- `scripts/build-brief.js` for normalizing messy input into one structured brief
- `evals/evals.json` with qualitative manual prompts

## Acceptance criteria
- Default writing mode is English.
- The skill forbids fabricated proof, fake urgency, and misleading claims.
- The brief script prints a stable Markdown brief and writes no files.
- The skill is fully local to `.agents/skills/conversion-copywriter/`.
