---
manifest_id: MUT-fli-launch-v1-to-v2-20260430-001
module_id: fli-launch
module_path: fli-launch
skill_paths:
  - .als/modules/fli-launch/v2/skills/fli-launch-manage
  - .als/modules/fli-launch/v2/skills/fli-launch-pipeline
primary_migration_script: .als/modules/fli-launch/v2/migrations/migrate_from_v1.py
from_version: 1
to_version: 2
change_class: schema_and_logic
data_migration_required: false
status: staged
created_on: 2026-04-30
updated_on: 2026-04-30
---

## Intent

Upgrade fli-launch from v1 to v2 with three improvements discovered during the first live session run: (1) the fetching-transcript agent now uses the confirmed FliHub API to pull shortcode, full project code, combined transcript, and per-recording SRT timings; (2) generating-hooks produces a ranked top-4 shortlist with an AI recommendation at #1, reducing operator cognitive load at Gate 2; (3) assembling-output automatically replaces the chapter placeholder in DESCRIPTION and writes a sibling machine-readable JSON export file for use by downstream software.

## Wants

- `fetching-transcript` agent uses confirmed FliHub API endpoints: resolve shortcode via `/api/query/projects/resolve?q={shortcode}`, fetch combined transcript via `/api/query/projects/{code}/transcript/text`, fetch per-recording SRTs via `/api/query/projects/{code}/transcripts/{recording}/srt`
- `generating-hooks` writes a ranked top-4 shortlist (★ AI recommendation at #1) before the full hook list in the HOOKS section
- `assembling-output` replaces the chapter placeholder in DESCRIPTION with real chapter content from CHAPTERS
- `assembling-output` writes a sibling `{id}-export.json` file containing all session data in machine-readable JSON form
- INPUTS section guidance updated to describe the four FliHub fields (shortcode, full code, transcript, SRT)
- HOOKS section guidance updated to describe the shortlist-first presentation
- DESCRIPTION section guidance updated to note that the chapter placeholder is replaced automatically
- EXPORT section guidance updated to describe the JSON sibling file pattern
- `fli-launch-pipeline` SKILL.md updated: awaiting-hook-selection gate now describes the shortlist-first operator experience; awaiting-chapter-review gate added as a distinct attention state

## Does Not Want

- Delamain state machine changed (states, transitions, phases — all identical to v1)
- Entity field names or types changed
- Section names changed
- Live session records modified
- `.als/system.ts` modified

## Invariants

- All existing v1 session records must validate against v2 schema without modification
- The four operator gates (awaiting-input, awaiting-hook-selection, awaiting-chapter-review, awaiting-review) remain at the same positions in the pipeline
- HOOKS, TITLES, THUMBNAILS, CHAPTERS sections remain list-only content (bullet_list, ordered_list) — no headings or tables added to these sections

## Contra-Invariants

- The chapter placeholder `[CHAPTERS — populated after chapters sub-Delamain completes]` is retired — assembling-output now owns that replacement automatically
- The EXPORT section is no longer the only output artifact — the sibling JSON file is the machine-readable canonical form; EXPORT becomes a pointer + human summary

## Migration Constraints

- No live record rewrite required — all changes are in agent logic and module guidance text
- The sibling JSON export file is written on the next run of assembling-output; existing completed sessions do not get backfilled automatically

## Current Module Understanding

Single entity (`launch-session`), one delamain (`launch`), two operator-facing skills (`fli-launch-manage`, `fli-launch-pipeline`). One live session record exists (`fli-launch/sessions/001-b65-guy-monroe-marketing-plan.md`) at status `completed`. The delamain has 11 non-terminal states, 4 operator gates, and 2 terminal states. The primary schema surface being touched is guidance text on INPUTS, HOOKS, DESCRIPTION, and EXPORT sections — not field types or section names.

## Schema Changes

- `INPUTS` section guidance: updated to describe four FliHub fields (shortcode, full code, transcript, SRT) and note that SRT is only read by generating-chapters
- `HOOKS` section guidance: updated to describe ranked top-4 shortlist presentation
- `DESCRIPTION` section guidance: updated to note chapter placeholder is replaced by assembling-output, never left as placeholder in final output
- `EXPORT` section guidance: updated to describe the JSON sibling file pattern

## Behavior Changes

- `fetching-transcript.md`: rewritten with confirmed FliHub API endpoints; fallback for offline/manual-load case preserved
- `generating-hooks.md`: updated to produce ranked top-4 shortlist with ★ AI recommendation marker before full list
- `running-analysis.md`: minor update — explicit note to read transcript only, not SRT block
- `generating-content.md`: minor update — chapter placeholder text changed to `[CHAPTERS — populated by assembling-output]`; note that agents must use only bullet/ordered list blocks in TITLES (no headings or tables)
- `generating-chapters.md`: updated to treat SRT timings as primary timestamp source when available; notes whether timestamps are SRT-derived or estimated
- `assembling-output.md`: rewritten — adds chapter placeholder replacement and JSON sibling file writing
- `fli-launch-pipeline` SKILL.md: awaiting-hook-selection section updated; awaiting-chapter-review gate added as explicit attention state

## Data Migration Plan

No record rewrite required. The v2 schema is fully backward compatible with v1 records — only guidance text changed, no field types or section names modified. Existing records at any status continue to validate under v2.

## Behavior Test Plan

- Create a new session, advance to fetching-transcript: confirm FliHub API is called, shortcode resolves to full code, transcript and SRT both written to INPUTS
- Advance to generating-hooks: confirm HOOKS section contains a top-4 shortlist with ★ marker at #1, followed by the full list
- Select hooks and advance to generating-content: confirm TITLES uses only bullet/ordered list blocks (no headings, no tables)
- Advance through to assembling-output: confirm chapter placeholder in DESCRIPTION is replaced with real chapter list; confirm `{id}-export.json` is written as sibling to session record; confirm EXPORT section contains pointer to JSON file

## Cutover Gates

- v2 bundle validates cleanly with `alsc` before cutover
- At least one full pipeline run on a new session completes successfully under v2 agents
- FliHub is running at localhost:5101 and the three API endpoints are confirmed reachable

## Risks

- FliHub SRT endpoint returns per-recording SRT, not a combined SRT — the fetching-transcript agent must loop over recordings. If a project has many recordings, this adds latency. Not a blocker for v2 but worth monitoring.
- The JSON export schema is not versioned in v2. If the shape changes in a future version, downstream consumers will need updating. Consider adding a `schema_version` field to the JSON in v3.

## Sign-off

Prepared by Claude (claude-sonnet-4-6) during live session with David Cruwys, 2026-04-30. Awaiting operator sign-off before commit.
