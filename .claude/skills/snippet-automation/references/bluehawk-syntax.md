# Bluehawk Syntax for Cross-Docset Snippets

This reference documents the Bluehawk comment syntax used by `snip.js` for cross-docset content sharing. This is different from Grove test suite snippets.

## RST Comment Syntax

In RST files, Bluehawk tags use the comment directive format:

```rst
.. :snippet-start: snippet-name
.. :snippet-output: content/target/source/includes/path/
Content here...
.. :snippet-end:
```

**Key difference from Grove:** Cross-docset snippets use `.. :tag:` (RST comment) while Grove uses `// :tag:` (code comments in source files).

## Required Tags

| Tag | Rule |
|-----|------|
| `:snippet-start: <name>` | Opens the block. The name must be unique within the file. |
| `:snippet-output: <path>` | **Required.** Declares where the extracted content is written. Must appear between its `:snippet-start:` and `:snippet-end:`; the parser attributes it to the enclosing snippet, not to a fixed line offset. Put it immediately after `:snippet-start:` by convention. A tag placed outside any block is ignored. |
| `:snippet-end:` | Closes the block. |

Paths are relative to the Git repository root. A leading `/` is tolerated and stripped, so `/content/search/...` is treated the same as `content/search/...`.

Multiple destinations are comma-separated:

```rst
.. :snippet-output: content/search/source/includes/nav/, content/vector-search/source/includes/nav/
```

## Path Formats

| Format | When to use | Example path → generated output |
|--------|-------------|----------------------------------|
| Directory-only (ends with `/`) | File has **one snippet**. The source filename is used automatically. | `content/search/source/includes/nav/` → `content/search/source/includes/nav/list-data-explorer-snippet-from-atlas.rst` (source file `list-data-explorer.rst`) |
| Explicit filename | **Required** when a file has **multiple snippets**. | `content/search/source/includes/facts/first-fact.rst` → `content/search/source/includes/facts/first-fact-snippet-from-atlas.rst` |

## Output Naming

All generated files automatically get the `-snippet-from-<source>` suffix:

| Source Docset | Suffix |
|---------------|--------|
| atlas | `-snippet-from-atlas` |
| search | `-snippet-from-search` |
| vector-search | `-snippet-from-vector-search` |
| self-managed-search | `-snippet-from-self-managed-search` |

## Complete Example

**Source file:** `content/atlas/source/includes/nav/list-data-explorer.rst`

```rst
.. :snippet-start: list-data-explorer
.. :snippet-output: content/search/source/includes/nav/, content/vector-search/source/includes/nav/

In |service|, go to the :guilabel:`Data Explorer` page for your cluster.

#. Click :guilabel:`Database` in the sidebar.

#. Click the database name, then the collection name.

.. :snippet-end:
```

**Generated files:**
- `content/search/source/includes/nav/list-data-explorer-snippet-from-atlas.rst`
- `content/vector-search/source/includes/nav/list-data-explorer-snippet-from-atlas.rst`

**Generated content** (Bluehawk tags stripped, source note prepended):

```rst
.. This file is snippet output generated from content/atlas/source/includes/nav/list-data-explorer.rst.
   Do not modify this file. Edit the source file instead.

In |service|, go to the :guilabel:`Data Explorer` page for your cluster.

#. Click :guilabel:`Database` in the sidebar.

#. Click the database name, then the collection name.
```

## Validation Rules

1. **Every snippet must have `:snippet-output:`** — Files without it are skipped with a warning.

2. **Multi-snippet files require explicit filenames** — Directory-only paths cause validation errors when multiple `:snippet-start:` blocks exist.

3. **Snippet names must be unique within a file** — Two `:snippet-start:` blocks sharing a name are rejected. Only the first would ever be hashed and generated, so the others would silently disappear.

4. **One `:snippet-output:` per block** — A second tag in the same block is rejected. Use a single tag with comma-separated paths for multiple destinations.

5. **Paths in `code-examples/tested/` are rejected** — These use Grove's separate snippet system. `snip.js` skips them while walking directories (`--sync`, `--register`) and refuses an explicit `--add` or a single-file interactive run with `Excluded path`. See the STOP conditions in SKILL.md.

## Referencing Generated Snippets

In target docset pages, use the generated filename with the suffix:

```rst
.. include:: /includes/nav/list-data-explorer-snippet-from-atlas.rst
```
