# assemble-version-release-notes

## Purpose

Assemble the per-version RST include file for a single mongot release
from the collection of RST rows produced by the writing skills, then
update `release-notes.txt` to reference it.

This skill runs as the final assembly step in `flow.md`. The
orchestrator has already:
1. Run all items through writing skills.
2. Verified that every input item produced exactly one output row.

## Inputs

| Input | Description |
|---|---|
| `version` | Semver string (e.g. `1.71.0`) |
| `release_date` | ISO date (e.g. `2026-07-15`) |
| `docs_version_branch` | `current` (default) or `upcoming` |
| `feature_rows` | List of RST rows from `write-feature-entry` |
| `fix_rows` | List of RST rows from `write-bug-entry` |
| `compatibility_rows` | List of RST rows from `write-compatibility-entry` |

If any row list is empty, omit its section entirely from the output.

## Output paths

Derive these from `version`, `release_date`, and `docs_version_branch`:

```
INCLUDE_FILE:
  content/self-managed-search/{docs_version_branch}/source/includes/
  changelogs/{YYYY}/v{VERSION_SLUG}.rst

RELEASE_NOTES_PAGE:
  content/self-managed-search/{docs_version_branch}/source/release-notes.txt
```

Where:
- `{YYYY}` = year from `release_date` (e.g. `2026`)
- `{VERSION_SLUG}` = version with `.` replaced by `-` (e.g. `1-71-0`)

## Step 1 — Build the include file

### Preamble

Do not write a preamble that summarizes the full release range. The
existing `v1-70-0.rst` starts with such a preamble because it covers
the GA launch (preview → GA). Subsequent per-patch releases should not
repeat it. For any version after 1.70.1, begin directly with the first
section heading.

Note: release notes always target `current` by default. Only write to
`upcoming` when the operator explicitly requests it.

Exception: if the orchestrator explicitly indicates this release covers
a major milestone (e.g., a new minor version GA), ask the writer
whether a preamble is needed before generating one.

### Section order and headings

Always write sections in this order, skipping any that have no rows:

1. `New Features and Improvements`
2. `Bug Fixes`
3. `Compatibility Notes`

Use this exact RST heading style (tilde underline):

```rst
New Features and Improvements
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
```

### List-table structure

Each section that has rows uses a `.. list-table::` with these exact
attributes:

```rst
.. list-table::
   :header-rows: 1
   :widths: 70 15 15

   * - Description
     - Available in Community Edition
     - Available in Enterprise Advanced

   {rows}
```

Indent the `* -` rows 3 spaces inside the directive. Each row ends with
a blank line before the next `* -`.

### Inserting rows

Paste each RST row from the writing skills exactly as received.
Do not reformat or re-wrap rows — the writing skills have already applied
the 72-character line limit and correct indentation.

### Blank lines

- One blank line between the section heading and the list-table
  directive.
- One blank line between the list-table directive and the first `* -`.
- One blank line between successive `* -` rows.
- One blank line after the last row before the next section heading
  (or end of file).

## Step 2 — Validate count before writing

Before writing the file:
1. Count the feature rows received.
2. Count the fix rows received.
3. Count the compatibility rows received.
4. Confirm the total matches the verified item count from the
   orchestrator.

If the counts do not match, report the discrepancy and stop. Do not
write a partial file.

## Step 3 — Write the include file

Write the assembled RST to `INCLUDE_FILE`. Create the year directory
(`{YYYY}/`) if it does not already exist.

After writing, read the file back and confirm:
- The file is valid RST (no unclosed directives).
- All section headings that have rows are present.
- The `|checkmark|` substitution appears only in cell content, not in
  headings or table headers.

## Step 4 — Update release-notes.txt

Read `RELEASE_NOTES_PAGE`. Perform three targeted replacements:

### 4a. Update the version heading

Find the existing `mongot vX.Y.Z` heading line and replace it with:

```rst
mongot v{version}
-----------------
```

The heading underline must be exactly as many `-` characters as the
heading text (including `mongot v` prefix).

### 4b. Update the release date

Find the line starting with `**Release date**:` and replace the date
portion:

```rst
**Release date**: {release_date formatted as "Month D, YYYY"}
```

Format the date from ISO (`2026-07-15`) to `July 15, 2026`.

### 4c. Update the include directive

Find the existing `.. include::` directive line and replace it:

```rst
.. include:: /includes/changelogs/{YYYY}/v{VERSION_SLUG}.rst
```

Do all three replacements as minimal targeted edits. Do not rewrite
the rest of the page.

## Step 5 — Final validation checklist

After writing both files, verify:

- [ ] Include file exists at the expected path
- [ ] `release-notes.txt` heading shows `mongot v{version}`
- [ ] `release-notes.txt` date shows the formatted `release_date`
- [ ] `release-notes.txt` include directive points to the new file
- [ ] Number of `* -` entries in the include file equals the verified
      item count
- [ ] No section heading appears in the file without at least one row
      below it
- [ ] No internal identifiers (ticket IDs, commit hashes) appear in
      any row

Report the checklist result to the orchestrator before declaring
completion.

## RST formatting reference

These rules apply throughout the assembled output:

- Lines wrap at 72 characters.
- Monospace (double backtick) for config keys, paths, commands, and
  code identifiers: ``mongot``, ``syncSource.replicaSet.x509``,
  ``$vectorSearch``.
- Bold for titles (inside cells): `**Title text.**`
- Do not use RST anonymous hyperlinks or footnote references in the
  include file.
- Preserve `|checkmark|` substitution as-is — do not expand it.

## Example assembled output (abbreviated)

```rst
New Features and Improvements
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. list-table::
   :header-rows: 1
   :widths: 70 15 15

   * - Description
     - Available in Community Edition
     - Available in Enterprise Advanced

   * - **Nested vector search.** ``$vectorSearch`` now supports
       querying vector fields embedded inside nested document
       arrays. *Introduced in v1.71.0.*
     - |checkmark|
     - |checkmark|

Bug Fixes
~~~~~~~~~

.. list-table::
   :header-rows: 1
   :widths: 70 15 15

   * - Description
     - Available in Community Edition
     - Available in Enterprise Advanced

   * - **Stale system metrics.** System metrics reported through
       the Prometheus endpoint could become stale after extended
       uptime. The metrics collection loop is now correctly reset
       on each scrape cycle. *Fixed in v1.71.0.*
     - |checkmark|
     - |checkmark|
```
