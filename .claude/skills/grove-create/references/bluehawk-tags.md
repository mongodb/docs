# Bluehawk Tag Guide

<!-- canary:9148abac -->

The test file is the source of truth — it must run. Bluehawk tags control what
the docs reader sees in the extracted snippet. Read 2-3 existing example files
in the target language to see the patterns in context.

## `:snippet-start:` / `:snippet-end:`

Wraps the section of code that will be extracted as a docs snippet. Snippet
names must be unique within the file. Use lowercase kebab-case.

## `:remove:` / `:remove-start:` / `:remove-end:`

Hides test-only lines from the snippet. Use for return statements,
data-collection code (like `documents.push()`), and any internal
implementation the reader shouldn't see. Anything test-only or internal-only
must be in a remove line or block.

## `:replace-start:` / `:replace-end:`

Wraps the entire file and substitutes internal implementation details with
reader-friendly values in the extracted snippet. Common substitutions:
- `"process.env.CONNECTION_STRING": "\"<connection string URI>\""` — shows a
  placeholder URI instead of the env var
- `"export ": ""` — removes the `export` keyword (readers run the file
  directly, not as a module import)
- `"const result = ": ""` — removes a variable assignment the test needs but
  the reader doesn't

Check what the target suite's existing files replace — look at the
`:replace-start:` block at the top of the template or existing examples. Use
the same terms.

## `:uncomment-start:` / `:uncomment-end:`

Uncomments commented-out lines in the extracted snippet. Use this as a
**last resort** for code that needs to appear in docs but would break the
test if actually executed. Common cases:
- `//console.log(movie);` — appears as `console.log(movie);` in docs (the
  test uses `return` instead, which is in a `:remove:` line)
- `//run().catch(console.dir);` — appears as the entry point in docs (the
  test calls the exported function directly)

Use `:uncomment:` sparingly — it means the snippet shown in docs is slightly
different from what was tested, which undermines the "tested example" guarantee.
Prefer `:remove:` when possible.
