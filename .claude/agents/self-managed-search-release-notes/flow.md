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

## Output targets

| Artifact | Path |
|---|---|
| Per-version include | `content/self-managed-search/{docs_version_branch}/source/includes/changelogs/{YYYY}/v{VERSION_SLUG}.rst` |
| Release notes page | `content/self-managed-search/{docs_version_branch}/source/release-notes.txt` |

Where:
- `{YYYY}` is the year from `release_date`
- `{VERSION_SLUG}` replaces `.` with `-` (e.g. `1.71.0` → `v1-71-0`)

## Step 1 — Fetch the GitHub release

Run `fetch_mongot_release.py` with `--version {version}`:

```bash
python3 .claude/agents/self-managed-search-release-notes/fetch_mongot_release.py \
    --version {version}
```

The script writes `raw_release.json` to a temp directory and prints the
path. Capture that path for Step 2.

If the GitHub release tag does not exist, stop and tell the operator.
Do not proceed with a missing source.

## Step 2 — Normalize into structured YAML

Run `normalize_release_items.py` on the raw JSON:

```bash
python3 .claude/agents/self-managed-search-release-notes/normalize_release_items.py \
    --input {raw_release_json_path} \
    --version {version} \
    --release-date {release_date} \
    --output normalized_items.yaml
```

The script produces a `normalized_items.yaml` with this schema:

```yaml
version: 1.71.0
release_date: 2026-07-15
items:
  - type: feature|fix|compatibility|deprecation|operational
    title: ...
    description: ...
    source_url: ...
    source_kind: github_release
    availability: community|enterprise|both
    requires_manual_review: false
    aha_maturity: ga|preview|unknown
```

Any item where `requires_manual_review: true` must be surfaced to the
operator before proceeding. List them and ask whether to include, exclude,
or flag each one. Do not auto-publish items marked for review.

## Step 3 — Availability and maturity classification

For every item in the normalized YAML:

### Atlas exclusion (hard filter)

Never include items that are Atlas-only in self-managed Search release
notes. The `normalize_release_items.py` script sets `availability:
atlas_only` for items it can classify automatically; remove these
before writing. If classification is uncertain, flag for manual review.

### Enterprise label

Items with `availability: enterprise` must be labeled **Enterprise
Only** in the generated RST. The writing skills handle this — pass
`availability` as a field to each subagent.

### Aha! maturity check (features only)

For every item with `type: feature`, the normalizer sets `aha_maturity`
based on a best-effort Aha! cross-reference. If `aha_maturity: unknown`,
add `requires_manual_review: true` before writing. Never default an
unknown item to GA silently.

## Step 4 — Parallel item writing

For each item in the verified YAML, launch one subagent using the
matching skill:

| Item type | Skill |
|---|---|
| `feature` | `write-feature-entry.skill.md` |
| `fix` | `write-bug-entry.skill.md` |
| `compatibility` or `operational` | `write-compatibility-entry.skill.md` |
| `deprecation` | `write-compatibility-entry.skill.md` |

Pass the full item YAML block to each subagent as input. Each subagent
returns a single RST list-table row (without the table wrapper).

Collect all returned rows. Count them. If the count does not match the
number of verified items, stop and report the discrepancy before
assembling.

## Step 5 — Assemble the include file

Run the `assemble-version-release-notes.skill.md` skill with:
- the collected rows grouped by section
- `version`
- `release_date`

The assembler produces a complete RST include file matching the format
of `content/self-managed-search/upcoming/source/includes/changelogs/2026/v1-70-0.rst`.

Write the output to:
```
content/self-managed-search/{docs_version_branch}/source/includes/changelogs/{YYYY}/v{VERSION_SLUG}.rst
```

## Step 6 — Update the release notes page

Edit `content/self-managed-search/{docs_version_branch}/source/release-notes.txt`
to reflect the new release as the topmost entry:

1. Change the heading to `mongot v{version}`.
2. Change the release date line to `**Release date**: {release_date formatted as "Month D, YYYY"}`.
3. Change the include directive to the new include path.

This is a deterministic edit. Read the file first and perform a targeted
find-and-replace for each of the three fields. Do not rewrite the full
page.

## Step 7 — Validate and report

Run the validation checklist before declaring completion:

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

Report any checklist failures to the operator before asking whether to
commit.

## Step 8 — Apply to `upcoming` (conditional)

After `current` is done, ask the operator: "Should I also apply these
changes to the `upcoming` version directory?"

If yes, use `git diff` and `git apply`:

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
