# Requirement: Broad vs Targeted Audience Strategy Toggle

**Status**: Deferred — v2+ (or late v1 if implementation is lightweight)  
**Source**: docs/discovery/raw-1.txt

## Problem
When generating titles and thumbnails, there's a decision to make: optimise for maximum broad CTR, or deliberately include an identity keyword (e.g. "BMAD") to attract a smaller but higher-quality audience. Currently there's no explicit place to make this choice — it gets forgotten or done inconsistently.

## Proposed behaviour
After the Analysis stage, present a simple choice:
- **Broad** — maximise curiosity/clarity, ignore niche identity keywords
- **Targeted** — include one identity keyword in title, thumbnail text, or as a visual badge

The chosen strategy is injected as a rule into the title and thumbnail generation prompts.

## Valid identity keyword placement options (from discovery)
1. Title — strongest targeting signal, slightly narrows audience
2. Thumbnail text — balanced, good default
3. Visual badge — subtle, doesn't disrupt design
4. Description/tags — weakest, only helps post-click

## Why deferred
Adds a decision layer to the UI before generation begins. Want to validate the core workflow works first, then layer this in.
