# Page-Level Migration: Scanning RST Pages for Code

<!-- canary:1832ea88 -->

This reference covers how to scan an RST/TXT documentation page and classify
every code directive for migration. Read this file when the user provides a
path to a documentation page (a file under `content/`).

## What to Scan For

| Directive | How to classify |
|-----------|----------------|
| `.. literalinclude::` with path containing `/code-examples/tested/` | **Already tested** — skip |
| `.. literalinclude::` with path containing `/includes/code-examples/` or `/code-examples/includes/` | **Untested file** — resolve path, read the file |
| `.. literalinclude::` with path containing `/driver-examples/` | **External test repo** — may already be tested elsewhere; flag for user review |
| `.. code-block::` with code content | **Inline code** — extract the code directly from the RST |
| `.. io-code-block::` with `.. input::` / `.. output::` | **Inline I/O code** — extract input code; output may serve as expected output |

## How to Resolve `literalinclude` Paths

Paths in `literalinclude` directives are relative to the docs project's
`source/` directory. To find the actual file:

1. Identify the docs project and version from the RST file's path
   (e.g., `content/node/current/source/page.txt` → project is `node/current`).
   For versioned projects, the version directory is part of the path (e.g.,
   `current`, `upcoming`, `v1.12`). Note that the MongoDB Manual uses
   `content/manual/manual/` for the current version (not `current/`).
2. Resolve the `literalinclude` path relative to that project's `source/` dir.
   Scope all file lookups to the specific version's `source/` directory —
   files across versions are independent.
3. Read the resolved file

If the `literalinclude` uses `:start-after:` and `:end-before:` markers,
note which section of the file is actually included — only that section
needs migration.

## Present the Migration Plan

Summarize findings in a table and ask the user which items to migrate:

```markdown
## Migration Plan for: content/node/current/source/crud/insert.txt

| # | Type | Source | Status | Language |
|---|------|--------|--------|----------|
| 1 | literalinclude | /includes/code-examples/insert-one.js | Untested | JavaScript |
| 2 | literalinclude | /includes/code-examples/insert-many.js | Untested | JavaScript |
| 3 | code-block | Inline (lines 45-62) | Untested | JavaScript |
| 4 | literalinclude | /code-examples/tested/javascript/driver/.../insert.snippet.insert-one.js | Already tested | — |
| 5 | io-code-block | Inline (lines 80-95) | Untested | shell |

Items 1, 2, 3, 5 are candidates for migration. Item 4 is already tested.
Which items should I migrate? (e.g., "all", "1,2", "skip 5")
```

If a code block's language is not one of the supported Grove languages (C#,
Go, Java, JavaScript, Mongosh, Python), note it as **not a migration
candidate** and explain why. Be aware that `:language:` values in existing
docs are sometimes incorrect — verify by inspecting the actual code syntax.

After the user selects items, process each one through the remaining migration
steps. For multiple items, process them sequentially and run the reviewer after
each.
