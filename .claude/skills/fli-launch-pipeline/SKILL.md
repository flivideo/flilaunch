---
id: fli-launch-pipeline
description: Operator console for the launch Delamain — surface sessions needing attention and act on them.
---

# FliLaunch Pipeline Console

Operator interface for sessions in human-gate states.

## Attention queue states

- `awaiting-input` — session created, waiting for project code
- `awaiting-hook-selection` — hooks generated, operator needs to select
- `awaiting-review` — all content generated, operator needs to review and finalize

## Actions per state

### awaiting-input
- Set `project_code`
- Set optional `internal_label`, `focal_point_note`, audience keywords, related videos
- Advance to transcript fetch

### awaiting-hook-selection
- Show generated hook angles from HOOKS section
- Mark 1–3 hooks as selected
- Or: rework back to regenerate hooks

### awaiting-review
- Show all generated titles, thumbnails, chapters, description
- Select 3 title A/B candidates
- Select thumbnail concept + text
- Edit description slots, chapters, keyword tags
- Advance to assembly, or rework back to hook selection
