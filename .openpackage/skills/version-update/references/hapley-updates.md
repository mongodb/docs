# Hapley Updates

Load this file for Step 11. It documents the Hapley version selector
updates required for each docset and release type.

Hapley is the version management admin app at
[hapley.corp.mongodb.com](https://hapley.corp.mongodb.com). It manages
the version selector dropdowns for all MongoDB documentation properties.
All Hapley changes take effect immediately on save but are only reflected
in the deployed site after a re-deploy of all versions.

---

## Standard Drivers and Providers

Covers: csharp, cpp-driver, golang, java, java-rs, kotlin, kotlin-sync,
node, php-library, pymongo-driver, ruby-driver, rust, scala-driver,
swift, terraform, cloudformation.

**Patch release**: No Hapley changes.

**Minor release**: No Hapley changes. Minor versions fold into the
`vX.x` alias; the version selector does not change.

**Major release** (example: v3 → v4):

1. In Hapley, find the repository for the docset.
2. **Update the previous stable version** (the old `current`):
   1. Click the existing `current` entry (e.g., `v3.x (current)`).
   2. Click **Edit**.
   3. Change **Version Name** from `current` to the old major version
      alias (e.g., `v3.x`).
   4. Remove `(current)` from **Selector Label**.
   5. Toggle **Stable Branch** off.
   6. Remove `current` from **URL Aliases** and **URL Slug**; set URL
      Slug to the version alias (e.g., `v3.x`).
   7. Click **Update Document**.
3. **Create the new stable version**:
   1. Click **+ New Version**.
   2. Set **Version Name** to `current`.
   3. Set **Selector Label** to `vX.x (current)` (e.g., `v4.x
      (current)`).
   4. Toggle **Active** on and **Stable Branch** on.
   5. Click **+ Add a URL Alias** and add the new major version alias
      (e.g., `v4.x`).
   6. Set **URL Slug** to `current`.
   7. Click **Update Document**.
4. Verify the versions are in the correct order (newest first). Use the
   drag handles to reorder if needed.
5. Deploy all versions.

---

## Entity Framework

Entity Framework archives exact minor versions (e.g., `v10.0`, `v10.1`)
rather than per-major aliases. Hapley changes are required for **major
and minor** releases.

**Patch release**: No Hapley changes.

**Major or minor release** (example: v10.0 → v10.1):

Follow the same steps as **Standard Drivers — Major release** above,
substituting the exact minor version (e.g., `v10.0`) for the `vX.x`
alias in all steps.

---

## Atlas CLI

### Patch release

1. In Hapley, click **Docs Atlas CLI** in the left navigation.
2. Click the **current** branch entry → **Edit**.
3. Update **Selector Label** to reflect the new patch version (e.g.,
   `v1.54.1 (current)`). Only the `current` branch shows the patch
   version in the selector.
4. Do not add a new URL Alias for the patch number.
5. Click **Update Document**.
6. Deploy all versions.

### Minor or major release

1. In Hapley, click **Atlas CLI** in the left navigation.
2. **Update the `upcoming` entry**:
   1. Click the **upcoming** version → **Edit**.
   2. Update **Selector Label** and **URL Aliases** to reflect the new
      upcoming version (e.g., `v1.56`).
   3. Click **Update Document** → **Back to Docs Atlas CLI**.
3. **Update the `current` entry**:
   1. Click the **current** branch → **Edit**.
   2. Update **Selector Label** and **URL Aliases** to reflect the new
      current version. Include the patch version in the Selector Label
      (e.g., `v1.55.0 (current)`).
   3. Click **Update Document** → **Back to Docs Atlas CLI**.
4. **Add a new entry for the previous current version**:
   1. Click **New Version**.
   2. Set **Version Name**, **Selector Label**, and **URL Slug** to the
      old current version number (e.g., `v1.54`).
   3. Toggle **Active** on.
   4. Click **Update Document** → **Back to Docs Atlas CLI**.
   5. Drag the new entry to the correct position in the list (order
      reflects the dropdown order).
5. Deploy all versions.

---

## Atlas Kubernetes Operator (AKO)

**Patch release**: No Hapley changes.

**Minor or major release**: Add the new version to Hapley. The AKO wiki
does not document the exact steps; follow the general Hapley workflow at
https://wiki.corp.mongodb.com/spaces/DE/pages/124687567. The pattern
matches **Standard Drivers — Major release** above, using the exact
minor version number (e.g., `v2.14`) as the version alias.

---

## MongoDB Controllers for Kubernetes (MCK)

**Patch and minor release**: No Hapley changes. MCK only creates a new
docs version on major releases.

**Major release**: Follow the general Hapley workflow at
https://wiki.corp.mongodb.com/spaces/DE/pages/124687567. The MCK wiki
references the DOP "How To: Create a New Docs Version" page for the full
process. Use the new major version alias (e.g., `v2.x`) as the version
identifier.

---

## Kafka Connector

**Patch release**: No Hapley changes.

**Minor or major release**: Follow the **Standard Drivers — Major
release** steps above, using the exact minor version (e.g., `v2.1`)
rather than a `vX.x` alias. Kafka Connector archives per minor version.

---

## Spark Connector

**Patch and minor release**: No Hapley changes (minor versions fold into
the `vX.x` alias).

**Major release**: Follow the **Standard Drivers — Major release** steps
above using the new major version alias.

---

## Mongosync

Mongosync has no `upcoming` directory. The `current` branch always
points to the latest released version.

**Minor release** (example: v1.20 → v1.21):

1. In Hapley, go to the **Mongosync** project.
2. **Create a new branch** for the new released version:
   - Copy the configuration of the existing `current` branch but update
     all fields to reflect the new version (e.g., `v1.21`).
3. **Update the existing `current` entry** so it is no longer named
   `current` — rename it to the version it now represents (e.g.,
   `v1.20`).
4. Verify the branches are in the correct order top-to-bottom (this
   determines the dropdown order).
5. Changes only appear in the deployed site after a re-deploy.

---

## MongoCLI

MongoCLI is patch-only in the monorepo.

### Patch release

1. In Hapley, click **Docs MongoCLI** in the left navigation.
2. Click the **current** branch → **Edit**.
3. Update **Selector Label** to reflect the new patch version. Only the
   `current` branch shows the patch version in the selector. Do not add
   a URL Alias for the patch number.
4. Click **Update Document**.
5. Deploy all versions.

---

## Server Manual

The Server Manual Hapley update is a **post-merge, post-deploy** step
that requires coordination with DOP (Anabella) and Sarah Lin. Do not
perform this step autonomously — surface it in Step 11.

After the feature branch is merged and deployed:

1. Update the version selector in Hapley:
   - The `upcoming` entry's **Selector Label** should reflect the new
     upcoming version (e.g., `v8.3 (upcoming)`).
2. Take screenshots of all Hapley changes.
3. Send the screenshots to DOP (Anabella) for review.
4. Verify with Sarah Lin whether to archive the previous released version.
5. If archiving: mark the old version (e.g., `v8.1`) as inactive in
   Hapley following the sunset process.

For full context, see `server-manual-manual-steps.md`.
