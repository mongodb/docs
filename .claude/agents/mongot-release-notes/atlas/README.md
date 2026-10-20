# Atlas Mongot Release Notes Agent

Automates the creation of per-version mongot release notes for
`content/atlas/source/search-changelog.txt` and `content/atlas/source/includes/changelog/fts-vs-{YYYY}.rst`.

An Atlas release is published only after its version reaches 100% in
PROD. The changelog date is the date of that rollout, not the GitHub
tag date or the planned date.

## Prerequisites

- **GitHub CLI (`gh`)** installed and authenticated with access to
  `10gen/mongot` and `10gen/mms` (private repos — MongoDB SSO required).
- **Python 3.9+** with PyYAML (`pip install pyyaml`).
- **Glean access** to read the Slack rollout message and the release
  schedule spreadsheet.
- **Optional:** `AHA_API_KEY` and `AHA_SUBDOMAIN` environment variables
  for Aha! feature maturity cross-referencing. Without these, feature
  items with unknown maturity are flagged for manual review.

## Invocation

Start a new agent session and provide the following prompt:

```
run .claude/agents/mongot-release-notes/atlas/flow.md
version: 1.73.2
rollout_permalink: https://mongodb.slack.com/archives/C08SD1243EU/p1789408356864419
```

## Inputs

| Input | Required | Description |
|---|---|---|
| `version` | Yes | mongot version, e.g. `1.73.2` |
| `rollout_permalink` | Yes | Slack permalink of the bot message in `#search-mongot-releases` (`C08SD1243EU`) that moves the version to 100% in PROD |

Do not infer either input. If the operator does not provide them, ask.

## Flow

| Step | Script | Output |
|---|---|---|
| 1. Confirm rollout | `atlas/rollout_signal.py` | `rollout.json` with `confirmed` and `reached_100_at_utc` |
| 2. Look up planned date | `atlas/release_schedule.py` | Planned 100% date and status, for the review gate only |
| 3. Fetch release | `common/fetch_mongot_release.py` | Raw release JSON |
| 4. Evaluate feature flags | `common/feature_flags.py annotate` | Items annotated with flag state |
| 5. Normalize for Atlas | `atlas/normalize_release_items.py` | `normalized.yaml` without self-managed-only items |
| 6. Review gate | `common/validation.py review` | Operator `include` / `exclude` decisions |
| 7. Write bullet text | `atlas/write-atlas-entry.skill.md` | Customer-facing `description` for each item |
| 8. Write changelog | `atlas/write_changelog.py` | Entries in `fts-vs-{YYYY}.rst` |
| 9. Check output | `common/validation.py check-output` | Checklist result |

`flow.md` has the full agent instructions. Run the commands below from
`.claude/agents/mongot-release-notes/`.

### 1. Confirm the rollout

Read the permalink with Glean, save the message text, then run:

```bash
python3 atlas/rollout_signal.py --version 1.73.2 \
    --url https://mongodb.slack.com/archives/C08SD1243EU/p1789408356864419 \
    --text message.txt --output rollout.json
```

The rollout is confirmed only when every check passes: the channel is
`C08SD1243EU`, the environment is `PROD`, the version matches, the
current `versionPercent` is 100, the previous `versionPercent` is not
100, and the message header time is within 120 seconds of the permalink
timestamp. Exit code 2 means the rollout is not confirmed. Stop and
report the failed checks.

### 2. Look up the planned date

Read the [Mongot Release Schedule](https://docs.google.com/spreadsheets/d/1I3PKjZubZRg4ve7E2GtNcg9zavIWxjA9Mr99EHYZ6f0)
with Glean, save the result, then run:

```bash
python3 atlas/release_schedule.py --input schedule.json --version 1.73.2
```

Show the planned date, status, and any warnings in the review gate. A
missing row (exit code 2), a date conflict between tabs, or a paused,
canceled, abandoned, skipped, Community-only, or Gov-only status is a
warning for the operator. It does not change the changelog date.

### 3–4. Fetch the release and evaluate feature flags

```bash
python3 common/fetch_mongot_release.py --version 1.73.2 \
    --output raw.json --enrich-prs
python3 common/feature_flags.py annotate --input raw.json \
    --output flagged.json --phase prod
```

Flags are read from `10gen/mms` (`feature-flags/definitions/mongot/`)
and matched to the enums in `DynamicFeatureFlags.java` in
`10gen/mongot`. Items behind a flag that is not enabled in PROD are
routed to the review gate.

The definitions do not record the rollout percentage, and flags often
stay `controlled` after reaching 100%. For a `controlled` flag, the
match records `controlled_since` and `controlled_since_url`: the date
and commit that set `prod` to `controlled`. The operator confirms in
the review gate whether all customers have the feature.

### 5. Normalize for Atlas

```bash
python3 atlas/normalize_release_items.py --input flagged.json \
    --output normalized.yaml
```

Drops self-managed-only items. Flags items for review when they have an
enterprise signal, an unknown product, an operational type,
rollback/reindex risk, an empty description, or unknown Aha! maturity
(features only).

### 6. Review gate

```bash
python3 common/validation.py review --input normalized.yaml
python3 common/validation.py review --input normalized.yaml \
    --decisions decisions.json --output verified.yaml
```

The first command exits with code 2 while any flagged item has no
decision. `decisions.json` maps item IDs to `include` or `exclude`.
For an included item with `product: unknown`, set `product` in
`normalized.yaml` first; otherwise `write_changelog.py` skips it.

### 7. Write the bullet text

The agent runs `write-atlas-entry.skill.md` once per item to rewrite
its `description` as a customer-facing bullet, and waits for operator
approval. The skill has the writing rules and examples.

### 8. Write the changelog

```bash
# Dry run: prints the entries and changes no files
python3 atlas/write_changelog.py --items verified.yaml --rollout rollout.json
# Write
python3 atlas/write_changelog.py --items verified.yaml --rollout rollout.json --write
```

### 9. Check the output

```bash
python3 common/validation.py check-output --input verified.yaml \
    --rst ../../../content/atlas/source/includes/changelog/fts-vs-2026.rst
```

Exit code 1 means a check failed. Report the failures to the operator
before asking whether to commit. Atlas bullets carry no `.. warning::`
admonition, so the rollback check fails whenever an included item has
rollback risk.

## Publishing rules

| Condition | Result |
|---|---|
| `availability: self_managed_only` | Never published |
| `review_decision: exclude` | Not published |
| `review_decision: include` | Published |
| No review needed and no decision | Published |
| Review needed and no decision | Script stops |
| `product: search` | Entry under `.. _fts{YYYYMMDD}:` |
| `product: vector_search` | Entry under `.. _avs{YYYYMMDD}:` |

A release with both Search and Vector Search items gets two entries
under the same date: one `fts` and one `avs`.

## Output files

| File | Change |
|---|---|
| `content/atlas/source/includes/changelog/fts-vs-{YYYY}.rst` | New entries inserted at the top |
| `content/atlas/source/search-changelog.txt` | New `{YYYY} Releases` section, only when the year file is new |

Entry format: heading `DD Month YYYY Release`, `~` underline matching
the heading length, and bullets wrapped at 72 characters. Each item's
`description` is used as the final bullet text.

## Stop conditions

`write_changelog.py` exits without writing when:

- the rollout is not confirmed,
- the rollout version does not match the items version,
- any flagged item has no review decision,
- an `fts` or `avs` anchor for the date already exists, or
- no items are publishable ("No Atlas items to publish for this
  release.", exit code 1).

## Tests

`atlas/test_release_schedule.py` checks `release_schedule.py` against
mock schedule rows for 9 versions. Run it after changing
`release_schedule.py`:

```bash
python3 atlas/test_release_schedule.py
```

It prints `PASS: 9 versions` and exits with code 0, or lists each
mismatch and exits with code 1.

## Hard rules

- Do not use the tag date or planned date as the changelog date.
- Do not publish flagged items without an operator decision.
- Do not commit or push without explicit operator instruction.
