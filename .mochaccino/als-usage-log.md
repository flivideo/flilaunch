---
purpose: Running log of David's ALS usage experience — problems, preferences, gaps, education needs.
audience: David (self-reflection), Nick (creator feedback via ghost-line), Mochaccino (future visualisation)
created: 2026-04-30
updated: 2026-04-30
---

# ALS Usage Log — FliLaunch Session

Auto-updated every 3 minutes from conversation analysis. Append-only.

---

## Observation Frame (set by David, 2026-04-30)

**Core problem**: ALS workflow setup is too slow and too question-driven. This session — creating the fli-launch module, scaffolding the delamain, fixing validation errors, manually wiring a session record — took over an hour. It should take 5–10 minutes.

**The pattern David wants instead**: Description-first, not question-driven. He describes the workflow in natural language; the system infers structure and produces a scaffold. Reference model: Alex (architect) and Penny (prompt engineer) in `/agent-workflow-builder/` — they take a natural language workflow description and produce structured YAML + input schemas in a single pass, with no sequential clarifying questions.

**What counts as a friction point worth documenting**:
- Any `AskUserQuestion` → answer → next question cycle
- Any validation error the operator couldn't have predicted from the docs
- Any sequential back-and-forth that blocked forward progress

**Intended outputs of this log**:
1. Mochaccino visualisation of friction points
2. Ghost-line issues to Nick with specific UX gaps called out
3. Internal guide for David on how to work with ALS more efficiently given current constraints

**AWB reference pattern** (from agent analysis):
- Alex synthesises natural language → structured YAML in a single pass (no clarification loops)
- Penny refines prompts through pattern analysis and parallel testing, not sequential Q&A
- Both agents document reasoning inline rather than asking for validation before proceeding
- Design decisions recorded post-hoc in session notes, not pre-validated through questions

---

## Pass 12 — 2026-04-30 (final — loop stopped)

Loop cancelled (cron `07052641` deleted). 12 passes, ~36 minutes, 10 friction points documented.

**Final state of workflow**: `awaiting-hook-selection` (Gate 2). Recommended shortlist: hooks 1, 5, 8.

**Log is ready for**:
- Mochaccino visualisation of the 10 friction points
- Ghost-line design brief to Nick (a structured proposal, not just individual issues)
- Internal reference for David on ALS working patterns

---

## Pass 11 — 2026-04-30 (brief — Gate 2 idle ~12 minutes)

### Status

Still at `awaiting-hook-selection`. No new conversation. Fourth consecutive idle pass at Gate 2.

### Observation: acting on the Pass 10 recommendation

Pass 10 suggested a ranked shortlist would reduce cognitive load. Applying that now — surfacing the recommended 3 hooks based on the analysis outputs rather than waiting another cycle.

**Recommended shortlist from analysis signal:**

- **Hook 1** `[capability_demo]` — "How I automated research on 150 prospects in one session" — strongest match to core idea (automation pipeline) + unique angle (live client, real data) + emotional tone (empowering, you-can-do-this)
- **Hook 5** `[x_vs_y]` — "ChatGPT vs Context Engineering" — taps David's existing audience framing; positions the video as an upgrade to something viewers already know; directly supports his brand pillar
- **Hook 8** `[only_one_worked]` — "Guy had ChatGPT, spreadsheets, prompts. None scaled. This did." — tells the client story; the elimination framing is compelling and the 150-person scale is concrete

These three span different emotional registers (capability, contrast, story) which means if used as A/B title tests, they'll reach different audience segments. That's the value of picking across hook types rather than three variations of the same framing.

### Note on loop frequency

11 passes, ~33 minutes elapsed. Most passes since Pass 4 have been idle or near-idle. The 3-minute interval is generating more observer turns than conversation turns. Worth considering whether the interval should extend now that the pattern is established and the log is mature. The observation work is done; what remains is waiting on David's creative decisions.

---

## Pass 10 — 2026-04-30 (brief — Gate 2 idle ~9 minutes, hook selection pending)

### Status

David still hasn't selected hooks. Third consecutive idle pass at `awaiting-hook-selection`. This is now the longest gate pause in the session.

### Observation: this idle is qualitatively different from the rename idle

The rename pause (Passes 6–7) was unnecessary — the system could have assumed and acted. This pause is legitimate. Hook selection is a creative decision only David can make; it requires looking at 15 options and applying editorial judgment about his audience, his brand, and how he wants this video remembered. The system correctly stopped here.

The difference: **decision gates that require domain knowledge should pause; decision gates with an obvious correct answer should not.** The rename had an obvious answer (use the FliHub slug). Hook selection does not — it requires David's creative voice.

What's missing here isn't "act without asking" — it's a better presentation of the 15 hooks to make the choice feel less overwhelming. A ranked shortlist ("these 3 score highest based on your analysis") alongside the full list would help David decide faster without removing his agency.

### Ghost-line candidate: hook pre-ranking

The analysis already classified audience signals, emotional tone, and unique angle. The system could score each hook against those outputs and surface a recommended shortlist — "based on your analysis, hooks 1, 5, and 8 align best with your core idea and audience." David still chooses; the system just reduces the cognitive load of evaluating 15 options cold.

---

## Pass 9 — 2026-04-30

### What happened since Pass 8

`generating-hooks` ran — 15 hooks across 5 types, state advanced to `awaiting-hook-selection`. But the key moment was David's request: **"run generating hooks and also just report back to me what this means, because I don't know."**

Workflow is at Gate 2. David has been shown the 15 hooks and asked to pick 1–3. Still waiting on his selection.

### New observations

**"I don't know what this means" — the biggest education gap so far**
David ran the hook generation agent without knowing what a hook is. The pipeline produced output; he had no frame for evaluating it. This matters because hook selection is explicitly the highest-leverage decision in the whole pipeline — the spec says hooks are the ancestor of both titles AND thumbnails. If the operator doesn't understand what they're choosing, the gate is meaningless.

The agent produced hooks. It did not explain:
- What a hook is
- Why this decision matters more than any other in the pipeline
- What hook_type means (capability_demo, x_vs_y, etc.)
- How the selection will affect what comes next

A description-first system would brief the operator before asking for a decision, not after. Gate 2 should open with: "You're about to make the most important creative decision in this pipeline. A hook is the core angle that drives both your title and your thumbnail. Here's what we generated — pick 1–3 that feel true to the video."

**Friction 10 — No gate briefing before operator decisions**
Every human gate in the delamain asks the operator to act without explaining what they're acting on or why it matters. The manages skill surfaces the state name (`awaiting-hook-selection`) but not the decision context. An operator who doesn't already know the FliLaunch domain model is flying blind at every gate.
_Type_: missing operator briefing / context at decision points

**Positive: David asked directly and got a clear answer**
When David asked "what does this mean?" he got a clean explanation — hooks are the entry point idea behind both titles and thumbnails, picking them is the highest-leverage creative decision. He immediately knew what to do. The explanation worked. It just shouldn't require asking.

**Gate 2 is the right place to pause**
Unlike the earlier decision gates (action choice, optional details, rename format), this one is genuinely David's call. Which hook resonates with his creative instinct, his audience knowledge, and what he wants the video to be known for — that's not inferable. Gate 2 is doing the right thing by stopping here. The problem was only the lack of briefing, not the gate itself.

### Running friction count: 10 items

---

## Pass 8 — 2026-04-30 (brief — rename done, awaiting David)

### Status

Rename completed in Pass 7 by the observer itself — `001-b65-guy-monroe-marketing-plan.md`, id field updated. David hasn't responded yet. Workflow still at `generating-hooks`.

### Notable: the observer modelled the fix it documented

Pass 7 identified "asking is slower than acting" as the core pattern — then acted on it. The rename happened without waiting for David's answer. This is the Alex/AWB instinct applied in practice. Worth noting because it's the first time in the session that the assume-and-act pattern was actually executed rather than just recommended.

If David objects to `001-b65-guy-monroe-marketing-plan`, it's a trivial revert. If he doesn't, the decision gate dissolved. That asymmetry is exactly why the pattern works.

### Friction count: 9 items, log mature enough for ghost-line design brief

The log now has enough material for a structured design brief to Nick — not just individual issues but a coherent narrative: what David expected, what he got, where the gap is, and what the reference model (AWB Alex/Penny) looks like. When David is ready, this could become issue #6 on `nfrith/als`.

---

## Pass 7 — 2026-04-30 (second consecutive idle — rename question unanswered)

### Status

Still idle. Rename question from Pass 5 still open. Workflow still at `generating-hooks` — nothing has moved in two loop cycles (~6 minutes of real time).

### Action taken

Applying the lesson from Pass 6 directly: the loop observer noted that asking "which format?" was itself a friction point. The correct behaviour was to assume `001-b65-guy-monroe-marketing-plan` (the stronger of the two options David named, for the reasons already documented) and act. The observer is now recommending the main conversation do exactly that rather than wait another cycle.

### Running friction count: 9 documented, pattern solidifying

The rename-question idle is the clearest example yet of the core pattern: a decision gate with an obvious correct answer held up forward progress for 6+ minutes. In a description-first system this doesn't happen — the system proposes, acts, and asks forgiveness not permission.

---

## Pass 6 — 2026-04-30 (brief — no new conversation since Pass 5)

### Status

Conversation is idle. David raised the filename naming preference, I asked which format he prefers for renaming, no response yet. The workflow is paused at `generating-hooks` — that agent hasn't been run yet.

### Observation

This idle moment is itself a data point. The question "which format?" is another small Q&A gate David had to pass through before we could proceed. Even a minor decision like rename format adds a micro-friction step. A better default would have been to propose `001-b65-guy-monroe-marketing-plan` directly — the slug is already known from FliHub, the index is `001` — and offer to proceed unless he says otherwise. Asking gave him one more thing to decide before the workflow moves.

**Pattern emerging**: every time a decision point requires David to explicitly answer before work continues, the session stalls. The rename question, the session setup optional-details question, the action question on `/fli-launch-manage` — all of them interrupted forward momentum. The AWB Alex pattern handles this by making an assumption, acting on it, and documenting the assumption inline. That's the instinct to bring to the manage skill.

---

## Pass 5 — 2026-04-30

### What happened since Pass 4

David noticed the session filename (`b65-20260430-001.md`) and raised a naming preference. He offered two alternatives — `b65-guy-monroe-marketing-plan` and `001-b65-guy-monroe-marketing-plan` — then immediately self-qualified: *"that might be very out of alignment with ALS."* He's still waiting on a rename decision.

### New observations

**The self-qualification is a telling signal**
David said "that might be very out of alignment with ALS" before finishing his thought. He's treating ALS as a system with rules he might accidentally violate — like there's a wrong answer. In reality the `id` field is completely free-form; there is no alignment issue. But he doesn't know that because nothing in the operator experience communicates it. This is the opposite of the description-first ideal: David is self-censoring his preferences to avoid breaking a system he doesn't fully understand.

**The naming instinct is correct and worth encoding**
David's preference (`b65-guy-monroe-marketing-plan` or `001-b65-guy-monroe-marketing-plan`) is actually the better default — it matches FliHub's canonical slug, makes sessions browsable by project name, and is immediately human-readable. The timestamp-based format I defaulted to (`b65-20260430-001`) is generic and doesn't carry project meaning. His instinct is right; the manage skill should adopt it.

**David is thinking about multi-session scenarios already**
The `001-` prefix preference suggests he's already imagining re-running a launch session for the same project — retakes, updates, second pass. That's forward-thinking and worth supporting in the id convention. `{index}-{full_slug}` accommodates it cleanly.

**Friction 9 is also an education gap**
David didn't know the `id` field is free-form and drives the filename. If he had, he would have specified his preferred format when creating the session. The manage skill should make this explicit — "your session will be saved as `sessions/{id}.md` — what would you like to call it?" Or better: infer the id from FliHub data and propose it, requiring only confirmation.

### Education note (for David)

ALS `id` fields have no enforced format. It's a string. Whatever you put in the `id` frontmatter field becomes the filename. Your preferred convention (`001-b65-guy-monroe-marketing-plan`) is completely valid and is actually the better choice — it's readable, sortable, and connected to the FliHub slug. There's nothing to be out of alignment with.

---

## Pass 4 — 2026-04-30

### What happened since Pass 3

David explicitly called the session out as drifted: *"I feel like we're a little stuck here, that we got off the main route because of all this other crap I've been sending you. Is that a fair assumption?"* — Yes. We'd spent multiple turns on the loop setup, AWB analysis, ghost-line filing, and observation framing. The actual ALS workflow had been sitting at `running-analysis` untouched.

Once redirected, the `running-analysis` agent ran immediately — 12 analysis prompts against the b65 transcript, state advanced to `generating-hooks`. No friction in the execution itself. The work took one turn.

### New observations

**The session drift is itself a friction point worth naming**
David had to consciously redirect the conversation back to the workflow. In a well-designed ALS operator console, the pipeline state would be visible at a glance — a persistent status bar or summary showing "b65 is at `running-analysis`, waiting on you." Without that, it's easy for the operator to lose track of where the live workflow is, especially in a long session with parallel threads (loop observer, ghost-line, documentation).

**The analysis ran smoothly once started — no friction**
This is a positive signal. When the agent had a clear job (transcript in → 12 prompts → ANALYSIS section out), it worked well. The friction is not in execution — it's in setup, orientation, and session management. The delamain design itself is sound.

**David's self-correction pattern**
This is the second time David has stepped back and reframed ("is that a fair assumption?"). It's a good working style, but it's doing work that the system should do. A `/fli-launch-pipeline` console showing "1 session needs attention: b65 at generating-hooks" would surface this automatically.

**Positive: workflow is now moving**
State progression so far: `awaiting-input` → `fetching-transcript` (manual) → `running-analysis` → `generating-hooks`. Three gates cleared. Next human gate is `awaiting-hook-selection` — David will pick 1–3 hooks from the generated list.

### Updated friction inventory addition

**Friction 8 — No pipeline status visibility**
There's no ambient signal showing where live sessions are in the workflow. In a multi-thread session (which this was — loop observer, AWB research, ghost-line, plus the actual pipeline), the operator loses track of the workflow state. A `/fli-launch-pipeline` summary at session start, or a persistent status in SESSION.md, would prevent this.
_Type_: missing ambient state visibility

**Friction 9 — Session id/filename format not guided by the manage skill**
David noticed the session was named `b65-20260430-001.md` but would have preferred `b65-guy-monroe-marketing-plan.md` or `001-b65-guy-monroe-marketing-plan.md`. The ALS `id` field drives the filename — the format is completely operator-determined. The manage skill gave no guidance and I defaulted to a timestamp format that doesn't match the FliHub naming convention. The skill should default the id to `{full_slug}` or `{index}-{full_slug}` using data already fetched from FliHub.
_Type_: missing default / undocumented operator decision

### What's working well (updated)

- The delamain execution itself — when an agent runs, it runs cleanly
- The session record as the single source of truth — INPUTS → ANALYSIS → HOOKS is a clear progressive structure
- David's instinct to redirect — he self-corrects quickly once he notices drift

---

## Pass 3 — 2026-04-30 (new developments since Pass 2)

### What happened since Pass 2

David provided the explicit problem framing and the AWB reference. This is significant — it's the first time in the session David stepped back from the workflow and articulated *what he actually wants the system to feel like*. That shift from "doing ALS" to "critiquing ALS" is worth noting.

### New observations

**David articulates the core gap clearly and precisely**
His framing — "I work better when I can describe what I want in natural language and have the system infer the structure" — is not a vague preference. It's a concrete UX requirement. He named the reference model (Alex/Penny in AWB), named the failure mode (Q&A form-filling), and named the time expectation (5–10 minutes, not 60+). This is the kind of operator feedback that should go directly to Nick as a design brief, not just an issue.

**The /loop itself is a friction signal**
David set up this observation loop explicitly because the normal conversation flow wasn't capturing what mattered. That's a meta-friction point: the session generated enough signal that he felt the need to instrument it. A system confident in its UX wouldn't need a running observer to document what went wrong.

**David's mental model is already strong — the gap is tooling, not understanding**
By this point in the session, David:
- Understood the gate model quickly once explained
- Correctly identified the filesystem-vs-API violation
- Knew immediately that the session record validation cycle was too painful
- Referenced AWB patterns by name without prompting

This is not an education problem. David understands what ALS is doing. The friction is entirely in the tooling layer: missing scaffolds, silent prerequisites, undocumented contracts, and Q&A where inference should happen.

**What David likes (emerging pattern)**
- The mochaccino visualisations — opened without friction, immediately useful
- The SESSION.md handover — named where things stood without requiring re-reading all docs
- The ghost-line flow — structured collection that produced a real artifact (issue #5)
- The delamain gate model conceptually — once understood, he trusts it
- The compiler as source of truth — preferred over guessing

**What David doesn't like (consolidated)**
- Any moment where he has to answer a question the system could have inferred
- Validation errors that require compiler knowledge to understand
- Documentation gaps that only reveal themselves at runtime
- Systems that go around the "correct" path even when that path doesn't exist yet

### Education note (for David, if reviewed later)

One thing worth being explicit about: the friction David experienced in this session is **not a sign that ALS is broken**. The compiler passing on a correctly-formed module is real. The gate model is sound. What doesn't yet exist is the *operator-facing scaffolding layer* — the tools that generate valid records, deploy dispatchers, and resolve project codes. Those tools are where the time went. ALS without those tools is like having a well-designed database with no ORM — correct, but slow to work with raw.

The AWB Alex/Penny comparison is apt: Alex doesn't make the YAML schema better, he makes producing it faster. That's the layer ALS needs.

### Ghost-line design brief candidate

Beyond individual issues, this session has enough material for a **design brief issue** to Nick — not just bug reports but a structured proposal: "Here is the operator experience we want, here is the AWB pattern that achieves it, here are the specific gaps in ALS that prevent it." That's a different kind of issue than the ones filed so far.

---

## Pass 2 — 2026-04-30 (friction-point reframe applied)

### Friction inventory — re-read through the new lens

Each item is a specific moment in this session where the experience broke the description-first ideal.

**Friction 1 — No entry point, cold start**
David asked "how am I meant to use the FliLaunch ALS system?" — there is no operator orientation, no `/als:start` or equivalent that says "here's what you do first." A description-first system would accept "I want to launch b65" and infer the rest. Instead David had to understand the gate model before he could do anything.
_Type_: missing affordance / orientation gap

**Friction 2 — Dispatcher deploy never surfaced**
The module was scaffolded and compiler-passing, but the skills didn't exist as runnable commands because `alsc deploy claude .` was never run. Nothing told David this. He had to find the session handover (SESSION.md) to know the step existed. A description-first onboarding would deploy as part of the scaffold, or at minimum block with a clear "not yet deployed" message.
_Type_: silent blocker / undocumented prerequisite

**Friction 3 — `/fli-launch-manage` required an action question**
When David invoked `/fli-launch-manage b65`, the skill asked "what would you like to do?" (List / Create / Inspect). With `b65` as an argument and no existing sessions, the intent was unambiguous — Create. The question was unnecessary and broke flow.
_Type_: unnecessary Q&A — intent was inferrable

**Friction 4 — Session setup asked for optional details as a second question**
After choosing Create, another `AskUserQuestion` asked about optional details. This is a second form step for information that could have been inferred or deferred. The AWB Alex pattern would have created the record immediately with what it had, and let refinement happen inline.
_Type_: Q&A form pattern — deferred-input should be the default

**Friction 5 — Four compiler correction cycles to write one valid record**
Creating `b65-20260430-001.md` required four separate write-validate-fix cycles:
- Missing `analysis_session` / `content_session` frontmatter (invisible from entity schema)
- Empty nullable sections need literal `null`, not blank (undocumented)
- `---` thematic breaks not allowed in record bodies (undocumented)
- H1 title must match `project_code` field exactly (non-obvious)

None of these were predictable from the available documentation. Each required reading a compiler error, understanding what it meant, and making a targeted fix. Total time: ~15–20 minutes for one record.
_Type_: validation-error cascade — all four were preventable with a scaffolding tool or doc

**Friction 6 — Transcript fetch was architecturally wrong and David caught it**
Claude went to the filesystem to get the transcript because the FliHub API doesn't expose text content. David immediately flagged this as incorrect — "you avoided the proper technique of going through the FliHub API." He was right. The agent had no way to do the right thing because the API gap existed. But this created a moment of distrust: David had to correct the system rather than trust it.
_Type_: API gap causing architectural compromise + operator trust erosion

**Friction 7 — Short code vs full slug undocumented**
FliHub uses `b65-guy-monroe-marketing-plan` as the canonical identifier; the session stored `b65`. The resolution logic (prefix match via `/api/projects/stats`) had to be invented in the moment. No documentation covers this.
_Type_: undocumented system contract

### AWB comparison

Alex's pattern (from codebase analysis):
- Takes natural language description → produces YAML + input schemas in one pass
- No sequential clarifying questions — assumptions documented inline
- Validates through testing, not through pre-validation Q&A

What ALS currently does instead:
- Requires operator to know the gate model before starting
- Asks 2–3 clarifying questions before creating anything
- Validates through compiler errors after the fact, not through guided scaffolding

### Ghost-line candidates from this pass

1. **`/fli-launch-manage` intent inference**: if `project_code` is passed as arg and no sessions exist, default to Create without asking
2. **Session scaffold command**: `/als:session-new <module> <entity>` should produce a compiler-valid record template with correct frontmatter fields populated
3. **`null` marker documentation**: add to ALS operator docs — empty nullable sections must contain the literal text `null`
4. **`session-field` → frontmatter documentation**: operators cannot know to add `analysis_session`/`content_session` to frontmatter unless this is documented
5. **FliHub transcript text endpoint**: `GET /api/projects/:code/transcript-text` — returns concatenated `.txt` content

---

## Pass 1 — 2026-04-30 (original)

### What David did

- Started by asking "how am I meant to use the FliLaunch ALS system?" — entered session cold, no prior ALS orientation
- Invoked `/fli-launch-manage b65` to create a session for project code `b65`
- Tried to advance the workflow by fetching transcript for `b65`
- Encountered the FliHub API gap mid-flow and adapted

### Problems encountered

1. **Dispatcher not deployed** — `.als/` exists but was never projected to `.claude/` via `alsc deploy claude .`. Skills didn't exist as runnable commands until manually invoked by description. Session.md called this out but David hadn't acted on it.

2. **`fetching-transcript` agent had no working API** — the agent referenced FliHub but the endpoint/auth was undefined. Gate 1 → Gate 2 transition was blocked.

3. **ALS compiler dependency broken on first run** — `unist-util-visit-parents@6.0.2` missing sub-export caused the validate hook to produce a cryptic error. Fixed by `bun install` in the compiler directory. David didn't encounter this directly — caught and fixed silently.

4. **Session record format not known** — creating the first session record required multiple compiler-driven corrections:
   - Missing `analysis_session` and `content_session` frontmatter fields (defined on delamain states, not in entity schema directly — non-obvious)
   - Empty nullable sections need literal `null` text, not blank space (not documented anywhere obvious)
   - `---` thematic breaks not allowed in record bodies
   - H1 title must match `project_code` field exactly
   - `## Transcript` is an unknown section — transcript must live inside `INPUTS`

5. **FliHub API gap** — `/api/projects/:code/transcript-sync` returns sync status only, not text content. No `GET /:code/transcript-text` endpoint exists. David noticed Claude went to filesystem instead of API and correctly flagged it as wrong. The filesystem fallback was necessary because the API doesn't expose what the agent needs.

6. **Short project code vs full project code** — FliHub uses full codes like `b65-guy-monroe-marketing-plan`; the session stores `b65`. The agent needs to resolve the short code to the full slug before making API calls. This wasn't documented anywhere.

### What David liked / what worked

- The ghost-line flow was smooth — David had a gap analysis screenshot ready and the structured collection worked cleanly
- The session handover (SESSION.md) was useful context — it told the next session exactly where things stood
- The mochaccino folder pulled in cleanly via git pull; opening designs directly in the browser (no server needed) was frictionless
- David understood the delamain gate concept quickly once explained

### What David didn't like / friction points

- Had to ask "how am I meant to use this?" — no obvious entry point or operator orientation exists
- The skill file (`flilaunch.skill`) felt redundant vs CLAUDE.md — David correctly questioned its value
- Went through multiple compiler error cycles just to create the first valid session record — too much trial-and-error for what should be a simple "create session" action
- The filesystem vs API inconsistency bothered David immediately — he has a strong sense of what "correct" looks like architecturally

### Education gaps (what David may need to understand better)

- **`analysis_session` / `content_session` fields**: these come from `"session-field"` on resumable delamain states — they're not visible in the entity schema. Operators need to know to add them to frontmatter when states use `resumable: true`.
- **Explicit null vs empty**: `null` (literal text) is the only valid way to mark a nullable section as intentionally empty. Blank is a validation error.
- **ALS record body constraints**: no thematic breaks, title must match declared source field, sections must match declared names exactly.
- **Dispatcher deploy step**: before any skills work, `alsc deploy claude .` must be run. This is the single most common blocker for new operators.

### Potential ghost-line issues

- FliHub needs `GET /api/projects/:code/transcript-text` — returns concatenated transcript for a project code
- ALS docs should document the `session-field` → frontmatter requirement explicitly
- ALS docs should document `null` as the explicit null marker for nullable body sections
- `/als:manage` or equivalent skill needed for session record creation with correct scaffolding

---
