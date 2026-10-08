---
name: atlas-cli-release
internal: true
description: "Draft release documentation for a new MongoDB Atlas CLI version: update the atlas-cli-version source constant and changelog, regenerate the CLI command docs, and update the backport and Netlify redirect configuration. Use when a new Atlas CLI version is released."
argument-hint: "[version, e.g. 1.50] [release-type: major|minor|patch] [DOCSP ticket, e.g. DOCSP-12345]"
---

# Document a New Atlas CLI Version

Draft the release documentation for a new MongoDB Atlas CLI version: update the version constant and changelog, regenerate the CLI command docs, and update the backport and Netlify redirect configuration.

## Inputs

Derive these values from `$ARGUMENTS` (or prompt the user for any that are missing):

- **New Atlas CLI version**: `<version, like 1.50>`
- **Release type**: `<major | minor | patch>` release
- **Release Notes JIRA ticket**: `<DOCSP-XXXXX>`
- **Former current version** (major/minor only): `<version, like v1.49>`

## Step 1: Create a branch

Create a new branch named after the release notes JIRA ticket key.

## Step 2: Research the release notes

- If `mcp-atlassian` is installed, read the release notes from the JIRA ticket in Inputs.
- If it is not installed, ask the user for the release note items, the ticket key, and the release date.
- The release date is the date the release ticket was created.

## Step 3: Update the version constant

In `content/atlas-cli/upcoming/snooty.toml`, change the value of the `atlas-cli-version` source constant to the new Atlas CLI version.

- **Patch release:** apply the same change to `content/atlas-cli/current/snooty.toml` — a patch does not create a new docs version, so both files must show the same version.
- **Major or minor release:** leave `current/snooty.toml` on the former version until the version is promoted.

## Step 4: Add the release notes

Add release notes for the new version to `content/atlas-cli/upcoming/source/atlas-cli-changelog.txt`, matching the format of the most recent entries and using the release ticket creation date as the release date.

- **Patch release:** apply the same change to `content/atlas-cli/current/source/atlas-cli-changelog.txt`.
- **Major or minor release:** touch only the `upcoming` changelog.

## Step 5: Generate the CLI command docs

Run `content/tools/atlas-cli-commands-toc/generate-cli-commands.ts`, passing the tag of the new Atlas CLI version as a parameter.

- **Patch release:** run the script as-is.
- **Major or minor release:** add the `--promote-version` option, using the former current version from Inputs.

## Step 6: Major/minor only — update backport and redirect configuration

Skip this step for patch releases.

1. Add the former current version to the `targetDirectoryChoices` array in `content/atlas-cli/.backportrc.json`.
2. Update `content/atlas-cli/netlify.toml` following the patterns in `references/netlify-redirects.md`.

## Step 7: Verify

- [ ] All version references are updated consistently (search for the former version to catch stragglers).
- [ ] The changelog entries follow the existing conventions.
- [ ] Redirect patterns follow the established structure (major/minor only).
- [ ] A copy review pass is done, keeping MongoDB documentation's best practices in mind.
