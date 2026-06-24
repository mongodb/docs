# ToC Updates

Load this file for Step 7. It documents version array and docset data file
locations, along with what to update per docset and release type. All paths
are relative to the repository root.

---

## Version Arrays (`content/table-of-contents/version-arrays/`)

Version array files define the ordered list of versions, deprecated
versions, and named aliases (`current`, `upcoming`) for the version
dropdown. Not all docsets have a version array file.

### File locations

| Docset | File |
|--------|------|
| `csharp` | `drivers/csharp-versions.ts` |
| `cpp-driver` | `drivers/cpp-versions.ts` |
| `java` | `drivers/java-versions.ts` |
| `java-rs` | `drivers/java-rs-versions.ts` |
| `kotlin` (coroutine) | `drivers/kotlin-coroutine-versions.ts` |
| `kotlin-sync` | `drivers/kotlin-sync-versions.ts` |
| `node` | `drivers/node-versions.ts` |
| `rust` | `drivers/rust-versions.ts` |
| `scala-driver` | `drivers/scala-versions.ts` |
| `kafka-connector` | `cloud-docs/kafka-connector.ts` |
| `mongosync` | `server-docs/mongosync.ts` |
| `manual` | `server-docs/manual.ts` |

**No version array file**: golang, ruby, php-library, pymongo-driver,
swift, terraform, cloudformation, entity-framework, atlas-cli,
spark-connector, mongocli, atlas-operator (AKO), kubernetes (MCK).

### Update rules

#### Standard per-major drivers (csharp, cpp, java, java-rs, kotlin,
kotlin-sync, node, rust, scala)

These version arrays use per-major aliases (`v3.x`, `v4.x`) rather than
exact minor versions. A minor release does not change the array.

**Patch release**: No changes.

**Minor release**: No changes.

**Major release** (example: v3 → v4):
1. In `allVersions`, insert the new alias (e.g., `'v4.x'`) immediately
   before `'upcoming'`.
2. Update `namedVersions` so the new alias maps to `'current'`:
   ```ts
   const namedVersions = new Map<string, string>([['v4.x', 'current']]);
   ```

Example current state (`csharp-versions.ts`):
```ts
const allVersions = ['v2.x', 'v3.x', 'upcoming'];
const namedVersions = new Map<string, string>([['v3.x', 'current']]);
```

After a v4 major release:
```ts
const allVersions = ['v2.x', 'v3.x', 'v4.x', 'upcoming'];
const namedVersions = new Map<string, string>([['v4.x', 'current']]);
```

#### Kafka Connector (per-minor)

**Minor release** (example: v2.0 → v2.1):
1. Add the new version to `allVersions` (before the upcoming version).
2. Update `namedVersions` so the new version maps to `'current'` and the
   next planned version maps to `'upcoming'`:
   ```ts
   const namedVersions = new Map<string, string>([
     ['v2.1', 'current'],
     ['v2.2', 'upcoming'],
   ]);
   ```

#### Mongosync (per-minor, no `upcoming`)

**Minor release** (example: v1.20 → v1.21):
1. Add the new version to `allVersions` at the end.
2. Update `namedVersions` so the new version maps to `'current'`:
   ```ts
   const namedVersions = new Map<string, string>([['v1.21', 'current']]);
   ```

#### Server Manual

Every version bump updates both `allVersions` and `namedVersions`.
The manual uses two named aliases: `manual` (current stable) and
`upcoming` (next development version). Example after bumping to 8.3:

```ts
const allVersions = ['v6.0', 'v7.0', 'v8.0', 'v8.1', 'v8.2', 'v8.3', 'v9.0'];
const namedVersions = new Map<string, string>([
  ['v8.3', 'manual'],
  ['v9.0', 'upcoming'],
]);
```

---

## Docset Data (`content/table-of-contents/docset-data/`)

Docset data files define the navigation tree. Most entries use the
`:version` placeholder and require no change on release. The exceptions
are files that contain hardcoded external URLs with a version number
embedded (typically API documentation links) or files that contain
per-release release notes entries.

### Files with hardcoded API documentation URLs

These files contain external links with an exact version in the URL.
Update the URL to the new version on every minor or major release.

| Docset | File | URL pattern | Scope |
|--------|------|-------------|-------|
| `csharp` | `docset-data/csharp-driver.ts` | `https://mongodb.github.io/mongo-csharp-driver/{version}/api` | One entry; replace version |
| `java` | `docset-data/java-driver.ts` | `https://mongodb.github.io/mongo-java-driver/{version}/apidocs/...` | Multiple entries sharing one version; replace all |
| `java-rs` | `docset-data/java-rs.ts` | Same URL base | Same pattern as java |
| `kotlin` (coroutine) | `docset-data/kotlin-coroutine.ts` | Same URL base | Same pattern as java |
| `kotlin-sync` | `docset-data/kotlin-sync-driver.ts` | Same URL base | Same pattern as java |
| `scala-driver` | `docset-data/scala-driver.ts` | Same URL base | Same pattern as java |
| `node` | `docset-data/node-driver.ts` | `https://mongodb.github.io/node-mongodb-native/{version}` | One `current` entry; replace version |
| `pymongo-driver` | `docset-data/pymongo-driver.ts` | `https://pymongo.readthedocs.io/en/{version}/api/` | One entry; replace version |

**JVM note**: java, java-rs, kotlin-coroutine, kotlin-sync, and scala all
share the same `mongo-java-driver` URL base. All five docset-data files
must be updated in sync on every JVM driver release.

**No hardcoded API URL**: cpp-driver, rust, golang, ruby, php-library,
swift, terraform, cloudformation, atlas-cli, spark-connector, mongocli,
atlas-operator, kubernetes (MCK).

#### Update rules for standard per-major drivers

The API URL entry applies to `current` implicitly (no `versions`
filter, or `versions: { excludes: outdatedVersions }`). Replace the
version in the URL. Do not add separate per-version entries.

**Minor release**: Update the version in the URL (e.g., `5.6` → `5.7`).
**Major release**: Update the version in the URL.
**Patch release**: No change.

### Entity Framework (docset-data/entity-framework.ts)

Entity Framework keeps one API URL entry per archived version, and a
single shared entry for `current` and `upcoming`.

**Patch release (to `current`)**: Update the version in the
`versions: { includes: ['current', 'upcoming'] }` entry.

**Patch release (backport)**: Update the version in the entry for the
target archived version (e.g., `versions: { includes: ['v9.1'] }`).

**Minor or major release** (example: `v10.0` → `v10.1`):
1. Change the existing `current`/`upcoming` entry's `versions` field to
   `{ includes: ['v10.0'] }` (the version being archived).
2. Add a new entry immediately after with the new version URL and
   `versions: { includes: ['current', 'upcoming'] }`.

### Files with per-release release notes entries

These files require a new entry each release to expose the new release
notes page in the navigation.

#### Mongosync (`docset-data/mongosync.ts`)

Add a new release notes entry at the top of the release notes items
list. Use the pattern from existing entries:

```ts
{
  label: '1.21',
  contentSite: 'mongosync',
  url: '/docs/mongosync/:version/release-notes/1.21',
  versions: { excludes: mongosyncVersions.before('v1.21') },
},
```

The `versions.before()` call ensures the entry is hidden in older
archived versions that predate it.

#### Server Manual (`L2-data/release-notes.ts`)

Add or update the release notes entries in the `L2-data/release-notes.ts`
file. For a new release (example: 8.3 becoming stable, 9.0 becoming
upcoming):
1. Change the outgoing `(Upcoming)` entry label to `(Stable Release)`.
2. Add a new entry for the next upcoming version at the top, with
   `versions: { includes: ['upcoming'] }`.

---

## Docsets with no ToC changes on release

The following docsets require no changes to any file in
`content/table-of-contents/` on any regular release:

- `cpp-driver`, `rust`: standard per-major drivers with no API URL in
  docset-data
- `golang`, `ruby`, `php-library`, `swift`: no version array; no
  hardcoded API URL in docset-data
- `terraform`, `cloudformation`: standard per-major providers; no API
  URL in docset-data
- `atlas-operator` (AKO): `L2-data/atlas-k8s.ts` has no version-specific
  content; no version array
- `kubernetes` (MCK): `L2-data/mck.ts` structure uses `mck-legacy.ts`
  and `mck-upcoming.ts`; no version array; no changes observed in
  release commits
- `atlas-cli`: no version array; no hardcoded API URL in docset-data
- `spark-connector`: no version array; no hardcoded API URL in
  docset-data
- `mongocli`: patch-only; no archives; no version array
