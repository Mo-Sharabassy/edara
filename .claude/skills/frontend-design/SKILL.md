---
name: frontend-design
description: Frontend design guidance — distinctive visual identity, deliberate typography, structure as information. Grounds design choices in the subject's own world rather than AI-era defaults.
---

# Frontend Design Skill

## Core Philosophy

Every project deserves a unique visual identity rather than templated defaults. Ground design decisions in the subject's own world — its materials, instruments, artifacts, and vernacular — not in generic patterns.

## Key Principles

**Typography & Visual Identity**: Make deliberate type choices specific to each brief. The typeface should carry personality and become memorable, not merely serve as neutral text delivery. Avoid "01 / 02 / 03" sequence markers unless sequence genuinely matters to understanding.

**Avoiding AI-Generated Defaults**: Three aesthetic clusters to question:
- Cream backgrounds + serif + terracotta accents
- Near-black + acid-green / vermilion
- Broadsheet layouts with hairline rules

**Spend boldness in one place** — let one signature element carry the risk while keeping surroundings disciplined and restrained.

## Process

1. **Design plan**: Develop a compact plan covering color, typography, layout, and signature element.
2. **Critique pass**: Before coding, verify the plan is genuinely distinctive, not defaulting to familiar patterns.

## Responsive & Mobile

- Always verify mobile viewport (375–390 px) for overflow, spacing, and tap-target size (≥ 44 px).
- Desktop-first codebases: extend existing `max-width` media-query blocks rather than rewriting mobile-first.
- Use `touch-action: pan-y` on interactive canvas/drag elements so vertical page scroll is never hijacked.
- Typography that works at 56 px on desktop needs a `clamp()` or explicit breakpoint rule for 360 px screens.
