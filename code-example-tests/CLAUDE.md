# WHEN WORKING ON CODE EXAMPLE TESTS (`code-example-tests/`)

Each language subdirectory contains:
- `examples/` — Source code examples. Edit these files directly.
- `tests/` — Test files that call examples and validate their output.
- `utils/` — Shared utilities.

Generated snippet files live in `content/code-examples/tested/`. Never edit
those directly — edit the source file in `examples/` and run `node snip.js`
to regenerate them. Ask the user before running `node snip.js`.

**Writing example code:**
- Read the connection string from `CONNECTION_STRING` environment variable.
  Never hardcode it.
- Return something from every example function so the test can validate output.
- Include all necessary setup (imports, connection, sample data) in the example.

**Writing tests:**
- Use `Expect.that(result).shouldMatch(outputFilepath)` to compare output.
- Drop the test database in a teardown block after each test.
- For sample data tests, revert changes individually — do not drop the database.

**After making changes:**
- Run the full test suite for the language project to check for regressions.
- Remove debug output and temporary files before declaring work complete.
- Do not report success while tests are still failing.

**Project-specific notes:**
- mongosh: See `code-example-tests/command-line/mongosh/TESTING-PATTERNS.md`
  for the Expect API and common failure fixes.
