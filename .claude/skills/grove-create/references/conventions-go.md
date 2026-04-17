# Go Driver — Grove Conventions

<!-- canary:0e5a9739 -->

## Directory Structure

```
code-example-tests/go/driver/
├── examples/                          # Code examples
│   ├── example_stub.go                # Template (do not modify)
│   └── topic/subtopic/
│       ├── your_example.go
│       ├── load_data.go               # Optional data loader
│       └── output.txt                 # Optional expected output
├── tests/                             # Tests
│   └── topic/subtopic/
│       └── tutorials_test.go
├── utils/
│   ├── compare/                       # Comparison library
│   ├── env.go                         # GetConnectionString()
│   └── sample_data.go                 # RequiresSampleData()
├── go.mod
├── snip.js
└── .env                               # CONNECTION_STRING (not committed)
```

## Example File Pattern

```go
package subtopic

import (
    "context"
    "log"

    "driver-examples/utils"

    "go.mongodb.org/mongo-driver/v2/bson"
    "go.mongodb.org/mongo-driver/v2/mongo"
    "go.mongodb.org/mongo-driver/v2/mongo/options"
)

// YourExampleName demonstrates a specific MongoDB operation
func YourExampleName() []bson.D {
    ctx := context.Background()

    uri := utils.GetConnectionString()
    if uri == "" {
        log.Fatal("set your 'CONNECTION_STRING' environment variable")
    }

    clientOptions := options.Client().ApplyURI(uri)
    client, err := mongo.Connect(clientOptions)
    if err != nil {
        log.Fatalf("failed to connect to the server: %v", err)
    }
    defer func() { _ = client.Disconnect(ctx) }()

    // :snippet-start: your-snippet-name
    db := client.Database("your_db_name")
    collection := db.Collection("your_collection")

    // Your MongoDB operation here
    cursor, err := collection.Find(ctx, bson.D{})
    if err != nil {
        log.Fatalf("failed to find documents: %v", err)
    }
    // :snippet-end:

    var results []bson.D
    if err = cursor.All(ctx, &results); err != nil {
        log.Fatalf("failed to decode documents: %v", err)
    }

    return results
}
```

### Example file conventions

- Package name matches the directory name (e.g., `package filter`)
- Function names are exported (PascalCase): `YourExampleName()`
- Connection via `utils.GetConnectionString()`
- Use `defer` for client disconnect
- Return `[]bson.D` (or custom struct) for test validation
- Use `// :snippet-start:` / `// :snippet-end:` (Go comment style)
- Use `// :remove-start:` / `// :remove-end:` for test-only blocks
- File naming: `snake_case.go`
- Run `go fmt ./...` to format before committing

## Optional Data Loader

If your example needs seed data, create a separate `load_data.go` in the same
package:

```go
package subtopic

func LoadData() {
    // Insert seed data used by the example
}
```

## Test File Pattern

```go
package subtopic

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
    ctx := context.Background()

    uri := utils.GetConnectionString()
    if uri == "" {
        t.Fatal("set your 'CONNECTION_STRING' environment variable")
    }

    clientOptions := options.Client().ApplyURI(uri)
    client, err := mongo.Connect(clientOptions)
    if err != nil {
        t.Fatalf("failed to connect to the server: %v", err)
    }

    cleanup := func() {
        db := client.Database("your_db_name")
        if err := db.Drop(ctx); err != nil {
            t.Logf("failed to drop database: %v", err)
        }
        if err := client.Disconnect(ctx); err != nil {
            t.Logf("failed to disconnect client: %v", err)
        }
    }

    return client, cleanup
}

func TestYourFeature(t *testing.T) {
    tests := []struct {
        name     string
        testFunc func(t *testing.T)
    }{
        {"YourExample", testYourExample},
    }

    for _, tt := range tests {
        t.Run(tt.name, func(t *testing.T) {
            _, cleanup := setupTestDB(t)
            defer cleanup()
            tt.testFunc(t)
        })
    }
}

func testYourExample(t *testing.T) {
    t.Helper()

    subtopic.LoadData()  // If applicable
    result := subtopic.YourExampleName()
    expectedOutputFilepath := "examples/topic/subtopic/output.txt"

    compare.ExpectThat(t, result).ShouldMatch(expectedOutputFilepath)
}
```

### Test file conventions

- Test framework: Go's built-in `testing` package
- File naming: `*_test.go` (e.g., `tutorials_test.go`)
- Main test function: `TestYourFeature` (exported, starts with `Test`)
- Helper test functions: `testYourExample` (unexported, lowercase)
- Table-driven tests with `tests := []struct{...}`
- `setupTestDB` returns client + cleanup function
- Use `defer cleanup()` for teardown
- Output file paths are relative to the Go module root
- Import examples by package path: `"driver-examples/examples/topic/subtopic"`

## Sample Data

```go
// Skip if sample data is not available
utils.RequiresSampleData(t, "sample_mflix")

// Check specific collections
requiredCollections := map[string][]string{
    "sample_mflix": {"movies", "theaters"},
}
utils.RequiresSampleDataWithCollections(t, requiredCollections)
```

## Running Tests

```bash
cd code-example-tests/go/driver
go mod download           # First time only
go test -v -p 1 ./...
```

Run a single test:
```bash
go test -v -run TestYourFeature/YourExample ./tests/topic/subtopic/
```

## Snipping

```bash
node snip.js
```

Output: `content/code-examples/tested/go/driver/topic/subtopic/`

Snippet filenames: `your_example.snippet.your-snippet-name.go`

## Literalinclude in Docs

```rst
.. literalinclude:: /code-examples/tested/go/driver/topic/subtopic/your_example.snippet.your-snippet-name.go
   :language: go
   :copyable: true
```

## Comparison API

```go
import "driver-examples/utils/compare"

compare.ExpectThat(t, result).ShouldMatch(expectedOutputFilepath)
compare.ExpectThat(t, result).WithOrderedSort().ShouldMatch(expectedOutputFilepath)
compare.ExpectThat(t, result).WithIgnoredFields("_id", "timestamp").ShouldMatch(expectedOutputFilepath)
```

**Methods**: `ExpectThat()`, `WithIgnoredFields()`, `WithOrderedSort()`,
`WithUnorderedSort()`, `ShouldMatch()`

### When to Use Each Method

| Scenario | Method |
|----------|--------|
| Output stored in a file | `ShouldMatch(filepath)` |
| Output order matters (sorted results) | `.WithOrderedSort().ShouldMatch(...)` |
| Fields have dynamic values (_id, dates) | `.WithIgnoredFields("_id", ...).ShouldMatch(...)` |

### Ellipsis Patterns in Expected Output Files

The comparison library automatically detects these patterns in expected output:

- `"..."` — Matches any value for a key
- `"prefix..."` — Matches a string that starts with "prefix"
- `["..."]` — Matches any array
- Standalone `...` on its own line — Allows any number of additional fields
- `{ ... }` — Matches any object
