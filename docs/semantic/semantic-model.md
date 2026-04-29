# Semantic Model — Companion Doc

## What this is

A human-readable companion to `semantic-model.json`. The JSON is the authoritative machine-readable source. This doc explains how to read it, how to use it, and where to extend it.

## What the semantic model is for

Two concrete consumers:

1. **Mockup generation** — Claude Design, mockaccino, or any similar tool that needs a structured entity/state/event model to generate realistic UI screens instead of generic placeholders.
2. **Implementation reference** — the eventual React + Supabase schema should align with this model. Not a 1:1 database schema, but a guide: entities become tables/types, relationships become foreign keys, states become enums, events become signals or triggers.

It is NOT:
- a database schema (no indexes, no types at the DB level, no validation rules)
- a REST API contract (no endpoints, no request/response shapes)
- an authoritative spec (the v1 spec + workflow doc are authoritative; this is derived)

## How to read the JSON

### `meta`
Metadata about this model — version, source documents, stability note, naming conventions.

### `entities`
The core building blocks. Each entity has:
- **description** — what the entity represents
- **attributes** — fields with types, required flags, enum values, examples
- **relationships** — how entities connect (has_one, has_many, belongs_to)
- **actions** — verbs the entity participates in; useful for mockup button labels and state transitions

### `state_machines`
Entities with lifecycle states. Currently only `LaunchRecord` has one. Each machine lists:
- **primary_states** — the valid states
- **transitions** — how to move between states
- **orthogonal_flags** — booleans independent of primary state

### `events`
Named events that fire during a workflow. Each has a payload shape. Events are how the UI knows something happened (e.g. for toasts, progress updates, audit trails).

### `workflow`
The happy-path sequence of events for a linear launch, plus the named revision loops.

### `scope_boundaries`
Explicit list of what's v1 and what's v2+. Important for Claude Design / mockaccino: don't generate UI for v2+ entities (Tenant, Brand-as-entity, User, Document, Concept, NorthStar) unless specifically tasked.

## Typical usage patterns

### For mockup generation (Claude Design / mockaccino)

Feed the JSON (and optionally this markdown) as context. Prompt the tool to:
- Generate screens for each stage of the `workflow.linear_path`
- Show the state of `LaunchRecord` visibly in the UI (state badge, progress indicator)
- Use the `actions` arrays to label buttons / menu items
- Use the relationships to infer nested UI (e.g. `ThumbnailConcept has_many ThumbnailText` → text options are a sub-list within each thumbnail card)
- Respect `scope_boundaries.in_v1` — don't generate UI for v2+ entities

### For implementation (Baku / React + Supabase)

- Each entity in `scope_boundaries.in_v1` maps to a table (or typed object) in the app
- `relationships.has_many` → foreign key in the target table back to the source
- `state_machines` → enum column + transition functions (don't let the UI transition freely; gate transitions through functions that validate)
- `events` → either Supabase Realtime events, custom event bus, or simple function call logs
- `PromptRun` is telemetry — store it but don't surface it in v1 UI (prompt inspection UI is deferred per audit log)

### For schema evolution

When something changes:
1. Update the v1 spec first (it's authoritative)
2. Update `docs/workflows/launch-workflow.md` if workflow/state changes
3. Update this JSON to reflect
4. Update this markdown if the usage pattern changes

Do NOT update the JSON first. It's derived, not canonical.

## Known simplifications in v1

The model intentionally leaves out things that would matter in v2+:

- **No Tenant / Brand / User entities.** `LaunchRecord.brand_id` is a string placeholder. Actual multi-tenancy is v2+.
- **No ConceptTaxonomy.** `ConceptDoc` is in, but the typed `Concept` entity (frequency, compounding value, etc.) is v2+.
- **No NorthStar entity.** North Star is a single markdown doc in v1, not a versioned, queryable object.
- **No RelatedVideoGraphEdge.** `RelatedVideoLink` is flat and user-provided; the graph subsystem is v2+.
- **No Prompt-as-managed-object.** `PromptRun` is telemetry only; prompt management as a system is v2+.

When any of these becomes v1-relevant, promote the referenced requirement file to a spec section first, then update this model.

## Key design rules reflected in the model

These map directly to the v1 spec's Core Design Principles:

| Spec principle | Reflected in model |
|---|---|
| Accumulating system, not processor | `LaunchRecord` persists; `PromptRun` telemetry captures provenance |
| Every launch is persisted | `LaunchRecord` exists from transcript submission, not just at finalize |
| Persistence ≠ analysis | No cross-record aggregation entities; just records |
| Identity signals are tribal cues at right intensity | `AudienceSignalClassification.strength` (Primary/Secondary/Hidden) + `placement` |
| Lightweight by default | Filesystem concepts (ConceptDoc) rather than DB; static AudienceConfig |
| AI suggests, human decides | `selected` boolean on every generation output; actions include explicit select/deselect |
| Capture broadly, structure narrowly | Events named but not every detail tracked; `flags` orthogonal to state to avoid enum explosion |

## Common questions

**Q: Why is `HookAngle` a distinct entity instead of nested in `Analysis`?**
Because hooks are the ancestor of both titles and thumbnails. Titles derive from hooks; thumbnails derive from hooks (not from titles). Making `HookAngle` first-class reflects that shared parent.

**Q: Why is `DescriptionSlot` separate from `Description`?**
Because each slot (synopsis / affiliate / legal / CTA / brand / custom) is independently editable and has different generation logic. Treating them as one blob would make the UI muddy.

**Q: Why doesn't `Title` reference `ThumbnailConcept` directly?**
Because titles and thumbnails both reference `HookAngle` — the hook is their common ancestor. If a thumbnail pointed to a title, we'd lose the hook-first relationship and slip back into "derive thumbnail from title," which the audit log explicitly rejected.

**Q: What's the difference between `selected` and `state: finalized`?**
`selected` is a per-item flag (selected this title, selected this thumbnail). `state: finalized` is a per-record flag (this whole launch is ready). They're orthogonal: you can have a finalized record where some optional items were never selected (e.g. no ThumbnailText chosen).

**Q: Why no `published` state?**
YouTube owns published state. FliLaunch is a launch optimizer, not a publishing tracker. Finalized = ready to use externally, not published yet.

## Related

- `docs/semantic/semantic-model.json` — the authoritative JSON
- `docs/workflows/launch-workflow.md` — the stage-by-stage workflow
- `docs/youtube-launch-optimizer-spec-v1.md` — v1 scope (authoritative)
- `docs/decisions/audit-log.md` — why things are the way they are
