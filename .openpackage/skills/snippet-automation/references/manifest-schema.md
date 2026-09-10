# Snippet Manifest Schema

The manifest tracks monitored source files and their snippet outputs for automated sync detection.

## Location

Each snippet source docset has its own manifest, stored in the docset's snippet root alongside `snip.js`. Two path shapes exist:

| Docset | Manifest path |
|--------|---------------|
| atlas | `content/atlas/source/snippet-manifest.json` |
| self-managed-search | `content/self-managed-search/current/source/snippet-manifest.json` |

Destination docsets have no manifest, because a manifest indexes files carrying `:snippet-start:` markers and a destination has none.

For versioned docsets, only the one version that acts as the snippet source has a manifest — see the "Versioned Docsets" section of SKILL.md. Do NOT assume `content/<docset>/source`.

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
      },
      "lastModified": "2026-08-13T10:00:00Z"
    }
  }
}
```

## Fields

| Field | Type | Description |
|-------|------|-------------|
| `version` | number | Manifest schema version (currently 1) |
| `files` | object | Map of source file paths (relative to docset source/) to file info |
| `files.<path>.snippets` | object | Map of snippet names to snippet info |
| `files.<path>.snippets.<name>.outputs` | array | Generated output file paths |
| `files.<path>.snippets.<name>.hash` | string | Content hash for change detection |
| `files.<path>.lastModified` | string | ISO timestamp of last file modification |

## Hash Calculation

The hash is computed from the snippet content (between `:snippet-start:` and
`:snippet-end:`). When the hash changes, the snippet needs regeneration.

## Commands and Manifest Updates

Command names match the table in SKILL.md.

| Command | Manifest Action |
|---------|-----------------|
| `add snippet <file>` | Adds entry to `files` |
| `remove snippet <file>` | Removes entry from `files` |
| `register snippets <dir>` | Scans directory, adds all files with snippets |
| `sync snippets` | Compares hashes, regenerates changed snippets |
| `list snippets` | Reads and displays `files` |
