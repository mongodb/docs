# Grove — Code Example Testing Platform

Grove is the infrastructure for creating **tested, snippeted code examples** for MongoDB documentation. Writers create example files with Bluehawk markup, test files that verify the examples work, and expected output files. Tested code is extracted via Bluehawk to `content/code-examples/tested/` for use in docs.

## Directory Layout

Each language has its own directory with a consistent structure:

| Suite | Examples dir | Tests dir |
|-------|-------------|-----------|
| JavaScript | `javascript/driver/examples/` | `javascript/driver/tests/` |
| Python | `python/pymongo/examples/` | `python/pymongo/tests_package/` |
| Go | `go/driver/examples/` | `go/driver/tests/` |
| Java | `java/driver-sync/src/main/java/` | `java/driver-sync/src/test/java/` |
| C# | `csharp/driver/Examples/` | `csharp/driver/Tests/` |
| Mongosh | `command-line/mongosh/examples/` | `command-line/mongosh/tests/` |

**Note**: Mongosh examples are shell commands (not driver code). They use a
different test execution model — see `command-line/mongosh/CLAUDE.md` for
mongosh-specific conventions.

Examples are organized by **topic** (e.g., `crud/insert`, `aggregation/pipelines/filter`), not by docs page structure, to enable reuse across docs projects.

## Bluehawk Snippet Extraction

Examples contain Bluehawk markup for extracting doc-ready snippets:

- `:snippet-start: name` / `:snippet-end:` — wraps code to extract as a named snippet
- `:remove:` (single line) or `:remove-start:` / `:remove-end:` (block) — omits test-only code from output

Running the language's snip script (e.g., `node snip.js`) extracts snippets to:
`content/code-examples/tested/{language}/{driver}/{topic}/{file}.snippet.{name}.{ext}`

Docs reference snippets via `literalinclude`:
```rst
.. literalinclude:: /code-examples/tested/{language}/{driver}/{topic}/{file}.snippet.{name}.{ext}
   :language: {language}
   :copyable: true
```

## Comparison / Expect API

All languages share a fluent `Expect` API for validating example output:

```
Expect.that(result).shouldMatch(outputFilepath)                     # exact match against file
Expect.that(result).withOrderedSort().shouldMatch(filepath)         # order matters
Expect.that(result).withIgnoredFields('_id').shouldMatch(filepath)  # ignore dynamic fields
Expect.that(result).shouldResemble(expected).withSchema({...})      # schema validation
```

`shouldMatch` and `shouldResemble` are mutually exclusive. `withIgnoredFields`, `withOrderedSort`, and `withUnorderedSort` work only with `shouldMatch`.

## Ellipsis Patterns in Expected Output Files

The comparison engine auto-detects these patterns:

| Pattern | Meaning |
|---------|---------|
| `"..."` | Matches any value for a key |
| `"prefix..."` | Matches a string starting with "prefix" |
| `[...]` | Matches any array |
| Standalone `...` on its own line | Allows additional fields/elements |
| `{ ... }` | Matches any object |

## Sample Data

Some examples use MongoDB Atlas sample datasets. Each language has a sample data utility that auto-detects available databases and gracefully skips tests when data is missing.

| Database | Key Collections | Good For |
|----------|----------------|----------|
| `sample_mflix` | movies, theaters, users, comments | General queries, aggregation, text search |
| `sample_restaurants` | restaurants, neighborhoods | Geospatial, compound queries |
| `sample_training` | grades, companies, trips, posts | Aggregation, complex schemas |
| `sample_analytics` | accounts, customers, transactions | Joins ($lookup), financial data |
| `sample_airbnb` | listingsAndReviews | Large documents, arrays, text search |
| `sample_geospatial` | shipwrecks | Geospatial queries |
| `sample_guides` | planets | Simple queries, getting started |
| `sample_supplies` | sales | Aggregation, date queries |
| `sample_weatherdata` | data | Time series, large datasets |

See each language's CLAUDE.md for the specific sample data API (e.g., `describeWithSampleData` for JS, `@requires_sample_data` for Python).

## Working Principles

Follow these principles when working in these files:

- If you create debug files, examine them to consider whether they contain any contents worth maintaining as ongoing test coverage to protect against regressions. If yes, add tests that incorporate those patterns or cases, then delete the debug files.
- If you add debug output to source code to diagnose an issue, remove it when you're done.
- After you change implementation details, run the entire test suite for that project to ensure you haven't introduced any regressions.
- Optimize for maintainability. Use language- and framework-idiomatic documentation comments and capture the "why" of design decisions in code comments. Choose simpler solutions over clever ones.
- Keep the user-facing `utils` APIs as simple as possible. The users of these utilities are technical writers, not developers. Avoid unnecessary configuration or an excessive number of public methods unless key to the requested functionality. Handle those details internally as much as possible.
- Do not call a partial implementation with a mix of passing and failing tests "complete" or "successful." Don't pepper every file with emojis or print mindless success messages while tests are failing. Iterate until the test failures are resolved.

Some projects have additional documentation for common test patterns and troubleshooting:

- **mongosh**: See `command-line/mongosh/TESTING-PATTERNS.md` for mongosh-specific test patterns, the Expect API, and common failure fixes.
