# Tenant / Brand / User Entity Model

## Source
Extracted from `docs/discovery/raw-4-spec-v1.txt` (sections 4.2, 4.3, 4.4) on 2026-04-23.

## The model

```
Tenant (workspace)
  ├── Users (members with roles)
  ├── Brands
  │    ├── Videos
  │    ├── Documents (style guide, pillars, audience defs)
  │    ├── Prompt defaults
  │    └── North Star (versioned)
  └── Shared resources (documents scoped to tenant, not brand)
```

### Tenant
Top-level owner context. Contains:
- users (people with access)
- brands (channels/publishing identities)
- shared documents (apply across brands within this tenant)
- shared prompt systems
- permissions and operational settings

### Brand
A channel or publishing identity.
David's brands: **AppyDave**, **AI TLDR**, **Clauding Lab**.
Each brand has:
- its own active North Star (versioned)
- its own audience definitions
- its own content pillars
- its own prompt defaults
- its own thumbnail style guide
- its own description conventions
- its own related-video conventions

### User
A person working in the system.
David's users: **AppyDave** (David), **Mary**, **Jan**.
Each user has:
- roles (owner, editor, reviewer, viewer)
- brand access (which brands they can see/edit)
- review responsibilities
- prompt editing permissions

## Why it's out of v1
v1 is single-tenant, single-user, single-brand. Adding the model introduces:
- authentication and session management
- per-tenant data scoping and isolation
- per-brand configuration routing
- user invitation and permission flows
- role-based access checks throughout the UI

None of this improves "transcript in → launch-ready out" for the single-operator case. It's infrastructure that pays off only after v1 validates the core workflow.

## v1 foothold (the smart minimum)
The persistence schema should include a `brand` field on every launch record from day one. Even though v1 always sets it to one value, the field exists for forward compatibility. When v2+ adds multi-brand, that's a data expansion, not a data rewrite.

Same principle for tenant: optionally include a `tenant_id` field with a default value.

## When to build this
After v1 proves the core workflow and:
- David (or Mary/Jan) wants to actually run launches for multiple brands
- OR a second user needs access without a separate app instance
- OR the single-operator approach hits concrete limits that multi-user would solve

Premature multi-tenant is a notorious time sink. Deferring is the right call until a concrete user pressure exists.

## Open questions (resolve during v2 planning)
- **Tenant vs brand for shared documents** — do style guides live at tenant level (shared across brands) or brand level (each brand has its own)? Probably brand level with optional tenant-scoped overrides.
- **Prompt scope** — do prompts live at tenant level (shared) or brand level (per-brand customization)? Probably both, with brand overrides.
- **North Star scope** — per-brand (confirmed). Not a tenant-level concept.
- **User-to-brand permissions** — granularity (all brands / specific brands / read-only per brand)?

## Dependencies
- `docs/requirements/multi-tenant-multi-brand.md` — the broader multi-tenancy requirement
- `docs/requirements/document-concept-library.md` — documents are scoped to brand
- `docs/requirements/north-star-versioning.md` — North Stars are scoped to brand

## Related
- `docs/future/architecture-spec-v2.md` — sections 4.2, 4.3, 4.4
