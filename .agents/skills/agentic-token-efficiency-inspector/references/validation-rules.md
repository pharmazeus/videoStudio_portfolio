# Validation Rules

Use these rules during targeted review to flag token inefficiency and over-complex orchestration.

## Expected Agentic Components

Look for these baseline components before diagnosing inefficiency:
- Orchestrator/router logic
- Prompt/system-instruction sources
- Memory/retrieval policy
- Tool integration boundaries
- Planning/architecture documents
- Execution or evaluation loop

If key components are missing or mixed into one giant file, flag as maintainability and token risk.

## Token Waste Signals

Prioritize these as likely high-impact findings:
- Full-history context injected into every step
- Multiple agents re-reading the same long files
- Repeated self-check loops with little decision value
- Duplicated prompt blocks across many agents
- Agent handoff chains where deterministic code is enough
- Large planning docs passed verbatim to every sub-agent

## Size Heuristics (Soft Limits)

These are not hard caps. Treat as prompts for deeper inspection.
- System prompt files above ~1,500 tokens
- Agent instruction docs above ~3,000 tokens
- Planning docs above ~5,000 tokens without summaries
- Any single context payload above ~8,000 tokens by default

When sizes exceed soft limits, recommend summary layers and selective loading.

## Simplification Patterns

Prefer these changes first:
- Introduce one concise shared policy file instead of repeated prompt text
- Replace repeated “review loops” with explicit stop criteria
- Convert predictable agent steps into scripts/functions
- Add tiered context loading: summary -> focused excerpt -> full source on demand
- Collapse low-value specialist agents into a single orchestrator step

## Safety Guardrails

Do not recommend removing checks that enforce:
- Security boundaries
- Data integrity guarantees
- Critical correctness validations
- Compliance constraints

If a token-heavy check is essential, keep it and optimize surrounding context instead.
