using System.Collections.Immutable;
using DotNetEnv;
using Examples;
using MongoDB.Bson;
using MongoDB.Driver;
using Utilities;
using Utilities.Comparison;

namespace Tests;

// Import the file or files that contain the examples you want to test

public class ExampleStubTest
{
    private IMongoClient _client;
    private ExampleStub _example;

    // The Setup func runs before every test in this file
    [SetUp]
    [Description("Initializes the MongoDB client and test example instance before each test")]
    public void Setup()
    {
        var connectionString = Env.GetString("CONNECTION_STRING",
            "Env variable not found. Verify you have a.env file with a valid connection string.");
        _client = new MongoClient(connectionString);
        _example = new ExampleStub();

        // You might use this func to load sample data required by this test 
        // loadSampleData();
    }

    // Each `[Test]` block describes an individual test case that can pass or fail
    [Test]
    [Description(
        "Tests that the application produces the expected output using direct object comparison with ellipsis patterns")]
    public void TestAppProducesExpectedResult()
    {
        var results = _example.RunApp();

        // Create expected output inline for demonstration
        var expectedOutput = new List<BsonDocument>
        {
            new()
            {
                { "_id", "..." }, // Ellipsis pattern for dynamic ObjectId
                { "name", "Alice" },
                { "age", 30 },
                { "isMember", true }
            }
        };

        // Validation using direct object comparison
        // This automatically handles:
        // - MongoDB type normalization (ObjectId, Decimal128, etc.)
        // - Ellipsis patterns ("..." for wildcards, "Hello..." for truncated strings)
        // - Flexible field matching (standalone "..." in expected output)
        // - Unordered array comparison by default
        Expect.That(results).ShouldMatch(expectedOutput);

        // Alternative fluent syntax examples using file-based validation:
        /*
         Expect.That("path/to/expected-output.txt")
            .ShouldMatch(results);
        */

        // You can also set options. Here are a few examples:

        // Ignore specific fields (useful for dynamic IDs, timestamps)
        /*
         Expect.That(results)
             .WithIgnoredFields("_id", "timestamp", "uuid")
             .ShouldMatch(expectedOutput);
        */

        // Specify an ordered array comparison
        /*
         Expect.That(results)
           .WithOrderedSort()
           .ShouldMatch(expectedOutput);
        */

        // Combined options:
        /*
         Expect.That(results)
           .WithOrderedSort()
           .WithIgnoredFields("_id", "createdAt")
           .ShouldMatch(expected);
        */
    }

    // Example of testing with ignored fields
    [Test]
    [Description("Tests the application output while ignoring dynamic fields like _id and timestamp during comparison")]
    public void TestWithIgnoredFields()
    {
        var results = _example.RunApp();

        // Create expected output with fields that should be ignored
        var expectedOutput = new List<BsonDocument>
        {
            new()
            {
                { "_id", new ObjectId("507f1f77bcf86cd799439011") }, // This will be ignored
                { "name", "Alice" },
                { "age", 30 },
                { "isMember", true },
                { "timestamp", "2024-01-01T12:00:00.000Z" } // This will be ignored
            }
        };

        // Ignore dynamic fields during comparison
        var ignoredFields = new[] { "_id", "timestamp" };

        Expect.That(results).WithIgnoredFields(ignoredFields).ShouldMatch(expectedOutput);
    }

    // Example of testing with ordered arrays
    [Test]
    [Description(
        "Tests the application output using ordered array comparison to ensure elements appear in the expected sequence")]
    public void TestWithOrderedComparison()
    {
        var results = _example.RunApp();

        // Create expected output for ordered comparison
        var expectedOutput = new List<BsonDocument>
        {
            new()
            {
                { "_id", "..." }, // Ellipsis pattern for dynamic ObjectId
                { "name", "Alice" },
                { "age", 30 },
                { "isMember", true }
            }
        };

        // Validate with ordered array comparison
        Expect.That(results).WithOrderedSort().ShouldMatch(expectedOutput);
    }

    // The TearDown func runs after every test in this file
    [TearDown]
    [Description("Cleans up the test database and disposes the MongoDB client after each test")]
    public void TearDown()
    {
        // You might use this func to drop the DB after the test completes to avoid cross-contaminating test data
        _client.DropDatabase("your_db_name");
        _client.Dispose();
    }
}