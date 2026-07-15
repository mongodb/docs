---
name: mongosh-release-notes
description: Draft MongoDB Shell (mongosh) release notes for a new version by fetching the corresponding release from mongodb-js/mongosh and formatting them for the docs. Use when asked to draft or create mongosh release notes.
allowed-tools: Read, Grep, Glob, Agent, Edit
argument-hint: "[version] e.g. 2.8.3"
---

# Draft mongosh Release Notes for $ARGUMENTS

Follow the workflow defined in `.claude/skills/release-notes-base/SKILL.md`, substituting the following values:

| Placeholder              | Value                                                                                                                                                                             |
|--------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `{VERSION}`              | `$ARGUMENTS`                                                                                                                                                                      |
| `{GITHUB_REPO}`          | `mongodb-js/mongosh`                                                                                                                                                              |
| `{RELEASE_NOTES_FILE}`   | `content/mongodb-shell/source/changelog.txt`                                                                                                                                      |
| `{PRODUCT_SUBSTITUTION}` | `v` prefix only (e.g. `v2.8.3`) — no substitution constant                                                                                                                       |
| `{VERSION_KEY}`          | `version`                                                                                                                                                                         |
| `{SNOOTY_TOML}`          | `content/mongodb-shell/snooty.toml`                                                                                                                                               |
| `{CHANGELOG_LINK}`       | JIRA link: `https://jira.mongodb.org/issues/?jql=project%20%3D%20MONGOSH%20AND%20fixVersion%20%3D%20X.Y.Z` (replace `X.Y.Z` with the version number, no `v` prefix in the URL)  |
