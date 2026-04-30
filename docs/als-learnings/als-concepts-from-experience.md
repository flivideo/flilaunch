# ALS Concepts Clarified Through Experience

Things that were misunderstood initially and corrected through implementation. Each entry records the original assumption, what actually happened, and the rule to carry forward.

---

## 1. Sub-Delamains do not exist

**Original assumption:** A Delamain can call another Delamain as a sub-flow — like a child workflow or nested state machine. The `chapters` refinement loop was scaffolded as a separate `chapters/` Delamain invoked "from within" the main `launch` Delamain.

**What Nick said:**
> "7 agents. I'm not sure how that sub Delamain will run. We don't have such a notion in als, however if you're ok with running it, I'm curious what it would do. If that sub Delamain is operating on a different entity then the other Delamain, then it's ok (but in this case it isn't a 'sub Delamain'). I only see one entity and one module so it's definitely trying something experimental. Ask it how will that sub Delamain get triggered? What field?"

**What investigation revealed:** The `chapters` Delamain was registered in `module.ts` but there was no `delamain`-typed field on the `launch-session` entity pointing to it. The `status` field pointed to `launch` only. The `chapters` Delamain had no trigger — it was orphaned.

**The rule:**
- A Delamain is triggered by a `delamain`-typed field on an entity
- Two Delamains on the same entity = two independent state machines on two separate entity fields
- There is no parent–child relationship between Delamains
- If you only have one entity, you have two choices: (a) inline the states into one Delamain, or (b) add a second `delamain`-typed field if the two concerns are genuinely parallel

**What we did:** Dropped the `chapters` Delamain entirely. Added `generating-chapters`, `awaiting-chapter-review`, and `refining-chapters` as states inside the existing `launch` Delamain.

---

## 2. Spec-level HITL gates ≠ Delamain operator gates

**Original assumption:** The spec had 7 human touchpoints in the web app UI, so the Delamain should have 7 operator gates.

**What happened:** The 7-gate diagram was correct for a Baku web app where the user interacts at every stage. In an ALS Delamain, only states where a human *must make a genuine decision before the machine can continue* are operator-owned. Agent-to-agent handoffs are pure state transitions — they need no human gate.

**The filter:** Ask for each transition — "can an agent make this decision reliably, without human input?" If yes, no gate needed. If the decision requires human judgment, creativity, or approval, it's a gate.

**FliLaunch result:**
- Analysis → 12 parallel prompts: no gate (agent-to-agent)
- Hooks generated → selection: gate (human picks angles)
- Titles + thumbnails generated → chapters generated → chapter review: gate (human reviews labels)
- Description assembled → final review: gate (human makes final selections)
- Output assembled → completed: no gate (agent-to-agent)

7 spec gates → 4 Delamain gates.

---

## 3. `authoring.ts` path must be absolute in standalone projects

**Original assumption:** Copied the `authoring.ts` pattern from the ALS reference system which used a relative path:
```ts
export { ... } from "../../alsc/compiler/src/authoring/index.ts";
```

**Compiler error:** `PAL-CV-SYS-001 — Could not evaluate TypeScript entrypoint — ResolveMessage: Cannot find module '../../alsc/compiler/src/authoring/index.ts'`

**Why it fails:** That relative path works inside the ALS monorepo because the compiler lives two levels up. A standalone project consuming ALS as an installed plugin has no monorepo structure around it.

**The fix:**
```ts
export { ... } from "/Users/davidcruwys/.claude/plugins/cache/als-marketplace/als/0.1.0-beta.28/alsc/compiler/src/authoring/index.ts";
```

**The rule:** Standalone projects must use the absolute path to the installed compiler. The path pattern is:
```
/Users/<user>/.claude/plugins/cache/als-marketplace/als/<version>/alsc/compiler/src/authoring/index.ts
```

---

## 4. Title source fields must be non-null

**What happened:** The module used `project_code` as the primary title source and `internal_label` as a secondary. The compiler rejected it because `internal_label` has `allow_null: true`.

**Compiler error:** `PAL-CV-SHAPE-001 — Nullable field used in title source template`

**The rule:** Any field referenced in a document title source must have `allow_null: false`. Optional/supplementary fields cannot be part of the title template. If you want to include optional context in a document, put it in the body — not the title.

**Fix:** Changed title source to `project_code` only (always non-null).

---

## 5. `provider` is required on all agent states

**What happened:** Initial scaffold left out `"provider": "anthropic"` on every agent state. The compiler caught this.

**The rule:** Every state with `"actor": "agent"` must declare `"provider"`. Valid values: `"anthropic"`, `"openai"`. There is no default.

**Pattern:**
```ts
"running-analysis": {
  "phase": "analysis",
  "actor": "agent",
  "provider": "anthropic",   // required
  "resumable": true,
  "session-field": "analysis_session",
  "path": "agents/running-analysis.md"
}
```

---

## 6. `session-field` is required on resumable states

**What happened:** Two states (`running-analysis` and `generating-content`) were marked `"resumable": true` but were missing `"session-field"`.

**What `session-field` does:** Names a frontmatter field that is implicitly added to the entity record to store the agent session ID. If the dispatcher crashes mid-run, it can resume the agent from the stored session ID rather than starting fresh.

**The rule:** `"resumable": true` requires `"session-field": "<field-name>"`. The field name is arbitrary but should be descriptive. It does not need to be declared in the entity's `fields` block — the Delamain owns it implicitly.

**Pattern:**
```ts
"running-analysis": {
  ...
  "resumable": true,
  "session-field": "analysis_session"  // field added to entity frontmatter at runtime
}
```

---

## 7. The system root for `alsc` is the project root, not `.als`

**What happened:** Running `alsc validate .als` caused the compiler to look for `.als/.als/system.ts` — a double-path error.

**The rule:** The `<system-root>` argument is the project root (`.`), not the `.als` folder. The compiler itself appends `.als/system.ts` to find the entrypoint.

**Correct invocations:**
```bash
# From project root
bun /path/alsc/compiler/src/cli.ts validate .
bun /path/alsc/compiler/src/cli.ts deploy claude .
```

---

## 8. The compiler is the source of truth, not the skills

**Context:** `/als:init` and the compiler are known to be unaligned (as of 0.1.0-beta.28). Nick confirmed this is a known pre-release gap.

**The rule:** If the compiler passes, the scaffold is correct — regardless of what `/als:init` would generate. When in doubt, run `alsc validate .` and trust its output. The skills are authoring aids, not correctness validators.

---

## 9. The dispatcher is commit-driven, not CLI-driven

**Original assumption:** You run a command to advance a Delamain step-by-step.

**Reality:** The dispatcher runs continuously as a background process (started by `/als:bootup`). It polls git HEAD every 30 seconds. A committed state change is the event trigger. The dispatcher:
1. Scans committed HEAD for entity files in agent-owned states
2. Creates an isolated git worktree per dispatch
3. Reads the state's agent markdown + runtime-manifest
4. Invokes the agent via Claude Agent SDK
5. Auto-commits the agent's output and chosen transition
6. Merges back to the integration checkout

Operators do not trigger agent runs manually. The commit is the handoff. The dispatcher sees the committed state, runs the agent, commits the result.

---

## 10. Deploy and bootup are separate operations

**The distinction:**
- `alsc deploy claude .` — compiles `.als/` and projects assets to `.claude/`. No processes started.
- `/als:bootup` — starts the dispatcher processes. Assumes `.claude/delamains/` is already populated.

Neither does both. And as of 0.1.0-beta.28, there is no skill for the deploy step — it must be run manually. (Filed as GitHub issue [nfrith/als#2](https://github.com/nfrith/als/issues/2).)
