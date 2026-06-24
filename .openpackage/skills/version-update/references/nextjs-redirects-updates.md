# Next.js Redirect Updates (`<docset>-redirects.json`)

Load this file when performing a minor or major release for a docset
whose redirects are managed in the Next.js format
(`platform/docs-nextjs/redirects/<slug>-redirects.json`). Skip this step
entirely for patch releases.

This file is the JSON counterpart to `netlify-toml-updates.md`. The
docset sections below appear in the same order. `SKILL.md` Step 8 decides
which file(s) to apply based on what exists on disk — see "Routing"
there. During the migration period a docset may have **both** a
`netlify.toml` and a `<slug>-redirects.json`; in that case apply the
matching section from **both** reference files.

The redirect file path is **outside `content/`**, under
`platform/docs-nextjs/redirects/`. Editing it is an expected part of this
workflow (the `add-redirects` skill writes there too), but it is a
`platform/` change — note it as such in the change summary.

---

## Format

Each project's file is a **flat JSON array** of objects. There are no
sections, comments, or version subheadings. Each entry is:

```json
{
  "source": "/docs/<slug>/<from-path>",
  "destination": "/docs/<slug>/<to-path>",
  "statusCode": 301
}
```

Append new entries at the end of the array. Do not reorder existing
entries. Next.js evaluates redirects in array order (first match wins),
but version-structural entries do not overlap each other, so order within
the structural block does not matter in practice. Do not add `"force":
true`.

## Translation rules from `netlify.toml`

These rules are verified against the two docsets already migrated
(`node-redirects.json`, `atlas-redirects.json`):

| `netlify.toml` | `<slug>-redirects.json` |
|---|---|
| `from = "/docs/x/*"` | `"source": "/docs/x/:path*"` |
| `to = "/docs/x/:splat"` | `"destination": "/docs/x/:path*"` |
| `status = 302` | `"statusCode": 302` |
| `status = 301` (or omitted) | `"statusCode": 301` |
| `status = 200` (direct self-serve) | **no entry** — see below |
| Section headers (`### ALIAS REDIRECTS`, `### CATCH ALLS`, etc.) | none — flat array |
| `:version` named parameter | supported (Next.js allows `:version` + `:path*` in one rule; Netlify does not) |

**The `status = 200` rule is the biggest difference.** In `netlify.toml`,
an archived version that is served from its own directory gets a
self-referential `from = "/docs/x/vX.Y/*"` → `to = "/docs/x/vX.Y/:splat"`
with `status = 200`. Next.js has no direct-serve redirect: a version that
should serve from its own directory simply has **no entry** in the JSON
file. Whenever the TOML instructions say "add a `status = 200`
direct-serve redirect," the JSON equivalent is to add nothing.

Consequence: `statusCode` in these files is only ever **302** (a
temporary alias for the live version, whose target moves on the next
flip) or **301** (a permanent redirect for a consolidated or EOL
version). In `node-redirects.json` there is exactly one 302 (the live
major alias) and every other entry is 301.

---

## Standard driver and provider docsets

URL base: `/docs/drivers/{docset}/`.

**Verified** against `node-redirects.json` (Node is a migrated standard
driver). The model: each released minor redirects to its major's `vX.x`
consolidation alias; the **live** major's `vX.x` alias points to
`current` at 302; archived majors are served from their own `vX.x`
directory (no self-entry); fully-EOL majors with no directory redirect
straight to `current` at 301.

### Minor release

Standard drivers do not create a new directory on a minor release (the
old `current` is replaced by the new `upcoming`). Add one consolidation
entry for the newly released minor, pointing at the current major's
`vX.x` alias:

```json
{
  "source": "/docs/drivers/csharp/v3.6/:path*",
  "destination": "/docs/drivers/csharp/v3.x/:path*",
  "statusCode": 301
}
```

### Major release

1. Add the new major alias pointing to `current` at **302** (this is the
   one temporary redirect — its target moves on the next major):

   ```json
   {
     "source": "/docs/drivers/csharp/v4.x/:path*",
     "destination": "/docs/drivers/csharp/current/:path*",
     "statusCode": 302
   }
   ```

2. Add a consolidation entry for the first minor of the new major:

   ```json
   {
     "source": "/docs/drivers/csharp/v4.0/:path*",
     "destination": "/docs/drivers/csharp/v4.x/:path*",
     "statusCode": 301
   }
   ```

3. Change the **previous** major's alias from 302 to 301. The previous
   major (e.g. `v3.x`) was pointing to `current` at 302 while it was
   live; it is now archived and served from its own `v3.x` directory.
   Find its entry and either delete it (if a `v3.x` directory now exists
   and serves directly) or, if the driver keeps older majors as 301
   redirects to `current`, change its `statusCode` to 301 and its
   `destination` to `/docs/drivers/csharp/current/:path*`. Confirm which
   against the driver's existing entries — Node keeps the most recent
   archived major (`v6.x`) served directly with no entry, and redirects
   all older majors to `current` at 301.

4. **No** `status = 200` / direct-serve entry for the new major (TOML
   step 4 has no JSON equivalent).

5. Page-level redirects (the per-version `## current` block that TOML
   copies into a `## v3.x` heading) are **not** version-update's job in
   the JSON format — they are handled by `add-redirects` and many are
   expressed once with a `:version` wildcard. Do not copy page-level
   entries here.

---

## Entity Framework

URL base: `/docs/entity-framework/`.

**Derived** (Entity Framework is not yet migrated — verify against
`entity-framework-redirects.json` once it exists or against the first
migration PR). Entity Framework uses exact released minor versions, not
`vX.x` consolidation aliases.

### Minor or major release

1. Add an alias entry for the newly released exact version pointing to
   `current` at 302:

   ```json
   {
     "source": "/docs/entity-framework/v9.1/:path*",
     "destination": "/docs/entity-framework/current/:path*",
     "statusCode": 302
   }
   ```

2. Change the previous released version's alias from 302 to a
   direct-serve (i.e. **delete** the JSON entry — the previous version is
   now archived in its own directory and serves directly).

3. No `VERSION CONSOLIDATION` entry (Entity Framework has none in TOML
   either).

---

## Atlas CLI

URL base: `/docs/atlas/cli/`.

**Derived** (not yet migrated). Atlas CLI keeps the five most-recent
versions online and tracks two aliases (current and upcoming).

### Minor or major release

1. Update the **upcoming** alias source from the old upcoming version to
   the new one (302, → `upcoming`):

   ```json
   {
     "source": "/docs/atlas/cli/v1.56/:path*",
     "destination": "/docs/atlas/cli/upcoming/:path*",
     "statusCode": 302
   }
   ```

2. Update the **current** alias source from the old current version to
   the new one (302, → `current`).

3. The newly archived version (the old `current`) enters the
   five-version online window and serves from its own directory: **no
   JSON entry**.

4. Add a 301 entry for the version rolling **out** of the five-version
   window (the sixth-most-recent), pointing to `current`:

   ```json
   {
     "source": "/docs/atlas/cli/v1.50/:path*",
     "destination": "/docs/atlas/cli/current/:path*",
     "statusCode": 301
   }
   ```

   Also remove that version from `targetBranchChoices` in
   `.backportrc.json` (Step 6) and run the Snooty sunset procedure — see
   `product-specific-steps.md`.

---

## Atlas Kubernetes Operator (AKO)

URL base: `/docs/atlas/operator/`.

**Derived** (not yet migrated). AKO uses a pre-emptive alias: the
next minor's `vX.Y` entry already exists pointing to `current` at 302
before that version ships.

### Minor release

1. **Remove** the pre-emptive alias entry for the version now being
   released (e.g. delete the `v2.14` → `current` 302 entry when releasing
   v2.14 — that version now serves from its own directory).

2. **Add** a fresh pre-emptive alias for the next upcoming minor:

   ```json
   {
     "source": "/docs/atlas/operator/v2.15/:path*",
     "destination": "/docs/atlas/operator/current/:path*",
     "statusCode": 302
   }
   ```

3. The just-released version and the previous current both serve from
   their own directories: **no JSON entry** — only fully-EOL versions
   get a 301.

4. If a version rolls out of the online window and is fully EOL'd, add a
   301 entry pointing to `current`:

   ```json
   {
     "source": "/docs/atlas/operator/v2.10/:path*",
     "destination": "/docs/atlas/operator/current/:path*",
     "statusCode": 301
   }
   ```

---

## MongoDB Controllers for Kubernetes (MCK)

URL base: `/docs/kubernetes/`.

**Derived** (not yet migrated). MCK archives each minor exactly and
serves each from its own directory; it has no `vX.x` consolidation
aliases.

### Minor or major release

1. The newly archived version (old `current`) and the new current both
   serve from their own directories: **no JSON entries**.

2. If the new current's version-numbered URL must resolve to `current`,
   add a single alias at 302:

   ```json
   {
     "source": "/docs/kubernetes/v1.8/:path*",
     "destination": "/docs/kubernetes/current/:path*",
     "statusCode": 302
   }
   ```

   Confirm against the migrated file whether MCK keeps this alias or
   relies on the directory serving directly.

3. Fully-EOL versions (rolled out of the support window) redirect to
   `current` at 301.

---

## Kafka Connector

URL base: `/docs/kafka-connector/`.

**Derived** (not yet migrated). Per-minor, served directly per version.

### Minor release

1. The newly archived version serves from its own directory: **no JSON
   entry**.

2. Update the alias for the new current version to point at `current` at
   302, if the file uses version-numbered aliases:

   ```json
   {
     "source": "/docs/kafka-connector/v2.1/:path*",
     "destination": "/docs/kafka-connector/current/:path*",
     "statusCode": 302
   }
   ```

---

## Spark Connector

URL base: `/docs/spark-connector/`.

**Verified pattern** — Spark uses the same per-major consolidation model
as the standard drivers (confirmed from the live `spark-connector`
`netlify.toml`: `v11.x` → `current` at 302, `v11.0` → `v11.x` at 301,
previous major `v10.x` minors → `v10.x` at 301). Follow **Standard driver
and provider docsets** above, using the `/docs/spark-connector/` base.

---

## Mongosync

URL base: `/docs/mongosync/`.

**Derived** (not yet migrated). Mongosync has no `upcoming` directory and
archives each minor to its own directory.

### Minor release

1. The newly archived version serves from its own directory: **no JSON
   entry**.

2. Add an alias for the newly released current version pointing to
   `current` at 302 (the TOML "comment block / v1.21 → current" step):

   ```json
   {
     "source": "/docs/mongosync/v1.21/:path*",
     "destination": "/docs/mongosync/current/:path*",
     "statusCode": 302
   }
   ```

   Confirm the status against the migrated file.

### Major release

Mongosync makes no structural distinction between minor and major
releases for redirects (the same archive-and-alias applies). Follow the
minor-release steps above.

---

## MongoCLI

MongoCLI is patch-only in the monorepo. Do not update any redirect file
for patch releases.

---

## Server Manual

URL base: `/docs/` (the manual serves at the docs root, with version
segments such as `/docs/v8.0/` and the alias `/docs/manual/`).

**Derived** (not yet migrated; the manual's redirect file is large and
DOP-owned). The four-PR flip's redirect work (PR 4) translates to JSON as
follows. Confirm every entry with DOP/Anabella before merge, exactly as
in the TOML process.

1. **Alias wildcards** — update the `manual`-alias and `upcoming`-alias
   entries to the new version numbers:

   ```json
   {
     "source": "/docs/v9.0/:path*",
     "destination": "/docs/manual/:path*",
     "statusCode": 302
   }
   ```

   (The `manual` alias serves the released version; the `upcoming` alias
   points the next dev version at `/docs/upcoming/`.)

2. **Newly archived version** (`v{OUTGOING}`) serves from its own
   directory: **no JSON entry** (the TOML process never added a
   `status = 200` catch-all for it either — it added a full per-page
   redirect section, which is page-level work handled separately).

3. **Per-archived-version page redirects** (the TOML `### v{OUTGOING}
   REDIRECTS` sibling section copied from `### MANUAL REDIRECTS`) are
   page-level entries. In JSON, prefer expressing these once with a
   `:version` wildcard rather than copying a per-version block. This is
   `add-redirects` territory, not version-update — do not generate the
   block here.

4. Fully-EOL versions redirect to the current manual at 301.

---

## Catch-all (reference)

Migrated docsets end their array with a regex catch-all that routes any
unrecognized version segment to `current`. This entry is created once at
migration time and is **not** modified on a version flip — do not add or
change it during a release. For reference, the Node form is:

```json
{
  "source": "/docs/drivers/node/:first((?!current|upcoming|v\\d)[^/]+)/:rest*",
  "destination": "/docs/drivers/node/current/:first/:rest*",
  "statusCode": 301
}
```
