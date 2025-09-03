using System.Collections.Immutable;
using Examples.Aggregation.Pipelines;
using MongoDB.Bson;
using MongoDB.Driver;
using Utilities.Comparison;

namespace Tests;

// Import the file or files that contain the examples you want to test
using Examples;

public class ExampleStubTest
{
    private ExampleStub _example;
    private IMongoClient _client;

    // The Setup func runs before every test in this file
    [SetUp]
    public void Setup()
    {
        var connectionString = DotNetEnv.Env.GetString("CONNECTION_STRING",
            "Env variable not found. Verify you have a.env file with a valid connection string.");
        _client = new MongoClient(connectionString);
        _example = new ExampleStub();

        // You might use this func to load sample data required by this test 
        // loadSampleData();
    }

    // Each `[Test]` block describes an individual test case that can pass or fail
    [Test]
    public void TestAppProducesExpectedResult()
    {
        var results = _example.RunApp();

        // Create expected output inline for demonstration
        var expectedOutput = new List<BsonDocument>
        {
            new BsonDocument
            {
                { "_id", "..." }, // Ellipsis pattern for dynamic ObjectId
                { "name", "Alice" },
                { "age", 30 },
                { "isMember", true }
            }
        };

        // Modern validation using direct object comparison
        // This automatically handles:
        // - MongoDB type normalization (ObjectId, Decimal128, etc.)
        // - Ellipsis patterns ("..." for wildcards, "Hello..." for truncated strings)
        // - Flexible field matching (standalone "..." in expected output)
        // - Unordered array comparison by default
        var comparisonResult = ComparisonEngine.Compare(expectedOutput, results);
        Assert.That(comparisonResult.IsSuccess, Is.True, $"Validation failed: {comparisonResult.Error}");

        // Alternative fluent syntax examples using file-based validation:

        // Ignore specific fields (useful for dynamic IDs, timestamps)
        // OutputValidator.Expect(results)
        //     .IgnoringFields("_id", "timestamp", "uuid")
        //     .ToMatchFile("path/to/expected-output.txt")
        //     .ThrowIfFailed();

        // Ordered array comparison
        // OutputValidator.Expect(results)
        //     .WithOrderedArrays()
        //     .ToMatchFile("path/to/expected-output.txt")
        //     .ThrowIfFailed();

        // Combined options
        // OutputValidator.Expect(results)
        //     .WithOrderedArrays()
        //     .IgnoringFields("_id", "createdAt")
        //     .ToMatchFile("path/to/expected-output.txt")
        //     .ThrowIfFailed();
    }

    // Example of testing with ignored fields
    [Test]
    public void TestWithIgnoredFields()
    {
        var results = _example.RunApp();

        // Create expected output with fields that should be ignored
        var expectedOutput = new List<BsonDocument>
        {
            new BsonDocument
            {
                { "_id", new ObjectId("507f1f77bcf86cd799439011") }, // This will be ignored
                { "name", "Alice" },
                { "age", 30 },
                { "isMember", true },
                { "timestamp", "2024-01-01T12:00:00.000Z" } // This will be ignored
            }
        };

        // Ignore dynamic fields during comparison
        var options = ComparisonOptions.Default with
        {
            IgnoredFields = new[] { "_id", "timestamp" }.ToImmutableHashSet()
        };
        var comparisonResult = ComparisonEngine.Compare(expectedOutput, results, options);
        Assert.That(comparisonResult.IsSuccess, Is.True, $"Validation with ignored fields failed: {comparisonResult.Error}");
    }

    // Example of testing with ordered arrays
    [Test]
    public void TestWithOrderedComparison()
    {
        var results = _example.RunApp();

        // Create expected output for ordered comparison
        var expectedOutput = new List<BsonDocument>
        {
            new BsonDocument
            {
                { "_id", "..." }, // Ellipsis pattern for dynamic ObjectId
                { "name", "Alice" },
                { "age", 30 },
                { "isMember", true }
            }
        };

        // Validate with ordered array comparison
        var comparisonResult = ComparisonEngine.Compare(expectedOutput, results, ComparisonOptions.Ordered);
        Assert.That(comparisonResult.IsSuccess, Is.True, $"Ordered validation failed: {comparisonResult.Error}");
    }

    // The TearDown func runs after every test in this file
    [TearDown]
    public void TearDown()
    {
        // You might use this func to drop the DB after the test completes to avoid cross-contaminating test data
        _client.DropDatabase("your_db_name");
        _client.Dispose();
    }
}