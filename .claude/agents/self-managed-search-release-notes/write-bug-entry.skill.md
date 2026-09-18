# write-bug-entry

## Purpose

Write a single RST list-table row for a bug fix in the self-managed
Search (mongot) release notes include file.

This skill is invoked once per verified fix item by the `flow.md`
orchestrator. It receives a single YAML item block and returns one
complete RST `* -` row (without the table wrapper).

## Input

A YAML block with the following fields:

```yaml
type: fix
title: "<short descriptive title of the bug>"
description: "<full description of the fix and its customer impact>"
source_url: "<GitHub release URL>"
source_kind: github_release
availability: both|enterprise
rollback_risk: false
aha_maturity: unknown
requires_manual_review: false
```

If `requires_manual_review` is `true`, stop immediately and return:

```
REVIEW_REQUIRED: <title>
```

Do not write any RST.

## Output format

A single RST list-table row with exactly three cells:

1. **Description cell** — bold title (the bug/symptom), prose fix
   description, version tag.
2. **Community Edition cell** — `|checkmark|` or empty.
3. **Enterprise Advanced cell** — `|checkmark|` or empty.

```rst
   * - **{BOLD_TITLE}** {PROSE_DESCRIPTION}
       {VERSION_TAG}
     - |checkmark|
     - |checkmark|
```

## Writing rules

### Title

- Format as `**{noun phrase describing the symptom or component}**`
  followed by a period.
- Phrase the title from the user's perspective: what was broken,
  not what code was changed.
  - Good: `**Stale system metrics after extended uptime.**`
  - Bad: `**Fixed metrics collection loop reset.**`
- No version numbers in the title.
- Maximum 80 characters for the bold title text.

### Prose description

- One to three sentences describing:
  1. What symptom or incorrect behavior the customer could observe.
  2. What mongot now does correctly.
- Customer-facing language only. No internal ticket references, no
  GitHub PR numbers, no commit hashes.
- Past tense for what was broken; present tense for the corrected
  behavior.
  - Pattern: `"{X} could {wrong behavior}. {Component} now {correct behavior}."`
- Wrap all lines at 72 characters. Continuation lines indented 7 spaces.

### Version tag

- Format: `*Fixed in v{VERSION}.*`
- Place after the prose, on its own line or inline if the line stays
  within 72 characters.
- Use the `version` value provided by the orchestrator for the current
  release, not any version extracted from source text.

### Availability cells

| `availability` value | Community cell | Enterprise cell |
|---|---|---|
| `both` | `\|checkmark\|` | `\|checkmark\|` |
| `enterprise` | *(leave blank)* | `\|checkmark\|` |
| `community` | `\|checkmark\|` | *(leave blank)* |

When `availability` is `enterprise`, prepend the prose with
`**Enterprise Only.** `.

### Rollback / reindex note

If `rollback_risk` is `true`, append before the version tag:

> Rollback to a prior mongot version after applying this fix requires
> re-indexing affected search indexes.

## Example output (availability: both)

Input:
```yaml
type: fix
title: "Stale system metrics"
description: "System metrics reported through the Prometheus endpoint could become stale after extended uptime. The metrics collection loop is now correctly reset on each scrape cycle."
availability: both
rollback_risk: false
```

Output:
```rst
   * - **Stale system metrics.** System metrics reported through the
       Prometheus endpoint could become stale after extended uptime.
       The metrics collection loop is now correctly reset on each
       scrape cycle.
       *Fixed in v1.71.0.*
     - |checkmark|
     - |checkmark|
```

## Example output (grouped security dependency fix)

When the source item is a collection of dependency/CVE upgrades, write
them as a single entry with a list in the prose:

```rst
   * - **Security dependency upgrades.** Third-party libraries with
       known CVEs were updated: Netty upgraded to 4.1.145+, and
       Jackson upgraded to 2.19.0.
       *Fixed in v1.71.0.*
     - |checkmark|
     - |checkmark|
```

## Do not

- Do not write the `.. list-table::` directive or header rows.
- Do not add section headings.
- Do not include internal identifiers in output RST.
- Do not restate the title verbatim as the first sentence of the prose.
- Do not use phrases like "a bug was fixed" or "issue was resolved" —
  describe the symptom and the corrected behavior directly.
