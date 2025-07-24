using Examples.Aggregation.Pipelines.Filter;
using MongoDB.Driver;

namespace Tests.Aggregation.Pipelines;

public class FilterTest
{
    private Tutorial _example;
    private IMongoClient _client;
    [SetUp]
    public void Setup()
    {
        var connectionString = DotNetEnv.Env.GetString("CONNECTION_STRING",
            "Env variable not found. Verify you have a .env file with a valid connection string.");
        _client = new MongoClient(connectionString);

        _example = new Tutorial();
        _example.LoadSampleData();
    }

    [Test]
    public void TestOutputMatchesDocs()
    {
        var results = _example.PerformAggregation();

        var solutionRoot = DotNetEnv.Env.GetString("SOLUTION_ROOT", "Env variable not found. Verify you have a .env file with a valid connection string.");
        var outputLocation = "Examples/Aggregation/Pipelines/Filter/TutorialOutput.txt";
        var fullPath = Path.Combine(solutionRoot, outputLocation);
        var fileData = TestUtils.ReadBsonDocumentsFromFile(fullPath);

        Assert.That(results.Count, Is.EqualTo(fileData.Length), $"Result count {results.Count} does not match output example length {fileData.Length}.");
        for (var i = 0; i < fileData.Length; i++)
        {
            Assert.That(fileData[i], Is.EqualTo(results[i]), $"Mismatch at index {i}: expected {fileData[i]}, got {results[i]}.");
        }
    }

    [TearDown]
    public void TearDown()
    {
        // Drop the database after the test completes  
        _client.DropDatabase("agg_tutorials_db");
        _client.Dispose();
    }
}