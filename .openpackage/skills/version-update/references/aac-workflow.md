# AAC Version Bump Workflow

Load this file when the docset is `atlas-architecture`. This process replaces the standard version-update steps entirely.

The Atlas Architecture Center (AAC) uses **date-based versioning** (`vYYYYMMDD`). Version numbers reflect the date that new architectural guidance was published, not a product release version. Version bumps are performed near-monthly by the AAC squad (Kevin Meyer).

---

## Overview

The bump archives the current stable version as a numbered directory, promotes `upcoming` to `current`, and prepares `upcoming` for the next cycle. After the bump, the directory layout is `upcoming`, `current`, and one or more numbered archives (`vYYYYMMDD`). In a clean steady state there is only one numbered archive, but the repo may carry more than one between EOL cycles — list the actual archives before deleting any, and confirm with the user which to retain.

---

## Step 1: Determine the New Version

The new version number is the current date in `vYYYYMMDD` format. For example, a bump on March 5, 2026 produces `v20260305`.

The old current version number is found in the header of `atlas-architecture/current/source/release-notes.txt`.

Before making any changes, create a new branch off `main` for the version bump:

```bash
git checkout main
git pull origin main
git checkout -b version-bump-<vYYYYMMDD> origin/main
```

---

## Step 2: Finalize Release Notes

In `atlas-architecture/upcoming/source/release-notes.txt`:

1. Locate the `Upcoming` header at the top of the file.
2. Replace `Upcoming` with the new version string (e.g., `v20260305`).
3. Replace `*Release Date TBD*` with `*Released <Month D, YYYY>*` (e.g., `*Released March 5, 2026*`). The placeholder uses single- asterisk italic emphasis in this file — do not introduce double- asterisk bold.
4. Remove any bullets that represent minor changes (typos, grammar fixes) that did not meaningfully change AAC guidance.

Before:
```rst
.. _upcoming:

Upcoming
~~~~~~~~

*Release Date TBD*

- Fixes a typo on the Auditing and Logging page.
- Updates PCI DSS guidance to recommend using Atlas Resource Policies.
```

After:
```rst
.. _v20260305:

v20260305
~~~~~~~~~

*Released March 5, 2026*

- Updates PCI DSS guidance to recommend using Atlas Resource Policies.
```

---

## Step 3: Directory Operations

Perform these steps in order:

1. **Rename `current`** to the old current version number (e.g., `v20260520`). Determine the old version from the release notes header in `current/source/release-notes.txt` before renaming.
2. **Copy `upcoming`** and rename the copy to `current`.
3. **Delete all numbered directories except the one just created.** There must be exactly three directories after this step: `upcoming`, `current`, and the single numbered archive from step 1. Delete the oldest numbered directories until that condition is met.

After these steps the directory layout is:
- `upcoming` — unchanged; staging for the next cycle
- `current` — copy of the former `upcoming`; newly published version
- `vYYYYMMDD` — the former `current`; now the single numbered archive

Never overwrite an existing numbered directory without confirming with the user.

---

## Step 4: Run the EOL Script on the New Numbered Archive

Run the first four steps of the Snooty EOL instructions on the newly created numbered directory (e.g., `v20260227`): https://wiki.corp.mongodb.com/spaces/DE/pages/126664998

This configures the archived version so that it renders correctly as an offline/archived build.

---

## Step 5: Add New Release Notes Header to `upcoming`

In `atlas-architecture/upcoming/source/release-notes.txt`, add a new placeholder header at the top of the file so writers have a place to add notes for the next cycle:

```rst
.. _upcoming:

Upcoming
~~~~~~~~

*Release Date TBD*

```

---

## Step 6: Update the ToC for New Pages

In `content/table-of-contents/L1-data/atlas-architecture-center.ts`:

Find any ToC items that contain `versions: { excludes: ['current'] }`. Writers add this property to hide new pages from the `current` version until they are officially released. For each such item, delete the `versions` property entirely.

Before:
```ts
{
  label: 'Example Page',
  contentSite: 'atlas-architecture',
  url: '/docs/atlas/architecture/:version/<path-to-page>',
  versions: { excludes: ['current'] },
},
```

After:
```ts
{
  label: 'Example Page',
  contentSite: 'atlas-architecture',
  url: '/docs/atlas/architecture/:version/<path-to-page>',
},
```

If no items have this property, no changes are needed.

---

## Step 7: Update Redirects

First detect which redirect format(s) are present:

```bash
ls content/atlas-architecture/netlify.toml 2>/dev/null
ls platform/docs-site/src/redirects/atlas-architecture-redirects.json 2>/dev/null
ls platform/docs-nextjs/src/redirects/atlas-architecture-redirects.json 2>/dev/null
```

Apply the section(s) below for **each** file that exists. During the TOML→Next.js migration both may be present; keep them consistent.

### `netlify.toml` (if present)

In `atlas-architecture/netlify.toml`:

**ALIAS REDIRECTS section** — update the existing alias redirect to point from the **new version** to `current`. For example, bumping to `v20260305`:

Before:
```toml
### ALIAS REDIRECTS

[[redirects]]
  from = "/docs/atlas/architecture/v20260227/*"
  to = "/docs/atlas/architecture/current/:splat"
  status = 302
```

After:
```toml
### ALIAS REDIRECTS

[[redirects]]
  from = "/docs/atlas/architecture/v20260305/*"
  to = "/docs/atlas/architecture/current/:splat"
  status = 302
```

**OFFLINE REDIRECTS section** — add a new entry for the old current version (now the numbered archive). Insert it at the **top** of the OFFLINE REDIRECTS block. For example, archiving `v20260227`:

```toml
### OFFLINE REDIRECTS
  [[redirects]]
    from = "/docs/atlas/architecture/v20260227/*"
    to = "/docs/atlas/architecture/current/:splat"
    status = 200
```

### `atlas-architecture-redirects.json` (if present)

URL base: `/docs/atlas/architecture/`. File: `platform/docs-site/src/redirects/atlas-architecture-redirects.json`. A stale, dead copy is also left over in `docs-nextjs` — ignore it; edit the `docs-site` copy only. See the preamble of `nextjs-redirects-updates.md` for why. Note this as a `platform/` change.

1. **Update the alias entry**: remove the entry for the old current version and replace it with one for the new version, pointing to `current` at 302. For example, bumping to `v20260305`:

   ```json
   {
     "source": "/docs/atlas/architecture/v20260305/:path*",
     "destination": "/docs/atlas/architecture/current/:path*",
     "statusCode": 302
   }
   ```

2. **No JSON entry** for the newly archived version — it serves from its own directory. The TOML `status = 200` OFFLINE REDIRECTS step has no JSON equivalent.

---

## Step 8: Versioning Catalog — Add Old Current Version (In the PR)

**These edits must be in the PR before it merges.** The deploy only builds an offline tarball for a version whose catalog entry has `eol: "link"` (or no `eol` at all). The offline bundle for the outgoing `current` version must be built one final time before it is switched to `eol: "download"` in Step 10.

In `platform/versioning/projects/atlas-architecture.ts`:

1. Update the `current` entry's `label` to reflect the new version — `{ name: "current", label: "v20260305 (current)", stable: true }`.
2. Insert an entry for the **old current version** directly below `current`, using `eol: "link"` so the bundle rebuilds one last time:

   ```ts
   { name: "v20260227", active: false, eol: "link" },
   ```

   The `name` must exactly match the directory Step 5 archived.
3. Run the checks in the **Checking your edit** section of `versioning-catalog-updates.md`, which include confirming the entry you added landed directly below `current`.

Verify the version dropdown on the PR's staging preview, which builds from the branch's own catalog. The offline bundle is a production-deploy artifact and cannot be checked there — that is Step 9.

---

## Step 9: Merge and Verify the Offline Bundle

After the PR is approved and merged, monitor the production deploy log for the `mongodb-atlas-architecture` Netlify site (the most recent deploy named `Production: main<number>`).

Confirm that the deploy log contains lines showing the offline bundle was built and uploaded for the newly archived version. The log entries look like:

```
... uploading to AWS S3  docs-mongodb-org-dotcomprd docs/offline/ ...
... uploaded to AWS S3
```

Surface this verification step to the user — they must confirm the bundle was built before proceeding to Step 10.

---

## Step 10: Versioning Catalog — Set Old Version to EOL Download (After Deploy)

After confirming the offline bundle was built successfully (Step 9):

In `platform/versioning/projects/atlas-architecture.ts`, find the entry for the old current version added in Step 8 (e.g., `v20260227`) and change its `eol` from `"link"` to `"download"`:

```ts
{ name: "v20260227", active: false, eol: "download" },
```

This stops future deploys from building offline bundles for this version. It is a separate follow-up PR, since the change can only land after the Step 8 PR has merged and deployed.

---

## Step 11: Remaining Manual Steps

1. Confirm release notes are finalized and the PR is approved.
2. Merge the PR into `main`.
3. Monitor the production deploy (Step 9).
4. Open the follow-up PR that sets the old version to `eol: "download"` (Step 10). Like the main PR, it needs human review and approval before it merges — do not merge it yourself.
5. Verify the version selector on the live site shows the new version as current, confirming what the staging preview showed in Step 8.
6. Announce the new version in the #docs-atlas-architecture-center Slack channel.
