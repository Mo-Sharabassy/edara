---
name: ui-test
description: Adversarial browser-based UI testing — diff-driven analysis, exploratory testing, parallel sessions. Uses Browserbase browse CLI. Source: github.com/browserbase/skills
---

# UI Test Skill

## Three-Phase Planning (always complete before execution)

**Phase 1 — Functional**: Map core user flows and expected outcomes as discrete action-result pairs.  
**Phase 2 — Adversarial**: Edge cases — different user contexts, error paths, empty states, race conditions, boundary inputs, rapid double-submission, XSS payloads, keyboard-only navigation, mobile overflow.  
**Phase 3 — Coverage Gaps**: Accessibility, viewport responsiveness (360/375/390/1280 px), console health, visual consistency.

## Sub-Agent Execution

Each sub-agent receives a numbered test list with an explicit step budget (25–75 browse commands). Sub-agents execute deterministically without exploration.

**Result markers:**
- `STEP_PASS|<id>|<evidence>` — backed by accessibility tree refs or eval results
- `STEP_FAIL|<id>|<expected> → <actual>|<screenshot-path>` — requires embedded screenshot

## Assertion Strength (strongest → weakest)

1. `browse eval` returning structured data (axe violations, console errors, element counts)
2. Accessibility tree snapshot matching
3. Before/after state comparison
4. Visual screenshot judgment (requires specificity)

## Modes

- `--local` for localhost — clean, reproducible browser isolation
- Remote (Browserbase) for deployed sites requiring auth state

## Key Deliverables

- Text report with step markers
- HTML report with embedded screenshots, collapsible details (failures open by default)
- Screenshots in `.context/ui-test-screenshots/`
