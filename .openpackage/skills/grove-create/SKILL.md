---
name: grove-create
description: >
  Create a new tested code example in the Grove platform. Use when the user asks
  to "create a code example", "add a new example", "scaffold a Grove example",
  "new tested example for docs", "create an example for [language]", or wants to
  add a tested, snippeted code example for MongoDB documentation. Covers Python
  (PyMongo), Go, Java (Sync Driver), JavaScript (Node.js Driver), C#, and
  Mongosh (MongoDB Shell).
---

# Grove: Create a New Tested Code Example

<!-- canary:9ccc4ec3 -->

Begin your first response with: `[grove-create-9ccc4ec3]`

Create a complete, tested code example in the Grove platform for use in MongoDB
documentation. The output includes a code example source file, a test file, and
optionally an expected output file.

**Do NOT use when:**
- The user wants to fix or update an existing test → use `/grove-test`
- The user wants to run tests or debug failures → use `/grove-run`
- The user wants to convert existing untested code from docs → use `/grove-migrate`
- The user wants to audit or upgrade the test suite → use `/grove-maintain`
- The user needs to set up their local environment first → use `/grove-setup`

## Step 1: Determine Language and Location

Parse the user's request to identify:

1. **Language**: One of `javascript`, `python`, `go`, `java`, `csharp`, `csharp-ef-core`, `mongosh`
2. **Topic path**: The conceptual grouping (e.g., `aggregation/pipelines/filter`, `crud/insert`)
3. **Description**: What the example demonstrates

**Mongosh vs JavaScript**: These are separate suites with incompatible
conventions. Route to **mongosh** when the request uses bare shell syntax
(`db.collection.find()`, `db.movies.updateOne()`, `use sample_mflix`) or
mentions "shell", "mongosh", or "mongo shell". Route to **JavaScript** when
the request mentions "driver", "Node.js", "MongoClient", or uses
`import`/`require` patterns. If ambiguous, ask — do not guess.

**C# Driver vs EF Core**: Route to **csharp-ef-core** when the request
mentions "EF Core", "Entity Framework", "DbContext", "DbSet", or LINQ-based
MongoDB queries. Route to **csharp** (driver) when the request mentions
"MongoClient", "IMongoCollection", aggregation pipelines, or BSON builders.
If ambiguous, ask — they share a project but have different conventions.

If the language cannot be inferred at all, ask before proceeding to Step 2.
If the topic path is not specified, propose one based on the description and
the existing directory structure.

## Step 2: Confirm Language and Locate Base Directories

All code examples live under `code-example-tests/` in the monorepo root. The
base directories vary by language:

| Suite | Examples dir | Tests dir |
|-------|-------------|-----------|
| JavaScript | `javascript/driver/examples/` | `javascript/driver/tests/` |
| Python | `python/pymongo/examples/` | `python/pymongo/tests_package/` |
| Go | `go/driver/examples/` | `go/driver/tests/` |
| Java | `java/driver-sync/src/main/java/` | `java/driver-sync/src/test/java/` |
| C# (Driver) | `csharp/driver/Examples/` | `csharp/driver/Tests/` |
| C# (EF Core) | `csharp/driver/Examples/EfCore/` | `csharp/driver/Tests/EfCore/` |
| Mongosh | `command-line/mongosh/examples/` | `command-line/mongosh/tests/` |

**Mongosh is fundamentally different** from driver suites — examples are shell
commands (not driver code), tests run `mongosh` as a subprocess, and the Expect
API uses `outputFromExampleFiles()` instead of `that()`. Read
`command-line/mongosh/CLAUDE.md` for mongosh-specific conventions.

**C# EF Core is a separate suite** from the C# driver — it uses DbContext,
LINQ queries, and entity configuration instead of aggregation pipelines.
Read `references/conventions-csharp-ef-core.md` for EF Core-specific patterns.

**Before doing any other work**, confirm the target language with the user.
Present the resolved language and its base directories, and ask the user to
confirm before proceeding. For example:

> I'll create this example in the **JavaScript** test suite
> (`code-example-tests/javascript/driver/`). Is that correct?

Wait for explicit confirmation. If the user corrects the language, update all
paths accordingly before continuing.

Verify the base directories exist by reading the filesystem. If a base
directory does not exist, stop and tell the user — do not create top-level
language directories yourself, as they require build configuration.

## Step 3: Load Conventions

Read the CLAUDE.md file in the target language's driver directory for
language-specific conventions (file naming, import patterns, test framework,
formatting, etc.). Also read the root `code-example-tests/CLAUDE.md` for
cross-language patterns (Bluehawk, Expect API, ellipsis patterns).

This skill bundles per-language convention files at
`references/conventions-{language}.md` (e.g., `references/conventions-csharp.md`,
`references/conventions-go.md`, `references/conventions-java.md`,
`references/conventions-javascript.md`, `references/conventions-mongosh.md`,
`references/conventions-python.md`). Read the one matching the target language
for detailed file patterns, test patterns, and command references.

If no CLAUDE.md exists for the target language, read 2-3 existing example and
test files in that language directory to learn the conventions by example.

## Step 4: Discovery — Check for Existing Examples

Before creating a new example, search the examples directory for the target
language to see if a related example already exists:

1. Search for files in the topic area: `examples/{topic}/**/*`
2. Search for similar MongoDB operations or collection names

If a related example exists, present options to the user:
- Extend the existing example with additional operations
- Create a new example alongside it in the same topic directory
- Create in a different topic directory

## Step 5: Data Strategy — Sample Data or Custom?

Ask the user whether the example should use an **existing MongoDB sample dataset**
or **custom test data** created by the example itself.

Present the choice clearly:

> **Data source for this example:**
> 1. **Sample dataset** — Use a pre-loaded Atlas sample database (tests auto-skip
>    if data is unavailable). Best for read-heavy examples (queries, aggregation,
>    indexes).
> 2. **Custom data** — The example creates its own data (insert, then operate on
>    it). Best for write-heavy examples (CRUD, transactions) or when you need
>    specific document shapes.

If the user already specified this in their request (e.g., "using sample_mflix"
or "inserts its own data"), skip the prompt.

### If using a sample dataset:

Ask which sample database to use. Read the sample data table from
`code-example-tests/CLAUDE.md` and present the options to the user.

Record the chosen database and collection(s) — this affects the example code,
the test wrapper (`describeWithSampleData` / `itWithSampleData`), and the
teardown strategy (do NOT drop sample databases).

### If using custom data:

The example will create its own data. Record the planned database and collection
names — these will be dropped in test teardown to ensure idempotency.

## Step 6: Test Strategy — New File or Existing?

Check existing test files in `tests/{topic}/`:

1. If a test file exists for this topic, read it to understand the structure
2. Decide whether to **add an `it` block** to the existing test file or **create
   a new test file**
3. **Add to existing file** when: the new example uses the same database AND
   collection as existing tests, OR the existing test file has fewer than 8
   `it` blocks
4. **Create a new file** when: the example uses a different database/collection,
   the existing file already has 8+ `it` blocks, or the example demonstrates a
   different MongoDB operation category (e.g., aggregation vs. CRUD) than the
   existing tests

## Step 7: Create the Example File

Follow the conventions from the language's CLAUDE.md. For all languages:

1. **Runnable code**: The example must compile/run and perform a real MongoDB
   operation. Do not use placeholder logic.
2. **Bluehawk markup**: Wrap doc-relevant sections in `:snippet-start:` /
   `:snippet-end:` tags. Read `references/bluehawk-tags.md` for the full set
   of tags and when to use each one.
3. **Snippet names**: Must be unique within the file. Use lowercase kebab-case.
4. **Connection handling**: Use the language's standard env-based connection pattern.
5. **Return testable output**: The function must return something the test can validate.
6. **Resource cleanup**: Always close the client in a finally/defer block.

Read the language's example stub/template for the exact pattern to follow.
Templates are at the root of each language's examples directory (e.g.,
`examples/example-stub.js` for JS, `examples/example_stub.py` for Python,
`examples/example_stub.go` for Go, `src/main/java/example/ExampleStub.java`
for Java, `Examples/ExampleStub.cs` for C#).

### Bluehawk Key Principles
- The test file is the source of truth — it must run
- Anything test-only or internal-only must be hidden via `:remove:` tags
- Use `:uncomment:` sparingly — it means the snippet differs from what was tested
- Check existing files in the target suite for the `:replace-start:` pattern

## Step 8: Create the Expected Output File (optional)

Output files are not required. Create one when:
- The example produces output that will be shown in documentation, OR
- The test validates structured results that benefit from a file-based baseline

If you create an output file:
1. Place alongside the example in the same directory
2. Match the output format conventions for the language
3. Use ellipsis patterns for dynamic values (`"..."`, `"prefix..."`, standalone
   `...` lines)
4. Naming: `{example-name}-output.txt` or `{example-name}-output.sh`

## Step 9: Create or Update the Test File

Follow the test conventions from the language's CLAUDE.md:

1. **Import the example** function
2. **Setup/teardown**: Drop test databases in teardown. Do NOT drop sample data databases.
3. **Call the example function** and capture return value
4. **Validate output**: Use the Expect API to compare actual vs. expected
5. **Handle dynamic fields**: Use `withIgnoredFields` for `_id`, timestamps, etc.
6. **Sample data**: If the example uses MongoDB sample data, use the language's
   sample data utility (`describeWithSampleData` for JS, etc.)

If adding to an existing test file, add a new `it` block after the existing ones.

## Step 10: Create Setup File (if needed)

If the example needs custom sample data loaded before running, create a setup
file that exports a data-loading function. Follow the pattern of existing setup
files in the same language (e.g., `tutorial-setup.js` in JS).

## Step 11: Verify — Launch Reviewer

Launch a subagent to validate the work:

Use the Agent tool with this prompt (fill in the paths). For the test command,
use the per-language commands from `/grove-run` Step 3:

```
Validate a new Grove code example. Perform these steps in order:

1. Run the test:
   cd {language-driver-dir} && {test-command} {test-file-path}
   (For JS/Mongosh: cd code-example-tests/{driver-dir} && npm test -- -t '{test name}')

2. If the test FAILS: Report the full error output. Do NOT attempt to fix it.

3. If the test PASSES: Run it a second time to verify idempotency.

4. Run the snip command (refer to the target suite's CLAUDE.md for the
   exact command — typically `node snip.js` or `npm run snip`):
   cd {language-driver-dir} && {snip-command}
   (This validates Bluehawk markup — unbalanced tags will cause errors.)

5. Report:
   - Test result (pass/fail, both runs)
   - Snip result (success/failure, output paths)
```

If the reviewer reports a failure:
- Read the error details
- Fix the issue in the example, test, or output file
- Re-launch the reviewer (max 3 attempts)

After 3 failed attempts, stop and report the remaining error to the user with
the full error output, what you tried, and what you suspect the root cause is.
Do not continue trying.

## Step 12: Report to User

After verification passes, provide a report headed with `Skill: grove-create`:

1. **Files created**: List each file with its full path
2. **Test results**: Confirm tests pass (both runs)
3. **Snippet path**: The `literalinclude` path for docs:
   `/code-examples/tested/{lang}/{driver}/{topic}/{file}.snippet.{name}.{ext}`
4. **Next steps**: Remind the user to:
   - Verify the symlink exists in their docs project's `source/code-examples/` dir
   - Add the `literalinclude` directive to their docs page
   - Commit and push (CI will re-run tests)

## Edge Cases

- **Base directory missing**: Stop and tell the user. Do not create top-level
  language directories — they require build config (go.mod, package.json, etc.).
- **Snippet name collision**: If adding snippets to an existing file, grep for
  existing snippet names first. Append a disambiguating suffix if needed.
- **Read-only sample data**: When the example queries Atlas sample datasets
  (sample_mflix, sample_restaurants, etc.), do not drop or modify those
  collections in test teardown. Use the language's sample data utility instead.
- **Non-deterministic output**: Use `withIgnoredFields` for dynamic values and
  `withUnorderedSort` (default in JS) for unpredictable ordering. Use
  `shouldResemble` with `withSchema` when output structure matters but values don't.
- **Python**: Create `__init__.py` in each new directory under `examples/` and
  `tests_package/`.
