---
name: release-notes-base
description: Shared workflow for drafting MongoDB docs release notes from a GitHub repo. Not invoked directly — referenced by tool-specific release notes skills.
user-invocable: false
---

# Release Notes Base Workflow

This skill defines the shared process for drafting release notes for open-source, unversioned MongoDB products where release data is available from GitHub. Tool-specific skills supply the values for the placeholders marked below.

> **Scope:** This workflow applies only to open-source products with public GitHub releases (e.g., Compass, mongosh, MongoDB MCP Server). It does not apply to closed-source products where a compiled change list cannot be fetched from GitHub, or to versioned products that require changes to be made in an `upcoming` branch and backported.

---

## Workflow

### 1. Fetch release notes from GitHub

Use the Agent tool (subagent_type: Explore) to fetch the release notes for the `{VERSION}` tag from the `{GITHUB_REPO}` GitHub repository. Return the full list of changes, grouped by new features and bug fixes.

### 2. Read the existing release notes for formatting reference

Read the first 60 lines of `{RELEASE_NOTES_FILE}` to confirm the exact heading style, section labels, issue reference format, and changelog link format used by this product before drafting.

### 3. Fetch the release date from GitHub

Use the `mcp__github__get_release_by_tag` tool to retrieve the release date. Split `{GITHUB_REPO}` into `owner` and `repo` (e.g., `mongodb-js/compass` → owner `mongodb-js`, repo `compass`). Pass `v{VERSION}` as the tag (prepend `v` if not already present).

Extract the `published_at` field and format it as `Month D, YYYY` (e.g., `March 11, 2026`). If the tool call fails or `published_at` is missing, use `TBD` as the placeholder and note it to the writer.

### 4. Draft the new release notes entry

Format the new entry to match the conventions observed in step 2, using the tool-specific overrides supplied by the calling skill. Insert the entry in the correct version-sorted position (newest version first). Do not assume the new entry belongs at the top — scan the existing headings to find where `{VERSION}` falls relative to other versions and insert it there, with a blank line separating it from the entry above and below. For example:

```
vX.Y.Z
------

*Released Month D, YYYY*

...

vX.Y.Z-1
---------
```

#### Shared rules (apply to all tools unless the calling skill overrides)

- Set the release date to `*Released <date from step 3>*`.
- The heading underline must exactly match the heading length. If the heading contains a substitution constant (e.g., `|compass|`), match the underline to the length of the raw RST source text, not the rendered word — check the existing headings in the file to confirm the expected underline length. If the heading uses a source constant (e.g., `{+mongosh+}`), match the underline to the length of the rendered text. 
- Convert PR-style commit messages into clean sentence or noun-phrase descriptions. Drop scope prefixes like `feat(connections):` or `fix(indexes):` — extract only the meaningful description.
- Preserve issue references for any ticket numbers present. Omit the reference if no ticket is listed.
- Wrap all lines at 72 characters. Break long list items with a 2-space continuation indent.
- Use the `{PRODUCT_SUBSTITUTION}` value for the heading (e.g. a substitution constant like `|compass|`, or a version prefix like `v`).
- Use the `{CHANGELOG_LINK}` template for the full changelog entry at the bottom of the section.

### 5. Ask about snooty.toml

After inserting the entry, ask the user: "Should I also update `{VERSION_KEY}` in `{SNOOTY_TOML}` to `{VERSION}`?"

If the user confirms, update that key's value in the file.

### 6. Confirm completion

Report the file(s) changed and ask the user if they are ready to commit. Remind the user to verify the release date with stakeholders prior to publishing.
