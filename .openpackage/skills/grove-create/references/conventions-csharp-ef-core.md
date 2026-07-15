# C# (EF Core MongoDB Provider) — Grove Conventions

<!-- canary:969d58ce -->

EF Core examples use the MongoDB Entity Framework Core Provider, not the
C# driver directly. They share the same project and test infrastructure as
standard C# driver examples but have distinct patterns for DbContext
configuration, LINQ queries, and entity relationships.

## Directory Structure

```
code-example-tests/csharp/driver/
├── Examples/
│   └── EfCore/                          # EF Core examples
│       ├── Aggregation/
│       ├── Configure/
│       ├── DbContextConcurrency/
│       ├── Faq/
│       ├── Indexes/
│       ├── QuickReference/
│       │   └── OutputFiles/             # Expected output files
│       ├── QuickStart/
│       └── Relationships/
├── Tests/
│   └── EfCore/                          # EF Core tests
│       ├── Aggregation/
│       ├── Configure/
│       └── ...                          # Mirrors Examples/EfCore/
├── Examples/Examples.csproj             # Shared project (driver + EF Core)
├── Tests/Tests.csproj                   # Shared test project
└── snip.js
```

EF Core examples live under `Examples/EfCore/` and tests under `Tests/EfCore/`.
They share the same `.csproj` files as standard driver examples.

## Example File Pattern

```csharp
// :replace-start: {
//   "terms": {
//     "CONNECTION_STRING": "\"<Your MongoDB Connection URI>\""
//   }
// }

using Microsoft.EntityFrameworkCore;
using MongoDB.Bson;
using MongoDB.Driver;
using MongoDB.EntityFrameworkCore.Extensions;

namespace Examples.EfCore.YourTopic;

// DbContext definition
public class YourDbContext : DbContext
{
    public DbSet<YourEntity> Entities { get; init; } = null!;

    public static YourDbContext Create(IMongoDatabase database) =>
        new(new DbContextOptionsBuilder<YourDbContext>()
            .UseMongoDB(database.Client, database.DatabaseNamespace.DatabaseName)
            .Options);

    public YourDbContext(DbContextOptions options) : base(options) { }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        modelBuilder.Entity<YourEntity>().ToCollection("yourCollection");
    }
}

// Entity class
public class YourEntity
{
    public ObjectId _id { get; set; }

    [BsonElement("name")]
    public string Name { get; set; }
}

public class YourExample
{
    // :snippet-start: your-operation
    public static List<YourEntity> RunQuery(YourDbContext db)
    {
        var results = db.Entities.Where(e => e.Name == "test").ToList();
        return results; // :remove:
    }
    // :snippet-end:
}
// :replace-end:
```

### Example file conventions

- **Namespace**: `Examples.EfCore.{Topic}` (file-scoped)
- **DbContext pattern**: Static `Create(IMongoDatabase)` factory method that
  configures `UseMongoDB()` and returns a new context instance
- **Entity classes**: Use `ObjectId _id` (lowercase) with `[BsonId]` attribute
  if needed. Use `[BsonElement("name")]` for field mapping.
- **Collection mapping**: Configure in `OnModelCreating` via
  `modelBuilder.Entity<T>().ToCollection("name")`
- **Queries use LINQ**, not aggregation pipeline builders or BsonDocument
- **One snippet per operation**: Each public method gets its own
  `:snippet-start:` / `:snippet-end:` block
- **Bluehawk tags**: Same as standard C# — `:replace-start:` for connection
  string substitution, `:remove:` for return statements, `:snippet-start:` /
  `:snippet-end:` for extraction

## Test File Pattern

```csharp
using MongoDB.Bson;
using MongoDB.Driver;
using Utilities.Comparison;

namespace Tests.EfCore.YourTopic;

[TestFixture]
public class YourTopicTests
{
    private const string DbName = "test_your_topic";
    private MongoClient _client;
    private IMongoDatabase _database;

    [SetUp]
    public void SetUp()
    {
        var connectionString = DotNetEnv.Env.GetString("CONNECTION_STRING");
        _client = new MongoClient(connectionString);
        _database = _client.GetDatabase(DbName);

        // Clear and seed using driver (EF Core doesn't support ExecuteDelete)
        _database.GetCollection<BsonDocument>("yourCollection")
            .DeleteMany(new BsonDocument());

        var db = YourDbContext.Create(_database);
        db.Entities.AddRange(seedData);
        db.SaveChanges();
    }

    [TearDown]
    public void TearDown()
    {
        _client.DropDatabase(DbName);
        _client.Dispose();
    }

    [Test]
    [Description("Description of what the test validates")]
    public void YourOperationTest()
    {
        var db = YourDbContext.Create(_database);
        var result = YourExample.RunQuery(db);
        Expect.That(result).WithIgnoredFields("_id").ShouldMatch(expectedValue);
    }
}
```

### Test file conventions

- **Framework**: NUnit (`[TestFixture]`, `[Test]`, `[SetUp]`, `[TearDown]`)
- **Namespace**: `Tests.EfCore.{Topic}` (file-scoped)
- **`[Description("...")]`** attribute on each test method
- **SetUp**: Create MongoClient, get database, clear collection using the
  **driver** (not EF Core — `ExecuteDelete()` is not supported by the MongoDB
  EF Core provider), seed data via DbContext's `AddRange()` + `SaveChanges()`
- **TearDown**: `DropDatabase()` + `Dispose()` — EF Core tests use custom
  databases (not sample data), so dropping is safe
- **Assertions**: Use the Expect API (`Utilities.Comparison.Expect`)
- **DbContext per test**: Create via `YourDbContext.Create(_database)` in each
  test method — do not share DbContext instances across tests
- **Warning suppression**: If tests create multiple DbContext types, add
  `.ConfigureWarnings(w => w.Ignore(CoreEventId.ManyServiceProvidersCreatedWarning))`
  to the DbContext builder

## Expected Output Files

Place output files under `Examples/EfCore/{Topic}/OutputFiles/`:

```
{"_id":"...","name":"Jupiter","orderFromSun":5,"hasRings":true}
{"_id":"...","name":"Saturn","orderFromSun":6,"hasRings":true}
```

Use JSONL format (one JSON object per line). Use `"..."` for dynamic `_id`
values. Reference output files in tests using a path helper:

```csharp
private static string FullPath(string fileName)
{
    var solutionRoot = $"{Directory.GetCurrentDirectory()}/../../../../";
    var outputLocation = $"Examples/EfCore/{Topic}/OutputFiles/{fileName}";
    return Path.Combine(solutionRoot, outputLocation);
}
```

## EF Core vs Standard Driver

| Aspect | Standard C# Driver | EF Core |
|--------|-------------------|---------|
| Query style | Aggregation pipeline, BSON builders | LINQ |
| Collection access | `collection.Aggregate()` | `dbContext.DbSet<T>` |
| Configuration | Inline `MongoClient` | DbContext + `OnModelCreating` |
| Relationships | Manual foreign ID storage | Owned entities, navigation properties |
| Concurrency | Manual | `IsConcurrencyToken`, `IsRowVersion` |
| Namespace prefix | `Examples.{Topic}` | `Examples.EfCore.{Topic}` |

## Key EF Core Features to Demonstrate

- **Shadow properties**: `modelBuilder.Entity<T>().Property<string>("shadowField")`
- **Owned entities**: `[Owned]` attribute or `OwnsOne()` / `OwnsMany()` in
  fluent config — maps to embedded documents
- **Concurrency tokens**: `IsConcurrencyToken()` in model builder
- **Multiple DbContexts**: Different contexts for different collections/schemas
  (common in relationship examples)

## Running Tests

```bash
cd code-example-tests/csharp/driver
dotnet test --filter "FullyQualifiedName~Tests.EfCore.YourTopic"
```

All EF Core tests: `dotnet test --filter "FullyQualifiedName~Tests.EfCore"`

## Snipping

```bash
cd code-example-tests/csharp/driver
node snip.js ef-core
```

Output: `content/code-examples/tested/csharp/ef-core/{Topic}/{File}.snippet.{name}.cs`

Note: EF Core has its own snip target (`ef-core`) separate from the standard
driver (`driver`). Use `node snip.js all` to process both.
