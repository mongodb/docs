# netlify.toml Updates

Load this file when performing a minor or major release and you need to update
`netlify.toml`. All patterns below are confirmed from commit history. Skip
this step entirely for patch releases.

---

## Standard driver and provider docsets

URL base: `/docs/drivers/{docset}/` for drivers;
`/docs/atlas/terraform/` and `/docs/atlas/cloudformation/` for providers.

### Minor release

In the **VERSION CONSOLIDATION** section, add a redirect for the new minor
version pointing to the `vX.x` directory. For example, if updating C# from
`v3.5` to `v3.6`:

```toml
[[redirects]]
from = "/docs/drivers/csharp/v3.6/*"
to = "/docs/drivers/csharp/v3.x/:splat"
```

### Major release

1. In the **ALIAS REDIRECTS** section, update the redirect so the new
   major-version alias points to `current`. For example, if updating from
   `v3.x` to `v4.0`:

   ```toml
   [[redirects]]
   from = "/docs/drivers/csharp/v4.x/*"
   to = "/docs/drivers/csharp/current/:splat"
   status = 302
   ```

2. In the **VERSION CONSOLIDATION** section, add a redirect for the first
   released minor of the new major:

   ```toml
   [[redirects]]
   from = "/docs/drivers/csharp/v4.0/*"
   to = "/docs/drivers/csharp/v4.x/:splat"
   ```

3. In the **PAGE-LEVEL REDIRECTS** section, copy all redirects under the
   `## current` heading. Paste them under a new heading for the previous major
   version, changing `current` to the old major version in those redirects.

4. In the **CATCH ALLS** section, add a redirect for the new major version:

   ```toml
   [[redirects]]
   from = "/docs/drivers/csharp/v4.x/*"
   to = "/docs/drivers/csharp/v4.x/:splat"
   status = 200
   ```

---

## Entity Framework

URL base: `/docs/entity-framework/`

Entity Framework uses exact released minor versions in `netlify.toml`, not
consolidated `vX.x` aliases for archived docs.

1. In the **ALIAS REDIRECTS** section, update the redirect that points to
   `current` so the `from` line uses the new exact released version.
2. In the **PAGE-LEVEL REDIRECTS** section, copy all redirects under the
   `## current` heading. Paste them under a new heading for the previous exact
   version, changing `current` to that version in those redirects. Remove any
   redirects from `## current` that no longer apply.
3. In the **CATCH ALLS** section, add a redirect for the new exact released
   version.
4. Do **not** add a **VERSION CONSOLIDATION** redirect for Entity Framework.

---

## Atlas CLI

URL base: `/docs/atlas/cli/`

Atlas CLI tracks two aliases (the current released version and the
upcoming version) and keeps the five most-recent versions online. On each
minor or major release, the oldest of those five rotates to EOL.

Section structure: `EOL REDIRECTS / ALIAS REDIRECTS / WILDCARD REDIRECTS
/ CATCH ALLS`.

### Minor release

1. In **EOL REDIRECTS**, add a redirect for the fifth-most-recent version
   (the one being EOL'd out of the five-version online window):

   ```toml
   [[redirects]]
   from = "/docs/atlas/cli/v1.50/*"
   to = "/docs/atlas/cli/current/:splat"
   status = 301
   ```

   Confirm `status` and `to` against the existing EOL entries — the file
   is the authoritative pattern.
2. In **ALIAS REDIRECTS**, update the `upcoming` alias from
   `v{old-upcoming}` to `v{new-upcoming}` (pointing to `upcoming/:splat`).
3. In **ALIAS REDIRECTS**, update the `current` alias from
   `v{old-current}` to `v{new-current}` (pointing to `current/:splat`).
4. In **CATCH ALLS**, remove the redirect for the version added to EOL
   REDIRECTS in step 1.
5. In **CATCH ALLS**, add a direct-serve redirect for the newly archived
   version (the old `current`):

   ```toml
   [[redirects]]
   from = "/docs/atlas/cli/v1.53/*"
   to = "/docs/atlas/cli/v1.53/:splat"
   status = 200
   ```

---

## Atlas Kubernetes Operator (AKO)

URL base: `/docs/atlas/operator/`

Section structure: `OFFLINE REDIRECTS / ALIAS REDIRECTS / WILDCARD
REDIRECTS / PAGE-SPECIFIC REDIRECTS / CATCH ALLS`.

AKO uses a **pre-emptive alias** pattern: before a new minor ships,
its `v{new}/*` entry already lives in `ALIAS REDIRECTS` pointing to
`current/:splat` at status 302. The flip moves that entry into
`CATCH ALLS` and adds a fresh pre-emptive alias for the next minor.

Archived versions in `CATCH ALLS` redirect to `current/:splat` using
the default status code — they are **not** direct-serve entries. Only
`current/*` and `upcoming/*` use `status = 200`. Match the existing
pattern in the file when adding entries.

### Minor release

Updates are required in **three** sections:

1. **OFFLINE REDIRECTS**: add a redirect for any version being fully
   EOL'd out of the online window. Skip if no version is being EOL'd
   this release.

   ```toml
   [[redirects]]
   from = "/docs/atlas/operator/v2.10/*"
   to = "/docs/atlas/operator/current/:splat"
   ```

2. **ALIAS REDIRECTS**: remove the pre-emptive entry for the version
   now being released (e.g. delete the `v2.14` entry when releasing
   v2.14), and add a fresh pre-emptive entry for the next upcoming
   minor (`v2.15`):

   ```toml
   [[redirects]]
   from = "/docs/atlas/operator/v2.15/*"
   to = "/docs/atlas/operator/current/:splat"
   status = 302
   ```

3. **CATCH ALLS**: add a redirect for the just-released version
   pointing to `current/:splat`. Omit the `status` line so it inherits
   the default status (matching the existing archived entries — do
   **not** add `status = 200`):

   ```toml
   [[redirects]]
   from = "/docs/atlas/operator/v2.14/*"
   to = "/docs/atlas/operator/current/:splat"
   ```

For the authoritative pattern, see the reference PR linked from the AKO
wiki (https://wiki.corp.mongodb.com/spaces/DE/pages/285108744) — the
DOP "How To: Create a New Docs Version" page at
https://wiki.corp.mongodb.com/spaces/DE/pages/385000457 covers the
underlying rationale.

---

## MongoDB Controllers for Kubernetes (MCK)

URL base: `/docs/kubernetes/`

MCK archives each minor version exactly (e.g., `v1.7`, `v1.8`). It does
not use `vX.x` version-consolidation aliases. Each version is served
directly under its exact version number.

In the live file, the **ALIAS REDIRECTS** section only contains the
`master/*` → `upcoming/:splat` entry. **All** version-specific entries —
including the current version's pair and every archived version — live
in **CATCH ALLS** at `status = 200`. Do not edit ALIAS REDIRECTS during
a release flip.

### Minor release

1. In the **CATCH ALLS** section, locate the two existing entries for
   the outgoing current version (the pair that pointed `v{old}/*` to
   `current/:splat` and `upcoming/:splat`, both at `status = 200`).
   Replace them with a single direct-serve entry for the now-archived
   version:

   ```toml
   [[redirects]]
   from = "/docs/kubernetes/v1.7/*"
   to = "/docs/kubernetes/v1.7/:splat"
   status = 200
   ```

2. In the **CATCH ALLS** section, add two redirects for the new current
   version:

   ```toml
   [[redirects]]
   from = "/docs/kubernetes/v1.8/*"
   to = "/docs/kubernetes/current/:splat"
   status = 200

   [[redirects]]
   from = "/docs/kubernetes/v1.8/*"
   to = "/docs/kubernetes/upcoming/:splat"
   status = 200
   ```

### Major release

MCK has no `vX.x` consolidation aliases and no `VERSION CONSOLIDATION`
section. Treat a major release the same as a minor release for redirect
purposes: archive the outgoing `v{old}` pair into a direct-serve entry
(step 1 above) and add the new `v{new}` pair pointing to `current` and
`upcoming` (step 2 above). No additional ALIAS or page-level redirect
work is required for the major.

---

## Kafka Connector

URL base: `/docs/kafka-connector/`

### Minor release

1. In **ALIAS REDIRECTS**, update the alias redirect from `v{old}` to
   `v{new}` (pointing to `current/:splat`).
2. In **CATCH ALLS**, add a direct-serve redirect for the archived version:

   ```toml
   [[redirects]]
   from = "/docs/kafka-connector/v2.0/*"
   to = "/docs/kafka-connector/v2.0/:splat"
   status = 200
   ```

---

## Spark Connector

URL base: `/docs/spark-connector/`

Spark uses per-major archives with version consolidation (all minors within a
major consolidate to `vX.x`).

### Minor release

In **ALIAS REDIRECTS**, add a version consolidation redirect for the new
minor:

```toml
[[redirects]]
from = "/docs/spark-connector/v11.1/*"
to = "/docs/spark-connector/v11.x/:splat"
```

### Major release

1. In **ALIAS REDIRECTS**, add the new major alias pointing to `current`:

   ```toml
   [[redirects]]
   from = "/docs/spark-connector/v12.x/*"
   to = "/docs/spark-connector/current/:splat"
   status = 302
   ```

2. Add a version consolidation redirect for the first minor of the new major:

   ```toml
   [[redirects]]
   from = "/docs/spark-connector/v12.0/*"
   to = "/docs/spark-connector/v12.x/:splat"
   ```

3. In **CATCH ALLS**, add a direct-serve redirect for the old major:

   ```toml
   [[redirects]]
   from = "/docs/spark-connector/v11.x/*"
   to = "/docs/spark-connector/v11.x/:splat"
   status = 200
   ```

---

## Mongosync

URL base: `/docs/mongosync/`

Mongosync has no `upcoming` directory. The **VERSION REDIRECTS** section
tracks each archived version with a direct-serve redirect, followed by a
comment+alias block for the current version.

### Minor release

1. In **VERSION REDIRECTS**, insert a direct-serve redirect for the version
   being archived, immediately above the current version's comment block:

   ```toml
   [[redirects]]
     from = "/docs/mongosync/v1.20/*"
     to = "/docs/mongosync/v1.20/:splat"
     status = 200
   ```

2. Update the current version comment block to reflect the new version:

   ```toml
   #Technically unnecessary, retained for extra clarity
   #branchName: master, aliases: [v1.21, current]
   #v1.21 --> current
   [[redirects]]
     from = "/docs/mongosync/v1.21/*"
     to = "/docs/mongosync/current/:splat"
   ```

---

## MongoCLI

MongoCLI is patch-only in the monorepo. Do not update `netlify.toml` for
patch releases.

---

## Server Manual

The Server Manual has a non-standard versioning structure (`manual`, `upcoming`,
`v8.0`). See `references/server-manual-prerequisites.md` for the full
redirect update process.
