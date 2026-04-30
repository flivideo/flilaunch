# ALS Design Decisions — fli-launch Module

Key architectural choices made during the two-session implementation, with the rationale and the alternatives that were rejected.

---

## Decision 1: Hook-centric fan-out (not title-centric)

**What Nick's initial diagram showed:** Thumbnail derives from title.
```
hook → title → thumbnail
```

**What we implemented:**
```
hook → title
     → thumbnail
```

**Rationale:** The hook is the framing angle of the video — the emotional or conceptual entry point. Both the title (text expression) and thumbnail (visual expression) should express the same hook independently. If thumbnail derives from title, you get visual redundancy with the title text, which wastes the thumbnail's attention-grabbing surface. A hook-derived thumbnail can be visually surprising or complementary while still expressing the same angle.

**Additional consequence:** Hook selection becomes the pivotal operator gate. Selecting hooks (not titles) is the creative decision that determines the entire direction of the launch packaging.

---

## Decision 2: 4 operator gates (not 7 from spec, not 3 from first design)

**Spec had 7 gates** — every user touchpoint in the Baku web app.
**First Delamain design had 3 gates** — reduced too aggressively (missed chapters).
**Final design has 4 gates.**

| Gate | Why it's a gate |
|------|----------------|
| `awaiting-input` | Project code must be provided by a human. Agent can't infer it. |
| `awaiting-hook-selection` | Hook selection is a creative judgment call — which angles are worth pursuing. Not agent-automatable. |
| `awaiting-chapter-review` | Chapter labels are visible to the audience. Human judgment on quality and tone required. External fine-tuning tool is used here. |
| `awaiting-review` | Final selections (3 A/B titles, thumbnail concept, description edits) are publishing decisions. Must be human-owned. |

**What didn't get a gate:**
- Analysis (12 parallel prompts) → fully agent-owned, no human needed
- Hook generation → agent produces options, human selects at the next gate
- Content generation (titles + thumbnails) → agent produces, human selects at review
- Chapter generation → agent produces, human reviews at chapter gate
- Output assembly → mechanical packaging of human-approved selections

---

## Decision 3: Chapters inlined into `launch` Delamain (not a separate Delamain)

**Original design:** A separate `chapters` Delamain for the label refinement loop.

**Why it was wrong:** ALS has no sub-Delamain concept. A Delamain is triggered by a `delamain`-typed field on an entity. The `chapters` Delamain was registered in the module but had no trigger field on `launch-session`. It was orphaned.

**Two valid options:**
1. Add a `chapters_status` field to the entity → second independent Delamain
2. Inline chapter states into `launch`

**Why we chose option 2:**
- Only one entity exists and chapter processing is part of the launch flow, not a parallel concern
- Interview confirmed AI generates good chapter labels on first pass (refinement is occasional, not the common case)
- External timing tool is out-of-band — doesn't need its own Delamain state
- One entity + one Delamain + inlined states = clean ALS model

**What "inline" means in practice:**
- `generating-chapters` state: agent reads segment names + SRT + transcript → draft list
- `awaiting-chapter-review` state: operator gate — accept, refine, or externally fine-tune
- `refining-chapters` state: one AI pass on flagged labels → loop back to review

---

## Decision 4: Analysis = 12 parallel agent prompts, no gate

**Why no gate:** Analysis doesn't need human input — it's purely extractive. The 12 prompts each extract a different signal from the transcript (core idea, key value, audience hints, hook angles, etc.). All outputs land in the ANALYSIS section of the entity record. The next agent (hook generation) reads ANALYSIS and produces hook candidates.

**Why resumable:** 12 parallel sub-agents is a long-running operation. If the Claude session crashes mid-analysis, the dispatcher needs the `analysis_session` field to resume rather than restart from scratch.

---

## Decision 5: Chapter timing = tool call, not workflow state

**Why not a state:** Timing adjustment (shifting a chapter timestamp by ±N seconds) is a mechanical precision operation — index lookup plus arithmetic. It requires no AI reasoning and no human approval loop. A tool call returns a corrected timestamp immediately.

**Where it happens:** Out-of-band during `awaiting-chapter-review`. The operator uses an external fine-tuning app (or edits manually), then advances the gate when satisfied. The Delamain doesn't need to model this — it models decisions, not tools.

---

## Decision 6: `internal_label` nullable, excluded from title template

**What `internal_label` is:** An optional human annotation — e.g., "Guy Monroe demo run" — that gives the operator a quick-reference name for the session. Not always provided.

**Why excluded from title:** The compiler enforces that title source fields are non-null. `internal_label` is `allow_null: true`. Using it in the title template fails at compile time.

**Title source = `project_code` only.** Project codes are always unique and always non-null (they're required at session creation).

---

## Decision 7: Module name `fli-launch` (not `youtube-launch-optimizer`)

**Why not the spec name:** There's an existing AWB (Agent Workflow Builder) module called `youtube-launch-optimizer`. Using the same name risks collision and confusion.

**Why `fli-launch`:** Namespaces it to FliLaunch specifically. Follows the pattern of other FliVideo modules (`fli-*`). The skill IDs become `fli-launch-manage` and `fli-launch-pipeline` — unambiguous.

---

## Decision 8: Two skills — manage + pipeline

**`fli-launch-manage`:** CRUD interface. Create, list, inspect, cancel sessions. Operator uses this to provision a new session for a project.

**`fli-launch-pipeline`:** Operator console. Surfaces sessions at human gates. Shows what needs attention and lets the operator act on it.

**Why separate:** Manage is administration (session lifecycle). Pipeline is operation (advancing sessions through the workflow). Keeping them separate follows the convention in the ALS reference system and avoids a bloated skill with too many concerns.

---

## Decision 9: FliHub as transcript source (not direct file reference)

**Why FliHub:** FliHub is the canonical video project management system. It knows where transcripts live, normalizes the data, and provides a consistent API. The agent shouldn't need to know filesystem paths.

**What the agent does:** Calls `GET /api/query/projects/<code>/transcripts?include=content` with the project code the operator provided at `awaiting-input`. Writes the transcript content to the INPUTS section of the session record.

**Open question (not yet resolved):** Auth headers for FliHub API — whether it requires a token and what form. The current `fetching-transcript` agent stub references FliHub but auth is not confirmed.
