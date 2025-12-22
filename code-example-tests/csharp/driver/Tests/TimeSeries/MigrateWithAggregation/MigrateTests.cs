
using DotNetEnv;
using Examples.TimeSeries;
using MongoDB.Driver;
using Utilities.Comparison;

namespace Tests.TimeSeries.MigrateWithAggregation;

public class MigrateTests
{
    private IMongoClient _client;

    [SetUp]
    [Description("Initializes the MongoDB client before each test")]
    public void Setup()
    {
        var connectionString = Env.GetString("CONNECTION_STRING",
            "Env variable not found. Verify you have a .env file with a valid connection string.");
        _client = new MongoClient(connectionString);
        _client.DropDatabase("mydatabase");
    }

    [Test]
    [Description("Tests that 'meta' field output matches the expected documentation examples")]
    public async Task TestCreateMetadataFieldMatches()
    {
        var example = new MigrateWithAggregationTimeSeriesCollection();

        await example.LoadSampleData();
        var results = example.CreateMetadataField();

        var solutionRoot = $"{Directory.GetCurrentDirectory()}/../../../";
        var outputLocation = "TimeSeries/OutputFiles/MigrateAggOutput.txt";
        var fullPath = Path.Combine(solutionRoot, outputLocation);

        Expect.That(fullPath).ShouldMatch(results);
    }

    [TearDown]
    [Description("Cleans up the test database and disposes the MongoDB client after each test")]
    public void TearDown()
    {
        // Drop the database after the test completes
        _client.DropDatabase("mydatabase");
        _client.Dispose();
    }
}