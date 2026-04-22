---
name: mcp-release-notes
description: Draft MongoDB MCP Server release notes for a new version by fetching the corresponding release from mongodb-js/mongodb-mcp-server and formatting them for the docs. Use when asked to draft or create MCP Server release notes.
allowed-tools: Read, Grep, Glob, Agent, Edit
argument-hint: [version] e.g. 1.9.0
---

# Draft MCP Server Release Notes for $ARGUMENTS

Follow the workflow defined in `.claude/skills/release-notes-base/SKILL.md`, substituting the following values:

| Placeholder              | Value                                                                                                                                                                                                        |
|--------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `{VERSION}`              | `$ARGUMENTS`                                                                                                                                                                                                 |
| `{GITHUB_REPO}`          | `mongodb-js/mongodb-mcp-server`                                                                                                                                                                              |
| `{RELEASE_NOTES_FILE}`   | `content/mcp-server/source/release-notes.txt`                                                                                                                                                               |
| `{PRODUCT_SUBSTITUTION}` | bare version number only (e.g. `1.9.0`) — no substitution constant, no `v` prefix                                                                                                                           |
| `{VERSION_KEY}`          | N/A — `content/mcp-server/snooty.toml` has no version key; skip step 4                                                                                                                                      |
| `{SNOOTY_TOML}`          | N/A                                                                                                                                                                                                          |
| `{CHANGELOG_LINK}`       | Multi-line inline RST hyperlink — see format overrides below for the exact format |

## Format overrides

These rules override the shared defaults in `release-notes-base`:

- **Heading:** bare version number (e.g. `1.9.0`), underlined with `-----`. Do not prefix with `v` or use a substitution constant.
- **Section labels:** before drafting, ask the writer which section labels to use. Present the following options and allow free input:
  - `New features and updates:`
  - `Bug Fixes:`
  - A custom label the writer provides
- Omit a section entirely if it has no entries. If the release has both new features and bug fixes, confirm whether to use both sections or combine them under a single label.
- **Changelog link:** place the inline RST hyperlink on its own line, immediately after the last bullet and before the next version heading. Use the exact format:

  ```
  `Full release notes available on GitHub
  <https://github.com/mongodb-js/mongodb-mcp-server/releases/tag/v{VERSION}>`__.
  ```
