# Document Concept Library

## Source
Extracted from `docs/discovery/raw-3.txt` on 2026-04-23.

## The idea
A library of focused, reusable concept documents that prompts can load as inputs. Called "second brains" in raw-3.

Each document is:
- focused on a single concept
- compact enough to be a prompt input (not a rambling wiki page)
- context-friendly (structured, not prose-heavy)
- versioned/owned by a brand (in multi-brand setups)

### Example documents
- thumbnail style guide (per brand)
- North Star (per brand)
- content pillars (per brand)
- audience definition (per brand)
- brand constraints (per brand)
- voice and tone (per brand)

### The key insight
These are **not vague notes**. They are **compact, reusable prompt inputs**. The quality bar: can a prompt use this file verbatim as context and produce useful output? If no, the doc needs tightening.

## v1 subset (what IS in v1)
See `docs/decisions/audit-log.md` — the "Lightweight concept docs folder for prompt inputs" decision.

v1 includes:
- a filesystem folder (e.g. `docs/concepts/` or `docs/brand-knowledge/`) where David authors concept docs
- prompts that reference these docs by path when running
- no UI for managing them
- no versioning beyond git
- no multi-brand routing (v1 is single-brand)

v1 does NOT include:
- a document management UI
- in-app editing
- per-brand namespacing
- version history beyond git
- cross-document linking / graph

## What would elevate this to v2+
- per-brand routing
- UI for editing/reviewing docs in the app
- automatic usage tracking ("this doc was used in 12 launches")
- suggested refinements based on launch outcomes
- links between docs (e.g. content pillar X → audience Y)

## Why the UI layer is out of v1
Docs-as-files with git versioning is already a working system. Adding a UI is infrastructure work that doesn't improve the launch workflow. Defer until the file-based approach proves insufficient.

## Related
- `docs/requirements/multi-tenant-multi-brand.md` — multi-brand routing for docs is here
- `docs/decisions/audit-log.md` — v1 subset decision
