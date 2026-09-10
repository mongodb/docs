---
name: snippet-automation
description: >
  Generate and sync Bluehawk snippets across MongoDB docsets. Use when the user
  asks to "run snip", "generate snippets", "sync snippets", "add snippet",
  "list snippets", "setup snippet for a docset", "set up a snippet source", or
  wants to extract and distribute content from a source docset to target
  docsets.
---

# Snippet Automation: Cross-Docset Content Sharing

Generate Bluehawk snippets from source files and distribute them to target docsets
using the `snip.js` tooling with manifest-based change tracking.

## Scope

**ALWAYS use when:**
- User asks to "run snip", "generate snippets", "sync snippets", "add snippet", or "list snippets"
- User wants to share content from one docset to others (atlas → search, vector-search, etc.)
- User needs to register, remove, or check monitored snippet files
- User wants to set up a new snippet source docset — add `snip.js`, `package.json`, and CI registration (also the version-flip setup for a versioned docset)

**NEVER use when:**
- Files are in `code-examples/tested/` → STOP, tell user to use Grove skill instead
- User wants Grove test suite snippets → STOP, wrong skill
- User wants to edit RST content directly → STOP, no skill needed

## Prerequisites

**CI automation (recommended):** No local setup required. GitHub Action handles everything.

**Local runs require:**
- Node.js v18+ (MUST have)
- npm (MUST have)
- Bluehawk CLI: `npm install -g bluehawk` (MUST install first — installed globally, not as a docset dependency)

## Required Markers (Proprietary Syntax)

Source files MUST contain these exact RST comments:

```rst
.. :snippet-start: snippet-name
.. :snippet-output: content/<target>/source/includes/path/filename.rst
(content here)
.. :snippet-end:
```

**Validation rules (enforce strictly):**
- `:snippet-output:` is REQUIRED — STOP if missing, tell user to add it
- Multi-snippet files MUST use explicit filenames, not directories — STOP if directory-only
- Snippet names MUST be unique within a file — STOP on duplicate `:snippet-start:` names
- Each block MUST have exactly one `:snippet-output:` — use comma-separated paths for multiple destinations, not repeated tags
- Output filename gets `-snippet-from-<source>` suffix automatically (do NOT add manually)
- Files in `code-examples/tested/` are FORBIDDEN — STOP immediately if detected. `snip.js` also enforces this: it skips these paths during directory traversal and rejects an explicit `--add` with `Excluded path, not added: <file>`

**References:**
- `references/bluehawk-syntax.md` — full syntax and validation rules
- `references/snip-js-config.md` — configured docsets and error messages
- `references/manifest-schema.md` — manifest structure for change tracking

## Versioned Docsets

Only ONE version per versioned docset can be a snippet source, because output filenames carry the docset name but not the version. For `self-managed-search` that version is `current`.

- Treat `:snippet-start:` markers in any other version (`upcoming`, `vX.Y`) as inert. They generate nothing. Do NOT add `:snippet-output:` tags to them to "fix" the invalid-marker report — that creates colliding output paths.
- If the user asks to sync a non-`current` version, STOP and explain that its markers activate only at version flip. See `references/snip-js-config.md` for the flip checklist.

## Commands

| Command | What It Does | Success Output |
|---------|--------------|----------------|
| `sync snippets` | Regenerate changed snippets across all docsets | `Sync complete: N file(s) changed, M snippet(s) written, X orphaned output(s) deleted.` |
| `sync snippets for <docset>` | Sync one docset only | Same as above, scoped to that docset's manifest |
| `add snippet <file>` | Register file for tracking | `Added to manifest: <path>` then `  Snippets: <names>` |
| `register snippets <dir>` | Bulk-register directory | `Registered N file(s) from <dir>` |
| `remove snippet <file>` | Stop tracking and delete output files | `Removed from manifest: <path> (N snippets, M output files deleted)` |
| `list snippets` | Show tracked files | `Monitored files (N):` then each file with its snippets and output paths |
| `setup snippet for <docset>` | Set up a new snippet source docset: copy `snip.js`, add `package.json`, register in CI, then init the manifest | drift check passes and `✓ Created empty manifest: <path>` |
| `init manifest` | Create empty manifest (aborts if exists) | `✓ Created empty manifest: <path>` |
| `reset manifest` | Clear all tracked files | `✓ Reset manifest: <path>` |
| `validate manifest` | Check markers, files, and hashes | `N valid, M out of sync, X missing or invalid` |
| `run snip` | One-off generation (no tracking) | Interactive prompt |

**CLI equivalent**: `cd <source-dir> && npm run snip -- --<flag>`, where `<source-dir>` is the docset's snippet root:

| Docset | `<source-dir>` |
|--------|----------------|
| atlas | `content/atlas/source` |
| self-managed-search | `content/self-managed-search/current/source` |

Only these two docsets have a `snip.js`. Destination docsets such as `search` and `vector-search` do not — they only receive generated output. Versioned docsets keep `snip.js` in one version only, so do NOT assume `content/<docset>/source`.

**Example**: `/snippet-automation add snippet includes/nav/list-data-explorer.rst`

## Automation

A GitHub Action (`.github/workflows/snippet-sync.yml`) automatically:

1. **Triggers** on PRs touching a configured docset's `includes/**` or its `snippet-manifest.json`. The paths are listed explicitly per docset, not globbed — `self-managed-search` is registered as `current/source/includes/**`, so markers in other versions never trigger it
2. **Installs Bluehawk** in the CI runner
3. **Runs `--sync`** for affected docsets with manifests
4. **Commits regenerated snippets** back to the PR branch

Writers don't need Bluehawk installed locally — CI handles regeneration.

## Manual Workflows

Every workflow starts by resolving the docset's source directory from the file path. Two shapes exist:

- `content/<docset>/source/...` → source dir is `content/<docset>/source`
- `content/<docset>/<version>/source/...` → source dir is `content/<docset>/<version>/source`, and only ONE version has `snip.js` (see Versioned Docsets above)

VERIFY the directory has a `snip.js` before running any command: `ls <source-dir>/snip.js`. If it is absent, that version is not a snippet source — STOP, UNLESS the user is setting one up (see "Set up a new snippet source docset" below, the one workflow that runs before `snip.js` exists).

All other commands below run from `<source-dir>`.

### Set up a new snippet source docset

Use when a destination docset needs to become a source, or when a versioned docset flips and the incoming version must take over sourcing (see Versioned Docsets above). `<source-dir>` is the new docset's snippet root — `content/<docset>/source` or, for a versioned docset, the single owning version's `content/<docset>/<version>/source`.

1. CONFIRM it is not already a source: `ls <source-dir>/snip.js` MUST be absent. If it exists, STOP — the docset is already set up; use the tracking workflows instead.
2. COPY an existing copy verbatim — do NOT hand-write one: `cp content/atlas/source/snip.js <source-dir>/snip.js`. The drift check (`.github/scripts/check-snip-drift.js`) requires every copy to be byte-identical apart from one line.
3. EDIT only `DEFAULT_START_DIRECTORY` in the new copy so it equals `<source-dir>` exactly (for example `content/foo/source`). The drift check FAILS if this value is anything other than the copy's own directory. Change nothing else.
4. ADD `package.json` in `<source-dir>` with `"type": "module"` (required for the ESM `import` syntax) and the `snip` script:

   ```json
   {
     "name": "<docset>",
     "private": true,
     "type": "module",
     "scripts": {
       "snip": "node snip.js"
     }
   }
   ```

   No `npm install` is needed — no dependencies are declared. Bluehawk is installed globally.
5. REGISTER the docset in `.github/workflows/snippet-sync.yml` with THREE edits:
   - Under `on.pull_request.paths`, add `content/<docset-path>/includes/**` and `content/<docset-path>/snippet-manifest.json`, where `<docset-path>` is `<source-dir>` minus the repo prefix.
   - In the `Detect changed docsets` step, add a `grep`/`DOCSETS` block appending the docset name when a matching file changes.
   - Add a `Sync <docset> snippets` step that `cd`s into `<source-dir>` and runs `--sync` when its manifest exists. Its `contains()` guard MUST use the space-padded form (`' {0} '`, `' <docset> '`) — an unpadded `search` would also match `self-managed-search` and fire the wrong step.

   Do NOT touch `check-snip-drift`: it discovers copies by walking `content/`, so the new copy is covered automatically.
6. INIT the manifest: `cd <source-dir> && npm run snip -- --init`.
7. VERIFY: run `node .github/scripts/check-snip-drift.js` (MUST exit 0) and `cd <source-dir> && npm run snip -- --validate`.
8. REPORT the files created (`snip.js`, `package.json`, `snippet-manifest.json`), the workflow edits, and the drift-check result.

**Version-flip variant:** these steps also cover a versioned docset's flip, where the incoming version takes over sourcing. One extra consideration applies — source files branched forward into the new version keep their `:snippet-start:` markers but LOSE their `:snippet-output:` tags. Restore the `:snippet-output:` tag on every such file before step 6, or `--validate`/`--sync` reports them as invalid and skips them.

**Worked example — converting `search` (a destination) into a source.** `<source-dir>` = `content/search/source`; each command maps to the numbered step above:

```bash
ls content/search/source/snip.js                              # 1. MUST print "No such file"
cp content/atlas/source/snip.js content/search/source/snip.js # 2. copy verbatim
# 3. edit copy: const DEFAULT_START_DIRECTORY = "content/search/source";
# 4. add content/search/source/package.json (block above, "name": "search")
# 5. snippet-sync.yml: add the two paths + a DOCSETS grep + a --sync step
#    guarded by contains(..., ' search ') — space-padded, else it also
#    matches self-managed-search
cd content/search/source && npm run snip -- --init            # 6.
node .github/scripts/check-snip-drift.js                      # 7. MUST exit 0
cd content/search/source && npm run snip -- --validate        # 7.
```

### Add a file to tracking

1. VERIFY markers exist and are well-formed. The minimum valid block is:

   ```rst
   .. :snippet-start: list-data-explorer
   .. :snippet-output: content/search/source/includes/nav/list-data-explorer.rst
   In |service|, go to the :guilabel:`Data Explorer` page.
   .. :snippet-end:
   ```

   If markers are missing or malformed, STOP and tell the user what to add. `--add` rejects the file rather than registering it, so bad markers cannot be fixed later by syncing.
2. EXECUTE: `npm run snip -- --add <file>`
3. VERIFY output exists: `ls content/<target>/source/includes/path/*-snippet-from-*.rst`
4. REPORT exactly: "Added [file] to manifest, generated [output] at [path]"

### Sync changed snippets

1. EXECUTE: `npm run snip -- --sync`
2. CHECK the exit code. Non-zero means files were skipped for invalid markers or failed to generate — the `Sync complete:` line still prints, so do NOT treat it alone as success.
3. If any `✗ Invalid: <file>` appeared, STOP and report which files were skipped and why. Fix markers, then re-run.
4. REPORT the `Sync complete: N file(s) changed, M snippet(s) written, X orphaned output(s) deleted.` counts.

### Remove a file from tracking

`--remove` DELETES generated output files. Confirm with the user before running it.

1. RUN `npm run snip -- --list` first and show the user which outputs will be deleted.
2. EXECUTE: `npm run snip -- --remove <file>`
3. VERIFY the deleted outputs are no longer referenced: `grep -rn "<basename>-snippet-from-" content/`. Any surviving `.. include::` will break the target docset's build — report these to the user.
4. REPORT the `Removed from manifest: <path> (N snippets, M output files deleted)` line.

## Error Handling (STOP conditions)

| Condition | Action |
|-----------|--------|
| Missing `:snippet-output:` | STOP. Tell user: "Add `:snippet-output:` tag with target path" |
| Directory path in multi-snippet file | STOP. Tell user: "Each snippet MUST have explicit filename" |
| Duplicate `:snippet-start:` name in one file | STOP. Tell user: "Rename so every snippet name in the file is unique" |
| Repeated `:snippet-output:` in one block | STOP. Tell user: "Use one tag with comma-separated paths" |
| `:snippet-output:` path has no file extension | STOP. Tell user: "Add the file extension, for example `.rst`" |
| `--sync` reports `✗ Invalid: <file>` | STOP. The file was skipped and `--sync` exited non-zero. Fix the markers, then re-run |
| `--sync` or `--validate` reports untracked snippet | Run `--sync` to add it to the manifest and generate its output |
| `--sync` or `--validate` reports output path changed | Run `--sync` to delete the stale output and regenerate at the new path |
| Target directory missing | CREATE it: `mkdir -p content/<target>/source/includes/path/` |
| Bluehawk not installed locally | RECOMMEND CI. If local needed: `npm install -g bluehawk` |
| File in `code-examples/tested/` | ABORT. Tell user: "Use Grove skill, not snippet-automation" |
