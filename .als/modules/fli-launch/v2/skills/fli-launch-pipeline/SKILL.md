---
id: fli-launch-pipeline
description: Operator console for the launch Delamain — surface sessions needing attention and act on them.
---

# FliLaunch Pipeline Console

Operator interface for sessions in human-gate states.

## Attention queue states

- `awaiting-input` — session created, waiting for project code
- `awaiting-hook-selection` — hooks generated, operator needs to select
- `awaiting-chapter-review` — chapters drafted, operator needs to review
- `awaiting-review` — all content generated, operator needs to review and finalize

## Actions per state

### awaiting-input
- Set `project_code` (shortcode is sufficient — FliHub resolves it)
- Set optional `internal_label`, `focal_point_note`, audience keywords, related videos
- Advance to transcript fetch

### awaiting-hook-selection
- Show the **top-4 shortlist first** — the AI's ranked recommendation, #1 marked explicitly
- Operator reacts: confirm #1, pick from the shortlist, or request the full list
- Full list of 10-20 hooks is available below the shortlist if the operator wants more options
- Mark 1–3 hooks as selected
- Or: rework back to regenerate hooks

### awaiting-chapter-review
- Show generated chapter list from CHAPTERS section
- Operator reviews labels and timestamps
- Flag individual chapters for refinement (rework → refining-chapters)
- Or advance when satisfied

### awaiting-review
- Show all generated titles, thumbnails, chapters, description
- Select 3 title A/B candidates
- Select thumbnail concept + text
- Edit description slots, chapters, keyword tags
- Advance to assembly, or rework back to hook selection
