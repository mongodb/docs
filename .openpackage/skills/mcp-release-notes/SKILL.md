---
name: mcp-release-notes
internal: true
description: Draft MongoDB MCP Server release notes for a new version by fetching the corresponding release from mongodb-js/mongodb-mcp-server and formatting them for the docs. Use when asked to draft or create Local MCP Server release notes. Does not cover Remote MCP Server release notes.
allowed-tools: Read, Grep, Glob, Agent, Edit
argument-hint: "[version] e.g. 1.9.0"
---

# Draft MCP Server Release Notes for $ARGUMENTS

This skill updates only the Local MCP Server release notes page. If the writer asks for Remote MCP Server release notes (`content/mcp-server/source/remote-mcp/release-notes.txt`), stop and tell them this skill does not cover that page.

Follow the workflow defined in `.claude/skills/release-notes-base/SKILL.md`, substituting the following values:

| Placeholder              | Value                                                                                                                                                                                                        |
|--------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `{VERSION}`              | `$ARGUMENTS`                                                                                                                                                                                                 |
| `{GITHUB_REPO}`          | `mongodb-js/mongodb-mcp-server`                                                                                                                                                                              |
| `{RELEASE_NOTES_FILE}`   | `content/mcp-server/source/local-mcp/release-notes.txt`                                                                                                                                                     |
| `{PRODUCT_SUBSTITUTION}` | bare version number only (e.g. `1.9.0`) — no substitution constant, no `v` prefix                                                                                                                           |
| `{VERSION_KEY}`          | N/A — `content/mcp-server/snooty.toml` has no version key; skip step 6                                                                                                                                      |
| `{SNOOTY_TOML}`          | N/A                                                                                                                                                                                                          |
| `{CHANGELOG_LINK}`       | Multi-line inline RST hyperlink — see `.claude/skills/mcp-release-notes/references/rst-formatting.md` for the exact format |

## Format overrides

These rules override the shared defaults in `release-notes-base`. For RST formatting (heading style, changelog link), read `.claude/skills/mcp-release-notes/references/rst-formatting.md`.

- **Section labels:** before drafting, ask the writer which section labels to use. Present the following options and allow free input:
  - `New features and updates:`
  - `Bug fixes:`
  - A custom label the writer provides
- Omit a section entirely if it has no entries. If the release has both new features and bug fixes, confirm whether to use both sections or combine them under a single label.
