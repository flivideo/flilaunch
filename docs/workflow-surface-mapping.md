---
purpose: Surface-map of workflow categories and the data substrate that feeds them, framed for ALS — file-system + structured prose, not databases. Pre-meeting brief for ALS workflow design with Nick.
created: 2026-05-10
scope: AppyDave only (v-appydave brand)
audience: David + Nick
---

# Workflow Surface Mapping — ALS Pre-Design Brief

## 0. Framing rules

- **ALS, not Baku.** ALS is filesystem-backed structured data. Records are markdown files conforming to a `defineModule()` shape. No databases, no JSONB columns. Where the existing Baku impl uses a Supabase column, ALS would use a directory of records or a structured-prose file.
- **Structured prose, not free prose.** ALS allows prose in body sections, but those sections are declared by the shape. Whatever a workflow produces must fit a record's shape — that's the constraint to design within.
- **AppyDave only for now.** v-aitldr / v-shared / Clauding Lab are out of scope. AppyDave thumbnail prompt material exists; the others don't, and trying to generalise prematurely will dilute today's design.
- **FliHub is BI, not just an API.** FliHub already encodes intelligence in its data shape: chapter/segment naming, recording metadata, missing-transcript detection. The workflows should *consume that intelligence*, not re-derive it.
- **Memory doesn't travel.** This brief lives in git so M4 can pull it.

---

## 1. The data substrate (what ALS reads)

### 1a. Per-project filesystem layout (AppyDave)
```
~/dev/video-projects/v-appydave/<code>/
  recording-transcripts/<chapter>-<segment>-<label>.{srt,txt,json}
  recordings/<chapter>-<segment>-<label>.mov
  recording-shadows/...
  edit-1st/   (when editing has started)
  .awb.json   (legacy workflow state on ~6 projects — read-only artifact)
```

### 1b. The naming convention IS the BI
Real example from `c27-angeleye`:
- `01-1-intro`, `01-2-intro` → chapter 1 ("intro"), 2 segments
- `02-1-examples` … `02-4-examples` → chapter 2 ("examples"), 4 segments
- `03-1-development` … `03-21-development` → chapter 3 ("development"), 21 segments

What this gives you for free, before any AI runs:
- **Chapter boundaries** — chapter number changes encode the boundary
- **Chapter labels** — set by hand at recording time; serve as candidate YouTube chapter titles
- **Kickoff segment** — the `-1-` segment of each chapter is the entry point that sets the chapter's narrative tone
- **Effort signal** — segment count per chapter is a proxy for content density (1-segment chapter = brief; 21-segment chapter = deep)
- **Concatenable transcripts** — chapter-level transcript = `<chapter>-*-*.srt` joined in order

### 1c. FliHub access surface (single source of truth for all of the above)
Skill: `~/.claude/skills/flihub/SKILL.md` · Server: `npm run dev` in `~/dev/ad/flivideo/flihub/`, port 5101.

Endpoints that matter for ALS workflows:
| Endpoint | Why it matters |
|---|---|
| `GET /projects` | The project list — driver for any bulk workflow |
| `GET /projects/:code/transcripts?include=content` | Full transcript content (per recording) |
| `GET /projects/:code/chapters?format=text` | YouTube-ready chapter list with timestamps |
| `GET /projects/:code/recordings?missing-transcripts=true` | **Direct answer to "is something missing?"** |
| `GET /projects/:code/recordings?chapter=N` | Per-chapter recording group |
| `GET /projects/:code/export?format=text` | LLM-ready bundle (use this for ingestion) |
| `POST /projects/:code/inbox/write` | Where ALS writes outputs back |

The "missing-transcripts" filter is significant — it means *missing-thing* signal detection is already a first-class FliHub concern, not something the ALS workflow has to invent.

### 1d. Ingestion shape — what an ALS workflow gets when it picks up a project
Not just transcript. The full envelope:
- `project_code` (e.g. `b91-vibe-code-flideck-build-a-presentation`)
- `project_name` (the human-readable suffix)
- `project_path` (filesystem location)
- Per-recording: `chapter_number`, `segment_number`, `chapter_label`, transcript content, recording file
- Computed: chapter boundaries, kickoff segments, missing-transcript flags
- Optional: legacy `.awb.json` if present (prior workflow state)

---

## 2. Workflow categories David described

Mapping each to ALS framing — what shape, what records, what the workflow does. **Not designing the Delamain transition graphs** — that's Nick's session.

### A. Triage / health-check
**Goal**: read every project, classify state, flag investigation needs.

**Signals to detect**:
- Has transcript? → uses FliHub `missing-transcripts=true`
- Stage status (recording / editing / done) → from FliHub project metadata
- Has intro segment? (chapter 01 with label matching `intro|opening|hook`)
- Has outro segment? (final chapter with label matching `outro|wrap|cta|call-to-action`)
- Mentions a CTA? (lightweight transcript scan)
- Dormant? (no edits in N days)

**ALS framing**: each project gets a `triage-record.md` with frontmatter for the signals (booleans + enums) and prose body for notes. Bulk run iterates the project list, writes one record per project.

**Sub-workflows triggered by missing-thing signals** (David's prompt: "do we generate, do we investigate, do we manual?"):
- Missing SRT → branch: auto-generate via Whisper / investigate why / manual
- Missing intro/outro → branch: insert from template / re-record / mark as fragment
- These are operator-gate decisions, not agent decisions — fits Delamain `actor: operator` states

### B. Bulk analysis (the "12 prompts")
**Goal**: extract the structured analysis (core idea, hooks, audience signals, etc.) for *every* video, independently from any per-video launch run.

**Spec source**: §6 of `youtube-launch-optimizer-spec-v1.md` declares the *outputs* of analysis (core idea, key value, 3–5 hooks, audience hints, identity hints) but not 12 specific prompts. The "12 prompts" lineage is the Baku impl detail; the *concept* of bulk analysis is spec-aligned.

**ALS framing**: an `analysis-record.md` per project, conforming to a shape where each output (core_idea, hooks[], audience[], identity[]) is a declared field or named section. Persistence is **per-project file**, isolated from any launch-session record. Bulk-run and per-video-run both write to the same path → one project = one analysis record, regardless of how it was produced.

**This is the constraint that distinguishes ALS from Baku**: in Baku, analysis is a JSONB column on the projects row (coupled to launch state). In ALS, analysis is a separate record type that can be regenerated, batch-overwritten, or read by any consumer (triage, launch, visualisation) without touching launch state.

### C. Title development
**Goal**: generate multiple title candidates, operator selects shortlist.

**ALS framing**: a `titles-record.md` with a frontmatter list of candidates and a body section for selection rationale. Could be sub-record of a launch-session, or independent.

### D. Thumbnail concept
**Goal**: generate thumbnail design directions per selected title.

**Existing BI**: `flilaunch/docs/flithumb-brief.md` — text typology (none / primary / subliminal), title contrast modes (Explain/Intrigue, Abstract/Concrete, Calm/Dramatic, Parallel), title–thumbnail pairing rule.

**Question for Nick**: FliThumb is positioned as a separate composable app. Translates to ALS as: separate module, or sub-Delamain, or external skill the launch Delamain calls? The flithumb-brief explicitly says it can be used standalone or fed by FliLaunch outputs — that maps cleanly to a separate ALS module with its own shape.

### E. Thumbnail text
**Goal**: short overlay text, complementary to title, optionally embedding subliminal audience signal.

**ALS framing**: separate field on the thumbnail record (or its own record), three layers (none / primary / subliminal). Subliminal is where secondary audience signals materialise.

### F. Chapters
**Pre-existing BI**: chapter labels and boundaries already encoded in filenames (§1b). The workflow's job is *refinement*, not *generation* — promote the recording-time labels to publication-quality YouTube chapter titles, with timestamps from segment SRT timing.

**ALS framing**: chapter records derive from recordings metadata. The b-flilaunch redesign already collapsed chapters to a sub-Delamain. Refinement = AI suggests cleaner labels, operator approves. This is potentially the *simplest* workflow because most of the data is already structured.

### G. Description packaging
**Goal**: assemble synopsis + chapters + related videos + branding/affiliate/legal/CTA slots.

**Spec §9** treats it as a composite artifact with declared slots. Maps cleanly to ALS: a `description-record.md` with named body sections per slot.

---

## 3. Composability question

The Baku impls treat A–G as one sequential pipeline. David's framing — and the FliThumb-as-separate-app precedent — implies **multiple Delamains that compose**:

| Delamain | Reads | Writes | Operator gates |
|---|---|---|---|
| `triage` | project list, FliHub metadata | triage records | review flagged projects |
| `analyse` | triage records, transcripts | analysis records | accept analysis |
| `launch` | analysis records, brand config | titles, description | select titles, approve description |
| `thumbnail` (FliThumb) | analysis records, selected title | thumbnail + text records | design conversation |

Triage and analyse can run bulk. Launch and thumbnail are per-video. The same analysis record feeds both bulk-mode use cases (triage scans, channel intelligence) and per-video launch.

This is a question for Nick — does ALS naturally support this kind of cross-Delamain record sharing, or does each Delamain own its records?

---

## 4. Prompt centralisation (longer-term goal David mentioned)

Powerful prompts currently scattered:
- `b-youtube-launch-optimizer/supabase/functions/ai-generate/` — Baku Edge Function prompts
- `flilaunch/docs/flithumb-brief.md` — thumbnail design rules (essentially a prompt scaffold)
- `flilaunch/docs/youtube-launch-optimizer-spec-v1.md` §6–9 — output contracts that imply prompts
- `app-02-youtube-launch-optimizer.md` — early UX sketch with implicit prompt material
- `~/dev/ad/brains/brand-aitldr/` — brand-specific design content (not in scope today, but precedent)

**ALS-native option**: a `prompts/` module where each prompt is a record with frontmatter (purpose, shape of output, model preference) and body (the prompt itself, possibly HBS-templated). State agents in Delamains reference the prompt records by ALS URI. This is structured-prose-with-structure — the natural ALS fit.

**Not for today** — flag for Nick as a future direction.

---

## 5. Mochaccino as the visualisation seam

Already proven in this repo: `.mochaccino/` workspace visualises `docs/als-learnings/` as HTML. The pattern (Canonical Source → Provenance Tool → Peter JSON → Mocha HTML) works for any structured data ALS produces.

Implication for design: ALS workflows that produce records (triage, analysis, channel-level statistics) become candidate inputs for Mochaccino dashboards or AppyStack first-class apps. **The "data collection → visualisation" path is already an established pattern here**, parallel to how AppySentinel collects to JSONL → AppyStack visualises.

This means: don't try to bake visualisation into the Delamain. Let the Delamain produce records; let Mochaccino or an AppyStack viewer be the downstream consumer. Same separation FliThumb relies on.

---

## 6. Open questions for Nick

1. **Cross-Delamain record sharing** — can `launch` Delamain read records produced by `analyse` Delamain, or does each Delamain own its records exclusively? (Affects whether the bulk-analysis-vs-per-video-analysis isolation works.)

2. **Operator-gated branching** — for "missing-thing" sub-workflows (no SRT → generate / investigate / manual), is the branch an operator-state with multiple advance transitions, or a separate sub-Delamain per branch? The pattern affects how the triage workflow expresses conditionality.

3. **Bulk-mode invocation** — `/run-delamains` on each project in turn, or is there a batch invocation primitive? This affects how a "run analysis on all 64 transcripts" job is shaped.

4. **Record path templates and uniqueness** — for an analysis record per project, does ALS need a parent `project` entity, or can the project_code be the path key directly?

5. **External skill references** — FliHub access is a curl call today. Is the right pattern to wrap FliHub as an ALS skill, or call it as a tool from inside state agent prompts?

6. **Prompt records as a future module** — is "prompts as ALS records referenced by ALS URI from state agents" a reasonable pattern, or does ALS prefer prompts inline in state agent markdown?

7. **FliThumb composition** — separate ALS module that the launch Delamain transitions to via `exit`? Separate Delamain in the same module? Or external skill?

---

## 7. What's NOT in this brief

- Specific Delamain transition graph designs (your conversation with Nick today)
- Specific shape definitions in TypeScript (`defineModule()` calls)
- Prompt content for any of the workflows
- Cross-channel design (AppyDave only)
- Web/database considerations (ALS is filesystem)
