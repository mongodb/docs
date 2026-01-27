using DotNetEnv;
using Examples.TimeSeries.QuickStart;
using MongoDB.Driver;
using Utilities;
using Utilities.Comparison;

namespace Tests.TimeSeries;

public class QuickStartTest
{
    private IMongoClient _client;

    [SetUp]
    [Description("Initializes the MongoDB client before each test")]
    public void Setup()
    {
        var connectionString = Env.GetString("CONNECTION_STRING",
            "Env variable not found. Verify you have a .env file with a valid connection string.");
        _client = new MongoClient(connectionString);
    }

    [Test]
    [Description("Tests that 'meta' field output matches the expected documentation examples")]
    public void TestMetaFieldQueryOutputMatchesDocs()
    {
        var example = new Tutorial();
        example.LoadSampleData();
        var results = example.RunMetaFieldQuery();

        var solutionRoot = $"{Directory.GetCurrentDirectory()}/../../../../";
        var outputLocation = $"Examples/TimeSeries/OutputFiles/MetaFieldOutput.txt";
        var fullPath = $"{solutionRoot}{outputLocation}";

        Expect.That(fullPath).WithIgnoredFields("symbol").ShouldMatch(results);
    }

    [Test]
    [Description("Tests that 'time' field query output matches the expected documentation examples")]
    public void TestTimeFieldQueryOutputMatchesDocs()
    {
        var example = new Tutorial();
        example.LoadSampleData();
        var results = example.RunTimeFieldQuery();

        var solutionRoot = $"{Directory.GetCurrentDirectory()}/../../../../";
        var outputLocation = $"Examples/TimeSeries/OutputFiles/TimeFieldQueryOutput.txt";
        var fullPath = Path.Combine(solutionRoot, outputLocation);

        Expect.That(fullPath).WithIgnoredFields("symbol")
            .ShouldMatch(results);
    }

    [TearDown]
    [Description("Cleans up the test database and disposes the MongoDB client after each test")]
    public void TearDown()
    {
        // Drop the database after the test completes
        _client.DropDatabase("timeseries_db");
        _client.Dispose();
    }
}