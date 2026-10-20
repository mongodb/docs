# Self-Managed Search Release Notes — Agent Flow

## Purpose

Automate the production of a single mongot version's release notes for
the self-managed Search documentation. Targets one declared version tag
at a time (Phase 1). Multi-release backfills and date-range aggregation
are out of scope here.

## Required inputs

| Input | Description |
|---|---|
| `version` | The mongot version being released (e.g. `1.71.0`) |
| `release_date` | ISO date of the release (e.g. `2026-07-15`) |
| `source_mode` | `github_only` (default) or `github_plus_slack` |
| `docs_version_branch` | `current` (default) or `upcoming` |

If the user does not provide `version` or `release_date`, ask for them
before proceeding. Do not guess. Release notes always target `current`
unless the operator explicitly specifies `upcoming`.

Run every command from `.claude/agents/mongot-release-notes/`. Write
intermediate files to a temp directory, not the repo.

## Output targets

| Artifact | Path |
|---|---|
| Per-version include | `content/self-managed-search/{docs_version_branch}/source/includes/changelogs/{YYYY}/v{VERSION_SLUG}.rst` |
| Release notes page | `content/self-managed-search/{docs_version_branch}/source/release-notes.txt` |

Where:
- `{YYYY}` is the year from `release_date`
- `{VERSION_SLUG}` replaces `.` with `-` (e.g. `1.71.0` → `1-71-0`)

## Step 1 — Fetch the GitHub release

Run `fetch_mongot_release.py` with `--version {version}`:

```bash
python3 common/fetch_mongot_release.py --version {version}
```

The script writes `raw_release.json` to a temp directory and prints the
path. Capture that path for Step 2.

If the GitHub release tag does not exist, stop and tell the operator.
Do not proceed with a missing source.

## Step 2 — Normalize into structured YAML

Run `normalize_release_items.py` on the raw JSON:

```bash
python3 self-managed/normalize_release_items.py \
    --input {raw_release_json_path} \
    --version {version} \
    --release-date {release_date} \
    --output normalized_items.yaml
```

The script writes items in the canonical schema from
`common/schema.py`. It:

- drops Atlas-only items (`availability: atlas_only`),
- sets `type: compatibility` when it detects rollback or reindex risk,
- looks up Aha! maturity for features,
- flags items for review (`requires_manual_review: true`, with
  `review_reasons`) when the description is empty or a feature's
  `aha_maturity` is still `unknown`.

## Step 3 — Review gate

```bash
python3 common/validation.py review --input normalized_items.yaml
```

Exit code 2 means items need decisions. Present each flagged item to
the operator with its reasons and source links, and ask for `include`
or `exclude`. Never default an item with unknown maturity to GA: for
an included feature with `aha_maturity: unknown`, ask whether it is
`ga` or `preview` and set `aha_maturity` in `normalized_items.yaml`.
Write the decisions to `decisions.json`
(`{"<item id>": "include|exclude"}`), then run:

```bash
python3 common/validation.py review --input normalized_items.yaml \
    --decisions decisions.json --output verified.yaml
```

Do not continue until this exits with code 0.

## Step 4 — Parallel item writing

For each item in `verified.yaml`, launch one subagent using the
matching skill:

| Item type | Skill |
|---|---|
| `feature` | `write-feature-entry.skill.md` |
| `fix` | `write-bug-entry.skill.md` |
| `compatibility` or `operational` | `write-compatibility-entry.skill.md` |
| `deprecation` | `write-compatibility-entry.skill.md` |

Pass each subagent the item's YAML block and `version`. Each subagent
returns a single RST list-table row (without the table wrapper).

If a subagent returns `REVIEW_REQUIRED: <title>`, return to Step 3 for
that item.

Collect all returned rows. Count them. If the count does not match the
number of verified items, stop and report the discrepancy before
assembling.

## Step 5 — Assemble the include file and update the page

Run the `assemble-version-release-notes.skill.md` skill with:
- the collected rows grouped by section
- `version`
- `release_date`
- `docs_version_branch`
- the number of items in `verified.yaml`

The assembler writes the include file (matching the format of
`content/self-managed-search/current/source/includes/changelogs/2026/v1-70-0.rst`)
and updates the heading, release date, and include directive in
`release-notes.txt`. Do not edit `release-notes.txt` separately.

## Step 6 — Validate and report

Run the output checks from `.claude/agents/mongot-release-notes/`:

```bash
python3 common/validation.py check-output --input verified.yaml \
    --rst ../../../content/self-managed-search/{docs_version_branch}/source/includes/changelogs/{YYYY}/v{VERSION_SLUG}.rst
```

Then run `./lint-docs.sh all` on the include file and
`release-notes.txt` from the repo root.

Confirm the validation checklist before declaring completion:

- [ ] Every fetched item was either published or flagged for review
- [ ] Every published item went through a writing skill (not freehand)
- [ ] No Atlas-only items appear in the output
- [ ] Enterprise-only items are labeled **Enterprise Only**
- [ ] Release version in the page heading matches `{version}`
- [ ] Release date in the page heading matches `{release_date}`
- [ ] Include path in `release-notes.txt` matches the generated file name
- [ ] Compatibility or rollback warnings are present when the source
      evidence indicates on-disk format changes
- [ ] No internal ticket IDs or Jira/GitHub issue identifiers appear in
      customer-facing prose

Report the `check-output` results, the `lint-docs.sh` results, and any
checklist failures to the operator before asking whether to commit.

## Step 7 — Apply to `upcoming` (conditional)

After `current` is done, ask the operator: "Should I also apply these
changes to the `upcoming` version directory?"

If yes, run from the repo root:

```bash
git diff HEAD -- content/self-managed-search/current/source/ | \
    sed 's|/current/|/upcoming/|g' | \
    git apply -
```

If `git apply` fails, report the error and ask for instructions. Verify
the patched file before reporting completion.

## Hard rules

- Do not write release note prose freehand. Every entry must go through
  a writing skill.
- Do not publish any item flagged `requires_manual_review: true` without
  explicit operator approval.
- Do not commit or push without explicit operator instruction.
- Do not infer missing `version` or `release_date`. Ask.
- Anything sourced only from Slack (in `source_mode: github_plus_slack`)
  but not confirmed in the GitHub release artifact must be flagged, not
  auto-published.
