---
name: youtube-launch-optimizer-inspect
description: Read-only queries across video-analysis records — list, filter by state, find stuck records, show one. Use when the operator wants to inspect what's in the youtube-launch-optimizer module without changing anything.
---

# youtube-launch-optimizer-inspect

Read-only CRUD layer for the `video-analysis` entity in the `youtube-launch-optimizer` module.

## Purpose

Project the current state of the module's records to the operator. Never mutates files, never advances delamains, never invokes agents.

## Input

Example operator requests that trigger this skill:

- "show me all video-analysis records"
- "which projects are stuck on p06?"
- "list completed analyses"
- "what's in b71-bmad-poem.md?"
- "find any failed-p* records"

## Procedure

1. Resolve the data root from the active module: `workspace/youtube-launch-optimizer/video-analysis/`.
2. For list-style requests: glob `*.md`, parse frontmatter, project a table of `id | state | updated_at`.
3. For filter-by-state: glob `*.md`, filter where frontmatter `state` matches.
4. For show-one: read the named record, present frontmatter + section preview.
5. For "stuck" queries: list records by `state` with their `updated_at`; the operator decides what counts as stuck.

## Scope

- Reads `video-analysis/*.md` only.
- Does not edit records, does not transition states, does not invoke agents.
- For state changes or operator-action flows, hand off to `youtube-launch-optimizer-bulk-analysis` (the pipeline console).
- For schema changes or new modules, hand off to `/als:change` or `/als:new`.
