# Atlas Release Notes Agent

Generates the monthly Atlas changelog by pulling features from Aha! and JIRA,
writing RST entries, and updating the changelog file.

## When to run

Once per month, after the release cutoff. Typical cadence is the last week of
the month. The agent collects everything shipped between `start_date` and
`end_date` and appends it to the current year's changelog.

## Prerequisites

Before running, confirm you have:

1. **`AHA_API_TOKEN`** set as an environment variable
   ```bash
   export AHA_API_TOKEN=your_token_here
   ```

2. **JIRA MCP** configured in Claude Code (`mcp-atlassian`)

3. **Python 3** with `requests` installed
   ```bash
   pip install requests
   ```

4. **Claude Code** open in the `docs-mongodb-internal` repo root

## How to run

Start a new Claude Code conversation and paste the following prompt, filling in
the three values:

```
run .github/agents/atlas-release-notes/flow.md. this is for an upcoming release.
start date is YYYY-MM-DD, end date is YYYY-MM-DD, version is vYYYYMMDD
```

**Example:**
```
run .github/agents/atlas-release-notes/flow.md. this is for an upcoming release.
start date is 2026-03-04, end date is 2026-03-25, version is v20260325
```

The `version` value must match the `fixVersion` used in JIRA for the release
(e.g., `v20260325`).

## What the agent does

1. Fetches all Atlas features from Aha! in the date range
2. Fetches JIRA stories with `Documentation Changes = Needed` for the release version
3. Applies verification criteria — only includes features that are Shipped, Ready
   to Ship, or have `risk_status = Complete`
4. Writes an RST entry for each verified feature
5. Assembles all entries into a monthly section
6. Appends to (or creates) the month's section in
   `content/atlas/source/includes/changelog/atlas-{YYYY}.rst`

## What the agent produces

After writing the changelog, the agent outputs:

### 1. DRI confirmation table
Two tables — verified features and flagged features — for SME sign-off before
publishing. Review these and follow up with DRIs on flagged items.

### 2. JIRA copy-paste block
A pre-formatted table for pasting into the release tracking ticket to request
DRI sign-off. Uses JIRA wiki markup (`h3.`, `||`, `**`).

## Reviewing the output

- **Verified ✅** features are written to the changelog automatically
- **Flagged ⚠️** features were excluded — review with DRIs to determine if any
  should be added manually
- Check the RST diff before committing:
  ```bash
  git diff content/atlas/source/includes/changelog/
  ```

## File map

| File | Purpose |
|------|---------|
| `flow.md` | Main agent instruction file — do not edit unless changing the process |
| `fetch_aha_features.py` | Script that pulls features from the Aha! pivot table |
| `fetch-aha-features.skill.md` | Instructions for running the fetch script |
| `write-feature-entry.skill.md` | Rules for writing a single RST feature entry |
| `assemble-release-notes.skill.md` | Rules for assembling entries into a monthly RST section |
| `write-bug-entry.skill.md` | Not used — bug fixes are not published in the changelog |

## Changelog location

```
content/atlas/source/includes/changelog/atlas-{YYYY}.rst
```

A new file is created automatically by the agent at the start of each calendar
year when no file exists yet. Monthly sections use the format:

```rst
.. _atlas_2026_03:

March 2026
----------

- Adds ...
- Introduces ...
```
