---
name: compass-release-notes
description: Draft Compass release notes for a new version by fetching the corresponding release from mongodb-js/compass and formatting them for the docs. Use when asked to draft or create Compass release notes.
allowed-tools: Read, Grep, Glob, Agent, Edit
argument-hint: [version] e.g. 1.49.5
---

# Draft Compass Release Notes for $ARGUMENTS

Follow the workflow defined in `.claude/skills/release-notes-base/SKILL.md`, substituting the following values:

| Placeholder              | Value                                                                                                      |
|--------------------------|------------------------------------------------------------------------------------------------------------|
| `{VERSION}`              | `$ARGUMENTS`                                                                                               |
| `{GITHUB_REPO}`          | `mongodb-js/compass`                                                                                       |
| `{RELEASE_NOTES_FILE}`   | `content/compass/source/release-notes.txt`                                                                 |
| `{PRODUCT_SUBSTITUTION}` | `\|compass\|` (substitution constant — never use the literal word "Compass" in the heading)                |
| `{VERSION_KEY}`          | `current-version`                                                                                          |
| `{SNOOTY_TOML}`          | `content/compass/snooty.toml`                                                                              |
| `{CHANGELOG_LINK}`       | GitHub compare link: `https://github.com/mongodb-js/compass/compare/vX.Y.Z-1...vX.Y.Z`                    |
