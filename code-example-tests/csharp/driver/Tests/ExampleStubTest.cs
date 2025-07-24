using Examples.Aggregation.Pipelines;
using MongoDB.Driver;

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
            "Env variable not found. Verify you have a .env file with a valid connection string.");
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

        // Insert your logic to verify the output matches your expectations - for example:
        var expectedOutputCount = 1;
        var expectedOutputName = "Alice";
        Assert.That(results.Count, Is.EqualTo(expectedOutputCount), $"Result count {results.Count} does not match output example length {expectedOutputCount}.");
        Assert.That(results[0].GetValue("name").AsString, Is.EqualTo(expectedOutputName), $"Result name '{results[0]}' does not match expected output name '{expectedOutputName}'.");
    }

    // Define as many `[Test]` blocks as you need to test related code examples

    // The TearDown func runs after every test in this file
    [TearDown]
    public void TearDown()
    {
        // You might use this func to drop the DB after the test completes to avoid cross-contaminating test data
        _client.DropDatabase("your_db_name");
        _client.Dispose();
    }
}