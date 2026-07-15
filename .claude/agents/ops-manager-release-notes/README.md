# Ops Manager Release Notes Agent

Generates a versioned Ops Manager patch release entry by pulling improvements and bug fixes from Aha! and Jira, writing RST entries, and prepending to the changelog file.

## When to run

Once per patch release. The agent collects everything shipped in the given Ops Manager patch version and prepends it to the active changelog file.

## Prerequisites

Before running, confirm you have:

1. **`AHA_API_TOKEN`** set as an environment variable
   ```bash
   export AHA_API_TOKEN=your_token_here
   ```

2. **Jira MCP** configured (`mcp-atlassian` or `devprod-mcp`)

3. **Python 3** with `requests` installed
   ```bash
   pip install requests
   ```

4. **Claude Code** (OpenCode) open in the `docs-mongodb-internal` repo root

## How to run

Start a new conversation and paste the following prompt, filling in the two values:

```
run .claude/agents/ops-manager-release-notes/flow.md
version is X.Y.Z, release date is YYYY-MM-DD
```

**Example:**
```
run .claude/agents/ops-manager-release-notes/flow.md
version is 8.0.25, release date is 2026-07-15
```

The `version` value must match the patch number used in Jira as the `fixVersion` (e.g., `ops-manager-8.0.25`).

## What the agent does

1. Fetches Ops Manager features from Aha! (include-list filter)
2. Fetches all Jira CLOUDP tickets for the fix version with the `Release Notes` field populated
3. Looks up the MongoDB Agent version from the agent changelog
4. Looks up the database tools version from the 10gen/ops-manager repo
5. Writes RST entries for improvements (Aha! + Jira stories) and bug fixes
6. Assembles the complete versioned RST block
7. Prepends it to `changelog-onprem-v{X.Y}.rst`
8. Optionally prepends a stub to `changelog-mongodb-agent-onprem-v{X.Y}.rst`

## What the agent produces

After writing the changelog, the agent outputs:

### 1. Written RST block
The complete entry as written to disk.

### 2. DRI confirmation table
Verified ✅ and Flagged ⚠️ tables covering all Aha! and Jira items, with Jira keys and DRI column, for SME sign-off before publishing.

### 3. Jira copy-paste block
A pre-formatted wiki-markup table for pasting into the release tracking ticket to request DRI sign-off.

### 4. Warnings
Explicit warnings if the MongoDB Agent version or database tools version could not be confirmed.

## Reviewing the output

- **Verified ✅** features and fixes are written to the changelog automatically
- **Flagged ⚠️** items were excluded — review with DRIs to decide whether any should be added manually
- Check the RST diff before committing:
  ```bash
  git diff content/ops-manager/current/source/release-notes/changelogs/
  ```

## File map

| File | Purpose |
|------|---------|
| `flow.md` | Main agent instruction file — do not edit unless changing the process |
| `fetch_aha_features.py` | Script that pulls features from the Aha! pivot table |
| `fetch-aha-features.skill.md` | Instructions for running the fetch script |
| `write-improvement-entry.skill.md` | Rules for writing a single RST improvement entry |
| `write-bug-entry.skill.md` | Rules for writing a single RST bug fix entry |
| `assemble-release-entry.skill.md` | Rules for assembling entries into a versioned RST block |

## Changelog locations

```
content/ops-manager/current/source/release-notes/changelogs/ops-manager/changelog-onprem-v{X.Y}.rst
content/ops-manager/current/source/release-notes/changelogs/mongodb-agent/changelog-mongodb-agent-onprem-v{X.Y}.rst
```
