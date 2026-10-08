# Skill: assemble-release-notes

<description>
Combine feature entries into a complete RST release notes section for a calendar month.
</description>

<input>
month: string             # Full month name (e.g., "March")
year: string              # Four-digit year (e.g., "2026")
feature_entries:          # Array of RST entry strings from write-feature-entry
  - string
</input>

<output>
rst: string  # Complete RST section with anchor, title, and entries
</output>

<instructions>

## Step 1: Create Anchor

Format: `.. _atlas_{YYYY}_{MM}:`

Convert month name to zero-padded number (e.g., "March" → "03").

Example: March 2026 → `.. _atlas_2026_03:`

## Step 2: Create Title

Format: `{Month} {YYYY}`

- Full month name followed by year
- Underline with dashes, matching title length exactly

Example: `March 2026` (10 chars) → 10 dashes

## Step 3: Add Entries

1. Add blank line after title
2. Add each feature entry (already formatted with "- ")
3. Separate entries with a blank line

## Step 4: Final Formatting

- Ensure single blank line between entries
- Ensure entries preserve their line breaks
- End with two blank lines before next section

</instructions>

<examples>

<example name="features_only">
Input:
```yaml
month: "February"
year: "2026"
feature_entries:
  - |
    - Adds :ref:`Search nodes <search-nodes>` availability in {+aws+} Paris
      (eu-west-3) region.
  - "- Improves performance of |azure| clusters larger than 512 GB."
```

Output:
```yaml
rst: |
  .. _atlas_2026_02:

  February 2026
  -------------

  - Adds :ref:`Search nodes <search-nodes>` availability in {+aws+} Paris
    (eu-west-3) region.

  - Improves performance of |azure| clusters larger than 512 GB.

```
</example>

</examples>
