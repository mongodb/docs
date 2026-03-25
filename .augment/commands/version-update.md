# Version Update Command

You are creating a new version of a docset.

## Step 1: Identify the Docset

Prompt the user for a docset. This corresponds to one of the directories in the
`content` directory. Confirm with the user that they wish to proceed with the docset they
have selected if they entered something ambiguous.

The subdirectories of the selected docset should have names like `upcoming`, `current`,
and `vX.x` (e.g., `v2.x`, `v3.x`). There is one directory per major version, not per minor version.

## Step 2: Determine the New Version Number

Prompt the user for whether this is a minor or major version update.

Determine the current version by reading the `version-number` field in `current/snooty.toml`. If the user has selected a major version update, the new version
number should increment the major version number and set the minor version number to 0. If the user has selected a minor version update, the new version number should increment the minor version number.

## Step 3: Check for Release Notes

Look for a release notes file at `<docset>/upcoming/source/reference/release-notes.txt` or similar.
If it exists, see if there are release notes available on GitHub for the
new driver version. If not, inform the user to add release notes for the new version.

## Step 4: Update upcoming/snooty.toml

Update the version variable in `upcoming/snooty.toml` to the new version number.
The variable name may vary (e.g., `version-number`, `version`), but it will contain the previous major/minor version of the docs. If the variable includes a patch version (e.g., `3.6.1`), reset it to `0` (e.g., `3.7.0`).

## Step 5: Perform Directory Operations

### For a MINOR version update:
1. Delete the `current` directory
2. Copy the `upcoming` directory and rename the copy to `current`

### For a MAJOR version update:
1. Rename the `current` directory to `vX.x` format (where X is the OLD major version).
   For example, if updating from v3.6 to v4.0, rename `current` to `v3.x`
2. Copy the `upcoming` directory and rename the copy to `current`

## Step 6: Update netlify.toml

### For a MINOR version update:
In the **VERSION CONSOLIDATION** section, add a redirect for the new minor version
pointing to the `vX.x` directory. For example, if updating C# from v3.5 to v3.6:

```toml
[[redirects]]
from = "/docs/drivers/csharp/v3.6/*"
to = "/docs/drivers/csharp/v3.x/:splat"
```

### For a MAJOR version update:
1. In the **ALIAS REDIRECTS** section, update the redirect to point the NEW major version
   alias to `current`. For example, if updating from v3.x to v4.0:

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

2. In the **VERSION CONSOLIDATION** section, add a redirect for the new version:
   ```toml
   [[redirects]]
   from = "/docs/drivers/csharp/v4.0/*"
   to = "/docs/drivers/csharp/v4.x/:splat"
   ```

3. In the **PAGE-LEVEL REDIRECTS** section, opy all redirects under the ## current
   heading. Paste them under a new heading that corresponds to the previous major
   version. In these redirects, change `current` to the previous major version:
   
   Change:
   ```toml
   ## current
   [[redirects]]
   from = "/docs/drivers/node/current/fundamentals/authentication/mechanisms/"
   to = "/docs/drivers/node/current/security/authentication/"
   ...
   ```

   To:
   ```toml
   ## current
   [[redirects]]
   from = "/docs/drivers/node/current/fundamentals/authentication/mechanisms/"
   to = "/docs/drivers/node/current/security/authentication/"
   ...

   #v1.x
   [[redirects]]
   from = "/docs/drivers/node/v1.x/fundamentals/authentication/mechanisms/"
   to = "/docs/drivers/node/v1.x/security/authentication/"
   ```

4. In the **CATCH ALLS** section, add a redirect for the new major version.

   Add:
   ```toml
   [[redirects]]
   from = "/docs/drivers/node/v2.x/*"
   to = "/docs/drivers/node/v2.x/:splat"
   status = 200
   ```

## Step 7: Update .backportrc.json (Major Updates Only)

For **major version updates only**, update the `.backportrc.json` file in the root of the docset.
Add the new `vX.x` directory (the one you just created from the old `current`) to both
`sourceDirectoryChoices` and `targetDirectoryChoices` arrays.

For example, if updating from v3.x to v4.0, add v3.x to both arrays as
shown in the following example:

```json
"sourceDirectoryChoices": [
  "content/csharp/upcoming",
  "content/csharp/current",
  "content/csharp/v3.x"
],
"targetDirectoryChoices": [
  "content/csharp/upcoming",
  "content/csharp/current",
  "content/csharp/v3.x"
]
```

## Step 8: Update Version Arrays (If Applicable)

Check the `content/table-of-contents/version-arrays` directory for a file matching the docset.
If one exists, add the new version number to the `allVersions` array and update the
`namedVersions` object with the new upcoming and current versions.

If no file exists for the docset, skip this step and let the user know.

## Step 9: Update Docset Data (If Applicable)

Check the `content/table-of-contents/docset-data` directory for a file
matching the docset. If one exists, update the file as needed, including
API documentation links and pages that are included only in upcoming
versions.

If no file exists for the docset, skip this step and let the user know.

## Step 10: Driver-Specific Steps (For Driver Docsets Only)

If the docset is a driver (e.g., csharp, go, java, node, python, ruby, cpp, php, scala, kotlin, rust, swift), perform the following additional checks:

### Check for Compatibility Tables
Look for compatibility files in `drivers/source/compatibility.txt` or within the docset's `source/` directory.
Inform the user to coordinate with the engineering team about any compatibility changes.

### Cross-Reference Version Constants (Major/Minor Only)
For certain drivers, update the version constant in `content/manual/upcoming/snooty.toml`:

| Driver | Constant to Update |
|--------|-------------------|
| C# | `csharp-driver-version` |
| Go | `go-api-docs` (major releases only) |
| Java/JVM | `java-driver-version` |

Search for and update these constants if they exist.

### Driver-Specific Manual Tasks
Inform the user of these driver-specific tasks that require manual attention:

- **C++**: Update the driver status table in `cpp-driver/upcoming/source/index.txt`
- **Node**: Check if `min-node-version` in `node/upcoming/snooty.toml` needs updating
- **Ruby**: Publish API docs (see wiki for instructions: https://wiki.corp.mongodb.com/spaces/DE/pages/314415368/Publishing+Ruby+Driver+Mongoid+API+Documentation)
- **JVM drivers (Java, Kotlin, Scala)**: Publish API docs via docs-java-other repo
- **Spark**: Update `spark-connector/upcoming/source/index.txt` if compatibility changes
- **All drivers**: Update upgrade pages if there are breaking changes

## Step 11: Communicate Remaining Steps

Tell the user the remaining manual steps:

### General Steps
1. Submit a PR and get it approved
2. Add the version to Hapley
3. Merge the PR and confirm that the new version is live on the website
4. Backport changes from `upcoming` to `current` if needed

### Driver-Specific Manual Steps (if applicable)
- Add release notes content for the new version
- Coordinate with engineering on compatibility table updates
- Update upgrade documentation if there are breaking changes
- Publish API docs (Ruby, JVM drivers)

Refer users to these links for more information:
- Driver-specific steps: https://wiki.corp.mongodb.com/spaces/DE/pages/201983140/How+To+Implement+Changes+for+Driver+Version+Updates
