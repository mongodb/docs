# Mongosh (MongoDB Shell) — Grove Conventions

## How Mongosh Tests Differ from Driver Tests

Mongosh examples are **shell commands**, not driver code. The test infrastructure:

1. **Executes mongosh as a subprocess** — runs `mongosh --file <tempfile>`
2. **Captures stdout** — the output from mongosh is a string
3. **Compares to expected output files** — string comparison with pattern matching

This means tests validate **actual mongosh output**, not function return values.

## Directory Structure

```
code-example-tests/command-line/mongosh/
├── examples/                          # Code examples (mongosh syntax)
│   └── topic/subtopic/
│       ├── your-example.js            # Pure shell commands
│       └── your-example-output.sh     # Expected output
├── tests/                             # Tests
│   └── topic/subtopic/
│       └── your-topic.test.js
├── utils/
│   ├── comparison/                    # Comparison library (Expect API)
│   ├── makeTempFileForTesting.js      # Wraps examples for execution
│   └── sampleDataChecker.js           # Sample data detection
├── TESTING-PATTERNS.md                # Detailed troubleshooting guide
├── package.json
├── snip.js
└── .env                               # CONNECTION_STRING, CONNECTION_PORT
```

## Example File Pattern

Mongosh examples are **literal shell commands** — no imports, no function
wrappers, no connection handling. The test harness handles connection setup.

```javascript
// :snippet-start: find-one
db.movies.findOne({ title: "The Godfather" })
// :snippet-end:
```

### Key conventions

- **No imports or exports** — files are raw mongosh JavaScript
- **No connection handling** — the test harness wraps the code with connection
  setup and `db.getSiblingDB()` automatically
- **No return statements** — the last expression's output is captured by the
  harness via `printjson()`
- **File naming**: `kebab-case.js`
- **Bluehawk tags**: Same as driver suites (`// :snippet-start:` / `// :snippet-end:`)
- **No `:remove:` or `:replace:` needed** — since there's no test infrastructure
  in the example file itself (no imports, no exports, no connection strings)
- **Comma operator for multi-step examples**: Use `(step1, step2)` pattern for
  load-then-query in a single file (see TESTING-PATTERNS.md for details)

## Test File Pattern

```javascript
const Expect = require("../../utils/comparison/Expect");
const { execSync } = require("child_process");
const { describeWithSampleData } = require("../../utils/sampleDataChecker");

describe("Your topic tests", () => {
  const dbName = "sample_mflix";

  describeWithSampleData("description", () => {
    let currentCleanup = null;

    afterEach(() => {
      if (currentCleanup) {
        currentCleanup();
        currentCleanup = null;
      }
    });

    test("Should produce expected output", async () => {
      currentCleanup = () => {
        // Revert specific changes made by the example
        const command = `mongosh "${process.env.CONNECTION_STRING}" --quiet --eval '
          db = db.getSiblingDB("${dbName}");
          db.movies.updateOne({ title: "The Godfather" }, { $set: { rated: "R" } });
        '`;
        execSync(command, { encoding: "utf8" });
      };

      await Expect
        .outputFromExampleFiles(["topic/subtopic/your-example.js"])
        .withDbName(dbName)
        .shouldMatch("topic/subtopic/your-example-output.sh");
    });
  }, "sample_mflix");
});
```

### Key conventions

- **CommonJS** (`require`, not `import`) — mongosh suite does NOT use ES modules
- **`Expect.outputFromExampleFiles()`** — not `Expect.that()`. This is the
  mongosh-specific API that executes files as subprocesses
- **`.withDbName()` is required** — specifies which database to connect to
- **File paths are relative to `examples/`** — don't include `examples/` prefix
- **Cleanup reverts specific changes** — do NOT drop sample databases. Use
  `execSync` with mongosh commands to undo modifications (update back, delete
  inserted docs, drop created indexes)
- **`describeWithSampleData`** wraps test suites that need sample data
- **No `dropDatabase()` for sample data** — only for custom databases

## Expect API (Mongosh-Specific)

```javascript
// Exact matching
await Expect
  .outputFromExampleFiles(["query.js"])
  .withDbName("sample_mflix")
  .shouldMatch("query-output.sh");

// With ignored fields
await Expect
  .outputFromExampleFiles(["query.js"])
  .withDbName("sample_mflix")
  .withIgnoredFields("lastupdated")
  .shouldMatch("query-output.sh");

// Schema validation (when exact output varies)
await Expect
  .outputFromExampleFiles(["query.js"])
  .withDbName("sample_mflix")
  .shouldResemble("query-output.sh")
  .withSchema({
    count: 3,
    requiredFields: ["_id", "title", "year"],
    fieldValues: { year: 2012 }
  });

// Multiple files executed in sequence
await Expect
  .outputFromExampleFiles(["load-data.js", "run-query.js"])
  .withDbName("my_database")
  .shouldMatch("query-output.sh");
```

## Cleanup Patterns

**Critical**: Mongosh tests often modify sample databases. Always revert
specific changes rather than dropping the database.

| Change made by example | Cleanup in afterEach |
|------------------------|---------------------|
| `updateOne` / `updateMany` | `$set` original values back, `$unset` added fields |
| `insertOne` / `insertMany` | `deleteMany` the inserted documents |
| `deleteOne` / `deleteMany` | Re-insert the deleted documents (capture in beforeEach) |
| `createIndex` | `dropIndex` (wrap in try/catch — index may not exist if test failed) |
| `createCollection` / view | `drop()` the collection/view |

## Running Tests

```bash
cd code-example-tests/command-line/mongosh
npm test                                    # All tests
npm test -- -t 'Should return filtered'     # Single test by name
```

## Snipping

```bash
node snip.js
```

Output: `content/code-examples/tested/command-line/mongosh/{topic}/{file}.snippet.{name}.js`

Do **not** use Prettier on mongosh examples — formatting rules conflict with
mongosh execution syntax.

## Literalinclude in Docs

```rst
.. literalinclude:: /code-examples/tested/command-line/mongosh/topic/subtopic/your-example.snippet.your-snippet-name.js
   :language: javascript
   :copyable: true
```
