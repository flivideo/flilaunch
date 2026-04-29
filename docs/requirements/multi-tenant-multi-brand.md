# Multi-Tenant and Multi-Brand Support

## Source
Extracted from `docs/discovery/raw-3.txt` on 2026-04-23.

## The idea
FliLaunch becomes a tool used by multiple users, each with multiple brands.

### David's situation (the seed data point)
- **Tenant**: David (with team members Mary and Jan as additional users under the same tenant)
- **Brands** (under David's tenant):
  - AppyDave
  - AITLDR
  - Clauding Lab

Each brand has its own:
- North Star
- content pillars
- audience definition
- thumbnail style guide
- historical video corpus

## Why it's out of v1
Multi-tenant adds:
- authentication and user isolation
- per-tenant data scoping
- per-brand configuration routing
- invitation/permission flows

None of this improves "transcript in → launch-ready out" for the single-operator case. It's infrastructure that pays off only after v1 proves the core workflow.

v1 operates as single-user, single-brand (whichever brand the current launch is for, passed as a config or implicit default).

## v1 foothold
The persistence schema should accommodate a brand identifier from day one — even if v1 only uses one brand. That makes the v2+ multi-brand migration a data expansion, not a data rewrite.

## When to build this
After the single-operator launch workflow is validated and David (or Mary/Jan) actually wants to use it for more than one brand in rotation. Premature multi-tenant is a notorious time sink.

## Related
- `docs/requirements/historical-video-backfill.md` — backfill implies multi-brand because the corpus spans brands
- `docs/requirements/document-concept-library.md` — per-brand docs (style guides, pillars) live here
- `docs/requirements/north-star-versioning.md` — each brand has its own North Star
