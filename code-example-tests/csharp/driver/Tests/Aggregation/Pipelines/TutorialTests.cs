using DotNetEnv;
using MongoDB.Driver;
using Utilities.Comparison;

namespace Tests.Aggregation.Pipelines;

public class TutorialTests
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
    [Description("Tests that Aggregation Filter pipeline output matches the expected documentation examples with ordered sorting")]
    public void TestFilterOutputMatchesDocs()
    {
        var example = new Examples.Aggregation.Pipelines.Filter.Tutorial();
        example.LoadSampleData();
        var results = example.PerformAggregation();

        var solutionRoot = $"{Directory.GetCurrentDirectory()}/../../../";
        var outputLocation = "Aggregation/OutputFiles/FilterTutorialOutput.txt";
        var fullPath = Path.Combine(solutionRoot, outputLocation);

        Expect.That(fullPath)
            .WithOrderedSort()
            .ShouldMatch(results);
    }

    [Test]
    [Description("Tests that Aggregation Group pipeline output matches the expected documentation examples with ordered sorting")]
    public void TestGroupOutputMatchesDocs()
    {
        var example = new Examples.Aggregation.Pipelines.Group.Tutorial();
        example.LoadSampleData();
        var results = example.PerformAggregation();

        var solutionRoot = $"{Directory.GetCurrentDirectory()}/../../../";
        var outputLocation = "Aggregation/OutputFiles/GroupTutorialOutput.txt";
        var fullPath = Path.Combine(solutionRoot, outputLocation);

        Expect.That(fullPath)
            .WithOrderedSort()
            .ShouldMatch(results);

    }

    [Test]
    [Description("Tests that Aggregation Unwind pipeline output matches the expected documentation examples")]
    public void TestUnwindOutputMatchesDocs()
    {
        var example = new Examples.Aggregation.Pipelines.Unwind.Tutorial();
        example.LoadSampleData();
        var results = example.PerformAggregation();

        var solutionRoot = $"{Directory.GetCurrentDirectory()}/../../../";
        var outputLocation = "Aggregation/OutputFiles/UnwindTutorialOutput.txt";
        var fullPath = Path.Combine(solutionRoot, outputLocation);

        Expect.That(fullPath).ShouldMatch(results);
    }

    [Test]
    [Description("Tests that Aggregation Join one-to-one pipeline output matches the expected documentation examples with ordered sorting")]
    public void TestJoinOneToOneOutputMatchesDocs()
    {
        var example = new Examples.Aggregation.Pipelines.JoinOneToOne.Tutorial();
        example.LoadSampleData();
        var results = example.PerformAggregation();

        var solutionRoot = $"{Directory.GetCurrentDirectory()}/../../../";
        var outputLocation = $"Aggregation/OutputFiles/JoinTutorialOutput.txt";
        var fullPath = Path.Combine(solutionRoot, outputLocation);

        Expect.That(fullPath)
            .WithOrderedSort()
            .ShouldMatch(results);
    }

    [Test]
    [Description("Tests that Aggregation Join multi-field pipeline output matches the expected documentation examples with ordered sorting")]
    public void TestJoinMultiFieldOutputMatchesDocs()
    {
        var example = new Examples.Aggregation.Pipelines.JoinMultiField.Tutorial();
        example.LoadSampleData();
        var results = example.PerformAggregation();

        var solutionRoot = $"{Directory.GetCurrentDirectory()}/../../../";
        var outputLocation = $"Aggregation/OutputFiles/JoinMultifieldTutorialOutput.txt";
        var fullPath = Path.Combine(solutionRoot, outputLocation);

        Expect.That(fullPath)
            .WithOrderedSort()
            .ShouldMatch(results);
    }

    [TearDown]
    [Description("Cleans up the test database and disposes the MongoDB client after each test")]
    public void TearDown()
    {
        // Drop the database after the test completes
        _client.DropDatabase("agg_tutorials_db");
        _client.Dispose();
    }
}