#!/usr/bin/env python3
"""
Prepared migration asset: fli-launch v1 → v2
Manifest: MUT-fli-launch-v1-to-v2-20260430-001

This script is a prepared stub. It does NOT execute the migration.
Data migration is not required for this version change (data_migration_required: false).

All changes between v1 and v2 are in agent logic and module guidance text.
No live session records need to be rewritten.

When migration tooling invokes this script, it should:
  1. Verify the ALS system root is valid.
  2. Confirm no live records exist that would fail v2 validation.
  3. Update .als/system.ts to set fli-launch version to 2 and update skills list.
  4. Confirm all records still pass validation after cutover.

Usage:
  python3 migrate_from_v1.py <als_system_root>
"""

import sys
import os
import json


def main():
    if len(sys.argv) < 2:
        print("ERROR: ALS system root path required as first argument.", file=sys.stderr)
        print(f"Usage: {sys.argv[0]} <als_system_root>", file=sys.stderr)
        sys.exit(1)

    system_root = sys.argv[1]
    system_ts = os.path.join(system_root, ".als", "system.ts")

    if not os.path.exists(system_root):
        print(f"ERROR: System root not found: {system_root}", file=sys.stderr)
        sys.exit(1)

    if not os.path.exists(system_ts):
        print(f"ERROR: .als/system.ts not found at: {system_ts}", file=sys.stderr)
        sys.exit(1)

    print("fli-launch v1 → v2 migration stub")
    print(f"System root: {system_root}")
    print()
    print("data_migration_required: false")
    print("No live record rewrites are needed for this version change.")
    print()
    print("To complete the cutover, migration tooling should:")
    print("  1. Update .als/system.ts: set fli-launch version to 2")
    print("  2. Update .als/system.ts: set fli-launch skills to [fli-launch-manage, fli-launch-pipeline]")
    print("     (skill ids are unchanged — no skill rename migration needed)")
    print("  3. Run alsc validation to confirm all records pass v2 schema")
    print("  4. Deploy updated skill bundles from v2/skills/ to .claude/skills/")
    print()
    print("This script has NOT made any changes. Cutover must be performed by migration tooling.")
    sys.exit(0)


if __name__ == "__main__":
    main()
