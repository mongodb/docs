# write-feature-entry

## Purpose

Write a single RST list-table row for a new feature or enhancement in
the self-managed Search (mongot) release notes include file.

This skill is invoked once per verified feature item by the
`flow.md` orchestrator. It receives a single YAML item block and
returns one complete RST `* -` row (without the table wrapper).

## Input

The orchestrator passes `version` (the current release, e.g. `1.71.0`)
and a YAML item block from `verified.yaml`. Every item in that file has
already passed the review gate in Step 3 of `flow.md`, so do not re-check
review status. Ignore `requires_manual_review`, `review_reasons`, and
`review_decision` if present; they record the review, not the item's
current state. The item has the following fields:

```yaml
type: feature
title: "<short descriptive title>"
description: "<full customer-facing description from the normalized item>"
source_url: "<GitHub release URL>"
source_kind: github_release
availability: both|enterprise
rollback_risk: false
aha_maturity: ga|preview|unknown
```

## Output format

A single RST list-table row. The row has exactly three cells:

1. **Description cell** — bold title, prose description, version tag.
2. **Community Edition cell** — `|checkmark|` or empty.
3. **Enterprise Advanced cell** — `|checkmark|` or empty.

The row must use this exact RST structure (indentation is 3 spaces
inside each `* -` / `  -` cell):

```rst
   * - **{BOLD_TITLE}** {PROSE_DESCRIPTION}
       {VERSION_TAG}
     - |checkmark|
     - |checkmark|
```

## Writing rules

### Title

- Format the bold title as `**{noun phrase}**` followed by a period.
- The title must be a noun phrase describing the capability, not an
  action (use "X.509 certificate authentication" not "Added X.509").
- Bold title ends immediately before the first space of the prose.
- Do not include the version number in the title.
- Maximum 80 characters for the bold title text (excluding `** **`).

### Prose description

- One to three sentences. Customer-facing only — no internal ticket IDs,
  no Jira references, no GitHub PR numbers in the output text.
- Present tense for behavior. Past tense is permitted only for "was
  upgraded" / "was updated" infrastructure items.
- Describe what the customer can do or what has changed, not how it
  was implemented internally.
- If `aha_maturity` is `preview`, append: `This feature is in Public
  Preview.`
- If `aha_maturity` is `ga`, append nothing — GA is the default.
- Wrap all lines at 72 characters. Continuation lines in the description
  cell are indented by 7 spaces (to align under the first character
  after `* - `).

### Version tag

- Place on the line immediately after the prose, with no blank line
  between them, or inline at the end of the last prose line if it fits
  within 72 characters.
- Format: `*Introduced in v{VERSION}.*`
- The version in the tag must match the `version` field provided by the
  orchestrator for the current release, not a version from the
  description source text.

### Availability cells

| `availability` value | Community cell | Enterprise cell |
|---|---|---|
| `both` | `\|checkmark\|` | `\|checkmark\|` |
| `enterprise` | *(empty — leave the cell blank)* | `\|checkmark\|` |
| `community` | `\|checkmark\|` | *(empty)* |

When `availability` is `enterprise`, start the prose description, after
the bold title, with `**Enterprise Only.** `.

### Rollback / reindex warning

If `rollback_risk` is `true`, add this warning block after the prose
and before the version tag, indented 7 spaces, with a blank line before
and after it:

```rst
       .. warning::

          Rolling back to a prior mongot version after upgrading
          requires re-indexing affected search indexes.
```

Use this exact text. Do not add commands or other recovery steps.

## Example output (availability: both, aha_maturity: ga)

Input item:
```yaml
type: feature
title: "Nested vector search"
description: "$vectorSearch now supports querying vector fields embedded inside nested document arrays. Define a nestedRoot path in the index definition to issue per-item similarity searches within arrays of sub-documents."
availability: both
aha_maturity: ga
rollback_risk: false
```

Output:
```rst
   * - **Nested vector search.** ``$vectorSearch`` now supports
       querying vector fields embedded inside nested document arrays.
       Define a ``nestedRoot`` path in the index definition to issue
       per-item similarity searches within arrays of sub-documents.
       *Introduced in v1.71.0.*
     - |checkmark|
     - |checkmark|
```

## Example output (availability: enterprise, aha_maturity: preview)

```rst
   * - **Automated field encryption for search indexes.**
       **Enterprise Only.** Search indexes now support automatic
       encryption of sensitive fields at the index level. This feature
       is in Public Preview.
       *Introduced in v1.71.0.*
     -
     - |checkmark|
```

## Do not

- Do not write the `.. list-table::` directive or header rows. The
  assembler adds those.
- Do not add section headings.
- Do not include any internal identifiers (ticket IDs, commit hashes,
  PR numbers) in the output RST.
- Do not guess the version. Use the `version` value passed by the
  orchestrator.
- Do not silently default `aha_maturity: unknown` to GA. Only when the
  `aha_maturity` field value is `unknown`, stop and return
  `REVIEW_REQUIRED: <title>`. When it is `ga` or `preview`, use it.
