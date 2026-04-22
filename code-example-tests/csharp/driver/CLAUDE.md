# C# (Driver) — Grove Conventions

## Project Setup

- .NET 10.0 (`global.json` pins the SDK version)
- Solution file: `driver.sln` (six projects: Examples, Tests, Utilities, and their test projects)
- Key deps: `MongoDB.Driver` 3.8.0, `NUnit` 4.4.0, `DotNetEnv` 3.1.1
- EF Core deps (in Examples project): `MongoDB.EntityFrameworkCore` 10.0.1
- Formatter: `dotnet format` (rules in `.editorconfig`)
- `.env` file required at this directory root: `CONNECTION_STRING="..."`
- `NUnit.Framework` is a global implicit using — do not add `using NUnit.Framework;`

## Example File Pattern

```csharp
namespace Examples.Topic.Subtopic;

using DotNetEnv;
using MongoDB.Bson;
using MongoDB.Driver;

public class YourExample
{
    private readonly string _uri = Env.GetString("CONNECTION_STRING",
        "Set your CONNECTION_STRING in the .env file");
    private MongoClient _client;
    private IMongoDatabase _db;

    public void LoadSampleData()
    {
        _client = new MongoClient(_uri);
        // :snippet-start: load-data
        _db = _client.GetDatabase("your_db_name");
        var collection = _db.GetCollection<BsonDocument>("your_collection");
        collection.InsertMany(sampleData);
        // :snippet-end:
    }

    public List<BsonDocument> RunExample()
    {
        // :snippet-start: your-snippet-name
        // ... operation code ...
        // :snippet-end:
        _client.Dispose();
        return documents;
    }
}
```

- **File naming**: `PascalCase.cs` in `Examples/{Topic}/{Subtopic}/`
- **Namespace**: Mirrors directory structure (e.g., `namespace Examples.Aggregation.Pipelines.Filter`)
- **Connection**: `Env.GetString("CONNECTION_STRING", "fallback message")`
- **Two-method pattern**: `LoadSampleData()` inserts fixtures, `RunExample()` runs the operation
- **Return type**: `List<BsonDocument>`, `BsonDocument`, `string`, `int`, or custom class
- **Cleanup**: `_client.Dispose()` at end of run method, or in test teardown
- **Bluehawk**: `// :snippet-start: kebab-name` / `// :snippet-end:`; `// :remove:` for single lines
- **Snippet identifiers**: Unique within each file, lowercase kebab-case
- **Template**: `Examples/ExampleStub.cs`

### EF Core Examples

EF Core examples live under `Examples/EfCore/` and use `DbContext`, LINQ queries, and entity configuration instead of driver aggregation pipelines. See `references/conventions-csharp-ef-core.md` in the `grove-create` skill for EF Core-specific patterns.

## Test File Pattern

```csharp
namespace Tests.Topic;

using DotNetEnv;
using MongoDB.Driver;
using Utilities.Comparison;

[TestFixture]
public class YourExampleTests
{
    private MongoClient _client;
    private Examples.Topic.Subtopic.YourExample _example;

    [SetUp]
    public void Setup()
    {
        var connectionString = Env.GetString("CONNECTION_STRING",
            "Set your CONNECTION_STRING in the .env file");
        _client = new MongoClient(connectionString);
        _example = new Examples.Topic.Subtopic.YourExample();
    }

    [TearDown]
    public void TearDown()
    {
        _client.DropDatabase("your_db_name");
        _client.Dispose();
    }

    [Test]
    [Description("Verifies that example matches expected output")]
    public void TestYourExample()
    {
        _example.LoadSampleData();
        var results = _example.RunExample();
        Expect.That(results).ShouldMatch(
            "Examples/Topic/Subtopic/YourExampleOutput.txt");
    }
}
```

- **File naming**: `PascalCaseTest.cs` or `PascalCaseTests.cs` in `Tests/{Topic}/`
- **Namespace**: Mirrors directory structure under `Tests`
- **Import Expect**: `using Utilities.Comparison;`
- **Attributes**: `[TestFixture]`, `[Test]`, `[Description("...")]`, `[SetUp]`, `[TearDown]`
- **Setup**: `[SetUp]` creates client and example instance
- **Teardown**: `[TearDown]` drops the test database and disposes the client
- **Output path**: Relative to project root using `Directory.GetCurrentDirectory()` traversal:
  `$"{Directory.GetCurrentDirectory()}/../../../../Examples/Topic/OutputFile.txt"`
- **Do not** drop sample data databases — only drop databases your example created
- **Template**: `Tests/ExampleStubTest.cs`

### Global Test Setup

`Tests/TestSuiteSetup.cs` contains a `[SetUpFixture]` with `[OneTimeSetUp]` that calls `DotNetEnv.Env.TraversePath().Load()` once before all tests, so `.env` is loaded globally.

## Sample Data

```csharp
using Utilities.SampleData;

// Attribute-based (on test methods or setup methods)
[Test]
[RequiresSampleData("sample_mflix")]
public void TestMovieQuery() { /* test body */ }

[Test]
[RequiresSampleData("sample_mflix", new[] { "movies", "theaters" })]
public void TestSpecificCollections() { /* test body */ }

// Multiple databases (stackable)
[Test]
[RequiresSampleData("sample_mflix")]
[RequiresSampleData("sample_restaurants", new[] { "restaurants" })]
public void TestCrossDatabase() { /* test body */ }
```

Tests auto-skip (via `Assert.Ignore`) when required sample databases are unavailable.

### Atlas Search Index Utilities

```csharp
using Utilities.SearchIndex;

// In [OneTimeSetUp]: wait for index to be ready
await SearchIndexChecker.EnsureIndexReadyAsync(collection, "indexName");

// In [Test]: skip if index not ready
SearchIndexTestHelper.EnsureSearchIndexOrSkip(collection, "indexName");

// Metadata annotation (does not auto-skip on its own)
[RequiresSearchIndex("indexName", IndexType = "search")]
```

## Expected Output Files

- Place alongside examples: `YourExampleOutput.txt` or in a shared `OutputFiles/` directory
- Format: JSONL (one document per line) for multi-document results, or pretty-printed JSON for single documents. Uses Extended JSON for MongoDB types.
- Use ellipsis patterns for dynamic values (see root CLAUDE.md)

## Commands

| Command | Purpose |
|---------|---------|
| `dotnet test Tests/Tests.csproj` | Run code example tests only |
| `dotnet test` | Run all tests (all six projects) |
| `dotnet test --filter "FullyQualifiedName=Tests.Topic.TestClass.TestMethod"` | Run a single test |
| `dotnet format` | Format all files |
| `node snip.js` | Extract snippets via Bluehawk |

All commands run from `code-example-tests/csharp/driver/`.

## Snippet Output

`node snip.js` extracts to: `content/code-examples/tested/csharp/driver/{topic}/{file}.snippet.{name}.cs`

If `dotnet` CLI is available, snipped output is auto-formatted before writing.

Files to ignore from snipping are listed in `IGNORE_PATTERNS` in `snip.js`.
