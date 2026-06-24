# Mongosh (MongoDB Shell) — Grove Conventions

<!-- canary:c9de1fff -->

## Directory Structure

```
code-example-tests/command-line/mongosh/
├── examples/                          # Code examples (shell commands)
│   └── topic/subtopic/
│       ├── your-example.js            # Pure mongosh syntax
│       └── your-example-output.sh     # Expected output
├── tests/                             # Tests
│   └── topic/subtopic/
│       └── your-topic.test.js
├── utils/
│   ├── comparison/                    # Comparison library
│   ├── makeTempFileForTesting.js      # Wraps examples for execution
│   └── sampleDataChecker.js           # Sample data detection
├── TESTING-PATTERNS.md                # Detailed troubleshooting guide
├── package.json
├── snip.js
└── .env                               # CONNECTION_STRING, CONNECTION_PORT
```

## Example File Pattern

Mongosh examples are **literal shell commands** — no imports, no function
wrappers, no connection handling:

```javascript
// :snippet-start: find-one
db.movies.findOne({ title: "The Godfather" })
// :snippet-end:
```

### Example file conventions

- **No imports or exports** — files are raw mongosh JavaScript
- **No connection handling** — the test harness wraps the code automatically
- **No return statements** — the last expression's output is captured
- File naming: `kebab-case.js`
- Bluehawk tags: `// :snippet-start:` / `// :snippet-end:`
- No `:remove:`, `:replace:`, or `:uncomment:` needed (no test infrastructure
  in the example file itself)
- For multi-step examples (load + query), use the comma operator pattern:
  `(db.collection.insertMany([...]), db.collection.aggregate([...]))`

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

### Test file conventions

- **CommonJS** (`require`, not `import`)
- Test framework: Jest
- **`Expect.outputFromExampleFiles()`** — NOT `Expect.that()` (driver pattern)
- **`.withDbName()` is required**
- File paths are **relative to `examples/`**
- Cleanup uses `execSync` with mongosh commands to revert specific changes
- Do NOT drop sample databases — revert individual modifications instead
- `describeWithSampleData` wraps suites that need sample data

## Cleanup Patterns

| Change | Cleanup |
|--------|---------|
| `updateOne`/`updateMany` | `$set` original values, `$unset` added fields |
| `insertOne`/`insertMany` | `deleteMany` the inserted docs |
| `deleteOne`/`deleteMany` | Re-insert (capture in `beforeEach`) |
| `createIndex` | `dropIndex` (wrap in try/catch) |
| Custom database (not sample) | `db.dropDatabase()` |

## Running Tests

```bash
cd code-example-tests/command-line/mongosh
npm test                                    # All tests
npm test -- -t 'test name'                  # Single test
```

## Snipping

```bash
node snip.js
```

Output: `content/code-examples/tested/command-line/mongosh/topic/subtopic/`

Do NOT run Prettier on mongosh examples.

## Literalinclude in Docs

```rst
.. literalinclude:: /code-examples/tested/command-line/mongosh/topic/subtopic/your-example.snippet.your-snippet-name.js
   :language: javascript
   :copyable: true
```
