using MongoDB.Driver;

namespace Tests.Aggregation.Pipelines;

public class TutorialTests
{
    private IMongoClient _client;
    [SetUp]
    public void Setup()
    {
        var connectionString = DotNetEnv.Env.GetString("CONNECTION_STRING",
            "Env variable not found. Verify you have a .env file with a valid connection string.");
        _client = new MongoClient(connectionString);
    }

    [Test]
    public void TestFilterOutputMatchesDocs()
    {
        var example = new Examples.Aggregation.Pipelines.Filter.Tutorial();
        example.LoadSampleData();
        var results = example.PerformAggregation();

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

    [Test]
    public void TestGroupOutputMatchesDocs()
    {
        var example = new Examples.Aggregation.Pipelines.Group.Tutorial();
        example.LoadSampleData();
        var results = example.PerformAggregation();

        var solutionRoot = DotNetEnv.Env.GetString("SOLUTION_ROOT", "Env variable not found. Verify you have a .env file with a valid connection string.");
        var outputLocation = "Examples/Aggregation/Pipelines/Group/TutorialOutput.txt";
        var fullPath = Path.Combine(solutionRoot, outputLocation);
        var fileData = TestUtils.ReadBsonDocumentsFromFile(fullPath);

        Assert.That(results.Count, Is.EqualTo(fileData.Length), $"Result count {results.Count} does not match output example length {fileData.Length}.");
        for (var i = 0; i < fileData.Length; i++)
        {
            Assert.That(fileData[i], Is.EqualTo(results[i]), $"Mismatch at index {i}: expected {fileData[i]}, got {results[i]}.");
        }
    }

    [Test]
    public void TestUnwindOutputMatchesDocs()
    {
        var example = new Examples.Aggregation.Pipelines.Unwind.Tutorial();
        example.LoadSampleData();
        var results = example.PerformAggregation();
        var serializedActualResults = TestUtils.SerializeResultsToStrings(results);

        var solutionRoot = DotNetEnv.Env.GetString("SOLUTION_ROOT", "Env variable not found. Verify you have a .env file with a valid connection string.");
        var outputLocation = "Examples/Aggregation/Pipelines/Unwind/TutorialOutput.txt";
        var fullPath = Path.Combine(solutionRoot, outputLocation);
        var expectedLines = TestUtils.ReadLinesAsStrings(fullPath);
        TestUtils.ValidateUnorderedResults(expectedLines, serializedActualResults);
    }

    [TearDown]
    public void TearDown()
    {
        // Drop the database after the test completes  
        _client.DropDatabase("agg_tutorials_db");
        _client.Dispose();
    }
}