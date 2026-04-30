# ALS Operator Runbook — From Scaffold to Running Delamain

The complete path from "I have a `.als/` directory" to "the Delamain is running and I'm operating it." Learned from two implementation sessions on the `fli-launch` module.

---

## Prerequisites

- ALS plugin installed at: `/Users/davidcruwys/.claude/plugins/cache/als-marketplace/als/0.1.0-beta.28/`
- Bun available: `which bun`
- A compiled, passing `.als/` system: `alsc validate .` returns `"status": "pass"`

---

## Phase 1 — Author

Write the `.als/` files. Minimum required:

```
.als/
├── authoring.ts     ← absolute path to installed compiler (see note below)
├── system.ts        ← system_id, modules map
└── modules/
    └── <module-id>/
        └── v1/
            ├── module.ts             ← entity definition, delamains map
            ├── delamains/
            │   └── <name>/
            │       ├── delamain.ts   ← phases, states, transitions
            │       └── agents/
            │           └── *.md      ← one per agent state
            └── skills/
                └── <skill-id>/
                    └── SKILL.md
```

**Critical `authoring.ts` pattern** for standalone projects:
```ts
export { defineSystem, defineModule, defineDelamain } from
  "/Users/davidcruwys/.claude/plugins/cache/als-marketplace/als/0.1.0-beta.28/alsc/compiler/src/authoring/index.ts";
```

**Validate:**
```bash
bun /Users/davidcruwys/.claude/plugins/cache/als-marketplace/als/0.1.0-beta.28/alsc/compiler/src/cli.ts validate .
```
Must return `"status": "pass"` with 0 errors before proceeding.

---

## Phase 2 — Deploy

No skill exists for this step yet (filed as [nfrith/als#2](https://github.com/nfrith/als/issues/2)). Run manually:

```bash
bun /Users/davidcruwys/.claude/plugins/cache/als-marketplace/als/0.1.0-beta.28/alsc/compiler/src/cli.ts deploy claude .
```

**What this produces:**
```
.als/
└── CLAUDE.md                          ← generated ALS guidance for Claude

.claude/
├── skills/
│   ├── <skill-id>/SKILL.md            ← deployed skills (invokable as /skill-id)
│   └── ...
└── delamains/
    └── <delamain-name>/
        ├── delamain.yaml              ← compiled Delamain definition
        ├── agents/                    ← agent markdown files
        ├── dispatcher/                ← dispatcher source + template
        └── runtime-manifest.json      ← binding contract for dispatcher
```

Must be re-run after any changes to `.als/` files.

---

## Phase 3 — Install Dispatcher Dependencies

One-time per deploy (preserved on subsequent deploys):

```bash
cd .claude/delamains/<delamain-name>/dispatcher
bun install
```

For `fli-launch`:
```bash
cd /Users/davidcruwys/dev/ad/flivideo/flilaunch/.claude/delamains/launch/dispatcher
bun install
```

---

## Phase 4 — Bootup

Start the dispatcher(s) using the ALS skill:

```
/als:bootup
```

This kills any existing dispatchers, starts all Delamain dispatchers as background processes, and starts the Delamain dashboard at `http://127.0.0.1:4646`.

**What the dispatcher does once running:**
- Polls git HEAD every 30 seconds
- Finds entity files in agent-owned states
- Creates isolated git worktrees per dispatch
- Invokes agents via Claude Agent SDK (Anthropic or OpenAI)
- Auto-commits agent output + chosen transition
- Merges back to integration checkout

**Important:** Dispatchers die when the Claude Code session ends. Re-run `/als:bootup` at the start of each session.

---

## Phase 5 — Create a Session Record

Use the module's manage skill to create the first entity record:

```
/fli-launch-manage
```

Select "Create" → provide `project_code` (e.g. `b65-guy-monroe-marketing-plan`) and optional `internal_label`.

This creates `fli-launch/sessions/<id>.md` with status `awaiting-input`. The dispatcher is now aware of this session but will not act — `awaiting-input` is an operator-owned state.

---

## Phase 6 — Operate at Human Gates

```
/fli-launch-pipeline
```

The pipeline skill is the operator console. It surfaces sessions that need attention (in operator-owned states) and lets you advance or rework them.

**The four gates in `fli-launch`:**

| Gate | State | What you do |
|------|-------|-------------|
| 1 | `awaiting-input` | Confirm project_code, add optional focal point, audience keywords, related videos. Advance → dispatcher fetches transcript and runs analysis automatically. |
| 2 | `awaiting-hook-selection` | Review generated hook angles in HOOKS section. Select 1–3. These drive titles AND thumbnails. Can rework back to regenerate hooks. |
| 3 | `awaiting-chapter-review` | Review AI-generated chapter labels. Accept, request one AI refinement pass, or do external fine-tune and advance when done. External timing tool is used here out-of-band. |
| 4 | `awaiting-review` | Review all titles, thumbnails, chapters, description. Select 3 title A/B candidates, thumbnail concept, edit description slots, confirm keyword tags. Advance → final export assembled. Can rework back to hook selection. |

**What runs automatically between gates:**

```
awaiting-input
    ↓ advance
fetching-transcript      (agent: calls FliHub API, writes transcript to INPUTS)
    ↓
running-analysis         (agent: 12 parallel prompts, writes to ANALYSIS)
    ↓
generating-hooks         (agent: 10-20 hook angles, writes to HOOKS)
    ↓
[GATE 2: awaiting-hook-selection]
    ↓ advance
generating-content       (agent: titles + thumbnails per selected hook, writes TITLES + THUMBNAILS)
    ↓
generating-chapters      (agent: segment names + SRT + transcript → draft chapter list)
    ↓
[GATE 3: awaiting-chapter-review]
    ↓ advance
[GATE 4: awaiting-review]
    ↓ advance
assembling-output        (agent: assembles final EXPORT section)
    ↓
completed
```

---

## Troubleshooting

**Compiler invocation fails with `npx alsc` not found:**
`alsc` is not an npm package. Use the direct bun path:
```bash
bun /Users/davidcruwys/.claude/plugins/cache/als-marketplace/als/0.1.0-beta.28/alsc/compiler/src/cli.ts <command> .
```

**Compiler error `PAL-CV-SYS-001 — Could not read TypeScript entrypoint`:**
Check your `authoring.ts` — it likely uses a relative or monorepo path. Must be the absolute installed path.

**Compiler error about double `.als/.als/system.ts`:**
You passed `.als` as the system root. The system root is `.` (project root), not `.als`.

**FliHub connection refused:**
FliHub must be running on the target machine. If on Mac Mini M4 via Tailscale:
```bash
ssh davidcruwys@100.82.235.39 'tmux new-session -d -s flihub "cd ~/dev/ad/flivideo/flihub && npm run dev"'
```
Then access via `http://100.82.235.39:5101`.

**mDNS `.local` hostname unresolvable:**
If not on the same local network, `.local` hostnames won't resolve. Use Tailscale IPs instead.
Check with: `tailscale status`

**Skills not found after deploy:**
If you deployed in the current session, Claude Code Desktop requires a session restart for newly deployed skills to be discovered. CLI does not have this limitation.

---

## Session Lifecycle

Dispatchers are tied to the Claude Code session. At the start of a new session:
1. Run `/als:bootup` to restart dispatchers
2. Run `/fli-launch-pipeline` to check for sessions needing attention

No other setup needed — deployed assets persist between sessions.
