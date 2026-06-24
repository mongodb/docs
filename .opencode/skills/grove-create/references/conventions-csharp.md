# C# (.NET Driver) — Grove Conventions

<!-- canary:48dc5213 -->

## Directory Structure

```
code-example-tests/csharp/driver/
├── Examples/                          # Code examples (PascalCase dir)
│   ├── ExampleStub.cs                 # Template (do not modify)
│   └── Topic/Subtopic/
│       ├── YourExample.cs
│       └── YourExampleOutput.txt      # Optional expected output
├── Tests/                             # Tests (PascalCase dir)
│   ├── ExampleStubTest.cs             # Template (do not modify)
│   └── Topic/Subtopic/
│       └── YourExampleTest.cs
├── Utilities/
│   └── Comparison/                    # Comparison library
├── *.csproj                           # .NET project file
├── snip.js
└── .env                               # CONNECTION_STRING (not committed)
```

## Example File Pattern

```csharp
using DotNetEnv;
using MongoDB.Bson;
using MongoDB.Driver;

namespace Examples.Topic.Subtopic;

public class YourExample
{
    public List<BsonDocument> RunApp()
    {
        var uri = Env.GetString("CONNECTION_STRING",
            "Env variable not found. Verify you have a .env file with a valid connection string.");
        var client = new MongoClient(uri);

        // :snippet-start: your-snippet-name
        var db = client.GetDatabase("your_db_name");
        var collection = db.GetCollection<BsonDocument>("your_collection");

        // Your MongoDB operation here
        var results = collection.Find(new BsonDocument()).ToList();
        // :snippet-end:

        return results; // :remove:
    }
}
```

### Example file conventions

- Namespace matches directory: `namespace Examples.Topic.Subtopic;`
- Class naming: `PascalCase`, matches filename
- Main method: `RunApp()` (or descriptive name), returns output for testing
- Connection via `Env.GetString("CONNECTION_STRING", fallback)` (DotNetEnv)
- Return `List<BsonDocument>` (or typed model) for test validation
- Use `// :snippet-start:` / `// :snippet-end:` (C# comment style)
- Use `// :remove:` for single lines, `// :remove-start:` / `// :remove-end:` for blocks
- File naming: `PascalCase.cs`
- Directory naming: `PascalCase`
- Output file naming: `YourExampleOutput.txt` or `output.txt`

## Test File Pattern

```csharp
using DotNetEnv;
using Examples.Topic.Subtopic;
using MongoDB.Bson;
using MongoDB.Driver;
using Utilities.Comparison;

namespace Tests.Topic.Subtopic;

public class YourExampleTest
{
    private IMongoClient _client;
    private YourExample _example;

    [SetUp]
    [Description("Initializes the MongoDB client and test example instance before each test")]
    public void Setup()
    {
        var connectionString = Env.GetString("CONNECTION_STRING",
            "Env variable not found. Verify you have a .env file with a valid connection string.");
        _client = new MongoClient(connectionString);
        _example = new YourExample();
    }

    [Test]
    [Description("Tests that YourExample produces the expected output")]
    public void TestYourExample()
    {
        var results = _example.RunApp();

        // File-based comparison:
        Expect.That(results)
            .ShouldMatch("Examples/Topic/Subtopic/YourExampleOutput.txt");

        // Or with options:
        // Expect.That(results)
        //     .WithIgnoredFields("_id", "timestamp")
        //     .ShouldMatch("Examples/Topic/Subtopic/YourExampleOutput.txt");
    }

    [TearDown]
    [Description("Cleans up the test database and disposes the MongoDB client after each test")]
    public void TearDown()
    {
        _client.DropDatabase("your_db_name");
        _client.Dispose();
    }
}
```

### Test file conventions

- Test framework: NUnit
- File naming: `YourExampleTest.cs`
- `[SetUp]` for setup, `[TearDown]` for teardown
- `[Test]` + `[Description]` attributes on each test method
- Test class naming: `YourExampleTest`
- Test method naming: `TestYourExample()` (PascalCase)
- Connection via `Env.GetString("CONNECTION_STRING", fallback)`
- Comparison import: `using Utilities.Comparison;`
- Output file paths are relative to `csharp/driver/`

## Sample Data

```csharp
using Utilities.SampleData;

[RequiresSampleData("sample_mflix")]
public void TestWithSampleData()
{
    // Test code using sample data
}
```

## Code Formatting

```bash
cd code-example-tests/csharp/driver
dotnet format
```

## Running Tests

```bash
cd code-example-tests/csharp/driver
dotnet restore              # First time only
dotnet test
```

Run a single test:
```bash
dotnet test --filter "FullyQualifiedName=Tests.Topic.Subtopic.YourExampleTest.TestYourExample"
```

## Snipping

```bash
node snip.js
```

Output: `content/code-examples/tested/csharp/driver/Topic/Subtopic/`

Snippet filenames: `YourExample.snippet.your-snippet-name.cs`

## Literalinclude in Docs

```rst
.. literalinclude:: /code-examples/tested/csharp/driver/Topic/Subtopic/YourExample.snippet.your-snippet-name.cs
   :language: csharp
   :copyable: true
```

## Comparison API

```csharp
using Utilities.Comparison;

Expect.That(results).ShouldMatch("path/to/expected-output.txt");
Expect.That(results).WithOrderedSort().ShouldMatch("path/to/expected-output.txt");
Expect.That(results).WithIgnoredFields("_id", "timestamp").ShouldMatch("path/to/expected-output.txt");
Expect.That(results).ShouldResemble(expectedOutput).WithSchema(new Dictionary<string, object> {
    { "count", 20 },
    { "required_fields", new[] { "_id", "title", "year" } },
    { "field_values", new Dictionary<string, object> { { "year", 2012 } } }
});
```

**Methods**: `That()`, `WithIgnoredFields()`, `WithOrderedSort()`,
`WithUnorderedSort()`, `ShouldMatch()`, `ShouldResemble()`, `WithSchema()`

### When to Use Each Method

| Scenario | Method |
|----------|--------|
| Output stored in a file | `ShouldMatch(filepath)` |
| Output compared to an inline object | `ShouldMatch(object)` |
| Output order matters (sorted results) | `.WithOrderedSort().ShouldMatch(...)` |
| Fields have dynamic values (_id, dates) | `.WithIgnoredFields("_id", ...).ShouldMatch(...)` |
| Highly variable output, validate structure only | `.ShouldResemble(expected).WithSchema(...)` |

### Ellipsis Patterns in Expected Output Files

The comparison library automatically detects these patterns in expected output:

- `"..."` — Matches any value for a key
- `"prefix..."` — Matches a string that starts with "prefix"
- `["..."]` — Matches any array
- Standalone `...` on its own line — Allows any number of additional fields
- `{ ... }` — Matches any object

### Schema Validation Options

Used with `ShouldResemble()`:

- `count` (required): Expected number of documents (non-negative integer)
- `required_fields` (optional): Field names that must exist in every document
- `field_values` (optional): Field name/value pairs that must match exactly

`ShouldResemble()` is mutually exclusive with `ShouldMatch()` and
incompatible with `WithIgnoredFields()`, `WithOrderedSort()`, and
`WithUnorderedSort()`.
