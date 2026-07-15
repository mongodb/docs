---
name: add-redirects
description: Add redirects when MongoDB documentation pages are renamed, moved, or deleted under content/. Use this skill when page .txt files are renamed/moved/deleted in content/*/source/.
---

# Add Redirects for MongoDB Docs

When a published documentation page is renamed, moved, or deleted, the old URL must continue to resolve. This skill classifies pending page changes and adds the appropriate `[[redirects]]` entries to the project's `netlify.toml`.

## When this skill applies

Add redirects when a `.txt` page has been renamed, moved, or deleted from:

- `content/<project>/<version>/source/` (versioned projects)
- `content/<project>/source/` (unversioned projects such as `atlas` or `compass`)

Do **not** trigger for files under any of these paths:

- `includes/` — include files and YAML snippets
- `images/` — image assets
- `content/code-examples/tested/` — canonical Grove-tested snippets (repo root)
- `source/code-examples/` — per-project symlink to Grove-tested snippets
- `includes/code-examples/` — product-specific non-Grove example scripts

Also do **not** add redirects for:

- Typo fixes inside an existing redirect entry.
- New pages that do not replace a previous URL.

## Step 1: Enumerate the pending changes

Run **two commands** and combine the results — do not rely on only one:

```bash
# All changes on this branch vs main (committed or not)
git diff --name-status origin/main...HEAD

# Uncommitted changes not yet in any commit
git diff --name-status HEAD
```

Filter both outputs to `.txt` files under `content/<project>/source/`, excluding `/includes/`. Deduplicate. This is the complete set of page changes that need redirects — do not limit to only the most recent commit.

Also list untracked new `.txt` pages with:
```bash
git ls-files --others --exclude-standard 'content/*/source/**/*.txt'
```

Classify each entry:

| Status | Meaning | Redirect action |
|---|---|---|
| `R<score>` old new | Rename (git-detected) | Deterministic: old URL → new URL |
| `D` path | Delete | **Ambiguous** — ask user for target |
| `A` path | Addition | Usually none; ask if it replaces a deleted page |
| Untracked new file | Addition | Same as `A` |

**Cross-project move detection:** Before treating a `D` as an ambiguous delete, check whether any `A` entry in a *different* project shares the same filename and a similar relative path. If so, flag it to the user as a probable cross-project move (e.g., a page moved from `content/atlas/` to `content/atlas-vector-search/`) and confirm the redirect target before writing anything. Do not assume the match is correct — the user must confirm.

For any ambiguous case (D, or suspected manual rename that git didn't detect), stop and ask the user before writing the redirect. Present a maximum of three options (e.g., parent page / sibling page / catch-all).

**Handle all changes in one pass.** List every pending deletion/rename to the user upfront, collect all redirect targets, then write all entries at once. Do not process one file and stop.

### Build paradigm

MongoDB documentation projects use two different build types:

* **snooty-based** projects, legacy (e.g., `manual`, `compass`) use `netlify.toml` for redirects.
* **next.js-based** projects (e.g., `atlas`) use `platform/docs-nextjs/src/redirects/<project>-redirects.json` for redirects.

As we migrate all projects to next.js, this skill must check for the presence of `netlify.toml` and `platform/docs-nextjs/src/redirects/<project>-redirects.json` for a content site that contains changes. If `netlify.toml` exists, this skill must update the project's `netlify.toml` file and the appropriate `platform/docs-nextjs/src/redirects/<project>-redirects.json` file, if it exists. If `netlify.toml` does not exist, update only the JSON file.

Run this command to check for `netlify.toml` each project with renamed / deleted / added `.txt` files:

```bash
ls content/<project>/netlify.toml 2>/dev/null
```

Run this command to check for `<project>-redirects.json` each project with renamed / deleted / added `.txt` files:

```bash
ls platform/docs-nextjs/src/redirects/<project>-redirects.json 2>/dev/null
```

Sections below contain references for updating redirects for both paradigms. The general process is the same, but the file format and insertion point differ.

### Directory-move detection (do this before resolving individual URLs)

After listing all renames, check whether any group of renames represents a whole-directory move. A directory move has occurred when:

1. All renames in the group share the **same source directory prefix** (the path up to the deepest common directory component), AND
2. All renames in the group share the **same destination directory prefix**, AND
3. The relative filenames are preserved (each file's name is identical in source and destination).

If those three conditions hold for a group of **four or more files**, **use a splat wildcard instead of individual entries**. For groups of three or fewer renames, write individual entries even if all three conditions are met — small moves are more readable and precise as explicit entries, and a splat is not worth the generality for two or three URLs.

For **unversioned projects**: load references/non-version-directory-change-toml.md for toml example. Load references/non-version-directory-change.json for JSON example.

For **versioned projects**: load references/version-directory-change-toml.md for toml example. Load references/version-directory-change-json.md for JSON example.

Do not write entries for EOL versions.

If the directory move only partially applies (some files in the source directory were not renamed), do not use a splat or path wildcard — write individual entries for each renamed file only.

## Step 2: Resolve file path → URL

File paths map to URLs via the project's `snooty.toml`. For versioned projects, each version has its own `snooty.toml` at `content/<project>/<version>/snooty.toml`; read the one for the version being changed. For unversioned projects, read `content/<project>/snooty.toml`. In both cases, look for:

- `name` — a hint at the project slug, but **not always equal to the URL segment**. Some projects use a different value (e.g., Atlas has `name = "cloud-docs"` but serves at `/docs/atlas/`).
- `url` — the production URL base (sanity check only).

General mapping:

```
content/<project>/<version>/source/<path>/<name>.txt
  →  /docs/<project-slug>/<version-segment>/<path>/<name>/
```

Where `<version-segment>` depends on the project's directory naming convention:

- `current/` often maps to no version segment or to the default version alias.
- `v8.0/` maps to `v8.0`.
- `upcoming/` maps to `upcoming`.

**Special case — MongoDB Manual:** The manual uses a nested directory structure. `content/manual/manual/` is the "current" release and maps to `/docs/manual/` (no version segment). `content/manual/upcoming/` maps to `/docs/upcoming/`, and `content/manual/v8.0/` maps to `/docs/v8.0/`. When working in `content/manual/manual/`, use `/docs/manual/` as the URL base, not `/docs/manual/manual/`.

**The netlify.toml and <project>-redirects.json are authoritative.** If present, open the project's `netlify.toml` and read the URL shape from existing `[[redirects]]` entries — use that shape exactly. Do not rely solely on `name` from `snooty.toml`; treat it as a starting guess only. Do not invent a URL pattern the project does not already use. If `netlify.toml` is absent, rely on URL shape from objects in `<project>-redirects.json`.

Non-versioned projects (e.g., `atlas`, `compass`) have a single `source/` at the project root; the path maps directly with no version segment.

## Step 3: Find the insertion point

### netlify.toml

Each project's `netlify.toml` lives at `content/<project>/netlify.toml` (outside version folders). It is divided into labeled sections, typically in this order:

1. Metadata / build config
2. `# OFFLINE REDIRECTS`
3. `# ALIAS REDIRECTS`
4. `# WILDCARD REDIRECTS`
5. `# PAGE-SPECIFIC REDIRECTS` — usually subdivided by version (`## current`, `## v8.0`, `## v7.0`)
6. `# CATCH ALLS` — must remain last

Insert new page-level redirects in the **PAGE-SPECIFIC REDIRECTS** section, under the matching version heading. Place more-specific entries above more-general ones. **Never move or edit the CATCH ALLS block.**

If the file has no section markers, append new entries at the end of the file — but before any `# CATCH ALLS` block if one exists. Never insert after the CATCH ALLS.

### <project>-redirects.json

Each project's JSON file lives at `platform/docs-nextjs/src/redirects/<project>-redirects.json`. It is a flat array of objects with `source` and `destination` fields. Insert new entries at the end of the array. Do not reorder existing entries or create duplicate entries.

## Step 4: Write the redirect entry

The standard form toml form is found in references/standard-redirect-form-toml.md. The standard JSON form is found in references/standard-redirect-form-json.md.

For versioned projects, complete Step 5 before writing entries — the wildcard vs. per-version decision must be made first.

## Step 5: Handle versioned and backported changes

When renames or deletes appear in multiple version directories of the same project, determine whether a wildcard or per-version entries are correct before writing anything.

### Determine the active versions

Read the project's `snooty.toml` for each version. If `eol = true`, the version is end-of-life — do not write redirects for them.

### Wildcard vs. per-version decision

Group the changed files by their **relative path** (the part after `source/`). For each group:

**All active versions affected → use a `:version` wildcard** (one entry covers all): load references/all-versions-affected-toml.md for toml example. Load references/all-versions-affected.json for JSON example.


Do not also write per-version entries for the same path — that creates duplicates.

**Only some active versions affected → write one entry per affected version**

- **`netlify.toml`**: each under its respective `## <version>` subheading in PAGE-SPECIFIC REDIRECTS. Use the hardcoded version in the path (e.g., `/docs/v8.0/...`), not `:version`.
- **JSON**: Use the hardcoded version in the path (e.g., `/docs/v8.0/...`), not `:version`.

**A wildcard redirect already covers the old path → no new entry needed.** If an existing `from = "/docs/:version/<old-path>/*"` or `source = "/docs/:version/:path*"` already resolves to the right destination, skip.

If the change was only backported to some versions, redirects may also be needed in the *opposite direction* on versions that did not move — confirm with the user before writing reverse redirects.

## Step 6: Validate

- **Self-redirect check:** `from` and `to` or `source` and `destination` must not be equal.
- **Chain check:** the `to` or `source` target must not itself appear as a `from` or `destination` elsewhere in the file (the CI Redirect Linter will block either case).
- **Ordering check: (for `netlify.toml` files only)** new entries are above CATCH ALLS and in a reasonable spot relative to more-general wildcards.
- **Style check:** indentation and field order match the surrounding entries.

## Step 7: Summarize and hand off

Report to the user:

- Each change detected and how it was classified.
- Each redirect block added, with its destination section and version.
- Any ambiguities that required user confirmation.
- Any cases where no redirect was needed and why.
