---
name: grove-run
description: >
  Run Grove tests and diagnose failures. Use when the user asks to "run the
  tests", "run my test", "debug this test failure", "why is this test failing",
  "check if tests pass", or wants to execute and troubleshoot code example tests.
---

# Grove: Run and Debug Tests

<!-- canary:647f2a26 -->

Begin your first response with: `[grove-run-647f2a26]`

Run code example tests and provide actionable diagnosis of any failures.

**Do NOT use when:**
- The user wants to create a new example or test → use `/grove-create` or `/grove-test`
- The user wants to convert untested code into Grove → use `/grove-migrate`
- The user needs to set up their environment first (no `.env` file, deps not installed) → use `/grove-setup`
- The user wants to audit test coverage or upgrade dependencies → use `/grove-maintain`

## Step 1: Determine Scope and Language

Parse the user's request to identify:

1. **What to run**: A specific test file, a topic directory, or all tests
2. **Language**: Infer from the file path, or ask if ambiguous

If the user provides a path, use it directly. If they say "run the tests" with
no qualifier, ask which language/suite or default to running all tests in the
language directory they're currently working in.

## Step 2: Locate the Test Suite

Map the language to its driver directory under `code-example-tests/`:

| Suite | Directory | Test command |
|-------|-----------|--------------|
| JavaScript | `javascript/driver/` | `npm test` (all) or `npm test -- -t '{name}'` (single) |
| Python | `python/pymongo/` | `python -m pytest` or `python -m unittest` |
| Go | `go/driver/` | `go test ./tests/...` |
| Java | `java/driver-sync/` | `mvn test` |
| C# | `csharp/driver/` | `dotnet test` |
| Mongosh | `command-line/mongosh/` | `npm test` (all) or `npm test -- -t '{name}'` (single) |

Read the language's CLAUDE.md for the exact commands and any env setup needed.

## Step 3: Run the Tests

This is the canonical source for test commands. Other grove skills reference
these patterns — keep them up to date here.

For JavaScript and Mongosh (Jest-based suites):

**All tests:**
```bash
cd code-example-tests/{driver-dir} && npm test
```

**Single test by name:**
```bash
cd code-example-tests/{driver-dir} && npm test -- -t '{describe or it text}'
```

`npm test` handles `.env` loading and Jest flags (`--runInBand`,
`--detectOpenHandles`) via the `scripts.test` entry in `package.json`. Do not
call `npx jest` directly — use `npm test --` to pass arguments through.

Capture the full output including any error messages, stack traces, and test
result summary.

## Step 4: Parse Results

If all tests pass, report the summary and stop.

If any tests fail, for each failure:

1. **Extract the failure details**: test name, error message, stack trace,
   expected vs. actual values
2. **Classify the failure** as a **writer issue** (actionable by the writer)
   or a **tooling issue** (should be escalated to the Grove team). Writer
   issues include environment setup, syntax errors, incorrect imports, bad
   output files, and test logic bugs. Tooling issues include comparison
   utility crashes, parser errors in output matching utilities, missing data
   type support in comparison libraries, and infrastructure/CI pipeline
   failures. If the writer's code and output appear correct but the
   comparison utility can't match them, that's a tooling issue — tell the
   writer to report it with enough detail to reproduce.
3. **For writer issues**, classify into one of these categories:

### Connection Error
- **Symptoms**: `MongoServerSelectionError`, `ECONNREFUSED`, timeout on connect
- **Diagnosis**: Check if `.env` exists with `CONNECTION_STRING`. Verify the
  connection string format. Suggest creating/updating the `.env` file.

### Output Mismatch
- **Symptoms**: `ComparisonResult` failure, "expected X but received Y", diff output
- **Diagnosis**: Read both the expected output file and the actual output from
  the test. Show a clear diff. Suggest one of these fixes:
  - Chain `withIgnoredFields(...)` for dynamic field values (e.g., `_id`, timestamps)
  - Chain `withUnorderedSort()` if order differs but content is correct
  - Update the output file if the actual output is correct
  - Switch to `shouldResemble().withSchema(...)` for highly variable output
  See the "Comparison API" section in the target language's conventions file
  for the full Expect API method signatures and ellipsis pattern reference.

### Missing Sample Data
- **Symptoms**: Test skipped with "Missing: sample_mflix" or similar, or
  empty results from queries against sample databases
- **Diagnosis**: Explain which sample database is needed. Suggest wrapping in
  `describeWithSampleData()` or `itWithSampleData()` if not already.

### Timeout
- **Symptoms**: `Exceeded timeout of 120000 ms`, test hangs
- **Diagnosis**: Check for missing `client.close()` in the example's finally
  block. Check for unclosed cursors or change streams. For JavaScript/Node.js,
  also check for missing `await` on async operations — a missing `await`
  can cause the test to hang without an obvious error. If the operation is
  expected to be slow (full-collection scan, multi-stage aggregation, or
  processing more than 10,000 documents), increase the specific test's
  timeout to 240000 ms via `it('...', async () => {...}, 240000)`. Do not
  increase the global timeout in `jest.config.cjs`.

### Import / Module Error
- **Symptoms**: `Cannot find module`, `SyntaxError: Cannot use import`,
  `does not provide an export named`
- **Diagnosis**: Verify the import path matches the actual file location. Check
  that the example file exports the expected function name. Verify ES module
  syntax is used consistently.

### Runtime Error
- **Symptoms**: `TypeError`, `ReferenceError`, MongoDB operation errors
- **Diagnosis**: Read the example code at the line referenced in the stack
  trace. Identify the root cause (wrong collection name, bad query syntax,
  missing await, etc.).

## Step 5: Suggest or Apply Fixes

For each diagnosed failure:

1. **Present the diagnosis** clearly: what failed, why, and what to change
2. **Propose a specific fix** with the exact code change
3. **Ask for approval** before making changes, unless the fix is adding an
   Expect chain modifier for dynamic fields or sort order (e.g.,
   `withIgnoredFields`, `withUnorderedSort`) — these can be applied directly,
   then re-run to confirm. See the "Comparison API" section in the target
   language's conventions file.

   **Do not** auto-update expected output files without asking. An output
   mismatch may indicate an idempotency issue (stale state between runs) or
   a logic bug, not just a stale output file. Investigate the cause first.

After applying fixes, re-run the failing test to confirm the fix works.

## Step 6: Report

Provide a summary headed with `Skill: grove-run`:
- Total tests: X passed, Y failed, Z skipped
- For each failure: what was wrong and what was done to fix it
- Any remaining issues that need manual attention

## Edge Cases

- **Multiple failure types in one run**: Diagnose each failure independently.
  Don't assume all failures have the same root cause — a connection error and
  an output mismatch in the same run are unrelated issues.
- **Test hangs with no output**: Likely a missing `client.close()`, an
  unclosed change stream/cursor, or (in Node.js) a missing `await`. Check
  the example's finally/defer block first, then check for unawaited async
  calls.
- **All tests skipped**: Sample data is not loaded on the deployment. Explain
  this and suggest `/grove-setup` to check sample data availability.
- **Test passes locally but fails in CI**: Investigate discrepancies between
  the local and CI environments. Common causes include: missing sample data,
  timing/timeout differences, datetime or timezone handling (CI may use a
  different timezone), and OS-level differences (e.g., locale, line endings).
  Do not increase the global timeout — increase only the specific test's
  timeout if the operation is genuinely slow.
- **Failure in teardown, not in the test itself**: Investigate the cause —
  teardown failures can be blocking. Common causes include permissions issues
  (the test user lacks `dropDatabase` privileges) and incomplete state
  cleanup between tests (e.g., test A's teardown doesn't clean up what test
  B expects). Teardown errors with `ns not found` or similar "doesn't exist"
  messages are generally safe to ignore, but other teardown failures
  (permissions, timeouts, connection errors) should be diagnosed and fixed.
