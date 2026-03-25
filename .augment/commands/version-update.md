# Version Update Command

You are creating a new version of a docset.

## Step 1: Identify the Docset

Prompt the user for a docset. This corresponds to one of the directories in the
`content` directory. Confirm with the user that they wish to proceed with the docset they
have selected if they entered something ambiguous.

Then determine which versioning model the docset uses:

- **Standard versioned docsets** use `upcoming`, `current`, and archived directories in
  `vX.x` format (for example, `v2.x`, `v3.x`). There is one directory per major version.
- **Entity Framework** uses `upcoming`, `current`, and archived directories in exact
  `vX.x` format where `X.x` is the previous released minor version (for example, `v9.0`,
  `v9.1`, `v10.0`). There is one directory per minor version.

## Step 2: Determine the Release Type and New Version Number

Prompt the user for whether this is a **major**, **minor**, or **patch** version update.

Determine the current version by reading the relevant version constants in
`current/snooty.toml`. Common fields include `version-number`, `version`, and sometimes a
patch-bearing field such as `full-version`.

Compute the new version as follows:

- **Major release**: increment the major version number, set the minor version number to
  `0`, and set the patch portion to `0` anywhere a full version is stored.
- **Minor release**: increment the minor version number and set the patch portion to `0`
  anywhere a full version is stored.
- **Patch release**: keep the major/minor docs version the same and increment only the
  patch-bearing values.

If the docset tracks both a major/minor docs version and an exact patch release, record
both values before making changes. For example, Entity Framework can use a value such as
`version-number = "10.0"` together with `full-version = "10.0.1"`.

## Step 3: Check for Release Notes

Look for a release notes file at `<docset>/upcoming/source/reference/release-notes.txt` or
similar.

If it exists, ensure that release notes are handled for the new version according to these
rules:

- **All major releases**: add release notes.
- **All minor releases**: add release notes.
- **Non-Entity Framework patch releases**: add release notes only if the release fixes a
  major bug or users should otherwise be clearly told to upgrade.
- **Entity Framework patch releases**: always add release notes.

If release notes are required but not yet available on GitHub or in the repo, tell the
user to add them.

If the new version introduces breaking changes, update the appropriate upgrade page for the
new version and link to that section from the release notes. If an older breaking-change
admonition is no longer relevant after the new release, remove or update it.

## Step 4: Update `upcoming/snooty.toml`

Update all relevant version-bearing constants in `upcoming/snooty.toml`. The field names
vary by docset and can include values such as `version-number`, `version`, `full-version`,
`api-root`, and related derived constants.

Use these rules:

- **Major/minor releases**: update the major/minor docs version and reset any patch-bearing
  value to `.0` unless the docset intentionally stores a different released patch.
- **Patch releases**: update only the patch-bearing values and any URLs or constants derived
  from them.
- **Entity Framework**: make sure patch-sensitive values such as `full-version` and the API
  docs URL remain aligned with the exact released version.

## Step 5: Perform Directory Operations

### For a PATCH release

Do not rename, delete, or copy version directories. Patch releases do not create a new
archived docs directory.

### For a MINOR release

#### Standard docsets

1. Delete the `current` directory.
2. Copy the `upcoming` directory and rename the copy to `current`.

#### Entity Framework

1. Rename the `current` directory to the previous exact released minor version, such as
   `v9.1`.
2. Copy the `upcoming` directory and rename the copy to `current`.

### For a MAJOR release

#### Standard docsets

1. Rename the `current` directory to `vX.x`, where `X` is the old major version.
   For example, if updating from `v3.6` to `v4.0`, rename `current` to `v3.x`.
2. Copy the `upcoming` directory and rename the copy to `current`.

#### Entity Framework

1. Rename the `current` directory to the previous exact released minor version.
   For example, if the current release line is `9.1` and you are adding `10.0`, rename
   `current` to `v9.1`.
2. Copy the `upcoming` directory and rename the copy to `current`.

Never overwrite an existing archived version directory without confirming with the user.

## Step 6: Update `netlify.toml`

Patch release behavior differs from major/minor release behavior.

### For a PATCH release

Do not update `netlify.toml`.

### For a MINOR or MAJOR release in standard docsets

#### Minor release

In the **VERSION CONSOLIDATION** section, add a redirect for the new minor version pointing
to the `vX.x` directory. For example, if updating C# from `v3.5` to `v3.6`:

```toml
[[redirects]]
from = "/docs/drivers/csharp/v3.6/*"
to = "/docs/drivers/csharp/v3.x/:splat"
```

#### Major release

1. In the **ALIAS REDIRECTS** section, update the redirect so the new major-version alias
   points to `current`. For example, if updating from `v3.x` to `v4.0`:

   Change:

   ```toml
   [[redirects]]
   from = "/docs/drivers/csharp/v3.x/*"
   to = "/docs/drivers/csharp/current/:splat"
   status = 302
   ```

   To:

   ```toml
   [[redirects]]
   from = "/docs/drivers/csharp/v4.x/*"
   to = "/docs/drivers/csharp/current/:splat"
   status = 302
   ```

2. In the **VERSION CONSOLIDATION** section, add a redirect for the new released version:

   ```toml
   [[redirects]]
   from = "/docs/drivers/csharp/v4.0/*"
   to = "/docs/drivers/csharp/v4.x/:splat"
   ```

3. In the **PAGE-LEVEL REDIRECTS** section, copy all redirects under the `## current`
   heading. Paste them under a new heading that corresponds to the previous major version.
   In these redirects, change `current` to the previous major version.

4. In the **CATCH ALLS** section, add a redirect for the new major version:
   ```toml
   [[redirects]]
   from = "/docs/drivers/node/v2.x/*"
   to = "/docs/drivers/node/v2.x/:splat"
   status = 200
   ```

### For a MINOR or MAJOR release in Entity Framework

Entity Framework uses exact released versions in `netlify.toml`, not consolidated `vX.x`
aliases for archived docs.

1. In the **ALIAS REDIRECTS** section, update the redirect that points to the `current`
   URL so that the `from` line uses the new exact released version.
2. In the **PAGE-LEVEL REDIRECTS** section, copy all redirects under the `## current`
   heading. Paste them under a new heading that corresponds to the previous exact released
   version. In those copied redirects, change `current` to the previous exact version.
   If any redirects are no longer needed for `current`, delete them.
3. In the **CATCH ALLS** section, add a redirect for the new exact released version.
4. Do **not** add a **VERSION CONSOLIDATION** redirect for Entity Framework unless the file
   already follows a different established pattern and the user explicitly asks you to
   preserve it.

Use the docset's existing URL base when editing examples. Standard drivers commonly use
`/docs/drivers/<docset>/...`, while Entity Framework uses `/docs/entity-framework/...`.

## Step 7: Update `.backportrc.json` (If Applicable)

Update the `.backportrc.json` file in the root of the docset when the release creates a new
archived docs directory.

- **Standard docsets**: update `.backportrc.json` for **major** releases only.
- **Entity Framework**: update `.backportrc.json` for **major and minor** releases.
- **Patch releases**: do not update `.backportrc.json`.

Add the new archived directory to both `sourceDirectoryChoices` and
`targetDirectoryChoices`.

For example, if updating from `v3.x` to `v4.0`, add `v3.x` to both arrays. For Entity
Framework, if updating from `9.0` to `9.1`, add `v9.0` to both arrays.

## Step 8: Update Version Arrays (If Applicable)

Check the `content/table-of-contents/version-arrays` tree for a file that matches the
docset or version family.

If one exists, update it according to the existing pattern:

- add the new released version to `allVersions` when that file tracks released versions
- update `namedVersions` so the latest appropriate version maps to `current`

For many driver docsets, this is needed primarily for **major** releases. For **patch**
releases, it is usually not needed.

If no file exists for the docset, skip this step and let the user know.

## Step 9: Update Docset Data (If Applicable)

Check the `content/table-of-contents/docset-data` directory for a file matching the docset.
If one exists, update the file as needed, including API documentation links and pages that
are included only in `upcoming` versions.

Pay special attention to these cases:

- **Entity Framework patch releases**: update the API Documentation link for the
  `current`/`upcoming` release to the new exact patch version.
- **Entity Framework major/minor releases**: add a new API Documentation entry for the
  archived version and update the `current`/`upcoming` API Documentation entry to the new
  exact version.
- **Other docsets**: update any release-sensitive links or version-gated items that follow
  the docset's existing pattern.

If no file exists for the docset, skip this step and let the user know.

## Step 10: Driver- and Provider-Specific Steps

If the docset is a driver or provider docset (for example, csharp, go, java, node, python,
ruby, cpp, php, scala, kotlin, rust, swift, or entity-framework), perform the following
additional checks:

### Check for Compatibility Tables

Look for compatibility files in `drivers/source/compatibility.txt` or within the docset's
`source/` directory.

For **major** and **minor** releases, coordinate with the engineering team about any
compatibility changes, including MongoDB Server, language/runtime, framework, or component
compatibility.

### Cross-Reference Version Constants

For certain drivers, update version constants in `content/manual/upcoming/snooty.toml` when
applicable:

| Driver / Provider  | Constant to Update      | Scope                 |
| ------------------ | ----------------------- | --------------------- |
| C#                 | `csharp-driver-version` | Major / Minor / Patch |
| Go                 | `go-api-docs`           | Major                 |
| Java / JVM drivers | `java-driver-version`   | Major / Minor         |

Search for and update these constants if they exist.

### Driver- and Provider-Specific Manual Tasks

Inform the user of these docset-specific tasks that require manual attention:

- **C++**: Update the driver status table in `cpp-driver/upcoming/source/index.txt`.
- **C#**: Update `content/manual/upcoming/snooty.toml` `csharp-driver-version` for patch
  releases as well as major/minor releases.
- **Entity Framework**:
  - Add release notes for all major, minor, and patch releases.
  - For patch releases, update the API Documentation link in the TOC to the new patch
    release.
  - For major and minor releases, add a new API Documentation entry in the TOC for the
    archived version and update the `current`/`upcoming` entry to the new release.
  - Update `.backportrc.json` for minor releases as well as major releases.
  - Archive the previous docs as an exact released minor version such as `v9.1`, not `v9.x`.
- **JVM drivers (Java, Kotlin, Scala)**:
  - Make sure shared content changes are applied across all relevant JVM docsets.
  - Publish the API docs via the `docs-java-other` repo for major and minor releases.
- **Node**: Check whether `min-node-version` in `node/upcoming/snooty.toml` needs updating
  when compatibility changes.
- **Ruby**: Publish API docs (see wiki for instructions:
  https://wiki.corp.mongodb.com/spaces/DE/pages/314415368/Publishing+Ruby+Driver+Mongoid+API+Documentation).
- **Spark**: Update `spark-connector/upcoming/source/index.txt` if compatibility changes.
- **All drivers/providers**: Update upgrade pages if there are breaking changes.

## Step 11: Communicate Remaining Steps

Tell the user the remaining manual steps.

### General Steps

1. Open a PR and get it approved. As a courtesy to reviewers, call out the specific files
   that need review.
2. Add the version to Hapley when required:
   - **Entity Framework**: add the version for **major and minor** releases.
   - **Non-Entity Framework docsets**: add the version for **major** releases.
   - **Patch releases**: usually no Hapley change is needed.
3. Merge the PR and confirm that the new version is live on the website.
4. Backport the changes from `upcoming` to `current` after the PR is merged.
5. Check the deployed site for redirect correctness, release-notes visibility, and version
   switcher behavior.

### Driver- and Provider-Specific Manual Steps (if applicable)

- Add release notes content for the new version if it has not already been added.
- Coordinate with engineering on compatibility table updates.
- Update upgrade documentation if there are breaking changes.
- Publish API docs where required (for example, Ruby and JVM drivers).

Refer users to these links for more information:

- Driver- and provider-specific steps:
  https://wiki.corp.mongodb.com/spaces/DE/pages/201983140/How+To+Implement+Changes+for+Driver+Version+Updates
