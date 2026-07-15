# Product-Specific Steps

Load this file for Step 10. It documents per-product manual tasks,
compatibility table locations, and version constant cross-references for
each docset and release type. Skip any section that does not apply to
the current docset.

---

## Standard Drivers and Providers

Covers: csharp, cpp-driver, golang, java, java-rs, kotlin, kotlin-sync,
node, php-library, pymongo-driver, ruby-driver, rust, scala-driver,
swift, terraform, cloudformation.

### Compatibility Table

The shared driver compatibility table is at:

```
content/drivers/source/compatibility.txt
```

It uses includes from `content/drivers/source/includes/compatibility/`.
For major and minor releases, the relevant driver's compatibility section
almost always requires an update. Read the existing table structure for
the driver before making changes — some use version ranges per row
(e.g., "5.2 to 5.7"), others use one row per version with footnotes.

**Docset name does not always match the include directory name.** Look
up the correct path before searching — do not glob or grep for the
docset name directly, since most of these differ:

| Docset name    | Compat include dir              |
|-----------------|---------------------------------|
| `csharp`        | `csharp`                        |
| `cpp-driver`     | `cpp`                            |
| `golang`        | `go`                             |
| `java`          | `java-sync` (sync) / `java-async` (async) |
| `java-rs`       | `java-async`                    |
| `kotlin`        | `kotlin-coroutine` (coroutine/async driver) |
| `kotlin-sync`   | `kotlin` (plain `kotlin` dir is the sync driver) |
| `node`          | `nodejs`                        |
| `php-library`   | `php`                            |
| `pymongo-driver`| `python`                        |
| `ruby-driver`   | `ruby`                           |
| `rust`          | `rust`                           |
| `scala-driver`  | `scala`                          |
| `swift`, `terraform`, `cloudformation` | none — no entry in the shared compat table; skip this step for these docsets |

Confirm the mapping against `content/drivers/source/compatibility.txt`
(search for the docset's `:selections:` line) before editing, since this
table can drift as includes are reorganized.

- **No compatibility changes**: extend the upper bound of the top row
  (e.g., "5.2 to 5.7" → "5.2 to 5.8").
- **Compatibility changes** (new Server version, new language version,
  dropped support, or per-version limitation): ask the user for the full
  delta, then add a new row and/or column header as needed.
- **Patch release**: no compatibility table change unless the patch
  explicitly fixes a compatibility issue.

### Cross-References in Other Docsets

When releasing C# or Java (JVM drivers), update the following constants
in `content/manual/upcoming/snooty.toml`:

| Driver | Constant | Scope |
|--------|----------|-------|
| C# | `csharp-driver-version` | Major / Minor |
| Java (JVM) | `java-driver-version` | Major / Minor |

These constants drive API documentation links in the Server Manual.
Search the file for the constant to confirm the current value before
updating.

### Breaking Changes and Upgrade Pages

For any release that introduces breaking changes, update the relevant
upgrade page and link to it from the release notes. Remove any
breaking-change admonitions that no longer apply after this release.

### Docset-Specific Tasks

#### C++ Driver

- Update the driver status table in
  `cpp-driver/upcoming/source/index.txt` when the release changes
  support status for any component.

#### Entity Framework

Entity Framework requires release notes for **all** major, minor, and
patch releases — not just major and minor. Apply the release notes step
(Step 3) unconditionally.

For the API documentation link in the ToC, see `toc-updates.md` for the
full update procedure (one entry per archived version; `current` and
`upcoming` share one entry).

#### JVM Drivers (java, java-rs, kotlin, kotlin-sync, scala-driver)

- All five JVM docsets release from the same repo and tag. Ensure shared
  content changes are applied consistently across all five docsets.
- For major and minor releases, publish the API docs via the
  `docs-java-other` repo. See the JVM driver wiki for publishing
  instructions.

#### Node.js Driver

- Check whether `min-node-version` in
  `node/upcoming/snooty.toml` needs updating when the compatibility
  table changes for a new Node.js runtime version.
- Compat table includes live under `nodejs/`, not `node/` — see the
  mapping table above.

#### Ruby Driver

- For major and minor releases, publish the API docs following the
  process on the Ruby driver wiki:
  https://wiki.corp.mongodb.com/spaces/DE/pages/314415368

---

## Kafka Connector

### Version Constants

In addition to the standard `snooty.toml` update (Step 4):

| Constant | Notes |
|----------|-------|
| `connector_version` | Update to new minor/major version |
| `connector_patch_version` | Update to new patch version |
| External dependency constants (e.g., `connector_driver_version`) | Confirm correct values with the Kafka team each release — these track upstream library versions and may or may not change |

### Compatibility Table

The compatibility table is at `kafka-connector/upcoming/source/compatibility.txt`.
It is prose-based rather than a versioned matrix. Review it for any
out-of-date version references and update as needed for major and minor
releases.

---

## Spark Connector

### Version Constants

| Constant | Notes |
|----------|-------|
| `current-version` | Update to the new version |
| `spark-core-version` | Update if the Spark version dependency changed |
| `spark-sql-version` | Update if the Spark SQL version dependency changed |

### Compatibility Updates

For major and minor releases, check
`spark-connector/upcoming/source/index.txt` for version references that
need updating.

---

## Atlas CLI

### Command Reference Pages

The `command/` directory in `upcoming/source/` contains generated
command reference pages. These must be regenerated from the CLI binary
after each release using the commands script. After regeneration, run
the RST syntax fixes script to correct formatting issues in the output.
Both scripts run locally — see the Atlas CLI wiki for the exact commands:
https://wiki.corp.mongodb.com/spaces/DE/pages/165790822

### Compatibility Table

The compatibility table at `atlas-cli/upcoming/source/compatibility.txt`
lists supported operating systems and Atlas/Server versions. Review and
update for major and minor releases.

### EOL Rotation

Atlas CLI keeps only the five most-recent versions online. On each minor
or major release, the sixth-oldest is EOL'd:

1. Update the docset's redirects per the Atlas CLI section of whichever
   redirect reference applies (see Step 8 routing): the EOL REDIRECTS /
   CATCH ALLS instructions in `netlify-toml-updates.md` for `netlify.toml`,
   and/or the EOL 301 entry in `nextjs-redirects-updates.md` for
   `<slug>-redirects.json`.
2. Remove the EOL'd version from `targetBranchChoices` in
   `.backportrc.json` (see Step 6).
3. Follow the Snooty sunset procedure on the EOL'd version:
   https://wiki.corp.mongodb.com/spaces/DE/pages/126664998

### DocHub URL

After publishing a new major or minor version, create a DocHub URL so
the version remains reachable after it eventually sunsets. Pattern:

```toml
[[redirects]]
from = "/core/atlas-cli-v1.55"
to = "https://www.mongodb.com/docs/atlas/cli/v1.55/"
```

For the DocHub repo and update procedure, see
https://wiki.corp.mongodb.com/spaces/DE/pages/239738437.

Surface this as a Step 11 reminder — DocHub lives outside the monorepo
and cannot be updated from the version-update PR.

---

## Atlas Kubernetes Operator (AKO)

### No snooty.toml Version Constant

AKO has no version constant in `snooty.toml`. The version is implicit in
the directory name. No Step 4 changes apply.

### Compatibility Table

Add a new row at the top of the table in
`atlas-operator/upcoming/source/ak8so-compatibility.txt` for each new
release. The table is per-row (one row per released version), not
range-based. Columns are: AKO version, release date, Kubernetes
versions, OpenShift version, and base image.

### CRD Reference Pages

AKO generates CRD reference pages from the Kubernetes API. After each
release, run the Python script in
`atlas-operator/upcoming/tools/ako-crds/src/` to regenerate the content
in `upcoming/source/includes/generated-crds/`. The generated files must
be committed with the release PR. See `generate.sh` in that directory for
the exact command.

---

## MongoDB Controllers for Kubernetes (MCK)

### Version Constants

In addition to the standard snooty.toml update (Step 4):

| Constant | Notes |
|----------|-------|
| `version` | Primary version constant |
| `dl-version` | Download URL version; update in sync with `version` |

### Compatibility Table

Update `kubernetes/upcoming/source/tutorial/plan-k8s-op-compatibility.txt`
for each release to reflect the new MCK version and any
Kubernetes / MongoDB Server / Ops Manager support changes. Confirm the
exact values with engineering in `#docs-kubernetes` before
publishing.

### Support Lifecycle (Major Releases Only)

On a major release, update
`kubernetes/upcoming/source/reference/support-lifecycle.txt`:

1. Add a row for the new major version with EOL date `TBD`.
2. Update the previous major's EOL date to **12 months after the new
   version's release date** (MCK support lifecycle policy).

### Third-Party License Update

For each release, fetch the updated third-party license file from GitHub
and update `upcoming/source/third-party-licenses.txt`. Source:
`https://github.com/mongodb/mongodb-kubernetes/blob/{version}/LICENSE-THIRD-PARTY`.
See the MCK wiki for the legacy license-tool script context:
https://wiki.corp.mongodb.com/spaces/DE/pages/147006656

### Code Example Updates

Code example updates for MCK typically come via upstream PRs from the
engineering team. Confirm with the team whether any code examples need
updating before opening the release PR.

### Minor and Patch: Backport Release Notes

After merging to `main`, backport the release notes changes to the
active major version branch (e.g., `v1.4`) using the backport tool.

### Major Release: Tracking Branch

On a major release, set the upstream tracking branch for the new `current`
directory:

```bash
git branch -u origin/vX.x content/kubernetes/current
```

Replace `vX.x` with the new major version alias.

---

## Mongosync

### Code Freeze Announcement

Before each minor release, announce the documentation code freeze in the
Mongosync team Slack channel. The freeze typically begins ~3 days before
the release date. Confirm the exact timing with the Mongosync team.

### Release Notes

Mongosync release notes are authored by the writer (no GitHub source to
fetch). Ensure the per-version release notes file exists at
`current/source/release-notes/{version}.txt` and that the index at
`current/source/release-notes.txt` links to it before opening the PR.

---

## MongoCLI

MongoCLI is patch-only in the monorepo. The submodule update is handled
in Step 9. The only additional step is the Hapley selector label update —
see `hapley-updates.md`.

---

## Server Manual

Product-specific steps for the Server Manual are documented in
`server-manual-prerequisites.md` (pre-release checks) and
`server-manual-manual-steps.md` (post-automation steps). Those files
take precedence over this one for the Server Manual.
