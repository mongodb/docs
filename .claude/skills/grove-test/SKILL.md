---
name: grove-test
description: >
  Create or fix tests for existing Grove code examples. Use when the user asks
  to "add a test", "create a test", "fix this test", "update the test", "the
  test doesn't match the output", "test is failing", or wants to add test
  coverage for an existing example or fix a broken test.
---

# Grove: Create or Fix Tests

<!-- canary:091435b6 -->

Begin your first response with: `[grove-test-091435b6]`

Create new tests for existing code examples, or diagnose and fix broken tests.
This is a lighter-weight skill than `/grove-create` — it focuses on the test
side only and runs a single test pass (no subagent).

**Do NOT use when:**
- The user wants to create a new example AND its test from scratch → use `/grove-create`
- The user wants to run tests without making changes → use `/grove-run`
- The user wants to convert untested docs code into Grove → use `/grove-migrate`
- The test failure is a runtime/connection issue, not a test logic issue → use
  `/grove-run` (heuristic: if the error contains `ECONNREFUSED`,
  `MongoServerSelectionError`, `timeout`, or `Missing: sample_`, it's a
  runtime issue)

## Step 1: Determine the Task

Parse the user's request to identify the mode:

**Create mode** — the user provides an example file path or says "add a test for X":
- Input: an example file that needs a test
- Output: a new or updated test file

**Fix mode** — the user provides a test file path or says "fix this test":
- Input: a test file that is failing or needs updating
- Output: the fixed test file (and possibly the output file)

## Step 2: Load Conventions

Read the CLAUDE.md file in the target language's driver directory. Also read
`code-example-tests/CLAUDE.md` for cross-language patterns (Bluehawk, ellipsis
patterns, sample data utilities).

Read the "Comparison API" section in
`.claude/skills/grove-create/references/conventions-{language}.md` (matching
the target language) for the full **Expect API** reference — method signatures,
import paths, ellipsis pattern syntax, and schema validation options.

## Step 3: Analyze the Example

Read the example file (and the test file, if fixing). Gather this information:

1. **Exports**: What function(s) does it export? What are their signatures?
2. **Return value**: What does the function return? (This is what the test validates.)
3. **Database/collection**: What database and collection names does it use?
4. **Sample data**: Does it query sample data databases?
5. **Side effects**: Does it insert, update, or delete documents?
6. **Expected output**: Is there an output file alongside it?

If fixing, also:

7. **Run the test first** to see the actual error
8. **Compare expected vs. actual** if it's an output mismatch
9. **Verify imports** — path and function name match the example
10. **Verify teardown** — afterEach drops the right database

## Step 4: Test Strategy (Create Mode)

Check existing test files in the topic area:

1. Search `tests/{topic}/**/*.test.js` (or equivalent for the language)
2. If a related test file exists, read it and decide whether to add an `it`
   block or create a new file
3. **Add to existing file** when: the new example uses the same database AND
   collection as existing tests, AND the file has fewer than 8 `it` blocks
4. **Create a new file** when: no related test file exists, the example uses a
   different database/collection, or the existing file has 8+ `it` blocks

## Step 5: Write or Fix the Test

### Create Mode

Write the test following the language's conventions:

1. Import the example function
2. Import `Expect` if file-based comparison is needed
3. Import sample data utilities if needed
4. Add `afterEach` to drop the test database (not sample databases)
5. Write the `it` block:
   - Call the example function
   - Capture the return value
   - Validate with the appropriate Expect method

Choose the right validation approach based on the scenario. See the
"Comparison API" section in the target language's conventions file for the
full method signatures, import paths, and ellipsis pattern reference:

| Scenario | Approach |
|----------|----------|
| Output file exists | `shouldMatch(filepath)` |
| Simple return value (string, number, boolean) | Jest `expect(result).toBe(expected)` |
| Need to ignore dynamic fields | Chain `.withIgnoredFields(...)` before `shouldMatch` |
| Order doesn't matter | Chain `.withUnorderedSort()` (default in JS) |
| Order matters (sorted results) | Chain `.withOrderedSort()` |
| Variable results, structure matters | `shouldResemble(expected).withSchema({...})` |

For **mongosh**, the Expect API is different — use `outputFromExampleFiles()`
instead of `that()`. See the mongosh conventions file for details.

### Fix Mode

**Do not modify the example file without checking with the user first.** The
example is written to illustrate a specific concept — changing it may break
the docs intent. If the fix requires changing the example (e.g., the example
accesses a field as the wrong type), explain the issue and its implications
to the user and let them decide how to proceed.

Based on the diagnosis from Step 3:

- **Output mismatch**: Investigate the cause before updating the output file.
  An output mismatch may indicate an idempotency issue (stale state between
  runs) or a logic bug, not just a stale output file. If the actual output
  is confirmed correct, update the expected output file or add
  `withIgnoredFields` / `withUnorderedSort` as needed
- **Import error**: Fix the import path or function name
- **Teardown issue**: Fix the database name in afterEach
- **Missing sample data handling**: Wrap in the sample data utility for the
  language (e.g., `describeWithSampleData` / `itWithSampleData` in JS)
- **Stale test**: If the example was updated but the test wasn't, update the
  test to match the new example behavior

**Example fix walkthrough:**
```
Error: ComparisonResult — field mismatch at [0]._id
  Expected: "507f1f77bcf86cd799439011"
  Received: "683a1f2b4e9c..."
```
The output file has a hardcoded `_id`. Two options:
1. Replace the hardcoded value with `"..."` in the output file (preferred)
2. Add `.withIgnoredFields('_id')` to the Expect chain in the test

## Step 6: Create or Update Expected Output File (optional)

Output files are not required. If the test uses file-based comparison and no
output file exists, you may create one:

1. Run the example function to see its actual output
2. Create the output file with the actual output
3. Replace dynamic values with ellipsis patterns
4. Place alongside the example file with consistent naming

If the example's output is not shown in documentation and the return value is
simple, define the expected output inline in the test and use the Comparison
API (e.g., `Expect.that(result).shouldMatch(expectedObject)`) rather than
framework-specific assertions. This keeps all validation on a single path.

## Step 7: Run the Test

Run the test once to verify it passes. Use the test commands from `/grove-run`
Step 3 (the canonical source for per-language test commands). For JavaScript:

```bash
cd code-example-tests/{driver-dir} && npm test -- -t '{test name}'
```

If it fails, diagnose and fix (loop back to Step 5, max 3 attempts). After 3
failed attempts, stop and report the remaining error to the user with the full
error output, what you tried, and what you suspect the root cause is. Do not
continue trying.

**Idempotency fixes**: Run the test once. If it passes, stop — do not run
consecutive passes. grove-test runs a single pass because its focus is test
correctness, not idempotency. Tell the user to run `/grove-run` to verify
idempotency.

## Step 8: Report

Provide a report headed with `Skill: grove-test`:
1. **What was done**: Files created or modified, with paths
2. **Test result**: Pass/fail with summary
3. **Output file**: Whether one was created/updated
4. **If fixing**: What the root cause was and what was changed

## Edge Cases

- **Example has no return value**: Add a return statement for the value the
  test needs to validate, and mark it with `// :remove:` so it doesn't appear
  in the docs snippet.
- **Test imports a renamed function**: If the example function was renamed but
  the test still uses the old name, fix the import and the call site.
- **Output file has hardcoded `_id` values**: Replace them with `"..."` ellipsis
  patterns. Dynamic fields like `_id`, timestamps, and ObjectIds should never
  be hardcoded in expected output.
- **Test already exists for this example**: Report the existing test to the
  user. Do not create a duplicate without explicit approval — offer to extend
  the existing test if additional coverage is needed.
- **Example uses sample data but test doesn't skip**: Wrap the test in
  `describeWithSampleData()` / `itWithSampleData()` so it auto-skips when the
  required sample database is unavailable, rather than failing.
