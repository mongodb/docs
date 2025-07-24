using Examples.Aggregation.Pipelines;
using MongoDB.Driver;

namespace Tests.Aggregation.Pipelines;

public class TemplateAppTest
{
    private TemplateApp _example;
    private IMongoClient _client;
    [SetUp]
    public void Setup()
    {
        var connectionString = DotNetEnv.Env.GetString("CONNECTION_STRING",
            "Env variable not found. Verify you have a .env file with a valid connection string.");
        _client = new MongoClient(connectionString);

        _example = new TemplateApp();
    }

    [Test]
    public void TestAppProducesExpectedOutput()
    {
        var results = _example.RunApp();
        var expectedOutputCount = 1;
        var expectedOutput = "sample2";
        Assert.That(results.Count, Is.EqualTo(expectedOutputCount), $"Result count {results.Count} does not match output example length {expectedOutputCount}.");
        Assert.That(results[0].StringValue, Is.EqualTo(expectedOutput), $"Result '{results[0]}' does not match expected output '{expectedOutput}'.");
    }

    [TearDown]
    public void TearDown()
    {
        // Drop the database after the test completes  
        _client.DropDatabase("agg_tutorials_db");
        _client.Dispose();
    }
}