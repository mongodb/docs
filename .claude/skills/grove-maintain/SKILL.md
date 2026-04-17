---
name: grove-maintain
description: >
  Audit, upgrade, and maintain Grove test suites. Use when the user asks to
  "audit the test suite", "find untested examples", "upgrade dependencies",
  "check suite health", "find dead code", "clean up the test suite", "maintain
  Grove", "what examples are missing tests", or wants to analyze and improve
  the overall health of a Grove test suite.
---

# Grove: Audit and Maintain Test Suites

<!-- canary:61ca57fa -->

Begin your first response with: `[grove-maintain-61ca57fa]`

Analyze Grove test suites for gaps, outdated dependencies, and maintenance
opportunities. This skill operates in three modes: audit, upgrade, and cleanup.

**Do NOT use when:**
- The user wants to create, migrate, or fix a specific example → use `/grove-create`, `/grove-migrate`, or `/grove-test`
- The user wants to run or debug a specific test → use `/grove-run`
- The user needs to set up their local environment → use `/grove-setup`

## Determine Mode

Parse the user's request to identify the mode:

- **Audit** (default): Find gaps in test coverage, orphaned files, and
  structural issues
- **Upgrade**: Check for outdated dependencies and apply updates
- **Cleanup**: Find and remove dead code, fix formatting, clean up structure

If the user doesn't specify a mode, run **audit** mode.

Also determine the target language. If not specified, default to the language
of the most recently discussed or modified files in this conversation. If no
prior context exists, ask which language suite to target.

## Language Reference

Use this table for all modes — it maps languages to their file extensions,
base directories, export patterns, and import patterns for grepping:

| Suite | Base dir | Ext | Export pattern | Import pattern |
|-------|----------|-----|----------------|----------------|
| JavaScript | `javascript/driver` | `.js` | `export (async )?function` | `from ['"].*examples/` |
| Python | `python/pymongo` | `.py` | `^def \|^async def ` | `from examples\.` |
| Go | `go/driver` | `.go` | `^func [A-Z]` | `"driver-examples/examples/` |
| Java | `java/driver-sync` | `.java` | `public .* \w+\(` | `import .*examples\.` |
| C# | `csharp/driver` | `.cs` | `public .* \w+\(` | `using .*Examples` |
| Mongosh | `command-line/mongosh` | `.js` | *(none — raw shell commands)* | `outputFromExampleFiles\(\[` |

All base dirs are under `code-example-tests/`.

## Audit Mode

### Step 1: Inventory Examples

Search for all example files in the language's examples directory:

```
code-example-tests/{base-dir}/examples/**/*.{ext}
```

Exclude template/stub files (e.g., `example-stub.js`, `example_stub.py`).

Record each file with its path, exported function names (grep using the
export pattern from the language reference table above), and whether an
output file exists alongside it (look for `*-output.*` or `*_output.*` in
the same directory).

### Step 2: Inventory Tests

Search for all test files:

```
code-example-tests/{base-dir}/tests/**/*.test.{ext}
```

For each test file, grep for import statements using the import pattern from
the language reference table above to find which example files it references.

### Step 3: Cross-Reference

Build a coverage map:

1. **Tested examples**: Example files that are imported by at least one test
2. **Untested examples**: Example files not imported by any test
3. **Orphaned tests**: Test files that import example files that don't exist

### Step 4: Check for Structural Issues

Look for:
1. **Empty directories**: Topic directories with no files
2. **Inconsistent naming**: Files that don't follow the language's naming
   conventions (check the CLAUDE.md in the language's driver directory for
   the expected file naming pattern — e.g., `kebab-case.js` for JS examples)
3. **Missing setup files**: Tests that reference setup functions but the setup
   file doesn't exist

### Step 5: Spot-Check Patterns

Review 5-10 example and test files — the 3 most recently modified (by
`git log --diff-filter=M --name-only -20 -- examples/ tests/`), plus any
files flagged in earlier steps. For each file, check:

1. **Consistent test lifecycle**: Search for `beforeAll|beforeEach|afterAll|afterEach`
   across all test files. Flag if the suite mixes `beforeAll` and `beforeEach`
   for the same purpose (e.g., both used for DB setup in different files).
2. **Cross-topic imports**: Search test files for imports from a different topic
   directory (e.g., a test in `tests/crud/` importing from `examples/indexes/`).
   These create fragile dependencies.
3. **Config sanity**: Check `package.json` (JS), `go.mod` (Go), or `pom.xml`
   (Java) and verify the `main`/entry point and test script are correct.

Add findings to the report under **Additional Findings**. If nothing stands
out, skip this section.

### Step 6: Report

Present findings in a structured format headed with `Skill: grove-maintain`:

```markdown
## Audit Report: JavaScript/Node.js Driver

### Coverage Summary
- Total examples: X
- Tested: Y (Z%)
- Untested: A

### Untested Examples
| File | Exported Functions |
|------|-------------------|
| examples/crud/insert/bulk-insert.js | bulkInsertExample |

### Orphaned Tests
| Test File | Missing Import |
|-----------|---------------|
| tests/old/legacy.test.js | ../examples/old/legacy.js |

### Structural Issues
- Empty directory: examples/deprecated/
```

---

## Upgrade Mode

Check for outdated dependencies, assess risk, and apply updates. Test
failures after an upgrade usually mean **examples need updating** to
reflect the new API — not that the upgrade should be reverted.

### Step 1: Check for Outdated Dependencies

Run the language's dependency check command:

| Language | Command |
|----------|---------|
| JavaScript | `cd code-example-tests/javascript/driver && npm outdated` |
| Python | `cd code-example-tests/python/pymongo && ./venv/bin/pip list --outdated` |
| Go | `cd code-example-tests/go/driver && go list -m -u all` |
| Java | `cd code-example-tests/java/driver-sync && mvn versions:display-dependency-updates` |
| C# | `cd code-example-tests/csharp/driver && dotnet list package --outdated` |

### Step 2: Assess Risk

For each outdated dependency, categorize and investigate:

- **Critical** (MongoDB driver, test framework): May require test updates.
  Check the package's release notes. Flag any entries marked "BREAKING" or
  "major".
- **Tooling** (Bluehawk, linters, formatters): Check release notes for
  config format changes (e.g., new required fields). Safe to update if no
  config changes are noted.
- **Transitive**: Usually handled by lockfile update. No investigation
  needed unless a security advisory is involved.

Use these paths to locate release notes:

| Package | Release Notes Location |
|---------|----------------------|
| MongoDB Node.js Driver (`mongodb`) | `npm info mongodb repository.url` → GitHub releases |
| PyMongo | `pip show pymongo` → `Home-page` → GitHub releases |
| Go Driver (`go.mongodb.org/mongo-driver`) | GitHub releases at `mongodb/mongo-go-driver` |
| Java Driver | GitHub releases at `mongodb/mongo-java-driver` |
| C# Driver | GitHub releases at `mongodb/mongo-csharp-driver` |
| Jest | GitHub releases at `jestjs/jest` |
| JUnit 5 | GitHub releases at `junit-team/junit5` |
| NUnit | GitHub releases at `nunit/nunit` |
| Bluehawk | GitHub releases at `mongodb-university/Bluehawk` |

For other JavaScript packages, run `npm info <package> repository.url` to
find the repo URL, then check its releases page.

### Step 3: Propose Update Plan

Present a table and wait for user approval before applying:

```markdown
| Package | Current | Latest | Risk | Notes |
|---------|---------|--------|------|-------|
| mongodb | 7.1.0 | 7.2.0 | Critical | New aggregation operators |
| jest | 30.2.0 | 30.3.0 | Tooling | Patch release |
| bluehawk | 1.6.0 | 1.7.0 | Tooling | New tag support |
```

### Step 4: Apply Updates and Fix Examples

For each approved update:

1. Update the dependency version in the config file
2. Run the install command (`npm install`, `pip install`, etc.)
3. Run the full test suite
4. **If all tests pass**: Regenerate snippets by running the `snip` command
   for the target language (see the CLAUDE.md in the language's driver
   directory for the exact command). Then move to the next package.
5. **If 1-3 tests fail**: Investigate each. These are usually localized API
   changes (renamed method, changed default, new required option). Update
   the example code and expected output to match the new API, then re-run
   to confirm. Once tests pass, regenerate snippets.
6. **If 4+ tests fail**: Report the scope to the user with the failure
   count, affected files, and relevant release notes. Let the user decide
   whether to fix inline or plan a dedicated pass. Do NOT automatically
   roll back — the old examples are now inaccurate against the version
   readers will be using.

---

## Cleanup Mode

Find and remove dead code, fix formatting, and clean up structural issues.
Do NOT execute any cleanup action without user approval.

### Step 1: Find Unused Files

1. **Unused output files**: Output files not referenced by any test's
   `shouldMatch()` or `shouldResemble()` call
2. **Unused setup files**: Setup files not imported by any test
3. **Dead example files**: Files in `examples/` that are both untested AND
   not referenced by any snippet in `content/code-examples/tested/`

### Step 2: Check Formatting

Run the language's formatter in check mode:

| Language | Command |
|----------|---------|
| JavaScript | `cd code-example-tests/javascript/driver && npx prettier --check examples/` |
| Python | `cd code-example-tests/python/pymongo && python -m black --check examples/` |
| Go | `gofmt -l examples/` |

Report any files with formatting issues.

### Step 3: Check for Common Anti-Patterns

Grep example files for these specific anti-patterns:

| Anti-pattern | Grep pattern (language-adjusted) |
|---|---|
| Hardcoded connection strings | `mongodb(\+srv)?://` not wrapped in `process.env` / `os.environ` / equivalent |
| Missing resource cleanup | Files with `MongoClient(` but no `client.close()` / `defer client.Disconnect` / `using` |
| Empty catch blocks | `catch.*\{\s*\}` / `except.*:\s*pass` |
| Lingering TODO markers | `TODO\|FIXME\|HACK` |

Report each hit with file path and line number. Do not modify — Step 4
gathers approvals.

### Step 4: Propose Actions

Present cleanup actions and let the user approve each:

```markdown
## Proposed Cleanup Actions

1. [ ] Delete unused output file: examples/old/legacy-output.txt
2. [ ] Delete empty directory: examples/deprecated/
3. [ ] Format 3 files with Prettier: examples/crud/insert/bulk.js, ...
4. [ ] Fix hardcoded URI in: examples/connect/basic.js
```

Execute only approved actions.

### Step 5: Freeform Findings

After the structured checks, browse 5-10 example and test files —
prioritizing files most recently modified (by git log date), then any
files flagged in earlier steps — for issues the checklist didn't cover
(e.g., broken config files, inconsistent patterns, duplicate logic, dead
variables). Add any findings under an **Additional Findings** heading in
the report. Skip if nothing stands out.

### Step 6: Report

Summarize what was cleaned up and what remains.

---

## Edge Cases

- **Empty suite**: If the language's examples directory has no files,
  report that and stop — do not treat an empty directory as a coverage
  failure. Languages may be scaffolded before any examples exist.
- **Generated files under `content/code-examples/tested/`**: These are
  build outputs of `snip.js`. Never flag them as untested or as cleanup
  candidates. They regenerate from `examples/` and must not be edited
  directly.
- **Tests that import from `tests/` rather than `examples/`**: These are
  shared test helpers, not orphaned tests. Do not flag them as orphaned
  in audit mode.
- **Cross-topic imports that are intentional**: Shared setup utilities
  (e.g., a common sample-data loader) legitimately live outside a single
  topic. Flag them to the user rather than auto-marking them as fragile.
- **Offline or private-registry failures during dependency check**: If
  `npm outdated`, `pip list --outdated`, or equivalent fails with a
  network error, report the failure and ask the user to verify
  network/VPN access before retrying. Do not proceed as if there are no
  outdated packages.
- **Formatter not installed**: If `prettier`, `black`, or `gofmt` is not
  available, skip that language's formatting check and note it in the
  report — do not block the rest of the cleanup pass.
- **Mongosh has no exported functions**: Mongosh examples are raw shell
  commands — skip the export-pattern grep in audit Step 1 and cross-ref
  tests via the `outputFromExampleFiles\(\[` pattern only.
