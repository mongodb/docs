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
