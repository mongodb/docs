# Atlas Search Release Notes — Agent Flow

## Purpose

Write the Atlas Search and Vector Search changelog entries for one
mongot version after it reaches 100% in PROD. One version per run.

## Required inputs

| Input | Description |
|---|---|
| `version` | mongot version, e.g. `1.73.2` |
| `rollout_permalink` | Slack permalink of the bot message in `#search-mongot-releases` (`C08SD1243EU`) that moves the version to 100% in PROD |

If either input is missing, ask for it. Do not guess. Do not ask for a
release date: the changelog date comes only from the confirmed rollout.

Run every command from `.claude/agents/mongot-release-notes/`. Write
intermediate files to a temp directory, not the repo.

## Step 1 — Confirm the rollout

Read the Slack message at `rollout_permalink`. Save the message
text to `message.txt`, then run:

```bash
python3 atlas/rollout_signal.py --version {version} \
    --url {rollout_permalink} --text message.txt --output rollout.json
```

If the exit code is 2, stop. Report the failed checks and ask the
operator for the correct permalink.

## Step 2 — Look up the planned date

Read the release schedule spreadsheet:
`https://docs.google.com/spreadsheets/d/1I3PKjZubZRg4ve7E2GtNcg9zavIWxjA9Mr99EHYZ6f0`.
Save the result to `schedule.json` without editing it. The script
accepts the document as returned by the read (JSON or its HTML page
body) or a CSV export of one tab that has a "100% Release Date"
column. Then run:

```bash
python3 atlas/release_schedule.py --input schedule.json --version {version}
```

Keep the planned date, status, and warnings for the review gate. Do not
stop on exit code 2 or on warnings; report them in Step 5.

## Step 3 — Fetch the release and evaluate feature flags

```bash
python3 common/fetch_mongot_release.py --version {version} \
    --output raw.json --enrich-prs
python3 common/feature_flags.py annotate --input raw.json \
    --output flagged.json --phase prod
```

If the fetch fails or returns no items, stop and tell the operator.

Use only the flag definitions in `10gen/mms`
(`feature-flags/definitions/mongot/`) to decide whether a gated
feature is rolled out:

| `prod` state | Meaning |
|---|---|
| `enabled` | Rolled out. No review needed. |
| `disabled` | Not rolled out. Sent to the review gate. |
| `controlled` | Rollout percentage unknown. Sent to the review gate with `controlled_since`, the date the definition set `prod` to `controlled`. |

`controlled_since` is the earliest date any customer could have the
feature. It does not confirm that all customers have it.

## Step 4 — Normalize for Atlas

```bash
python3 atlas/normalize_release_items.py --input flagged.json \
    --output normalized.yaml
```

The normalizer drops self-managed-only items and flags items for review
when they have an enterprise signal, an unknown product, an operational
type, rollback/reindex risk, an empty description, or unknown Aha!
maturity (features only).

## Step 5 — Review gate

```bash
python3 common/validation.py review --input normalized.yaml
```

Exit code 2 means items need decisions. Present to the operator:

- the rollout date from `rollout.json` and the planned date and any
  warnings from Step 2,
- each flagged item with its reasons and source links,
- for an item behind a `controlled` flag, the `controlled_since` date
  and commit link from `evidence.feature_flags`. Ask the operator to
  confirm that all customers have the feature by the rollout date. If
  the operator cannot confirm it, recommend `exclude` so the item can
  be published in a later entry.

Ask for `include` or `exclude` for each flagged item. For an included
item with `product: unknown`, ask whether it is Search or Vector Search
and set `product` in `normalized.yaml`. Write the decisions to
`decisions.json` (`{"<item id>": "include|exclude"}`), then run:

```bash
python3 common/validation.py review --input normalized.yaml \
    --decisions decisions.json --output verified.yaml
```

Do not continue until this exits with code 0.

## Step 6 — Write the bullet text

For each item in `verified.yaml`, run the `write-atlas-entry.skill.md`
skill with the item's YAML block. Replace the item's `description` with
the returned bullet text.

If the skill returns `PRODUCT_REQUIRED`, return to Step 5 for that
item.

Show the rewritten bullets to the operator and wait for approval.

## Step 7 — Write the changelog

Dry run, show the output to the operator, then write:

```bash
python3 atlas/write_changelog.py --items verified.yaml --rollout rollout.json
python3 atlas/write_changelog.py --items verified.yaml --rollout rollout.json --write
```

If the script reports "No Atlas items to publish for this release.",
tell the operator and stop. For any other error, report it and stop.

## Step 8 — Validate and report

```bash
python3 common/validation.py check-output --input verified.yaml \
    --rst ../../../content/atlas/source/includes/changelog/fts-vs-{YYYY}.rst
```

Atlas bullets carry no `.. warning::` admonition, so the rollback check
fails whenever an included item has rollback risk. Report that result
to the operator with the item, and do not add an admonition.

Then run `./lint-docs.sh all` on the edited files from the repo root and
report the results, including the checklist and any failures, before
asking whether to commit.

## Hard rules

- The changelog date is the rollout date. Never use the tag date or the
  planned date.
- Do not publish items flagged for review without an operator decision.
- Do not publish self-managed-only items.
- Do not commit or push without explicit operator instruction.
