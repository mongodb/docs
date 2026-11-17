# Versioning Catalog Updates

Load this file for Step 7C. It documents the version selector changes required for each docset and release type.

`platform/versioning/projects/<project>.ts` is the source of truth for which versions a docs site publishes and how the version dropdown presents them. Each file default-exports a `defineDocset()` call; the versions live in the `versions` property of the object passed to it, and the array order is the dropdown order, top to bottom. `platform/versioning/README.md` is the authoritative description of the schema — read it if a case here is not covered.

A file looks like this (`csharp.ts`, versions trimmed):

```ts
import { defineDocset } from "../define";

export default defineDocset({
	project: "csharp",
	displayName: "C#/.NET Driver",
	prefix: "docs/drivers/csharp",
	search: { categoryTitle: "C# Driver" },
	versions: [
		{ name: "upcoming", noIndexing: true },
		{ name: "current", label: "v3.x (current)", stable: true },
		{ name: "v2.x" },
		{ name: "v3.6", active: false },
		{ name: "v2.29", active: false, eol: "download" },
	],
});
```

Only the `versions` array changes during a version update — plus, for the Server Manual, the `groups` array that splits its dropdown. `project`, `displayName`, `prefix`, and `search` are site-level settings — leave them alone. These files are tab-indented; match the surrounding style, and follow `platform/CLAUDE.md`, which says not to add comments by default.

These are edits in the version-update PR, not post-merge steps. They take effect when the PR merges and the site deploys. Flag them as a `platform/` change in the Step 11 change summary.

The file is named for the docset's Snooty project name (the `name` in `content/<docset>/snooty.toml`), which may differ from the content directory name — for example `docs.ts` for `content/manual` and `pymongo.ts` for `content/pymongo-driver`.

This file covers adding a version to a docset that already has a project file. Creating a project file for a brand-new docs site is a different process — it also requires registering the file in `platform/versioning/index.ts`, in both the import list and the `projects` array. That is out of scope for a version update. If the docset has no file in `platform/versioning/projects/`, stop and tell the user rather than creating one.

## Version fields

| Field | Meaning |
|---|---|
| `name` | Required. Must exactly match the version's directory name under `content/<docset>/`, and is also the URL segment and the search key suffix. |
| `label` | What the version dropdown shows. Defaults to `name`. Use it to pin down what a moving name such as `current` currently points at. |
| `active` | `false` removes the version from the main version dropdown, the sitemap, and search. If it also has an `eol` value it still appears in the separate deprecated-version selector. Defaults to `true`. |
| `stable` | The version readers land on by default. At most one active version per docset; a second one fails the build. |
| `noIndexing` | Adds a `noindex` robots tag and keeps the version out of search, while leaving it in the dropdown and reachable by direct link. Typical for `upcoming`. |
| `eol` | `"download"` or `"link"` — how an inactive version is still offered. Only meaningful with `active: false`. |
| `offlineUrl` | Direct URL to the version's offline archive, if one is published. |

There is no URL slug or URL alias field. A version is reachable only at its `name`; any second URL for it is a redirect, handled in Step 8.

---

Find the docset's section below, apply its steps for this release type, then run the checks in **Checking your edit** at the end of this file.

## Standard Drivers and Providers

Covers these project files in `platform/versioning/projects/`: `c.ts`, `csharp.ts`, `cpp-driver.ts`, `golang.ts`, `java.ts`, `java-rs.ts`, `kotlin.ts`, `kotlin-sync.ts`, `laravel.ts`, `node.ts`, `php-library.ts`, `pymongo.ts`, `ruby-driver.ts`, `rust.ts`, `scala.ts`.

Every docset in this group has the same catalog shape: an `upcoming` entry, a `current` entry labelled `vX.x (current)`, and one archive entry per major version. `laravel.ts` differs from the others only in where its release notes come from, which the `drivers-release-notes` skill handles; its catalog edit is identical.

**Patch release**: No catalog changes.

**Minor release**: No catalog changes. Minor versions fold into the `vX.x` directory the major release created; the version dropdown does not change.

**Major release** (example: v3 → v4):

1. Open the docset's `.ts` file in `platform/versioning/projects/`.
2. Update the `current` entry's `label` to the new major version — `{ name: "current", label: "v4.x (current)", stable: true }`. Leave `name` and `stable` alone: `current` is still the directory the new release lives in, and still the version readers land on.
3. Insert an entry for the directory Step 5 archived, directly below `current`: `{ name: "v3.x" }`. The `name` must match the new directory exactly.

## Entity Framework and Django

Both archive exact minor versions (for example `v10.0`, `v10.1`) rather than per-major aliases, so catalog changes are required for **major and minor** releases.

**Patch release**: No catalog changes.

**Major or minor release** (example: v10.0 → v10.1): Follow the **Standard Drivers — Major release** steps above, substituting the exact minor version for the `vX.x` alias.

## Atlas CLI

**Patch release**: Update the `current` entry's `label` to the new patch version — `{ name: "current", label: "current (v1.59.1)", stable: true }`. Only `current` shows a patch version in the dropdown. No new entry.

**Minor or major release** (example: v1.58 → v1.59):

1. Update the `current` entry's `label` to the new version, including the patch number: `{ name: "current", label: "current (v1.59.0)", stable: true }`.
2. Insert an entry for the directory Step 5 archived, directly below `current`: `{ name: "v1.58" }`.

The `upcoming` entry carries no label and needs no change.

## Atlas Kubernetes Operator (AKO)

**Patch release**: No catalog changes.

**Minor or major release**: Follow the **Standard Drivers — Major release** steps above, using the exact minor version (for example `v2.14`) rather than a `vX.x` alias. AKO labels carry the version in the `current` entry only.

## MongoDB Controllers for Kubernetes (MCK)

**Patch and minor release**: No catalog changes. MCK only creates a new docs version on major releases.

**Major release**: Follow the **Standard Drivers — Major release** steps above. MCK labels every entry with its exact patch version (`{ name: "v1.12", label: "v1.12.0" }`), so give the archived entry a `label` as well as a `name`.

## Kafka Connector

**Patch release**: No catalog changes.

**Minor or major release**: Follow the **Standard Drivers — Major release** steps above, using the exact minor version (for example `v2.1`) rather than a `vX.x` alias. Kafka Connector archives per minor version.

## Spark Connector

**Patch and minor release**: No catalog changes. Minor versions fold into the `vX.x` directory.

**Major release**: Follow the **Standard Drivers — Major release** steps above.

## Mongosync

Mongosync has no `upcoming` directory. `current` always holds the latest released version, and Step 5 copies it to the version being archived.

**Minor release** (example: v1.21 → v1.22):

1. Update the `current` entry's `label` to the new version — `{ name: "current", label: "v1.22 (current)", stable: true }`.
2. Insert an entry for the archived copy, directly below `current`: `{ name: "v1.21" }`.

## MongoCLI

MongoCLI is patch-only in the monorepo.

**Patch release**: Update the `current` entry's `label` to the new patch version — `{ name: "current", label: "2.0.9 (current)", stable: true }`. Only `current` shows a patch version in the dropdown. No new entry, and no change to `upcoming`.

## Server Manual

The Server Manual flip relabels two existing entries as well as adding one, because `manual` always holds the released Manual and the version it holds changes with each flip.

Make these edits in PR 3, the configuration PR — see `server-manual-pr3.md`. PR 1 has already renamed `manual/` to `v{OUTGOING}/` by then, so the newly archived version has a content directory on the branch and `lint` accepts its entry.

In `platform/versioning/projects/docs.ts`:

1. Update the `upcoming` entry's `label` to the new in-development version — `{ name: "upcoming", label: "9.1 (Upcoming)", noIndexing: true }`.
2. Update the `manual` entry's `label` to the newly released version. `manual` keeps `stable: true` — it is the directory the released Manual always lives in.
3. Add an entry for the newly archived version (for example `{ name: "v8.3", label: "8.3" }`), and add it to the `includedVersions` array of the correct `groups` entry. The Manual splits its dropdown into **Major Release** and **Minor Release** groups; a version missing from both still appears, but above the groups rather than in them.
4. To retire an older version once that is confirmed, set `active: false` on it and add `eol: "download"`.

## Atlas Architecture Center

Handled in `aac-workflow.md`, which sequences the catalog edits around the offline bundle build. Do not apply this file's per-docset steps to AAC; **Checking your edit** below still applies.

---

## Checking your edit

Run `pnpm install` in `platform/` first, if you have not already — without it the lint fails with `tsx: command not found`. Then, from `platform`, run the two checks in this order:

```bash
pnpm --filter versioning typecheck
pnpm --filter versioning lint
```

Run `typecheck` first. `defineDocset` types the object you edited, so it catches the mistakes a hand edit to a `versions` array makes: a misspelled field key, a wrong value type, a field that does not exist.

Then run `lint`. It checks the versioning data against the content directories and the table-of-contents data, and reports duplication and data collisions. Two of its findings matter here:

- **An active version with no content directory on the branch** is an error. Add the version in the same PR as its content, not before.
- **A table-of-contents version gate naming a version the catalog does not have** is a warning — treat it as a blocker. Gates are the `versions: { includes }` and `versions: { excludes }` keys in the ToC files. A gate that names a version the catalog does not have **fails open**: an `excludes` silently stops hiding its item, an `includes` silently stops showing it, and no other build check catches it. This is the finding that catches a Step 7A or 7B version name that disagrees with the Step 7C catalog entry, so fix it before opening the PR even though the lint still exits successfully.

Both checks also run in CI, so a failure here is a failure on the PR.

Last, confirm by eye that the entry you added landed where this file told you to put it, since neither check enforces ordering. Check that one entry only — do not reorder the rest of the array. These arrays are not strictly sorted and are not meant to be: a `vX.x` alias entry sits directly below `current` in some docsets (`csharp.ts`, `golang.ts`, `node.ts`) and at the end of the array in others (`java-rs.ts`, `scala.ts`, `ruby-driver.ts`), and several docsets have an unsorted tail of old inactive versions (`bi-connector.ts`, `ops-manager.ts`, `docs.ts`). Resorting any of that is out of scope for a version update and changes the dropdown for versions you did not touch.
