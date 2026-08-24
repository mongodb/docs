# Next.js Redirect Updates (`<docset>-redirects.json`)

Load this file when performing a minor or major release for a docset
whose redirects are managed in the Next.js format
(`<slug>-redirects.json`). Skip this step entirely for patch releases.

Every docset covered by `version-update` has moved off Netlify/Snooty
for redirects. `content/{docset}/netlify.toml` may still exist on disk
for some docsets, but it is no longer edited as part of this workflow
— see "Step 8: Update Redirects" in `SKILL.md`.

The redirect file path is **outside `content/`**, under one of two
directories depending on the docset — confirm which before editing:

- `platform/docs-nextjs/src/redirects/<slug>-redirects.json` — standard
  drivers, providers, and cloud/Atlas products.
- `platform/docs-site/src/redirects/<slug>-redirects.json` — Mongosync,
  Server Manual, and the other docsets migrated as part of the site-wide
  Next.js SSG rollout (django-mongodb, hibernate, ops-manager, compass,
  mongodb-vscode, mongodb-shell, database-tools, meta, mcp-server,
  relational-migrator, mongodb-intellij).

Each docset's section below states which directory its file lives in.
Editing either file is an expected part of this workflow (the
`add-redirects` skill writes there too), but it is a `platform/` change —
note it as such in the change summary.

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

Next.js evaluates redirects in array order (first match wins), but
version-structural entries do not overlap each other, so exact order
within the structural block does not affect behavior. Even so, insert a
new version-consolidation redirect immediately after the alias redirect
and before the entry for the previous version — this matches every
version-bump PR in history (JVM, Go, C#, Node) and keeps the file
scannable. Do not reorder existing entries. If a docset's file has no
obvious version-consolidation block to slot into, recommend a placement
and confirm with the user before applying it. Do not add `"force":
true`.

## The "no entry" pattern

Unlike `netlify.toml`'s self-referential direct-serve redirect
(`status = 200`), the JSON format has no direct-serve entry at all: a
version that should serve from its own directory simply has **no
entry** in the file. Several docset sections below describe this as
"no entry" for that reason — there is nothing to add.

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

**Verified** against the live `entity-framework-redirects.json`. Entity
Framework uses exact released minor versions, not `vX.x` consolidation
aliases.

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
   now archived in its own directory and serves directly). Verified:
   every version with a `content/entity-framework/vX.Y/` directory
   (`v8.0`–`v9.1` at time of writing) has no entry in the file.

3. If a version's content directory is later removed from the repo
   entirely (full EOL, a separate and less frequent action than the
   routine flip), add an explicit 301 entry redirecting it to `current`:

   ```json
   {
     "source": "/docs/entity-framework/v7.0/:path*",
     "destination": "/docs/entity-framework/current/:path*",
     "statusCode": 301
   }
   ```

   Verified: `v7.0` has exactly this entry and no directory in
   `content/entity-framework/` anymore.

4. No `VERSION CONSOLIDATION` entry (Entity Framework has none in TOML
   either).

---

## Atlas CLI

URL base: `/docs/atlas/cli/`.

**Verified** against the live `atlas-cli-redirects.json` and the current
`netlify.toml`, which the JSON mirrors 1:1 — this confirms Atlas CLI's
"five most recent versions online" policy (see `product-specific-steps.md`)
is real. The five versions immediately before `current` have **no** entry (they
self-serve from their own `content/atlas-cli/vX.Y/` directory); anything
older gets an explicit 301 entry redirecting it to `current`.

Before editing, confirm the file's current state actually matches this
rule (count entries against the five-version window). A previous flip
can leave the window half-shifted (an old version not yet given its EOL
entry, or the just-superseded version not yet dropped into the window)
— fix any such gap forward as part of this release rather than building
on top of it.

### Minor or major release

1. Add a new entry for the just-released version at 302:

   ```json
   {
     "source": "/docs/atlas/cli/v1.57/:path*",
     "destination": "/docs/atlas/cli/current/:path*",
     "statusCode": 302
   }
   ```

2. **Remove** the entry for the outgoing current version entirely (no
   replacement) — it now enters the five-version self-serving window:

   ```json
   // delete this entry for the version that just stopped being current
   {
     "source": "/docs/atlas/cli/v1.56/:path*",
     "destination": "/docs/atlas/cli/current/:path*",
     "statusCode": 302
   }
   ```

3. Add a 301 entry for the version that ages **out** of the five-version
   window as a result (the sixth-most-recent, counting back from the new
   current):

   ```json
   {
     "source": "/docs/atlas/cli/v1.51/:path*",
     "destination": "/docs/atlas/cli/current/:path*",
     "statusCode": 301
   }
   ```

4. `master` → `upcoming` (301) and `stable` → `current` (301) are static
   aliases with no version number in the `source` — verified they don't
   change on a flip. Leave them untouched.

5. Also remove the superseded version from `targetBranchChoices` in
   `.backportrc.json` (Step 6) and run the Snooty sunset procedure — see
   `product-specific-steps.md`.

---

## Atlas Kubernetes Operator (AKO)

URL base: `/docs/atlas/operator/`.

**Verified** against the live `atlas-operator-redirects.json` and the
current `netlify.toml`, which the JSON mirrors 1:1. AKO does **not**
self-serve archived versions the way standard drivers do, even when a
version has its own directory under `content/atlas-operator/` — every
non-current version number gets an explicit 301 entry redirecting to
`current`. Each version has **exactly one** entry in the file at any
time: 302 while it is current, 301 once superseded. There is no
pre-emptive alias for a not-yet-released version — don't add one
speculatively; only add it if you find one already present in the file
at release time.

### Minor release

1. Edit the outgoing current version's entry in place, changing its
   `statusCode` from 302 to 301 (destination stays `current`):

   ```json
   {
     "source": "/docs/atlas/operator/v2.14/:path*",
     "destination": "/docs/atlas/operator/current/:path*",
     "statusCode": 301
   }
   ```

2. Add a new entry for the just-released version at 302:

   ```json
   {
     "source": "/docs/atlas/operator/v2.15/:path*",
     "destination": "/docs/atlas/operator/current/:path*",
     "statusCode": 302
   }
   ```

3. Leave the `master` → `upcoming` alias (301) and `stable` → `current`
   alias (301) untouched — both are static and don't change on a flip.

4. Per-version page-specific redirects (e.g. the
   `migrate-parameter-to-resource` entries scoped to specific old
   versions) are static and unrelated to the flip — do not touch them
   here.

---

## MongoDB Controllers for Kubernetes (MCK)

URL base: `/docs/kubernetes/`.

**Verified** against the live `kubernetes-redirects.json` and the current
`netlify.toml`, which the JSON mirrors 1:1. MCK follows the same
self-serve model as Entity Framework and Mongosync: a version with its
own `content/kubernetes/vX.Y/` directory has no entry in the file —
confirmed for every one of `v1.1`–`v1.9`. There is no live "current
version" alias entry of the kind Atlas CLI or the standard drivers use;
`current`/`upcoming` resolve without a JSON redirect. Only page-specific
overrides scoped to individual old versions, the `master` → `upcoming`
and `stable` → `current` aliases, and the trailing catch-all exist in
the file — none of these change on a routine flip.

### Minor or major release

1. The newly archived version (old `current`) and the new current both
   serve from their own directories: no JSON entries needed for the flip
   itself.

2. If a version's content directory is later removed from the repo
   entirely (full EOL), add an explicit 301 entry redirecting it to
   `current`, matching the Entity Framework and Mongosync pattern:

   ```json
   {
     "source": "/docs/kubernetes/v1.0/:path*",
     "destination": "/docs/kubernetes/current/:path*",
     "statusCode": 301
   }
   ```

   Confirm no directory-backed version has a stray entry before and
   after editing.

3. Page-specific overrides scoped to individual old versions (e.g. the
   `fts-vs-deployment`/`tutorial/*` entries under `v1.1`–`v1.3`) are
   static and unrelated to the flip — do not touch them here.

---

## Kafka Connector

URL base: `/docs/kafka-connector/`.

**Verified** against the live `kafka-connector-redirects.json` and the
current `netlify.toml`, which the JSON mirrors 1:1. Kafka Connector
follows the same self-serve model as Entity Framework, Mongosync, and
MCK: a version with its own `content/kafka-connector/vX.Y/` directory
has no entry in the file; a version whose directory has been fully
removed gets an explicit 301 entry to `current`, confirmed for
`v1.0`–`v1.12`. There is no live "current version" alias entry —
`current`/`upcoming` resolve without a JSON redirect.

### Minor release

1. The newly archived version (old `current`) and the new current both
   serve from their own directories: no JSON entries needed for the flip
   itself.

2. If a version's content directory is later removed from the repo
   entirely (full EOL), add an explicit 301 entry redirecting it to
   `current`, matching the pattern above:

   ```json
   {
     "source": "/docs/kafka-connector/v1.13/:path*",
     "destination": "/docs/kafka-connector/current/:path*",
     "statusCode": 301
   }
   ```

   Confirm no directory-backed version has a stray entry before and
   after editing.

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

URL base: `/docs/mongosync/`. File:
`platform/docs-site/src/redirects/mongosync-redirects.json`.

**Verified** against the live `mongosync-redirects.json` (migrated
2026-08-13) and the current `netlify.toml`, which the JSON file still
mirrors 1:1. Mongosync has no `upcoming` directory. There is exactly one
"current version" alias entry in the file at any time (302, → `current`);
everything else is either a version that serves directly from its own
retained `content/mongosync/vX.Y/` directory (no entry) or a version
whose directory has been fully removed from the repo (explicit 301 to
`current`).

### Minor release

1. Edit the single current-version alias entry in place, bumping its
   `source` version number (destination and statusCode stay the same):

   ```json
   {
     "source": "/docs/mongosync/v1.22/:path*",
     "destination": "/docs/mongosync/current/:path*",
     "statusCode": 302
   }
   ```

2. Add **no entry** for the version that just stopped being current — it
   now serves directly from its own retained directory
   (`content/mongosync/v{OLD}/`), matching `v1.10`–`v1.20` in the live
   file.

3. Only if a version's content directory is being fully removed from the
   repo this release (a separate, less frequent action than the routine
   flip), add an explicit 301 entry redirecting it to `current`:

   ```json
   {
     "source": "/docs/mongosync/v1.10/:path*",
     "destination": "/docs/mongosync/current/:path*",
     "statusCode": 301
   }
   ```

   Verified pattern: `v0.9`, `v1.7`, `v1.8`, and `v1.9` all have exactly
   this entry — none of those versions has a directory in
   `content/mongosync/` anymore.

4. Leave everything else untouched: the `cluster-to-cluster-sync` legacy
   alias, the `master` → `current` alias, the root `/docs/mongosync/` →
   `current` alias, the page-specific redirects (`beta-program`,
   `disaster-recovery`, `install-on-windows/`, etc.), and the trailing
   catch-all. None of these change on a version flip.

### Major release

Mongosync makes no structural distinction between minor and major
releases for redirects (verified: the same v1.x numbering and
archive/EOL pattern applies uniformly). Follow the minor-release steps
above.

---

## MongoCLI

MongoCLI is patch-only in the monorepo. Do not update any redirect file
for patch releases.

---

## Server Manual

URL base: `/docs/` (the manual serves at the docs root, with version
segments such as `/docs/v8.0/` and the alias `/docs/manual/`). File:
`platform/docs-site/src/redirects/manual-redirects.json`.

**Verified** against the live `manual-redirects.json` (migrated
2026-08-13; 1,821 entries) and the current `netlify.toml`, which the JSON
file mirrors 1:1 — including its EOL, alias-wildcard, major/version
page-level, and catch-all sections. Confirmed: this docset never uses
`status = 200` in `netlify.toml`, so the "no entry" pattern above never
applies here — every entry in the file is a real 301 or 302. The
four-PR flip's redirect work (PR 4) is what changes the file. Confirm
every entry with DOP before merge — see `server-manual-pr4.md`.

1. **Alias wildcards** — three wildcards point at `/docs/manual/:path*`:
   `stable` and `current` are static (301, never change on a flip), and
   the released-version alias (currently `v8.3`) is the one that moves.
   On a flip, bump its `source` version number in place, keeping
   `destination` and `statusCode` (302) unchanged:

   ```json
   {
     "source": "/docs/v9.0/:path*",
     "destination": "/docs/manual/:path*",
     "statusCode": 302
   }
   ```

   Separately, the `upcoming`-alias entry (destination
   `/docs/upcoming/:path*`, 302) gets its own `source` version number
   bumped when a new in-development version starts.

2. **Newly archived version** (`v{OUTGOING}`) serves from its own
   directory: **no JSON entry** (confirmed — no `v{OUTGOING}`-specific
   alias exists anywhere in the live file for archived majors like
   `v8.0`, `v7.0`, or `v8.2`; only page-specific redirect sections
   reference them, which is page-level work handled separately).

3. **Per-archived-version page redirects** (the TOML `### v{OUTGOING}
   REDIRECTS` sibling section copied from `### MANUAL REDIRECTS`) are
   page-level entries. In JSON, prefer expressing these once with a
   `:version` wildcard rather than copying a per-version block. This is
   `add-redirects` territory, not version-update — do not generate the
   block here.

4. Fully-EOL versions redirect to the current manual at 301 — verified:
   the 18 exact-version EOL entries listed in the live file's `EOL
   REDIRECTS` comment (`v2.2` through `v7.3`) all point straight to
   `/docs/manual/:path*` at 301, a direct 1:1 translation from
   `netlify.toml`.

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
