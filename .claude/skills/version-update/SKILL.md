---
name: version-update
description: "Create a new version of any versioned MongoDB documentation docset — drivers, providers, or product docsets. TRIGGER when: user says 'version update', 'bump the version', 'releasing vX.Y', or 'new version' for any docset."
---

You are creating a new version of a versioned MongoDB documentation docset.

## Example

**User:** "Bump csharp to 3.13, minor release"

1. Identifies `csharp` as a `standard_major` docset.
2. Reads `upcoming/snooty.toml`: `version-number = "3.12"` — confirms
   with user that 3.12 → 3.13 is correct.
3. Invokes the `drivers-release-notes` skill to write the C# 3.13
   release notes.
4. Dry-runs `version-bump.sh --docset csharp --type minor
   --new-version 3.13 --old-version 3.12` — shows planned ops, confirms
   with user.
5. Applies: deletes `current/`, copies `upcoming/` → `current/`,
   updates `netlify.toml` (adds VERSION CONSOLIDATION redirect for
   `v3.13` → `v3.x`).
6. Surfaces Hapley selector-label steps and remaining manual tasks.

## Step 1: Identify the Docset and Check Prerequisites

Prompt the user for a docset. This corresponds to one of the directories in
the `content/` directory. Confirm with the user if the input is ambiguous.

**If the docset is Atlas Architecture Center (`atlas-architecture`):** Read
`references/aac-workflow.md` and follow that process instead of these steps.

**If the docset is Server Manual (`manual`):** Read
`references/server-manual-prerequisites.md`. Stop and confirm with the user
that all prerequisites are met before proceeding. Before beginning each PR,
read the corresponding reference file:
- PR 2 → `references/server-manual-pr2.md`
- PR 3 → `references/server-manual-pr3.md`
- PR 4 → `references/server-manual-pr4.md`

Then determine the versioning model and locate version/release-notes details
using the docset reference table below.

**Models:**

- **standard_major**: `upcoming`, `current`, `vX.x` archive per major version.
- **per_minor**: `upcoming`, `current`, `vX.Y` archive per minor/major release.
- **atlas_cli**: like `per_minor`; `.backportrc.json` source = `upcoming` only.
- **mongosync**: `current` only (no `upcoming`); minor copies to `vX.Y` archive. Mongosync does not have a distinct major release process — if the user requests a major release, confirm with them that it follows the same steps as a minor release.
- **mongocli**: `upcoming` and `current` only; no archives; patch releases only.
- **skip**: dedicated workflow — see Step 1 above.

### Docset Reference

| Docset | Model | Version field(s) | Release notes path |
|---|---|---|---|
| Standard drivers [a] | `standard_major` | auto-detect (`version-number` or `version`) [b] | varies by driver — see [c] |
| spark-connector | `standard_major` | `current-version` | `upcoming/source/release-notes.txt` |
| MCK | `per_minor` | `version`, `dl-version` | `upcoming/source/release-notes.txt` |
| entity-framework | `per_minor` | `version-number`, `full-version` | `upcoming/source/release-notes.txt` |
| atlas-operator | `per_minor` | (none — use latest archive dir) | `upcoming/source/ak8so-changelog.txt` |
| kafka-connector | `per_minor` | `connector_version` | `upcoming/source/whats-new.txt` |
| atlas-cli | `atlas_cli` | `atlas-cli-version` | `upcoming/source/atlas-cli-changelog.txt` [d] |
| mongosync | `mongosync` | `version`, `version-previous`, `version-dev` | `current/source/release-notes/<version>.txt` [e] |
| mongocli | `mongocli` | `mcli-version` (both dirs) | `upcoming/` and `current/source/release-notes.txt` |
| manual | `skip` | `version-dev`, `release`, `current-minor-release` | `upcoming/source/release-notes/` (per-version; do not edit) |
| atlas-architecture | `skip` | — | — |

[a] c-driver, csharp, cpp-driver, golang, java, java-rs, kotlin,
    kotlin-sync, node, php-library, pymongo-driver, ruby-driver, rust,
    scala-driver. The
    docset table previously listed swift, terraform, and cloudformation
    here; those docsets are not in the monorepo.

[b] rust stores a full semver in `version` (e.g. `3.6.0`); strip the
    patch suffix when comparing against the X.Y-style values used by
    other drivers.

[c] Release notes paths by driver:
    - `upcoming/source/reference/release-notes.txt`: c-driver, csharp,
      golang, java, kotlin, node, pymongo-driver, ruby-driver, rust
    - `upcoming/source/reference/whats-new.txt`: cpp-driver, kotlin-sync
    - `upcoming/source/whats-new.txt`: java-rs, scala-driver
    - `upcoming/source/references/release-notes.txt` (plural
      `references/`): php-library

[d] Also update `atlas-local-changelog.txt` and `plugin-changelogs.txt`.

[e] Minor: new per-version file required; also update index at
    `current/source/release-notes.txt`.

## Step 2: Determine the Release Type and New Version Number

Prompt the user for whether this is a **major**, **minor**, or **patch**
version update.

**MongoCLI**: if the user requests a major or minor release, stop. MongoCLI
is patch-only in the monorepo — major and minor releases are not supported.
Inform the user and do not proceed.

Determine the current version by reading the version field for the docset
(see docset table in Step 1) from `current/snooty.toml`. Exception: for
Server Manual, read from `upcoming/snooty.toml`.

After reading the current version, verify it matches what the user described.
If there is a mismatch, stop and ask for clarification before proceeding.

Compute the new version:

- **Major release**: increment the major version, set minor and patch to `0`.
- **Minor release**: increment the minor version, set patch to `0`.
- **Patch release**: increment only the patch-bearing values.

If the docset tracks both a major/minor docs version and an exact patch (for
example Entity Framework uses `version-number = "10.0"` and
`full-version = "10.0.1"`), record both values before making changes.

**Entity Framework patch releases only**: confirm whether this patch targets
the current stable line (`current`) or a backport to an archived version. If a
backport, record the target directory as BACKPORT_DIR (for example, `v9.1`)
and use it in place of `upcoming` throughout Steps 3, 4, 7A, and 7B.

## Step 3: Check for Release Notes

Locate the release notes file using the path from the docset table in Step 1.
For Server Manual, do not create or modify **RELEASING** release notes files
automatically — those are writer-authored content. Surface
`upcoming/source/release-notes/` to the user. Creating `{NEXT}` stub files
(`{NEXT}.txt`, `{NEXT}-compatibility.txt`, `{NEXT}-changelog.txt`) is handled
in PR 3; those are structural stubs modeled on the `{RELEASING}` pages (title
+ `.. contents::` + `in-dev.rst` include) and may be created automatically at
that step.

Determine whether release notes are required:

- All major and minor releases: required.
- Patch releases: required only if the release notes recommend that users
  update immediately. Always required for Entity Framework and MongoCLI.

**Driver and framework docsets** (all docsets covered by the
`drivers-release-notes` skill — see that skill for the complete list):
invoke the `drivers-release-notes` skill via the Skill tool with
`{DRIVER_NAME} {NEW_VERSION}` as the argument (use the common driver
name, e.g. `PyMongo 4.17.0` or `Go 2.6.0`). When the skill asks
whether to create a new branch, answer no — the version-update branch
is already active. When the skill asks whether to apply changes to
`current`, answer no — version-update handles that in Step 5
(directory operations). After the sub-skill completes, continue to
Step 4 without waiting for further input.

Exception: for Entity Framework backport patches (BACKPORT_DIR set),
do not invoke the sub-skill. Set `RELEASE_NOTES_PENDING = true` and
include the BACKPORT_DIR path in the Step 11 reminder so the writer
can add notes to the correct archived directory.

**Kafka connector**: read `references/release-notes-sources.md` and
attempt to fetch automatically. If the fetch fails or no source exists,
set `RELEASE_NOTES_PENDING = true` and surface it in Step 11.

**AKO and MCK**: These docsets link to GitHub releases rather than
embedding content. If required, confirm the tag exists. If the tag
does not exist, ask the user whether to continue. If yes, set
`RELEASE_NOTES_PENDING = true` and proceed. If no, abort. If the tag
exists, insert a single link-only entry following the existing pattern
in the changelog file.

**Atlas CLI, MongoCLI, Mongosync, and Server Manual**: No GitHub
source — notes are written by the writer. Set
`RELEASE_NOTES_PENDING = true` and surface it in Step 11.

If the new version introduces breaking changes, the `drivers-release-notes`
sub-skill handles upgrade guide and admonition updates for driver docsets.
For other docsets, update the relevant upgrade page and link to it from the
release notes. Remove or update any breaking-change admonitions that no
longer apply after this release.

Continue to Step 4 without waiting for user input.

## Step 4: Update `snooty.toml`

**For all docsets except AKO, Server Manual, Atlas Architecture Center, and
Entity Framework backport patches**, run `version-bump.sh` to automate
Steps 4, 5, 6, and 7A (version arrays) in one pass.

First do a dry run and show the output to the user:

```bash
.claude/skills/version-update/assets/version-bump.sh \
  --docset {DOCSET} \
  --type {RELEASE_TYPE} \
  --new-version {NEW_VERSION} \
  --old-version {OLD_VERSION} \
  --dry-run
```

Confirm the dry-run output looks correct, then run without `--dry-run` to
apply. Review with `git diff`. Then skip to Step 7B.

**AKO**: no `snooty.toml` version constant and no script support. Follow
Steps 5 and 6 manually.

**Entity Framework backport (BACKPORT_DIR set)**: skip the script. Substitute
BACKPORT_DIR for `upcoming` throughout this step and Steps 7A and 7B.

**Server Manual and Atlas Architecture Center**: skip this section entirely —
those docsets have dedicated workflows (see Step 1).

Update all version-bearing constants. See Step 2 for field names by docset.

- **Major/minor releases**: update the major/minor docs version and reset any
  patch value to `.0`.
- **Patch releases**: update only patch-bearing values and any derived
  constants (API URLs, etc.).
- **MongoCLI**: update `mcli-version` in both `current/snooty.toml` and
  `upcoming/snooty.toml`.
- **Mongosync**: update `version` to the new version, `version-previous` to
  the old `version` value, and `version-dev` as appropriate.
- **AKO**: no version constant to update in `snooty.toml`.
- **Entity Framework backport (BACKPORT_DIR set)**: update
  `BACKPORT_DIR/snooty.toml` only.

## Step 5: Perform Directory Operations

**Patch release**: no directory changes for any docset.

**Minor release — standard versioned docsets**:
1. Delete the `current` directory.
2. Copy `upcoming` and rename the copy to `current`.

**Minor release — per-minor archive docsets (Entity Framework, Atlas CLI, AKO,
Kafka Connector, MCK)**:
1. Rename `current` to the previous exact released minor version.
2. Copy `upcoming` and rename the copy to `current`.

**Minor release — Mongosync**:
1. Copy `current` to `vX.xx` (the version being archived).
2. Continue working in `current` for the new release.

**Major release — standard versioned docsets**:
1. Rename `current` to `vX.x`, where `X` is the old major version.
2. Copy `upcoming` and rename the copy to `current`.

**Major release — per-minor archive docsets (Entity Framework, AKO, MCK)**:
1. Rename `current` to the previous exact released minor version.
2. Copy `upcoming` and rename the copy to `current`.

**MongoCLI**: no directory changes.

Never overwrite an existing archived directory without confirming with the
user.

## Step 6: Update `.backportrc.json`

Update `.backportrc.json` in the root of the docset when the release creates
a new archived directory. By default, add the newly archived directory to
both `sourceDirectoryChoices` and `targetDirectoryChoices`.

Exception — **Atlas CLI and MCK**: `sourceDirectoryChoices` is
`["content/{docset}/upcoming"]` only. Add the newly archived directory
to `targetDirectoryChoices` only; do not modify `sourceDirectoryChoices`.

- **Standard (per-major)**: major releases only.
- **Per-minor (Entity Framework, AKO, Kafka Connector, MCK, Atlas CLI)**:
  major and minor releases.
- **Mongosync**: every minor release (a new archive is always created).
- **MongoCLI**: no update — no archives are created.
- **Patch releases**: no update for any docset.

## Step 7A: Update Version Arrays

Read the **Version Arrays** section of `references/toc-updates.md` and apply
version array updates for this docset. Skip if no version array file exists
for the docset and inform the user.

## Step 7B: Update Docset Data Files

Read the **Docset Data** section of `references/toc-updates.md` and apply
docset data file updates for this docset. Skip any file that does not exist
for the docset and inform the user.

## Step 8: Update Redirects

For a **patch release**, skip this step.

For a **minor or major release**, the docset's redirects may live in one or
both of two formats. Detect which are present, then apply the matching
reference for **each** file that exists:

```bash
# Snooty/legacy format (sectioned TOML)
ls content/{DOCSET}/netlify.toml 2>/dev/null

# Next.js format (flat JSON), keyed by URL slug — confirm the slug from an
# existing entry; it is not always the docset directory name
ls platform/docs-nextjs/src/redirects/*-redirects.json 2>/dev/null
```

Routing:

- `netlify.toml` present → read `references/netlify-toml-updates.md` and
  apply the docset's section.
- `<slug>-redirects.json` present → read
  `references/nextjs-redirects-updates.md` and apply the docset's section.
- **Both** present (the expected state during the TOML→Next.js migration)
  → apply both, keeping the two files consistent.
- Neither present → stop and ask the user; do not invent a redirect file.

The Next.js redirect file lives under `platform/docs-nextjs/src/redirects/`,
outside `content/`. Editing it is expected here, but flag it as a
`platform/` change in the Step 11 change summary.

## Step 9: MongoCLI Submodule Update

**This step applies to MongoCLI only.** Skip for all other docsets.

MongoCLI registers the `mongocli` submodule in **both**
`content/mongocli/current/submodules/mongocli` and
`content/mongocli/upcoming/submodules/mongocli` (see `.gitmodules` at the
repo root). Update both — running the steps in `current/` only leaves
`upcoming/` pointing at the previous tag.

From the repo root:

```bash
git submodule update --init --recursive
```

Then, for each of `content/mongocli/current/submodules/mongocli` and
`content/mongocli/upcoming/submodules/mongocli`:

```bash
cd <submodule-path>
git checkout mongocli/v<newVersion>
cd -
```

If `git checkout` fails due to uncommitted changes in a submodule, run
`git stash` inside that submodule first, then retry.

After both checkouts, run `git status`. If either submodule pointer has
changed, commit both in a single commit:

```bash
git add content/mongocli/current/submodules/mongocli \
        content/mongocli/upcoming/submodules/mongocli
git commit -m "Set mongocli submodules to <newVersion>"
```

If `git status` shows no diff in the submodule, the autogenerated content is
unchanged — skip the commit.

## Step 10: Product-Specific Steps

Read `references/product-specific-steps.md` for manual tasks, compatibility
table updates, version constant cross-references, and docset-specific notes
for the current docset and release type.

## Step 11: Communicate Remaining Steps

Tell the user the remaining manual steps.

### Hapley

Read `references/hapley-updates.md` and surface the Hapley steps for this
docset and release type to the user. Hapley is a web UI — these are manual
steps the user must perform, not automated actions.

### Server Manual

If the docset is Server Manual, read `references/server-manual-manual-steps.md`
and surface all post-automation steps to the user.

### General steps

1. If `RELEASE_NOTES_PENDING = true` (set in Step 3): release notes
   could not be written automatically — they must be added manually
   before opening a PR. (Driver docsets are handled by the
   `drivers-release-notes` sub-skill in Step 3 and should not reach
   this step.)
2. Open a PR and get it approved. Call out the specific files that need review.
3. Merge the PR and confirm the new version is live on the website.
4. Backport changes from `upcoming` to `current` after merge (where
   applicable).
5. Check the deployed site for redirect correctness, release-notes visibility,
   and version switcher behavior.
