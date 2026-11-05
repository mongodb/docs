# Snippet Manifest Schema

`snippet-manifest.json` tracks each source docset's monitored files and their snippet outputs, so `--sync` regenerates only what changed. It sits beside `snip.js` in the docset's snippet root: `content/<docset>/source/`, or `content/<docset>/current/source/` for a versioned docset (see "Versioned Docsets" in SKILL.md). Destination docsets have none.

## Schema

```json
{
  "version": 1,
  "files": {
    "includes/nav/list-data-explorer.rst": {
      "snippets": {
        "list-data-explorer": {
          "outputs": [
            "content/search/source/includes/nav/list-data-explorer-snippet-from-atlas.rst",
            "content/vector-search/source/includes/nav/list-data-explorer-snippet-from-atlas.rst"
          ],
          "hash": "a1b2c3d4"
        }
      }
    }
  }
}
```

| Field | Description |
|-------|-------------|
| `version` | Schema version, currently `1` |
| `files.<path>` | Source file, relative to the snippet root |
| `files.<path>.snippets.<name>.outputs` | Generated file paths, relative to the repo root, in `:snippet-output:` order |
| `files.<path>.snippets.<name>.hash` | Hash of the text between `:snippet-start:` and `:snippet-end:`. A changed hash means the snippet needs regenerating |

## Canonical Form

`snip.js` rewrites the manifest in canonical form on every save, so concurrent branches conflict only on real changes. Do NOT hand-edit it.

- Keys in `files` and each `snippets` map are sorted, so entries added on different branches land on different lines instead of all at the end.
- No timestamps. The former `lastModified` field changed on every run and caused conflicts even when hashes matched; it was never read and is dropped on the next save.

## Resolving Merge Conflicts

Every hash is recomputed from the source files, so never hand-merge hashes.

1. Resolve the source files (`includes/**`) first. They are the source of truth.
2. Take either side of the manifest, for example `git checkout --theirs <manifest>`.
3. From the snippet root, run `npm run snip -- --sync`. It regenerates snippets whose hash differs from the resolved source, adds missing snippets, and deletes orphaned outputs.
4. Run `npm run snip -- --validate` and confirm `0 out of sync, 0 missing or invalid`.
