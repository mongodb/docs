# snip.js Configuration Reference

Each snippet source docset has its own `snip.js` with docset-specific configuration.

## Configured Docsets

Only **source** docsets — those holding files with `:snippet-start:` markers — have a `snip.js`, a `package.json`, and a manifest. Run every command from the docset's path below: `cd <path> && npm run snip -- --<flag>`.

| Docset | Path |
|--------|------|
| Atlas | `content/atlas/source/` |
| Self-Managed Search | `content/self-managed-search/current/source/` |

**Destination** docsets have none of these files. `search`, `vector-search`, and `kubernetes/upcoming` only receive generated `-snippet-from-*` output, which the source docset's sync writes directly into them. There is nothing to run in a destination, so do not add `snip.js` there or list it in the sync workflow.

To make a destination into a source, copy `snip.js` and `package.json` in, point `DEFAULT_START_DIRECTORY` at the new path, add the docset to `.github/workflows/snippet-sync.yml`, then run `--init`.

## Versioned Docsets: Only One Version Can Be a Source

Output filenames carry the docset name but not the version: `extractSourceDocset` returns `parts[1]` of `content/<docset>/<version>/source/...`, so `current` and `upcoming` both produce `-snippet-from-self-managed-search`. Two versions declaring the same `:snippet-output:` path would therefore write to the **same** generated file, and whichever synced last would silently win.

Consequently, exactly one version per versioned docset acts as the snippet source. For `self-managed-search` that version is `current` — the only one with a `snip.js` and the only one listed in the sync workflow.

Snippet markers in any other version are inert: no `snip.js`, no workflow coverage, and no `:snippet-output:` tags. They generate nothing and are not errors.

### At version flip

When a version becomes the new `current`, snippet sharing does not carry over automatically. The incoming version needs:

1. `snip.js` and `package.json` copied in, with `DEFAULT_START_DIRECTORY` pointed at the new path.
2. The `paths` filter and the docset's `cd` target updated in `.github/workflows/snippet-sync.yml`.
3. `:snippet-output:` tags restored on every source file that carries `:snippet-start:` — these are dropped when content is branched forward.
4. A manifest created with `--init`, then `--register` or `--add` per file.

Verify with `--validate` before relying on the sync. Any file with `:snippet-start:` and no `:snippet-output:` reports as invalid and is skipped.

## Configuration Constants

Each `snip.js` has these configuration values at the top:

```javascript
// Files/directories to skip during traversal
const IGNORE_PATTERNS = new Set([
  "node_modules",
  "snip.js",
  "package.json",
  "package-lock.json",
  "shared-content",
  "snippet-manifest.json"
]);

// Paths containing these substrings are excluded
const IGNORE_PATH_PATTERNS = ["code-examples/tested"];

// Default directory to scan when no input is provided
const DEFAULT_START_DIRECTORY = "content/<docset>/source";

// Marker that identifies files containing snippets
const SNIPPET_MARKER = "snippet-start";

// Manifest file that tracks monitored snippets, stored under DEFAULT_START_DIRECTORY
const MANIFEST_FILE = "snippet-manifest.json";
```

## Running snip.js

### CLI Commands

| Command | Description |
|---------|-------------|
| `npm run snip -- --sync` | Regenerate changed snippets |
| `npm run snip -- --add <file>` | Add file to manifest |
| `npm run snip -- --remove <file>` | Remove file and delete output files |
| `npm run snip -- --register <dir>` | Bulk-add all snippet files in directory |
| `npm run snip -- --list` | Show all monitored files |
| `npm run snip -- --init` | Create empty manifest |
| `npm run snip -- --reset` | Clear manifest (remove all tracked files) |
| `npm run snip -- --validate` | Check manifest integrity |
| `npm run snip` | Interactive mode (no tracking) |

### Interactive Mode (default)

```bash
cd content/atlas/source && npm run snip
```

Press Enter to process all files in `DEFAULT_START_DIRECTORY`, or paste a specific file/directory path to process only that location.

## What snip.js Does

1. **Scans** all files in the start directory for `:snippet-start:` markers
2. **Validates** that each snippet has a `:snippet-output:` tag
3. **Validates** multi-snippet files use explicit filenames (not directory-only)
4. **Validates** every `:snippet-output:` path has a file extension
5. **Extracts** content between `:snippet-start:` and `:snippet-end:`
6. **Writes** to each destination path with `-snippet-from-<source>` suffix
7. **Strips** Bluehawk markers from the output

`--sync` and `--validate` additionally compare the manifest against the current source content and report:

- **Invalid markers** — malformed `:snippet-output:` declarations; the file is skipped rather than regenerated (`--sync` exits non-zero when any file is skipped this way)
- **Untracked snippets** — `:snippet-start:` blocks added to the source since the last sync
- **Orphaned outputs** — snippets removed from the source; `--sync` deletes their generated output files
- **Output path changed** — a snippet's `:snippet-output:` path no longer matches what's recorded in the manifest; `--sync` deletes the stale output and regenerates at the new path
- **Out of sync** — snippet content changed since the last sync (hash mismatch)

## Error Messages

### "Missing :snippet-output: for snippet 'name' in file"

The snippet has `:snippet-start:` but no `:snippet-output:` on the next line.

**Fix:** Add `:snippet-output:` immediately after `:snippet-start:`.

### "Directory-only path not allowed for multi-snippet file"

The file has multiple `:snippet-start:` blocks but uses directory-only paths.

**Fix:** Change to explicit filenames for each snippet.

### ":snippet-output: paths require a file extension"

An explicit `:snippet-output:` path has no file extension (e.g. ends in `/foo` instead of `/foo.rst`), which would produce an extensionless output file.

**Fix:** Add the file extension to the output path.

### "Invalid: <file>" (from `--sync` or `--validate`)

The file's snippet markers fail one of the validations above (missing output, directory-only path in a multi-snippet file, or missing extension). `--sync` skips the file rather than regenerating from bad markers.

**Fix:** Correct the markers, then re-run `--sync`.

### "duplicate :snippet-start: names (each name must be unique within a file)"

Two or more blocks in the file declare the same snippet name. Only the first would be generated.

**Fix:** Rename the colliding snippets so every name in the file is unique.

### "multiple :snippet-output: tags in one snippet block"

A block contains more than one `:snippet-output:` tag. The extra tags would be discarded.

**Fix:** Merge them into one tag with comma-separated paths.

### "Excluded path, not added: <file>"

The `--add` target sits under a path in `IGNORE_PATH_PATTERNS` (currently `code-examples/tested`). A single-file interactive run reports `Excluded path` for the same reason.

**Fix:** Do not register these files. They belong to Grove's snippet system.

### "ENOENT: no such file or directory"

The target directory doesn't exist.

**Fix:** Create the directory first:
```bash
mkdir -p content/<target>/source/includes/path/
```

## Dependencies

Bluehawk is installed globally, not as a docset dependency:

```bash
npm install -g bluehawk
```

Each docset needs `package.json` with the `snip` script and `"type": "module"`, which `snip.js` requires for its ESM `import` syntax:

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

No `npm install` step is needed, because no dependencies are declared.
