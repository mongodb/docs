# Go (Driver) — Grove Conventions

## Project Setup

- Module name: `driver-examples`
- Go >= 1.24.5
- Key deps: `go.mongodb.org/mongo-driver/v2` 2.5.0, `github.com/joho/godotenv` 1.5.1
- `.env` file required at this directory root: `CONNECTION_STRING="..."`
- No Makefile — raw `go` and `node` commands

## Example File Pattern

```go
package topic

import (
    "context"
    "log"

    "driver-examples/utils"
    "go.mongodb.org/mongo-driver/v2/bson"
    "go.mongodb.org/mongo-driver/v2/mongo"
    "go.mongodb.org/mongo-driver/v2/mongo/options"
)

func YourExampleName() []bson.D {
    uri := utils.GetConnectionString()
    if uri == "" {
        log.Fatal("Set your CONNECTION_STRING env variable")
    }

    ctx := context.Background()
    client, err := mongo.Connect(options.Client().ApplyURI(uri))
    if err != nil {
        log.Fatalf("Failed to connect: %v", err)
    }
    defer func() { _ = client.Disconnect(ctx) }()

    // :snippet-start: your-snippet-name
    db := client.Database("your_db_name")
    coll := db.Collection("your_collection")

    cursor, err := coll.Find(ctx, bson.D{{"field", "value"}})
    if err != nil {
        log.Fatalf("Find failed: %v", err)
    }
    defer func() {
        if err := cursor.Close(ctx); err != nil {
            log.Fatalf("Cursor close failed: %v", err)
        }
    }()
    // :snippet-end:

    var results []bson.D
    if err := cursor.All(ctx, &results); err != nil {
        log.Fatalf("Cursor iteration failed: %v", err)
    }
    return results
}
```

- **File naming**: `snake_case.go` in `examples/{topic}/{subtopic}/`
- **Package naming**: Matches the leaf directory name (e.g., `package filter`)
- **Import prefix**: Always `"driver-examples/..."` — never relative imports
- **Connection**: `utils.GetConnectionString()` at function start, `log.Fatal` if empty
- **Context**: `ctx := context.Background()` at function start
- **Cleanup**: `defer client.Disconnect(ctx)` immediately after connect
- **Return type**: `[]bson.D` or `[]YourCustomStruct` — always return something testable
- **Error handling**: Existing examples use `log.Fatalf(...)`. For error handling
  style guidance, refer to `content/meta/source/includes/code/guidelines-go.rst`
- **Bluehawk**: `// :snippet-start: kebab-name` / `// :snippet-end:`; `// :remove:` for single lines
- **Snippet identifiers**: Unique within each file, lowercase kebab-case
- **Template**: `examples/example_stub.go`

### Multi-File Topic Pattern

Topics with substantial code often split across files:

- `models.go` — struct definitions with `bson` struct tags
- `load_data.go` — `func LoadData()` to insert test fixtures
- `run_pipeline.go` — main operation, returns results
- `output.txt` — expected output (JSONL format)

## Test File Pattern

```go
package tests

import (
    "context"
    "testing"

    "driver-examples/examples/topic/subtopic"
    "driver-examples/utils"
    "driver-examples/utils/compare"
    "go.mongodb.org/mongo-driver/v2/mongo"
    "go.mongodb.org/mongo-driver/v2/mongo/options"
)

func setupTestDB(t *testing.T) (*mongo.Client, func()) {
    t.Helper()
    uri := utils.GetConnectionString()
    if uri == "" {
        t.Fatal("Set your CONNECTION_STRING env variable")
    }
    client, err := mongo.Connect(options.Client().ApplyURI(uri))
    if err != nil {
        t.Fatalf("Failed to connect: %v", err)
    }
    cleanup := func() {
        _ = client.Database("your_db_name").Drop(context.Background())
        _ = client.Disconnect(context.Background())
    }
    return client, cleanup
}

func TestExampleOperations(t *testing.T) {
    tests := []struct {
        name     string
        testFunc func(t *testing.T)
    }{
        {"YourExampleName", testYourExampleName},
    }

    for _, tt := range tests {
        t.Run(tt.name, func(t *testing.T) {
            _, cleanup := setupTestDB(t)
            defer cleanup()
            tt.testFunc(t)
        })
    }
}

func testYourExampleName(t *testing.T) {
    t.Helper()
    subtopic.LoadData()
    result := subtopic.RunPipeline()
    compare.ExpectThat(t, result).ShouldMatch("examples/topic/subtopic/output.txt")
}
```

- **File naming**: `snake_case_test.go` in `tests/{topic}/`
- **Package naming**: Matches the containing directory (e.g., `package pipelines`)
- **Table-driven subtests**: `TestXxx` with a `[]struct` of test cases
- **Setup helper**: `setupTestDB(t)` returns `(client, cleanup)` per test file
- **Teardown**: Each subtest drops its own DB via `defer cleanup()`
- **Output path**: Relative to module root (e.g., `"examples/topic/subtopic/output.txt"`)
- **Do not** drop sample data databases — only drop databases your example created
- **Template**: `tests/example_test.go`

## Sample Data

```go
import "driver-examples/utils"

// Skip test if sample data is unavailable
utils.RequiresSampleData(t, "sample_mflix")

// Skip if specific collections are missing
utils.RequiresSampleDataWithCollections(t, map[string][]string{
    "sample_mflix": {"movies", "theaters"},
})

// Wrap a subtest with sample data requirement
utils.WithSampleDataTest(t, "test name", func(t *testing.T) {
    // test body
}, "sample_mflix")
```

Tests auto-skip when required sample databases are unavailable.

## Expected Output Files

- Place alongside examples: `output.txt`
- Output path passed to `ShouldMatch()` is relative to the module root
- Format depends on the return type: JSONL (one document per line) for `[]bson.D`
  results, struct-style output for custom types. Uses Extended JSON for
  dates/ObjectIds. Check the comparison lib tests at `utils/compare/*_test.go`
  for examples of different output formats.
- Use ellipsis patterns for dynamic values (see root CLAUDE.md)

## Commands

| Command | Purpose |
|---------|---------|
| `go test -v -p 1 ./...` | Run all tests (from `tests/` dir) |
| `go test -v -p 1 ./aggregation/pipelines` | Run a specific test package |
| `go test -v ./... -run TestExampleOperations/YourName` | Run a single test |
| `go fmt ./...` | Format all files |
| `node snip.js` | Extract snippets via Bluehawk |

All test commands run from `code-example-tests/go/driver/tests/`. Other commands run from `code-example-tests/go/driver/`.

The `-p 1` flag is required to avoid concurrent DB writes across packages.

## Snippet Output

`node snip.js` extracts to: `content/code-examples/tested/go/driver/{topic}/{file}.snippet.{name}.go`

Files to ignore from snipping are listed in `IGNORE_PATTERNS` in `snip.js`.
