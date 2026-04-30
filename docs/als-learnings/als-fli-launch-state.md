# fli-launch Module — Current State

Snapshot as of 2026-04-30 after two implementation sessions.

---

## Module Summary

| Property | Value |
|----------|-------|
| Module ID | `fli-launch` |
| Version | 1 |
| Entity | `launch-session` |
| Entity path | `fli-launch/sessions/{id}.md` |
| Delamain | `launch` |
| Operator gates | 4 |
| Agent states | 7 |
| Terminal states | 2 (`completed`, `cancelled`) |
| Compiler | ✅ pass (0 errors, 0 warnings) |
| Deployed | ✅ `.claude/skills/` + `.claude/delamains/launch/` |
| Dispatcher installed | ✅ `bun install` complete |
| Dispatcher running | ❌ not started |
| Sessions created | ❌ none yet |

---

## Delamain State Map

```
[GATE 1]  awaiting-input            (operator: provide project_code)
               ↓ advance
          fetching-transcript        (agent: FliHub API → transcript → INPUTS)
               ↓
          running-analysis           (agent: 12 parallel → ANALYSIS) [resumable]
               ↓
          generating-hooks           (agent: hook angles → HOOKS)
               ↓
[GATE 2]  awaiting-hook-selection   (operator: select 1–3 hooks)
               ↓ advance                    ↑ rework
          generating-content         (agent: titles + thumbnails → TITLES, THUMBNAILS) [resumable]
               ↓
          generating-chapters        (agent: segment names + SRT → CHAPTERS)
               ↓
[GATE 3]  awaiting-chapter-review   (operator: review/refine labels)
               ↓ advance                    ↑ rework
          [  refining-chapters  ]    (agent: alternative labels → back to gate 3)
               ↓ advance (from gate 3)
[GATE 4]  awaiting-review           (operator: final selections)
               ↓ advance                    ↑ rework (back to gate 2)
          assembling-output          (agent: assembles EXPORT section)
               ↓
          completed ✓

          Any non-terminal state → cancelled ✓ (via exit transition)
```

---

## Files — Authored (`.als/`)

```
.als/
├── authoring.ts            ← absolute path to installed compiler
├── system.ts               ← system_id: flilaunch, module: fli-launch v1
└── modules/fli-launch/v1/
    ├── module.ts           ← entity: launch-session, delamain: launch
    ├── delamains/launch/
    │   ├── delamain.ts     ← 4 gates, 7 agent states, 2 terminal, 15 transitions
    │   └── agents/
    │       ├── fetching-transcript.md
    │       ├── running-analysis.md
    │       ├── generating-hooks.md
    │       ├── generating-content.md
    │       ├── generating-chapters.md    ← added session 2
    │       ├── refining-chapters.md      ← added session 2
    │       └── assembling-output.md
    └── skills/
        ├── fli-launch-manage/SKILL.md   ← CRUD for sessions
        └── fli-launch-pipeline/SKILL.md ← operator console
```

**Removed in session 2:**
- `.als/modules/fli-launch/v1/delamains/chapters/` — entire sub-Delamain deleted after discovery that ALS has no sub-Delamain concept

---

## Files — Deployed (`.claude/`)

```
.claude/
├── skills/
│   ├── fli-launch-manage/SKILL.md
│   └── fli-launch-pipeline/SKILL.md
└── delamains/
    └── launch/
        ├── delamain.yaml
        ├── runtime-manifest.json
        ├── agents/
        │   └── *.md (7 files)
        └── dispatcher/
            ├── src/        ← dispatcher TypeScript source
            ├── node_modules/ ← installed (bun install done)
            └── VERSION
```

---

## What's Done

- ✅ Module authored and compiling clean
- ✅ Hook-centric fan-out architecture validated with Nick
- ✅ Sub-Delamain corrected to inlined chapter states
- ✅ All agent markdown stubs written
- ✅ Skills scaffolded
- ✅ Deploy complete
- ✅ Dispatcher dependencies installed
- ✅ b65 (`b65-guy-monroe-marketing-plan`) data fetched from FliHub as test case
- ✅ Missing `/als:deploy` skill gap filed: [nfrith/als#2](https://github.com/nfrith/als/issues/2)

---

## What's Open

### Must-do before first end-to-end run

| Item | Notes |
|------|-------|
| Start dispatcher | `/als:bootup` — not yet run |
| Create first session | `/fli-launch-manage` → Create → project_code = b65 |
| Confirm FliHub transcript endpoint | `fetching-transcript` agent references FliHub API but actual endpoint + auth not tested |

### Known issues in current stubs

| Agent | Issue |
|-------|-------|
| `fetching-transcript.md` | References FliHub API but endpoint path and auth headers not confirmed |
| `generating-chapters.md` | b65 has no SRT file — timestamps will be missing; agent must work from segment names + transcript alone |

### Deferred / post-MVP

| Item | Notes |
|------|-------|
| Run `/als:init` comparison | Nick suggested comparing hand-scaffold to what `/als:init` generates. Deferred — compiler passes, de-risked. |
| Chapter 03 naming in b65 | `03-1.mov` has no label suffix — agent must infer chapter label purely from transcript. |
| FliHub auto-start on M4 | tmux session started manually; no auto-start configured. Must restart FliHub at start of each session if needed. Close tmux session when done: `ssh davidcruwys@100.82.235.39 'tmux kill-session -t flihub'` |
| Session record shape validation | No sample record created — record frontmatter/body shape not validated against module definition |

---

## Test Case: b65

**Project:** `b65-guy-monroe-marketing-plan`  
**FliHub host:** `100.82.235.39:5101` (Mac Mini M4 via Tailscale)  
**Recordings:** 26 across 9 chapters, 100% transcribed  
**Raw video:** 1.1 GB  
**SRT:** ❌ none — chapter timestamps will be `??:??`

**Chapter structure from segment file names:**
```
01: intro (01-1, 01-2)
02: scenario (02-1)
03: [unnamed] (03-1, 03-2)
04: surgeon-list (04-1 through 04-6)
05: guy (05-1, 05-2)
06: test (06-1, 06-2)
07: update-claude (07-1)
08: research-prompt (08-1 through 08-9)
09: outro (09-1)
```

**Note on Chapter 03:** Unnamed — agent must infer label from transcript content only.
