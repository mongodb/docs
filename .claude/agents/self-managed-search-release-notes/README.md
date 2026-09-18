# Self-Managed Search Release Notes Agent

Automates the creation of per-version mongot release notes for
`content/self-managed-search/`.

## Prerequisites

- **GitHub CLI (`gh`)** installed and authenticated with access to
  `10gen/mongot` (private repo — MongoDB SSO required).
- **Python 3.9+** with PyYAML (`pip install pyyaml`).
- **Optional:** `AHA_API_KEY` and `AHA_SUBDOMAIN` environment variables
  for Aha! feature maturity cross-referencing. Without these, feature
  items with unknown maturity are flagged for manual review.

## Invocation

Start a new agent session and provide the following prompt:

```
Run the self-managed Search release notes agent in
.claude/agents/self-managed-search-release-notes/flow.md

version: 1.71.0
release_date: 2026-07-15
source_mode: github_only
docs_version_branch: upcoming
```

The agent will:
1. Fetch the `v1.71.0` release from `10gen/mongot` on GitHub.
2. Normalize items into a structured YAML schema.
3. Surface any items requiring manual review before proceeding.
4. Write each verified item through the appropriate writing skill.
5. Assemble and write the include file:
   `content/self-managed-search/upcoming/source/includes/changelogs/2026/v1-71-0.rst`
6. Update:
   `content/self-managed-search/upcoming/source/release-notes.txt`
7. Optionally apply the same changes to `current/`.

## Inputs

| Input | Required | Default | Description |
|---|---|---|---|
| `version` | Yes | — | mongot version, e.g. `1.71.0` |
| `release_date` | Yes | — | ISO date, e.g. `2026-07-15` |
| `source_mode` | No | `github_only` | `github_only` or `github_plus_slack` |
| `docs_version_branch` | No | `upcoming` | `upcoming` or `current` |

## Output files

| File | Description |
|---|---|
| `content/self-managed-search/{branch}/source/includes/changelogs/{YYYY}/v{X-Y-Z}.rst` | Per-version include with list-tables |
| `content/self-managed-search/{branch}/source/release-notes.txt` | Updated page heading, date, and include path |

## Approval checkpoints

The agent pauses at these points and waits for operator input:

1. **After normalization** — lists items flagged for manual review
   (unknown Aha! maturity, internal-only signals, empty descriptions).
   Operator decides: include, exclude, or keep flagged.
2. **After assembly** — presents the validation checklist result before
   asking whether to commit.
3. **After `upcoming` update** — asks whether to apply changes to
   `current/`.

## Availability and labeling rules

| Source signal | Action |
|---|---|
| Atlas-only namespace (`xgen/atlas`, `bazel/atlas`) | Dropped — never published in self-managed docs |
| Enterprise-only namespace (`xgen/enterprise`) | Published with **Enterprise Only** label |
| No Atlas/Enterprise signal | Published as community + enterprise (both) |

## Aha! maturity rules (features only)

| Aha! status | Output label |
|---|---|
| Shipped / GA | No label (GA is default) |
| Preview / Beta | "This feature is in Public Preview." appended |
| Not found / unknown | Item flagged for manual review — do not auto-publish |

## Rollback / reindex warnings

When source evidence indicates an on-disk format change (Lucene codec
upgrade, segment format change, reindex requirement), the
`write-compatibility-entry` skill automatically generates a `..
warning::` admonition in the compatibility note entry. These warnings
are mandatory and cannot be suppressed.

## File layout

```
.claude/agents/self-managed-search-release-notes/
  README.md                          # This file
  flow.md                            # Orchestration instructions
  fetch_mongot_release.py            # Fetch GitHub release → raw JSON
  normalize_release_items.py         # raw JSON → normalized YAML
  write-feature-entry.skill.md       # Write one feature RST row
  write-bug-entry.skill.md           # Write one bug fix RST row
  write-compatibility-entry.skill.md # Write one compat/deprecation row
  assemble-version-release-notes.skill.md  # Assemble include + update page
```

## Example — mongot 1.71.0

```
Run the self-managed Search release notes agent in
.claude/agents/self-managed-search-release-notes/flow.md

version: 1.71.0
release_date: 2026-07-15
```

Expected outputs:
- `content/self-managed-search/upcoming/source/includes/changelogs/2026/v1-71-0.rst`
- `content/self-managed-search/upcoming/source/release-notes.txt` (heading, date, include updated)

## Troubleshooting

**`gh` cannot access 10gen/mongot**
Authenticate with `gh auth login` and ensure your GitHub account has
access to the private `10gen` org.

**`aha_maturity: unknown` for all features**
Set `AHA_API_KEY` and `AHA_SUBDOMAIN` environment variables, or accept
the manual review prompts and assign maturity yourself.

**`git apply` fails when patching `current/`**
The diff may have conflicts if `current/` and `upcoming/` have diverged.
Run the agent again targeting `current/` directly:
```
docs_version_branch: current
```

**Release body is empty**
Some mongot tags are lightweight with no release body. In this case,
source the release notes from the release announcement Slack channel
and set `source_mode: github_plus_slack` (Phase 2 feature — requires
Slack integration).
