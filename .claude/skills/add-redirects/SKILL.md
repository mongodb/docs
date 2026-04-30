---
name: add-redirects
description: "Add redirects to a MongoDB documentation project's netlify.toml when pages are renamed, moved, or deleted under content/. Use this skill when the user mentions adding redirects, when page .txt files are renamed/moved/deleted in content/*/source/, or when the check-redirects-needed hook flags pending page changes. Handles per-version redirects, ambiguity resolution for deletes, and correct placement in the existing netlify.toml structure."
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

### Directory-move detection (do this before resolving individual URLs)

After listing all renames, check whether any group of renames represents a whole-directory move. A directory move has occurred when:

1. All renames in the group share the **same source directory prefix** (the path up to the deepest common directory component), AND
2. All renames in the group share the **same destination directory prefix**, AND
3. The relative filenames are preserved (each file's name is identical in source and destination).

If those three conditions hold for a group of **four or more files**, **use a splat wildcard instead of individual entries**. For groups of three or fewer renames, write individual entries even if all three conditions are met — small moves are more readable and precise as explicit entries, and a splat is not worth the generality for two or three URLs.

For **unversioned projects**, one entry covers all content:

```toml
[[redirects]]
from = "/docs/<slug>/<old-dir>/*"
to = "/docs/<target-slug>/<new-dir>/:splat"
```

For **versioned projects**, Netlify does not support combining a `:version` named parameter with a `:splat` in the same rule. Write one entry per active version with the version hardcoded in the path:

```toml
[[redirects]]
from = "/docs/<slug>/v8.0/<old-dir>/*"
to = "/docs/<slug>/v8.0/<new-dir>/:splat"

[[redirects]]
from = "/docs/<slug>/v7.0/<old-dir>/*"
to = "/docs/<slug>/v7.0/<new-dir>/:splat"
```

Use the active version list from the ALIAS REDIRECTS section (see Step 6) to determine which versions need entries. Do not write entries for EOL versions.

Before writing the splat(s), check the netlify.toml for conflicts:
- If any file in the group already has an individual `from =` entry (especially with `force = true`), that file's existing redirect takes precedence. Write the splat anyway for the group — the more-specific entry above it will match first. Do not skip the splat because of one exception.
- If the splat itself (`from = ".../*"`) already exists in the file pointing to the same destination, skip writing it.
- Place the splat in the WILDCARD REDIRECTS section (or above the CATCH ALLS if no WILDCARD section exists), not in PAGE-SPECIFIC REDIRECTS.

If the directory move only partially applies (some files in the source directory were not renamed), do not use a splat — write individual entries for each renamed file only.

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

**The netlify.toml is authoritative.** Open the project's `netlify.toml` and read the URL shape from existing `[[redirects]]` entries — use that shape exactly. Do not rely solely on `name` from `snooty.toml`; treat it as a starting guess only. Do not invent a URL pattern the project does not already use.

Non-versioned projects (e.g., `atlas`, `compass`) have a single `source/` at the project root; the path maps directly with no version segment.

## Step 3: Check for legacy redirect format

Before writing anything, check whether the project also has a `config/redirects` file (the legacy `mut` format used by older projects such as `ops-manager`, `bi-connector`, `kubernetes-operator`).

```bash
ls content/<project>/*/config/redirects 2>/dev/null
```

If `config/redirects` exists **and** `netlify.toml` also exists:
- Use `netlify.toml`. It is always the authoritative redirect source, even when `config/redirects` is also present.
- Do not mention `config/redirects` to the user. Do not write to it. Proceed directly to Step 4.

If only `netlify.toml` exists (the common case), continue to Step 4 without any flag.

If only `config/redirects` exists (no `netlify.toml`):
- This project is outside the scope of this skill. Surface the unsupported format to the user and stop.

## Step 4: Find the insertion point in netlify.toml

Each project's `netlify.toml` lives at `content/<project>/netlify.toml` (outside version folders). It is divided into labeled sections, typically in this order:

1. Metadata / build config
2. `# OFFLINE REDIRECTS`
3. `# ALIAS REDIRECTS`
4. `# WILDCARD REDIRECTS`
5. `# PAGE-SPECIFIC REDIRECTS` — usually subdivided by version (`## current`, `## v8.0`, `## v7.0`)
6. `# CATCH ALLS` — must remain last

Insert new page-level redirects in the **PAGE-SPECIFIC REDIRECTS** section, under the matching version heading. Place more-specific entries above more-general ones. **Never move or edit the CATCH ALLS block.**

If the file has no section markers, append new entries at the end of the file — but before any `# CATCH ALLS` block if one exists. Never insert after the CATCH ALLS.

## Step 5: Write the redirect entry

The standard form is:

```toml
[[redirects]]
  from = "/docs/<slug>/<old-path>/"
  to = "/docs/<slug>/<new-path>/"
```

Omit both `status` and `force`. Do not add `force = true` — it is only needed when the source file still exists on the filesystem, which should not be the case for renamed or deleted pages. Match the indentation style of neighboring entries.

For versioned projects, complete Step 6 before writing entries — the wildcard vs. per-version decision must be made first.

## Step 6: Handle versioned and backported changes

When renames or deletes appear in multiple version directories of the same project, determine whether a wildcard or per-version entries are correct before writing anything.

### Determine the active versions

Read the project's `netlify.toml` ALIAS REDIRECTS section. Each `from = "/docs/<slug>/<version>/*"` line names an active version (or an alias pointing to one). Versions that appear only in OFFLINE REDIRECTS are EOL — do not write redirects for them.

### Wildcard vs. per-version decision

Group the changed files by their **relative path** (the part after `source/`). For each group:

**All active versions affected → use a `:version` wildcard** (one entry covers all):
```toml
[[redirects]]
from = "/docs/<slug>/:version/<old-path>/"
to = "/docs/<slug>/:version/<new-path>/"
```
Place this in the WILDCARD REDIRECTS section (or wherever the file already puts cross-version wildcards). Do not also write per-version entries for the same path — that creates duplicates.

**Only some active versions affected → write one entry per affected version**, each under its respective `## <version>` subheading in PAGE-SPECIFIC REDIRECTS. Use the hardcoded version in the path (e.g., `/docs/v8.0/...`), not `:version`.

**A wildcard redirect already covers the old path → no new entry needed.** Check the WILDCARD REDIRECTS section before writing anything. If an existing `from = "/docs/:version/<old-path>/*"` already resolves to the right destination, skip.

If the change was only backported to some versions, redirects may also be needed in the *opposite direction* on versions that did not move — confirm with the user before writing reverse redirects.

## Step 7: Validate

- **Self-redirect check:** `from` and `to` must not be equal.
- **Chain check:** the `to` target must not itself appear as a `from` elsewhere in the file (the CI Redirect Linter will block either case).
- **Ordering check:** new entries are above CATCH ALLS and in a reasonable spot relative to more-general wildcards.
- **Style check:** indentation and field order match the surrounding entries.

## Step 8: Summarize and hand off

Report to the user:

- Each change detected and how it was classified.
- Each `[[redirects]]` block added, with its destination section and version.
- Any ambiguities that required user confirmation.
- Any cases where no redirect was needed and why.

## Step 9: Add a redirect testing section to the PR description

**This step is required every time redirects are written, regardless of whether a PR already exists.** Do not consider this skill complete until Step 8 is finished.

If a PR already exists for this branch, add the section using `gh pr edit`. If no PR exists yet, prepare the section text and tell the user to include it when they open the PR.

Add the following section to the PR description:

```markdown
## Test the redirect

For human reviewers: to test the redirect links, append the **old** file path to the staging link when available. Watch it redirect to the new path in staging.

**Note:** The testing links only work when:

- The Netlify build is complete.
- There are no build errors related to the files you renamed or removed.
- The Netlify cache is cleared of the original files. For example, if you renamed or removed files in a follow-up commit, try rebuilding by clicking **Retry without cache with latest branch commit** in the Netlify UI.
```