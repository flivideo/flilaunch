# Launch Workflow

## Purpose

This document describes **what the user actually does** during a launch session and **how the system responds at each step**. It is derived from the v1 spec (sections 5–11 and 14a) and extracted here for UX design handoff (Claude Design, mockaccino, etc.).

This is not an architecture document. It does not redefine scope. If the workflow here disagrees with the spec, the spec wins — this doc gets updated.

**Status**: v1 — stable workflow shape, detail may refine as Claude Design surfaces UX needs.

---

## Overall flow

```
Transcript → Analysis → Hooks → Titles → Thumbnails → Description → Review/Finalize
                                                                         ↓
                                                              (record persists)
```

At any stage, the user can:
- **Regenerate** — re-run the stage with same or adjusted inputs
- **Edit** — manually revise generated output
- **Skip** — proceed without engaging the stage (only valid for optional outputs)
- **Return** — go back to an earlier stage and re-run forward

The launch record exists from the moment a transcript is submitted and persists across all stages (see spec section 14a).

---

## Stage 1: Input

### Trigger
User opens the app and initiates a new launch.

### Required inputs
- **transcript** (pasted text or uploaded file)

### Optional inputs
- **focal point / angle note** — a short hint about the video's intended angle
- **known audience keyword list** — a short ad-hoc list for this launch (supplements the static audience config)
- **related video list** — manually provided related videos

### System actions
- Create a new `LaunchRecord` with state `draft`
- Store the transcript
- Do NOT auto-advance — wait for user to trigger generation

### Output
- A `LaunchRecord` in state `draft`

### User decisions
- Submit and proceed to Analysis, OR save draft and return later

### Revision loops
- Replace transcript (resets downstream generation)
- Edit focal point / optional inputs before generating

### State transition
- Record starts in state `draft`

---

## Stage 2: Analysis

### Trigger
User initiates generation (or proceeds from Input stage).

### Required inputs (from record)
- transcript
- brand identifier (for config lookup — v1: single brand)

### Optional inputs (from record)
- focal point note
- audience keyword list

### Optional inputs (from configuration)
- static audience config (list of known identity terms for the brand)
- loaded concept docs (style guide, pillars, etc.) if referenced by the analysis prompt

### System actions
- Run the analysis prompt
- Extract: core idea summary, key value/promise, audience hints, identity keyword hints
- Store in `LaunchRecord.analysis`

### Output
- `Analysis` object linked to the record

### User decisions
- Accept analysis and proceed to Hooks, OR regenerate, OR manually edit

### Revision loops
- Regenerate (re-run the prompt)
- Edit analysis fields manually
- Adjust focal point / audience inputs and regenerate

### State transition
- First generation transitions record: `draft` → `generated`
- Any edit/interaction after: `generated` → `reviewed`

---

## Stage 3: Hooks

### Trigger
User proceeds from Analysis (automatic after first generation, or manual re-run).

### Required inputs
- analysis output
- transcript (for context)

### System actions
- Run the hooks prompt
- Generate 10–20 hook angles, each optionally tagged with hook type category (e.g. "X vs Y", "Only 1 worked", "I tried X", "This changed everything")
- Store each as a `HookAngle` linked to the record

### Output
- List of `HookAngle` candidates

### User decisions
- Select one or more hooks (Selected flag on HookAngle) that will drive both title and thumbnail generation (hooks are ancestors of both)
- Edit a hook before selecting
- Regenerate the full set
- Reject the set entirely and edit analysis, then regenerate

### Revision loops
- Regenerate hooks
- Edit individual hooks
- Select / deselect (multi-select supported)

### State transition
- Selection or edit: `generated` → `reviewed`

### Design notes
- **Hook precedes both title and thumbnail.** Do not generate thumbnails directly from titles; both derive from the same hook. See audit log: "Thumbnail derives from the hook, not from the title."

---

## Stage 4: Titles

### Trigger
At least one hook is selected, or user manually triggers.

### Required inputs
- selected hooks
- analysis (for context)

### System actions
- For each selected hook, run the titles prompt
- Generate ~10 title candidates per hook (or across hooks), linked to source hook
- Classify known audience terms (Primary/Secondary/Hidden) for this record if not already done

### Output
- List of `Title` candidates, each linked to a hook
- `AudienceSignalClassification` entries attached to record

### User decisions
- Select a shortlist (or single final title)
- Edit titles manually
- Regenerate
- Override audience signal placement (e.g. "promote BMAD to title" or "demote to badge")

### Revision loops
- Regenerate titles
- Edit titles manually
- Return to Hooks and reselect

### State transition
- Selection or edit: reaffirms `reviewed`

---

## Stage 5: Thumbnails

### Trigger
User proceeds from Titles (or manually triggers).

### Required inputs
- selected hooks (NOT titles — thumbnails derive from hooks)
- audience signal classifications (Secondary signals may drive badge suggestions)

### Optional inputs
- brand thumbnail style guide (loaded as concept doc if present)
- selected title (for contextual coherence, not as source of the concept)

### System actions
- For each selected hook, run the thumbnail prompt
- Generate 1–2 thumbnail concepts per hook
- For each concept, optionally generate thumbnail text suggestions
- Surface badge suggestions for Secondary audience signals

### Output
- List of `ThumbnailConcept` per selected hook
- List of `ThumbnailText` options per concept
- Badge placement suggestions (for audience signals)

### User decisions
- Select preferred concept(s) and text option(s)
- Accept / reject badge suggestions
- Edit concept descriptions
- Regenerate

### Revision loops
- Regenerate thumbnails
- Edit concept descriptions
- Return to Hooks and reselect

### State transition
- Selection or edit: reaffirms `reviewed`

---

## Stage 6: Description

### Trigger
User proceeds from Thumbnails (or manually triggers).

### Required inputs
- analysis (core idea, key value)
- transcript (for chapter timing)
- selected title
- selected audience signal classifications

### Optional inputs
- manual related-video list (from input stage or added mid-workflow)
- brand description conventions (concept doc)
- brand legal/affiliate blocks (concept doc)

### System actions
- Run the description prompt
- Generate each description slot: synopsis, chapters, related-video suggestions, (placeholders for) affiliate links, legal disclosures, CTA, brand block
- Generate 10–15 YouTube keyword tag suggestions (distinct from identity signals — for the YouTube keywords field)

### Output
- `Description` with linked `DescriptionSlot` entries
- List of `ChapterEntry` entries
- List of `RelatedVideoLink` entries
- List of `KeywordTag` entries

### User decisions
- Edit any slot inline
- Add / remove / reorder chapters
- Add / remove related videos
- Select / deselect keyword tags (up to the keyword field limit)
- Regenerate whole description or individual slots

### Revision loops
- Regenerate whole description
- Regenerate individual slots
- Edit slots inline
- Reset a slot to generated default

### State transition
- Selection or edit: reaffirms `reviewed`

---

## Stage 7: Review / Finalize

### Trigger
User indicates the launch is ready.

### Required inputs
- All prior stages completed (minimum: transcript + title + thumbnail + description)

### System actions
- Validate minimum completeness
- Transition record to state `finalized`
- Launch record persists (it always did) — finalize just marks it as user-ready

### Output
- `LaunchRecord` in state `finalized`
- User-facing summary of what's ready to copy / paste to YouTube:
  - title
  - thumbnail text (for the designer to consume)
  - description text (with slots filled)
  - YouTube keyword tags
  - chapter list

### User decisions
- Copy individual outputs to clipboard
- Export all outputs as a combined block
- Return to any earlier stage to edit (transitions `finalized` → `reviewed`)

### State transition
- On finalize: `reviewed` → `finalized`
- On further edit: `finalized` → `reviewed`

---

## Cross-cutting concerns

### Regeneration
Any stage can be regenerated at any time. Effects:
- New outputs replace or append to prior outputs (depending on stage — titles/thumbnails/hooks append; analysis/description replace)
- Upstream stages unaffected
- Downstream stages become implicitly stale — the `stale` flag should be set on the record if the user does not also regenerate downstream

### Staleness
- When a stage regenerates, downstream stages may be stale
- The `stale` flag is orthogonal to state — a `finalized` record can still be stale
- User can ignore staleness or re-run downstream

### Needs re-run marker
- User can explicitly mark a stage `needs_re_run` without regenerating
- Useful for "I'll come back to this" workflows

### Pause / resume
- Record always persists — closing the app / tab doesn't lose work
- Re-open the record, see current state, continue

### Prompt inspection (v1)
- Each stage's prompt run is recorded (`PromptRun` entity)
- Inspection is via files or dev-tools; no in-app modal in v1 (see audit log: prompt management UI deferred)

### Stage skipping
- Optional stages can be skipped (e.g. thumbnail text)
- Required stages cannot (title, thumbnail concept, description minimum)

---

## Workflow dependencies on supporting systems

| Stage | Depends on |
|---|---|
| Input | — |
| Analysis | analysis prompt, optional audience config |
| Hooks | hooks prompt, analysis |
| Titles | titles prompt, selected hooks, audience config, concept docs (if loaded) |
| Thumbnails | thumbnail prompt, selected hooks, audience classifications, brand style guide (if loaded) |
| Description | description prompt, selected title, audience classifications, legal/affiliate concept docs, manual related-video list |
| Review | all prior outputs |

---

## What this document does NOT define

- Exact page layouts or screen flow (Claude Design owns UX)
- Exact component structure
- Exact data field types (see `docs/semantic/semantic-model.json`)
- Exact prompt bodies (see `docs/prompts/`, as they're written)

---

## Related

- `docs/youtube-launch-optimizer-spec-v1.md` — authoritative v1 scope
- `docs/semantic/semantic-model.json` — machine-readable entity/state/event model
- `docs/semantic/semantic-model.md` — human-readable companion to the semantic model
- `docs/decisions/audit-log.md` — decision history (hook-before-title, state model, etc.)
