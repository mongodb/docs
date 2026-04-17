---
name: grove-migrate
description: >
  Migrate existing untested code into the Grove test suite. Use when the user
  asks to "migrate this code", "convert to Grove", "make this testable", "move
  this example to the test suite", "add tests for this existing code", "migrate
  the code on this page", or wants to convert documentation code examples that
  currently live outside of Grove into properly tested, snippeted examples.
  Supports both page-level migration (scan an RST page for all code) and
  snippet-level migration (convert a single code block).
---

# Grove: Migrate Existing Code to the Test Suite

<!-- canary:d12bc5c1 -->

Begin your first response with: `[grove-migrate-d12bc5c1]`

Convert existing untested code examples from documentation source files into
properly tested, snippeted Grove examples. This skill preserves the original
code's semantics while adapting it to Grove conventions.

**Do NOT use when:**
- The user wants to create a new example from scratch (no existing code) → use `/grove-create`
- The user wants to fix or update an existing test → use `/grove-test`
- The user wants to run tests or debug failures → use `/grove-run`
- The user wants to audit or upgrade the test suite → use `/grove-maintain`

## Step 1: Determine Entry Point

Examine what the user provided to determine the migration mode:

### Page-level migration

The user provided a path to an **RST/TXT documentation page** (a file under
`content/`). This is the primary workflow — scan the page for all code and
produce a migration plan.

→ Continue to **Step 2: Scan Page for Code**.

### Snippet-level migration

The user provided one of:
- A path to a **specific code file** (e.g., a file in `source/code-examples/`
  or `source/includes/code-examples/`)
- **Pasted code** directly in the conversation
- A **specific code block** they want migrated

→ Skip to **Step 3: Determine Language and Topic** (one item to migrate).

---

## Step 2: Scan Page for Code (Page-Level Only)

Read the reference file `references/page-scanning.md` for the full directive
classification table and `literalinclude` path resolution process.

In summary: scan the RST/TXT file for all `literalinclude`, `code-block`, and
`io-code-block` directives. Classify each as already-tested (skip), untested
file, inline code, or external test repo. Present a migration plan table and
let the user select which items to migrate.

After the user selects items, process each one through Steps 3-11 below.
For multiple items, process them sequentially and run the reviewer after each.

---

## Step 3: Determine Language and Topic

Grove currently supports these languages:

| Language | Suite directory |
|----------|---------------|
| C# | `csharp/driver/` |
| Go | `go/driver/` |
| Java | `java/driver-sync/` |
| JavaScript (Node.js) | `javascript/driver/` |
| Mongosh | `command-line/mongosh/` |
| Python | `python/pymongo/` |

If the detected language is **not in this list**, flag it to the user and
ask them to review it manually — it is not eligible for Grove migration.
Language values in existing docs are sometimes incorrect (e.g., `shell`
used for JavaScript, `javascript` used for mongosh), so do not blindly
follow the `:language:` value.

If not specified by the user:
1. Detect the language from the source code syntax or from the `literalinclude`
   `:language:` option / `code-block` language argument. Verify it against the
   supported list above.
2. Propose a topic path based on the MongoDB operations used (e.g., if it does
   `insertOne`, propose `crud/insert`). Check the existing directory structure
   under the language's `examples/` dir — prefer placing the file in an
   existing topic directory when a suitable one exists, rather than creating
   a new directory for every migration.

Confirm with the user if either is ambiguous.

## Step 4: Load Conventions

Read these files in order to learn the target language's patterns:

1. `code-example-tests/CLAUDE.md` — cross-language patterns (Bluehawk tags,
   Expect API, ellipsis patterns, sample data utilities)
2. The CLAUDE.md in the target language's driver directory (e.g.,
   `code-example-tests/javascript/driver/CLAUDE.md`) — file naming, import
   patterns, test framework, formatting rules
3. `.claude/skills/grove-create/references/conventions-{language}.md` — the
   conventions file for the target language, including Expect API method
   signatures, import paths, and ellipsis patterns

If no CLAUDE.md exists for the target language, read 2-3 existing example and
test files (sorted by most recent git modification date) to learn conventions
by example.

## Step 5: Discovery — Check for Duplicates

Before creating new files, search for existing related examples:

1. Search for files in the topic area: `examples/{topic}/**/*`
2. Search for similar MongoDB operations (e.g., `insertOne`, `aggregate`) or
   collection names in the examples directory

If a related example exists, present options to the user:
- **Extend** the existing example with additional operations — choose this
  when the existing example demonstrates the same collection and operation
  category, and adding to it won't break pages that already reference the
  existing snippets. Before extending, search all docs pages that reference
  the existing example and flag to the user if surrounding text (variable
  names, collection names, descriptions) would need updates.
- **Create alongside** it in the same topic directory — choose this when the
  operation is related but the existing example's snippets shouldn't change
  (e.g., the new example uses a different collection or demonstrates a
  different variant of the same operation).
- **Abort** if the code is functionally identical to what already exists
  (same operation, same collection, same logic). Offer to reuse the existing
  tested snippet on the new docs page instead of creating a duplicate.

## Step 6: Data Strategy — Sample Data or Custom?

Analyze the source code's data dependencies and classify:

| Source code pattern | Strategy | Next step |
|---|---|---|
| Queries existing data (e.g., `find` on `movies`) | **Sample data** — propose the matching sample database (e.g., `movies` → `sample_mflix`) and confirm | Proceed normally |
| Uses placeholder data but user wants sample data | **Sample data with adaptation** — suggest a sample database from the list below and confirm | Proceed to Step 6a |
| Inserts its own data, then operates on it | **Custom data** — record database/collection names for teardown | Proceed normally |
| Ambiguous (generic collection name) | **Ask the user** to clarify | — |

**Available sample databases**: Read the sample data table in
`code-example-tests/CLAUDE.md` for the full list of databases, their
collections, and recommended use cases. When proposing a sample database,
suggest the one whose collections and data shape best match the operations
in the source code.

This decision affects the example code (database/collection names), the test
wrapper (`describeWithSampleData` vs. standard `describe`), and the teardown
strategy (do NOT drop sample databases).

## Step 6a: Data Adaptation (When Switching to Sample Data)

Skip this step if the source code already uses the target sample dataset, or
if the user chose custom data.

Read `references/data-adaptation.md` for the full data adaptation workflow.
It covers schema discovery, field mapping, operation-pattern preservation, and
expected output generation.

In summary: adapt the code's collection names, filter fields, projections, and
sort keys to match real sample data fields. Keep the same operation types
(a filtered find stays a filtered find). Record each change as a "Data
adaptation" discrepancy so the user can verify the mappings.

## Step 7: Analyze and Plan the Migration

Identify all changes needed to convert the source code to a Grove example.
Track each change as a **discrepancy** to report later. Discrepancies fall into
two categories:

**Infrastructure changes** (hidden from docs reader via `:remove:`, `:replace:`,
or `:uncomment:` tags — anything test-only or internal-only must be hidden):
- **Hardcoded connection string** → `process.env.CONNECTION_STRING`, hidden
  via `:replace:` terms (e.g., `"process.env.CONNECTION_STRING": "\"<connection string URI>\""`)
- **No function wrapper** → Wrap in an exported async function; hide `export`
  keyword via `:replace:` terms if the suite convention does so
- **No return value** → Add a return statement on a `:remove:` line
- **Missing cleanup** → Add `client.close()` in finally/defer
- **Synchronous code** → Convert to async/await if needed
- **Console.log only** → Use `:uncomment:` for the console.log (commented out
  in test, uncommented in snippet) and `:remove:` for the return value that
  replaces it. Use `:uncomment:` sparingly — it means the snippet differs
  slightly from what was tested.
- **Missing error handling** → Add try/finally for resource cleanup
- **Non-idiomatic patterns** → Update to match the language's Grove conventions
- **Partial file inclusion** → If the `literalinclude` used `:start-after:` /
  `:end-before:`, replace those markers with Bluehawk `:snippet-start:` /
  `:snippet-end:` tags. The full file is migrated (the function must be
  complete), but only the relevant section is within snippet tags. Do not
  carry forward `:start-after:` / `:end-before:` — Bluehawk snippet
  extraction replaces that mechanism. Also do not use `:dedent:` —
  Bluehawk already handles indentation during extraction.

**Data adaptations** (visible in the docs snippet — from Step 6a):
- **Collection name change** → Mapped to sample dataset collection
- **Field name/value changes** → Adapted to sample data schema
- **Removed inserts** → Sample data provides the documents
- **Adapted filters/projections/sorts** → Use real fields

For each change, record:
- What was changed
- The category (infrastructure or data adaptation)
- Why it was changed
- Whether it affects the code's behavior shown in docs

## Step 8: Create the Grove Example File

Apply all identified transformations. Read 2-3 existing example files in the
target language (sorted by most recent git modification date) to see the
exact Bluehawk tag patterns before writing yours — especially the
`:replace-start:` block at the top of the file and the `:uncomment:` /
`:remove:` patterns used throughout.

1. Wrap the code in the language's standard function pattern
2. Add Bluehawk markup (`:snippet-start:` / `:snippet-end:`)
3. Add a `:replace-start:` block at the top matching the suite's existing
   pattern (substitutes env vars, `export` keywords, and other internal details
   with reader-friendly values in the extracted snippet)
4. Mark test-only code with `:remove:` tags — anything internal-only or
   test-only must be in a `:remove:` line or block
5. Use `:uncomment:` for code that should appear in the docs snippet but would
   break the test if executed (e.g., `console.log` replaced by a `:remove:`'d
   return, or `run().catch(console.dir)` as an entry point). Use sparingly.
6. Use environment variables for connection strings
7. Add proper resource cleanup — for custom data, drop the database in test
   teardown with `dropDatabase()`. For sample data, do NOT drop the sample
   database.
8. Ensure the function returns testable output

**Preserve the original code's intent.** The snippet that appears in docs after
Bluehawk processing should look as close to the original code as possible.
Preserve the data types used in the original code — if the original uses
typed models or specific BSON types, the migrated code should too. If a type
change is unavoidable (e.g., switching from a typed model to `BsonDocument`
because no equivalent model exists in the test suite), record it as a
discrepancy and call it out explicitly to the user.

## Step 9: Create the Expected Output File (optional)

Output files are not required. Create one when the original code shows output
in documentation (e.g., an `.. output::` block in an `io-code-block`) or the
test validates structured results that benefit from a file-based baseline.

If you create an output file:
1. If the original shows output in docs, replicate it as the expected output
2. If the original logs to console, capture what it would log
3. Use ellipsis patterns for dynamic values (`"..."` for _id, timestamps, etc.)

## Step 10: Create the Test File

### Test strategy — new file or existing?

Check existing test files in `tests/{topic}/`:

1. **Add to existing file** when: the example uses the same database AND
   collection as existing tests, AND the file has fewer than 8 `it` blocks
2. **Create a new file** when: no related test file exists, the example uses a
   different database/collection, the existing file has 8+ `it` blocks, or the
   example demonstrates a different operation category (e.g., aggregation vs.
   CRUD)

### Write the test

1. Import the example function
2. Import the Expect API (see the "Comparison API" section in the target
   language's conventions file for import paths and method signatures)
3. Import sample data utilities if needed (`describeWithSampleData` /
   `itWithSampleData` for JS)
4. Add `afterEach` to drop the test database (for custom data) — do NOT drop
   sample databases
5. Write the `it` block: call the example function, capture the return value,
   validate with the appropriate Expect method (`shouldMatch` for file-based
   comparison, `shouldResemble().withSchema()` for variable output)

## Step 11: Verify — Launch Reviewer

Launch a subagent with the Agent tool using this prompt (fill in the paths).
Use test commands from `/grove-run` Step 3:

```
Validate a migrated Grove code example. Perform these steps in order:

1. Run the test:
   cd {language-driver-dir} && {test-command} {test-file-path}

2. If the test FAILS: Report the full error output. Do NOT attempt to fix it.

3. If the test PASSES: Run it a second time to verify idempotency.

4. Run the snip command:
   cd {language-driver-dir} && {snip-command}
   (This validates Bluehawk markup — unbalanced tags will cause errors.)

5. Report:
   - Test result (pass/fail, both runs)
   - Snip result (success/failure, output paths)
```

If the reviewer reports a failure, fix the issue and re-launch (max 3 attempts).
After 3 failed attempts, stop and report the remaining error to the user with
the full error output, what you tried, and what you suspect the root cause is.
Do not continue trying.

## Step 12: Report to User

After verification passes, provide a report headed with `Skill: grove-migrate`:

1. **Files created**: List each file with its full path
2. **Discrepancy summary**: A table of every change, categorized:
   ```
   | Change | Category | Reason |
   |--------|----------|--------|
   | Wrapped in `deleteDocuments()` function | Infrastructure | Grove requires exported functions |
   | Replaced hardcoded URI with env var | Infrastructure | Security, portability |
   | Added `return result` | Infrastructure | Required for test validation |
   | `myCollection` → `movies` | Data adaptation | User chose sample_mflix |
   | `{ status: 'active' }` → `{ year: { $gt: 2000 } }` | Data adaptation | Adapted filter to sample data schema |
   ```
3. **Behavioral changes**: Infrastructure changes should be invisible to the
   docs reader (hidden by `:remove:` tags). Data adaptation changes **will**
   appear in the snippet — call these out explicitly so the user can verify
   the adapted code still illustrates the intended concept
4. **Test results**: Confirm tests pass (both runs)
5. **Snippet path**: The `literalinclude` path for the new tested snippet
6. **Docs update**: Provide the updated `literalinclude` directive that replaces
   the old one. Always include `:category:` — the value is almost always
   `usage example` for Grove-migrated code. Other valid categories are
   `non-mongodb command`, `syntax example`, `example return object`,
   `configuration object` (all subtypes of snippet), and
   `sample application` (complete runnable programs). For example:
   ```rst
   .. was: .. literalinclude:: /includes/code-examples/insert-one.js
   .. literalinclude:: /code-examples/tested/javascript/driver/crud/insert/insert-one.snippet.insert-one.js
      :language: javascript
      :copyable: true
      :category: usage example
   ```
7. **Old file usage check**: Search the entire docs set (all projects and
   versions under `content/`) for references to the old untested file path.
   List every page that references it so the user knows which pages need
   updating. If surrounding text on those pages refers to specific variable
   names, collection names, or values from the old example that changed
   during migration, flag those for the user to review.
8. **Next steps**: The user should update the docs page with the new directive,
   verify the rendered output, and delete the old untested file only after
   confirming it is no longer referenced anywhere in the docs set (not just
   the current page).

### Page-level report

When migrating multiple items from a single page, provide a summary table
after all items are processed:

```markdown
## Migration Summary: content/node/current/source/crud/insert.txt

| # | Original Source | Grove Example | Test | Status |
|---|----------------|---------------|------|--------|
| 1 | /includes/code-examples/insert-one.js | examples/crud/insert/insert-one.js | tests/crud/insert.test.js | Migrated |
| 2 | /includes/code-examples/insert-many.js | examples/crud/insert/insert-many.js | tests/crud/insert.test.js | Migrated |
| 3 | Inline (lines 45-62) | examples/crud/insert/bulk-write.js | tests/crud/insert.test.js | Migrated |

All tests pass (2/2 runs each). Run `npm run snip` to generate snippets.
```

## Edge Cases

- **Code that can't be wrapped in a function** (e.g., top-level configuration,
  shell commands): Mark as "not a migration candidate" in the plan table and
  explain why. Do not attempt to migrate it.
- **Code with external dependencies** beyond the MongoDB driver: Check if the
  dependency is available in the test suite's package.json. If not, note it as
  a prerequisite in the migration plan.
- **Partial file includes**: When a `literalinclude` uses `:start-after:` and
  `:end-before:`, replace those markers with Bluehawk `:snippet-start:` /
  `:snippet-end:` tags. The full file is migrated (the function must be
  complete), but only the relevant section is within snippet tags.
- **Code that modifies sample data**: Ensure the test teardown reverts changes
  rather than dropping the sample database.
- **Pages with mixed languages**: A single RST page may have code examples in
  multiple languages (e.g., tabs for Node.js, Python, Java). Group the
  migration plan by language and confirm which languages the user wants to
  migrate.
- **Already-tested code on the page**: Skip it in the plan but list it so the
  user knows it exists and is covered.
