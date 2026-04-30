import { defineDelamain } from "../../../../../authoring.ts";

// Main launch Delamain for FliLaunch YouTube Launch Optimizer.
//
// 4 operator gates:
//   Gate 1 — awaiting-input          : operator provides project code + optional overrides
//   Gate 2 — awaiting-hook-selection : operator selects which hook angles drive titles + thumbnails
//   Gate 3 — awaiting-chapter-review : operator reviews/refines chapter labels; external fine-tune happens here
//   Gate 4 — awaiting-review         : operator reviews all outputs, makes final selections

export const delamain = defineDelamain({
  "phases": [
    "ingest",
    "analysis",
    "hook-selection",
    "generation",
    "chapters",
    "review",
    "closed"
  ],
  "states": {

    // ── INGEST ──────────────────────────────────────────────────────────────

    "awaiting-input": {
      "initial": true,
      "phase": "ingest",
      "actor": "operator"
      // Gate 1: operator provides project_code (shortcode is sufficient),
      // optional focal_point_note, optional audience_keywords, optional related_videos list.
      // Then advances — agent fetches transcript + SRT from FliHub API.
    },

    "fetching-transcript": {
      "phase": "ingest",
      "actor": "agent",
      "provider": "anthropic",
      "resumable": false,
      "path": "agents/fetching-transcript.md"
      // Calls FliHub API: resolves shortcode, fetches combined transcript text
      // and per-recording SRT timings. Writes all to INPUTS section.
    },

    // ── ANALYSIS ────────────────────────────────────────────────────────────

    "running-analysis": {
      "phase": "analysis",
      "actor": "agent",
      "provider": "anthropic",
      "resumable": true,
      "session-field": "analysis_session",
      "path": "agents/running-analysis.md"
      // Fires 12 parallel analysis sub-agents against the transcript only (not SRT).
      // Writes all outputs to ANALYSIS section. No human gate needed.
    },

    "generating-hooks": {
      "phase": "analysis",
      "actor": "agent",
      "provider": "anthropic",
      "resumable": false,
      "path": "agents/generating-hooks.md"
      // Generates 10-20 hook angles from analysis output.
      // Produces AI-ranked top-4 shortlist with #1 marked as recommendation.
      // Writes shortlist first, then full list, to HOOKS section.
    },

    // ── HOOK SELECTION ──────────────────────────────────────────────────────

    "awaiting-hook-selection": {
      "phase": "hook-selection",
      "actor": "operator"
      // Gate 2: operator sees top-4 shortlist first (#1 marked as AI recommendation).
      // Marks 1-3 as selected. These drive titles AND thumbnails (both).
      // Can rework back to regenerate hooks if none are good.
    },

    // ── GENERATION ──────────────────────────────────────────────────────────

    "generating-content": {
      "phase": "generation",
      "actor": "agent",
      "provider": "anthropic",
      "resumable": true,
      "session-field": "content_session",
      "path": "agents/generating-content.md"
      // For each selected hook:
      //   - generates ~10 title candidates + audience signal classifications
      //   - generates 1-2 thumbnail concepts + text options + badge suggestions
      // Writes to TITLES and THUMBNAILS sections only.
    },

    // ── CHAPTERS ────────────────────────────────────────────────────────────

    "generating-chapters": {
      "phase": "chapters",
      "actor": "agent",
      "provider": "anthropic",
      "resumable": false,
      "path": "agents/generating-chapters.md"
      // Reads segment file names + SRT timings (from INPUTS) + transcript.
      // Uses SRT timestamps when available; estimates otherwise.
      // Produces timestamped chapter list with contextualised labels.
      // Writes to CHAPTERS section.
    },

    "awaiting-chapter-review": {
      "phase": "chapters",
      "actor": "operator"
      // Gate 3: operator reviews draft chapters. Three paths:
      //   - advance → awaiting-review       (happy with AI labels, or finished external fine-tune)
      //   - rework  → refining-chapters     (wants one more AI label pass)
      // External timing/label fine-tune tool is used here out-of-band;
      // operator edits CHAPTERS section then advances.
    },

    "refining-chapters": {
      "phase": "chapters",
      "actor": "agent",
      "provider": "anthropic",
      "resumable": false,
      "path": "agents/refining-chapters.md"
      // Operator has flagged specific labels for improvement.
      // Generates 3-5 alternative labels per flagged chapter.
      // Returns to awaiting-chapter-review.
    },

    // ── REVIEW ──────────────────────────────────────────────────────────────

    "awaiting-review": {
      "phase": "review",
      "actor": "operator"
      // Gate 4: operator reviews all generated outputs and:
      //   - selects 3 title candidates (A/B testing)
      //   - selects thumbnail concept(s) + text option(s)
      //   - reviews/edits chapter list
      //   - edits description slots inline
      //   - selects/deselects keyword tags
      // Can rework back to hook selection if direction needs to change.
    },

    "assembling-output": {
      "phase": "review",
      "actor": "agent",
      "provider": "anthropic",
      "resumable": false,
      "path": "agents/assembling-output.md"
      // Replaces chapter placeholder in DESCRIPTION with real chapter list.
      // Writes sibling machine-readable JSON export file ({id}-export.json).
      // Writes human-readable EXPORT section with pointer to JSON file.
    },

    // ── CLOSED ──────────────────────────────────────────────────────────────

    "completed": {
      "phase": "closed",
      "terminal": true
    },

    "cancelled": {
      "phase": "closed",
      "terminal": true
    }
  },

  "transitions": [
    // Ingest
    { "class": "advance", "from": "awaiting-input",        "to": "fetching-transcript" },
    { "class": "advance", "from": "fetching-transcript",   "to": "running-analysis" },

    // Analysis
    { "class": "advance", "from": "running-analysis",      "to": "generating-hooks" },
    { "class": "advance", "from": "generating-hooks",      "to": "awaiting-hook-selection" },

    // Hook selection
    { "class": "advance", "from": "awaiting-hook-selection", "to": "generating-content" },
    { "class": "rework",  "from": "awaiting-hook-selection", "to": "generating-hooks" },

    // Generation → chapters
    { "class": "advance", "from": "generating-content",       "to": "generating-chapters" },

    // Chapters
    { "class": "advance", "from": "generating-chapters",      "to": "awaiting-chapter-review" },
    { "class": "advance", "from": "awaiting-chapter-review",  "to": "awaiting-review" },
    { "class": "rework",  "from": "awaiting-chapter-review",  "to": "refining-chapters" },
    { "class": "advance", "from": "refining-chapters",        "to": "awaiting-chapter-review" },

    // Review
    { "class": "advance", "from": "awaiting-review",       "to": "assembling-output" },
    { "class": "rework",  "from": "awaiting-review",       "to": "awaiting-hook-selection" },

    // Complete
    { "class": "exit",    "from": "assembling-output",     "to": "completed" },

    // Cancel from any non-terminal state
    {
      "class": "exit",
      "from": [
        "awaiting-input",
        "fetching-transcript",
        "running-analysis",
        "generating-hooks",
        "awaiting-hook-selection",
        "generating-content",
        "generating-chapters",
        "awaiting-chapter-review",
        "refining-chapters",
        "awaiting-review",
        "assembling-output"
      ],
      "to": "cancelled"
    }
  ]
} as const);

export default delamain;
