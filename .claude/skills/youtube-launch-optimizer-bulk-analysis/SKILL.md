---
name: youtube-launch-optimizer-bulk-analysis
description: Operator console for the bulk-analysis delamain — attention queue, universal action menu, retry of failed-p0N states. Use when the operator wants to drive video-analysis records through the 12-prompt pipeline or unstick failed records.
---

# Dependencies

## Scanner results

!`bash -c 'set -e; ROOT=$(pwd); test -f "$ROOT/.als/system.ts" && echo "ALS_SYSTEM: OK" || echo "MISSING_ALS_SYSTEM: run /als:install"; test -d "$ROOT/workspace/youtube-launch-optimizer/video-analysis" && echo "DATA_ROOT: OK" || echo "MISSING_DATA_ROOT: workspace/youtube-launch-optimizer/video-analysis"'`

## LLM Operations

- Verify the `bulk-analysis` dispatcher is reachable before any agent-state action. If not, surface remediation.
- Verify write access to `workspace/youtube-launch-optimizer/video-analysis/`.
- React to any `MISSING_*` token from Scanner results by refusing the action and pointing the operator at the remediation hint.

# youtube-launch-optimizer-bulk-analysis

Operator console for the `bulk-analysis` delamain. Surfaces records in operator-owned states (`failed-p01` … `failed-p12`) and presents the universal action menu derived from the delamain's transitions.

## Attention queue

On entry, scan `workspace/youtube-launch-optimizer/video-analysis/*.md`. Surface records whose `state` is operator-owned (`failed-p0N`). Group by state. Present:

1. **Create new video-analysis** — always shown.
2. **Attention items** — `[FAILED-P03] b71-bmad-poem  BMAD POEM Workflow` style.

If the queue is empty, only the Create option appears.

## Universal action pattern

For a selected `failed-p0N` record, read transitions where `from = current state`:

| Action | Description | When |
|---|---|---|
| Review | Present the entity for reading | Always |
| Respond | Decide whether to retry or abandon, then choose direction | Always |
| Exit | Exit the console | Always |

### Respond — two-phase

**Phase 1 (do the work):** Help the operator inspect the failure context — last `updated_at`, any error notes in the section that the failed agent was trying to fill. Decide: retry, edit-then-retry, or leave parked.

**Phase 2 (choose direction):** From `failed-p0N` the only legal transition is `advance → p0N`. If the operator says "retry", commit the state change. If they say "park", exit without changes.

### Review

Platform-aware presentation per `delamain-console-patterns.md` (CCLI / CDSK / CWEB / CCWK).

### After every transition

Update the entity's `state` field, then commit:

```
delamain: bulk-analysis <from> → <to> [operator]
```

The dispatcher only reads committed `HEAD`.

## Create new video-analysis

Prompt for `id` (project code, e.g. `b71-bmad-poem`) and `title`. Materialise an empty record at `workspace/youtube-launch-optimizer/video-analysis/{id}.md` with all required frontmatter and 12 empty body sections (each containing literal `null`). Set `state: p01` to enter the pipeline. Commit:

```
delamain: bulk-analysis (none) → p01 [operator]
```

The dispatcher will pick it up and run `p01.md` next.

## Scope

- Owns the operator-side of the `bulk-analysis` delamain.
- Does not invoke agents directly — the dispatcher does that.
- For pure read queries, prefer `youtube-launch-optimizer-inspect`.
- For schema changes, hand off to `/als:change`.
