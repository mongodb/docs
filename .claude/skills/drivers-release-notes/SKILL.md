---
name: drivers-release-notes
description: Draft MongoDB drivers release notes for a new version by fetching the corresponding release from the driver source code and adding them to the documentation. Use when asked to create release notes or What's New sections for the drivers and frameworks listed in the Workflow section.
argument-hint: "<driver> <version> e.g. pymongo 4.10.1"
---

## Workflow

This skill writes release notes for the following drivers and frameworks: C++, C, C#, Django MongoDB Backend, Hibernate, JVM (which includes Java Sync, Java Reactive Streams, Kotlin Sync, Kotlin Coroutine, Scala), Go, JavaScript (Node.js), Laravel MongoDB, Spark Connector, Entity Framework, C# Analyzer, Ruby, Rust, PyMongo, PyMongoArrow, PHP, and Mongoid. The driver and version are provided by the user. If not provided, ask the user to specify these values; do not guess or provide suggested values. If you receive a driver name that is not in the list, ask for clarification. 

*Note:* Do not use the `release-notes-base` workflow, which only applies to unversioned products. This workflow is for versioned drivers that require changes made in an `upcoming` branch and then backported.

## Prerequisites

- User must have `gh` CLI installed and authenticated.
- Look up the specified driver in the table below and read only that file before beginning. Do not read other driver files.
- RST templates for all formatting patterns are in `references/docs-templates.md`. Use these when drafting entries.

| Driver | Reference file |
|---|---|
| C++ | `references/cpp.md` |
| C | `references/c.md` |
| C# | `references/csharp.md` |
| Django MongoDB Backend | `references/django.md` |
| JVM (Java Sync, Java Reactive Streams, Kotlin Sync, Kotlin Coroutine, Scala) | `references/jvm.md` |
| Go | `references/go.md` |
| Node.js | `references/node.md` |
| Laravel MongoDB | `references/laravel.md` |
| Spark Connector | `references/spark.md` |
| Entity Framework | `references/entity-framework.md` |
| C# Analyzer | `references/csharp-analyzer.md` |
| Ruby | `references/ruby.md` |
| Rust | `references/rust.md` |
| PyMongo | `references/pymongo.md` |
| PyMongoArrow | `references/pymongo-arrow.md` |
| PHP | `references/php.md` |
| Hibernate | n/a - Do not add release notes to the docs. Exit and inform the user that no changes are needed. |
| Mongoid | `references/mongoid.md` |

## Placeholders

| Placeholder | Value |
|---|---|
| `{VERSION}` | `$ARGUMENTS` |
| `{FULL_VERSION}` | If `{VERSION}` is a patch version (e.g. X.Y.Z), use the same value. If `{VERSION}` is a major or minor version (e.g. X.Y), append `.0` to the version (e.g. X.Y.0). |
| `{GITHUB_REPO}` | Driver specific. See the driver reference file. |
| `{RELEASE_NOTES_FILE}` | Driver specific. See the driver reference file. |
| `{CHANGELOG_LINK}` | Driver specific. See the driver reference file. |
| `{UPGRADE_REF}` | Driver specific. See the driver reference file. |

### 1. Fetch release notes from GitHub

Use the Agent tool (subagent_type: Explore) to fetch the release notes from the `{GITHUB_REPO}` GitHub repository. Return the full list of changes.
If this returns an error, the release notes might not exist. In that case, stop and tell the user that the release information is not available.

### 2. Read the existing release notes for formatting reference

Read the first 60 lines of `{RELEASE_NOTES_FILE}` to confirm the exact heading style, section labels, issue reference format, and changelog link format used by this product before drafting. 

### 3. Check the changes for embargoed terms

Use Glean to fetch the Embargoed Features List from the internal wiki (https://wiki.corp.mongodb.com/pages/viewpage.action?pageId=560136334) and return every embargoed feature name and its aliases. The page is internal to MongoDB, so instruct the subagent to read it with Glean.

Scan the change list fetched in step 1 for any embargoed feature name or alias, matching case-insensitively and including aliases.

If any change matches an embargoed term, **stop before drafting**: report the matching term and the affected changes to the writer, then ask how to proceed. Do not draft, include, or publish any release note that references an embargoed feature until the writer confirms the embargo is lifted.

If no change matches, continue to the next step.

### 4. Draft the new release notes entry

Format the new entry to match the conventions observed in step 2 and the additional instructions listed for the driver in the driver reference file. Insert the entry in the correct version-sorted position (newest version first). Do not assume the new entry belongs at the top — scan the existing headings to find where `{VERSION}` falls relative to other versions and insert it there, with a blank line separating it from the entry above and below. For example, see the **Standard Entry Format** in `references/docs-templates.md`.

#### Shared rules

- Before making changes, ask the user if they want to create a new branch for the changes. If yes, request the ticket number and create a new branch named `DOCSP-<ticket number>-release-notes`. If no, proceed to the next step.
- The section for the specified version might already exist. In that case, ensure that all the items fetched from GitHub are present in the existing section. If not, add the missing items. If all items are present, instruct the user that the release notes are already complete and move to the next step.
- Some drivers, such as C# and Ruby, include an `_upcoming-breaking-changes:` ref anchor immediately preceding the newest release notes section. If so, ensure that you move the ref anchor so it's above the section for the version you are adding.
- See the **Formatting Rules** section in `references/docs-templates.md` for heading underline and line-length rules.
- Convert PR-style commit messages from the source code release notes into clean sentence or noun-phrase descriptions. Drop JIRA ticket prefixes like `PHPLIB-1714:` — extract only the meaningful description. Add detail to the description by retrieving additional context about the change in the linked ticket or PR.
- Use the `{VERSION}` value for the heading (e.g. `What's New in {VERSION}`). The driver reference file includes instructions for determining the correct heading format for the driver.
- At the bottom of the section, add a link to the changelog in the driver source code by using the `{CHANGELOG_LINK}`. Use this syntax: "To learn more about this release, see the
:github:`v{VERSION} Release Notes <{CHANGELOG_LINK}>` on GitHub."

### 5. Document breaking changes

A breaking change is a modification in a convention or behavior in a specific version of the driver that might prevent an application from working properly if not addressed before upgrading. If a driver has breaking changes, document them in the upgrade guide and add a warning admonition to the release notes - unless the driver-specific reference file states otherwise.

#### Breaking Changes Template

Use the templates in `references/docs-templates.md` when a driver has breaking changes. Follow the instructions in the driver reference file for the `{UPGRADE_REF}` value and for driver-specific overrides to the templates.

##### Release Notes Warning Admonition

If there are breaking changes, add the **Standard Breaking Changes Warning Admonition** from `references/docs-templates.md` immediately following the `What's New in {VERSION}` header.

##### Standard Upgrade Guide Section

Create a new section in the driver's upgrade guide under the Breaking Changes header using the **Standard Upgrade Guide Section** template from `references/docs-templates.md`.

#### Shared rules

- Do not duplicate entries from the release notes.
- Read the first 60 lines of the upgrade guide to see the format of each section.

### 6. Apply the changes to `current`

After modifying the release notes in `upcoming`, ask the user if they also want to apply the changes to the `current` version directory. The `current` directory is a sibling of `upcoming` under the same product's `content/` folder (e.g., `content/c-driver/current/`).
If yes, use `git diff` and `git apply` to make the same changes to `current`:

```bash
git diff HEAD -- {RELEASE_NOTES_FILE} | \
  sed 's|/upcoming/|/current/|g' | \
  git apply -
```

If `git apply` fails, report the error output to the user and ask how to proceed. Verify the result by reading the patched file before reporting completion.

### 7. Confirm completion

Report the file(s) changed and ask the user if they are ready to commit. Remind the user to complete the documentation version update, providing a link to https://wiki.corp.mongodb.com/spaces/DE/pages/201983140/How+To+Implement+Changes+for+Driver+Version+Updates, and request a technical review before publishing.
Remind the user that they can use the `version-update` command to update the documentation version if not already completed.

## Example — Node.js 7.0

| Placeholder | Resolved value |
|---|---|
| `{VERSION}` | `7.0` |
| `{FULL_VERSION}` | `7.0.0` |
| `{GITHUB_REPO}` | `mongodb/node-mongodb-native` |
| `{RELEASE_NOTES_FILE}` | `content/node/upcoming/source/reference/release-notes.txt` |
| `{CHANGELOG_LINK}` | `mongodb/node-mongodb-native/releases/tag/v7.0.0` |
| `{UPGRADE_REF}` | `node-breaking-changes-v7.0` |

For the finished RST output, see **Full Example: Node.js 7.0** in `references/docs-templates.md`.
