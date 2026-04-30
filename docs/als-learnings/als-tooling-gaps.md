# ALS Tooling Gaps — Discovered During Implementation

Gaps found in ALS tooling (v1, compiler 0.1.0-beta.28) during the two-session fli-launch implementation. Some are filed; some are known pre-release issues.

---

## Gap 1: No `/als:deploy` skill

**Status:** Filed — [nfrith/als#2](https://github.com/nfrith/als/issues/2)

**The gap:** After authoring or modifying a module in `.als/`, there is no skill to project the compiled assets to `.claude/`. The operator must manually run:

```bash
bun /Users/davidcruwys/.claude/plugins/cache/als-marketplace/als/0.1.0-beta.28/alsc/compiler/src/cli.ts deploy claude .
```

**Why it matters:** The operator flow as designed (author → run → operate) has a manual CLI step in the middle that isn't surfaced anywhere in the skill set. An operator following the natural flow hits a dead end.

**Current workaround:** Run the deploy command directly. Save it as a shell alias or make note of it.

**How it was discovered:** Asked "how do we run the Delamain" → AI described the raw command → user pushed back ("that's not a skill") → confirmed no skill exists for this step.

**Related context from the ghost-line issue:**
> `als:bootup` is the power button but it assumes deployment has already happened. `als:install` is first-touch only. After any module authoring or changes to `.als/`, the operator must manually run `bun /path/to/alsc/compiler/src/cli.ts deploy claude .` — this command is not surfaced anywhere in the skill set.

---

## Gap 2: `/als:init` and compiler not aligned

**Status:** Known pre-release gap, confirmed by Nick.

**The gap:** Running `/als:init` to scaffold a new module produces output that does not match what the compiler validates as correct. The shapes are different.

**Nick's confirmation:** "The skills are known to be unaligned with the compiler. Compiler is correct."

**Why it matters:** An operator using `/als:init` to scaffold a module may produce something that fails validation. Using `/als:init` as an authoring shortcut is unreliable until this is fixed.

**Current workaround:** Scaffold manually by reading the reference system and using the compiler as the source of truth. Validate frequently with `alsc validate .` during authoring.

---

## Gap 3: No sub-Delamain concept (underdocumented constraint)

**Status:** Not filed (expected behavior, but poorly documented).

**The gap:** Operators coming from other nested workflow systems (like AWB) expect to be able to invoke a child workflow from within a parent workflow. ALS has no such concept, but this isn't prominently documented. The constraint only becomes visible when you try to build one and Nick asks "what field is it listening on?"

**The rule:** A Delamain needs a `delamain`-typed field on an entity. You can't invoke a Delamain from within another Delamain — it must be triggered by an entity field transition.

**Suggested fix:** Add a prominent constraint note to ALS docs: "There is no sub-Delamain concept. If you find yourself wanting a child workflow, you have two options: (a) inline the states into the parent Delamain, or (b) create a second entity and a second Delamain."

---

## Gap 4: Compiler error output is JSON, not human-readable

**Status:** Known design choice, possibly intentional.

**The gap:** Running `alsc validate .` directly produces structured JSON output with error codes like `PAL-CV-SYS-001`. This requires parsing to understand.

**Example:**
```json
{
  "status": "fail",
  "system_diagnostics": [{
    "code": "PAL-CV-SYS-001",
    "reason": "authored_source.read_failed",
    "message": "Could not read TypeScript entrypoint",
    "actual": "ENOENT: no such file or directory, open '.als/.als/system.ts'"
  }]
}
```

**Why it matters:** Operators running the compiler directly (outside of a skill) get raw JSON that's harder to debug than a human-readable error message.

**Current workaround:** Run the validate skill (`/als:validate`) which interprets and surfaces the errors in readable form. Or use `jq` to parse the output.

---

## Gap 5: No session seeding skill or template

**Status:** Not filed (scope question more than a gap).

**The gap:** The first entity record (the markdown file at `fli-launch/sessions/<id>.md`) must be created manually or via the module's manage skill. There is no generic "create first session record" scaffold or template generator.

**What a session record needs:**
```yaml
---
id: <uuid>
project_code: <code>
internal_label: null
status: awaiting-input
created: 2026-04-30
updated: 2026-04-30
---

# <project_code>

## INPUTS
## ANALYSIS
## HOOKS
## TITLES
## THUMBNAILS
## CHAPTERS
## DESCRIPTION
## EXPORT
## ACTIVITY_LOG
```

**Current workaround:** Use `/fli-launch-manage` → Create. The manage skill handles record creation.

---

## Gap 6: `authoring.ts` absolute path is not documented as a requirement

**Status:** Not filed (edge case for standalone projects — monorepo users don't hit this).

**The gap:** The reference system examples use a relative path in `authoring.ts` that works only inside the ALS monorepo. Standalone projects must use the absolute installed path, but this is not documented in the getting-started material.

**The absolute path required:**
```ts
export { defineSystem, defineModule, defineDelamain } from
  "/Users/<user>/.claude/plugins/cache/als-marketplace/als/<version>/alsc/compiler/src/authoring/index.ts";
```

**Suggested fix:** The ALS install docs (or the bootstrap templates used by `/als:install`) should explicitly note that standalone projects must use the absolute installed path, not the monorepo-relative path from the reference system examples.
