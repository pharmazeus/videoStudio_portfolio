---
name: agentic-token-efficiency-inspector
description: Inspect agentic application architecture for token waste, unnecessary orchestration complexity, and context bloat. Use when users report fast token burn, ask why agentic workflows are expensive, request optimization of multi-agent pipelines, or want a focused review of orchestration, prompts, memory, and planning documents.
---

# Agentic Token Efficiency Inspector

## Overview

Run a focused, low-cost audit of an agentic codebase and identify the top reasons tokens are being wasted. Favor fast structure mapping first, then targeted deep review only on files that define agent behavior and system direction.

## Workflow

1. Confirm the audit trigger
- Run this skill only when the user asks for token-usage diagnosis, efficiency review, orchestration simplification, or similar.
- Keep this skill dormant otherwise.

2. Map structure without deep reading
- Start with a file tree and quick file-size scan.
- Run `scripts/scan_token_hotspots.py` to find likely context-heavy files before reading content.
- Skip full-file reads during this phase.

3. Ask user for critical agentic files
- Ask which files/folders are authoritative for:
- agent orchestration
- prompts/system instructions
- memory/retrieval policy
- planning/docs that define architecture and scope
- tools/integrations used by agents
- Prioritize these paths for deep review.

4. Execute targeted review
- Read only high-impact files and compare against `references/validation-rules.md`.
- Focus on repeated context injection, over-chained agents, redundant checks, and oversized prompts/docs.
- Avoid broad “read the whole repo” behavior unless explicitly requested.

5. Return a ranked optimization report
- Provide:
- `Top Token Sinks` (what costs tokens most)
- `Root Causes` (why each sink exists)
- `Fixes` (simplest safe change first)
- `Impact Estimate` (low/medium/high savings)
- `Risk` (what behavior may regress and how to test)

## Execution Rules

- Prefer architecture simplification over micro-optimizing prompts.
- Eliminate duplicated instructions and duplicate “check-for-checking” loops first.
- Collapse unnecessary multi-agent chains into fewer deterministic steps when possible.
- Recommend progressive loading: summaries first, deep context only on demand.
- Preserve correctness constraints; never trade away critical validation for token savings.
- Do not create a permanently running monitoring agent unless the user asks for that explicitly.

## Output Template

Use this structure in every audit response:

```text
Token Efficiency Audit
Scope: <paths reviewed>
Method: structural scan + targeted deep review

Top Token Sinks
1) <issue>
2) <issue>
3) <issue>

Root Causes
- <cause>
- <cause>

Recommended Fixes (ordered)
1) <fix> | Savings: <L/M/H> | Risk: <L/M/H>
2) <fix> | Savings: <L/M/H> | Risk: <L/M/H>

Validation Plan
- <test 1>
- <test 2>

Questions for User
- <missing file/folder confirmations>
- <constraints or non-negotiable behaviors>
```
