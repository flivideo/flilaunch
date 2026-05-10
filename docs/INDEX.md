---
purpose: Single landing page for the FliLaunch repo. Always read this first.
last_updated: 2026-05-10
---

# FliLaunch — Index

The single entry point. Don't read everything below — load on demand as the conversation needs.

## North Star (current focus, today)

**Get 3–4 ALS workflows actually working today** with Nick Frith (ALS creator) co-driving. Goal isn't completeness; goal is the apprenticeship — David learns how to direct the team to build more workflows after.

## Live workshop surfaces (Mochaccino, open in browser)

These are the visual artefacts Nick + David work against during the session.

| Surface | File | Use for |
|---|---|---|
| **Gallery** | `.mochaccino/designs/index.html` | Land here first, navigate to others |
| **Workflows + BI sources** | `.mochaccino/designs/05-workflows/index.html` | The primary workshop surface — pick a workflow, drill in. Cross-links to prompts (page 06). |
| **Prompts & techniques** | `.mochaccino/designs/06-prompts/index.html` | Browse by category or source. Default landing shows 5 gaps + source character table. Cross-links to workflows (page 05). |
| ALS comprehension (background) | `.mochaccino/designs/01–04` | Reference only — what David learned authoring the v1/v2 module. Not workshop input. |

## Design + spec docs

| Doc | Purpose |
|---|---|
| `docs/youtube-launch-optimizer-spec-v1.md` | Product spec — design source of truth. Use for scope decisions. |
| `docs/workflow-surface-mapping.md` | Pre-design brief written this morning — 7 workflow categories + 7 open questions for Nick. The conceptual brief behind page 05. |
| `docs/flithumb-brief.md` | FliThumb (thumbnail design) is a separate composable. Reference if thumbnail workflow comes up. |
| `docs/CONTEXT.md` | Knowledge map and source-of-truth hierarchy (older — verify against this index if conflicts). |

## Index docs (READ FIRST when a workflow needs prompts or video data)

| Index | Purpose |
|---|---|
| `docs/prompts-index.md` | ~75 prompt assets across 8 sources, grouped by 12 categories, ⭐ canonical sources marked, 5 gaps listed. Don't aim for perfect prompts pre-workflow — they evolve once workflows run. |
| `docs/data-sources/README.md` | Three video data sources: FliHub (live API on :5101), v-appydave (local files), published (YouTube archive, 3 brands, ~556 videos). v-appydave ≠ published — don't try to join them. |

## Data source health (run before using FliHub)

```bash
curl -sS --max-time 3 http://localhost:5101/api/projects/stats | head -1
```
JSON response = up. Anything else: `cd ~/dev/ad/flivideo/flihub && npm run dev`.

## ALS work in progress

| Path | What it is | Status |
|---|---|---|
| `.als/modules/fli-launch/v1/` and `v2/` | David's solo apprenticeship from Apr 30. Nick has not reviewed. | Open to reshape/scrap with Nick |
| `.als/modules/fli-launch/v2/sessions/001-b65-guy-monroe-marketing-plan.md` | First live session record (May 10) | Preserved, not canonical |
| `.als/CLAUDE.md` | ALS-specific guidance for this repo | Reference |

## Hard constraints (always)

- **AppyDave only** — other brands out of scope today
- **ALS, not Baku** — filesystem-backed via `defineModule()`, no databases
- **Stay in this repo** — `~/dev/ad/flivideo/flilaunch/` is canonical FliLaunch home. `als-workflows` is generic ALS sandbox; its FliLaunch experiment is archived on branch `archive/2026-05-03-flilaunch-skills-attempt`.
- **Source of truth = live filesystem** — `~/dev/video-projects/v-appydave/` and `~/dev/video-projects/published/`. Last week's snapshots in als-workflows are stale.
- **Memory doesn't travel between machines** — git is the source of truth.

## What's NOT in scope today

- Resolving Apr 30 vs May 3 architectures (preserved in git, Nick can decide)
- Migrating the 76 May-3 video sessions (lives on archive branch, mine when needed)
- Cross-channel design (other brands deferred)
- Perfect prompts (they evolve when workflows run)
- North Star strategy / channel intelligence (v2+ explicitly)
- Web UI / Supabase / multi-tenant (Baku territory, not ALS)
