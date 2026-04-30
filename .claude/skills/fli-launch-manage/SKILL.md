---
id: fli-launch-manage
description: Create and manage FliLaunch sessions — list, create, inspect, and cancel YouTube launch sessions.
---

# FliLaunch Manage

CRUD interface for `launch-session` records.

## Actions

- **List** sessions by status (`awaiting-input`, `awaiting-hook-selection`, `awaiting-review`, `completed`, etc.)
- **Create** a new session (prompts for `project_code` and optional `internal_label`)
- **Inspect** a session — show current state, selected hooks, generated outputs
- **Cancel** a session in any non-terminal state
