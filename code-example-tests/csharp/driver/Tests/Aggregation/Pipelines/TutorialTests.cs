using DotNetEnv;
using Examples.Aggregation.Pipelines.Filter;
using MongoDB.Driver;
using Utilities;
using Utilities.Comparison;

namespace Tests.Aggregation.Pipelines;

public class TutorialTests
{
    private IMongoClient _client;

    [SetUp]
    public void Setup()
    {
        var connectionString = Env.GetString("CONNECTION_STRING",
            "Env variable not found. Verify you have a .env file with a valid connection string.");
        _client = new MongoClient(connectionString);
    }

    [Test]
    public void TestFilterOutputMatchesDocs()
    {
        var example = new Tutorial();
        example.LoadSampleData();
        var results = example.PerformAggregation();

        var solutionRoot = Env.GetString("SOLUTION_ROOT",
            "Env variable not found. Verify you have a .env file with a valid connection string.");
        var outputLocation = "Examples/Aggregation/Pipelines/Filter/TutorialOutput.txt";
        var fullPath = Path.Combine(solutionRoot, outputLocation);

        Expect.That(fullPath)
            .WithOrderedSort()
            .ShouldMatch(results);
    }

    [Test]
    public void TestGroupOutputMatchesDocs()
    {
        var example = new Examples.Aggregation.Pipelines.Group.Tutorial();
        example.LoadSampleData();
        var results = example.PerformAggregation();

        var solutionRoot = Env.GetString("SOLUTION_ROOT",
            "Env variable not found. Verify you have a .env file with a valid connection string.");
        var outputLocation = "Examples/Aggregation/Pipelines/Group/TutorialOutput.txt";
        var fullPath = Path.Combine(solutionRoot, outputLocation);

        Expect.That(fullPath)
            .WithOrderedSort()
            .ShouldMatch(results);

    }

    [Test]
    public void TestUnwindOutputMatchesDocs()
    {
        var example = new Examples.Aggregation.Pipelines.Unwind.Tutorial();
        example.LoadSampleData();
        var results = example.PerformAggregation();

        var solutionRoot = Env.GetString("SOLUTION_ROOT",
            "Env variable not found. Verify you have a .env file with a valid connection string.");
        var outputLocation = "Examples/Aggregation/Pipelines/Unwind/TutorialOutput.txt";
        var fullPath = Path.Combine(solutionRoot, outputLocation);

        Expect.That(fullPath).ShouldMatch(results);
    }

    [Test]
    public void TestJoinOneToOneOutputMatchesDocs()
    {
        var example = new Examples.Aggregation.Pipelines.JoinOneToOne.Tutorial();
        example.LoadSampleData();
        var results = example.PerformAggregation();

        var solutionRoot = Env.GetString("SOLUTION_ROOT",
            "Env variable not found. Verify you have a .env file with a valid connection string.");
        var outputLocation = "Examples/Aggregation/Pipelines/JoinOneToOne/TutorialOutput.txt";
        var fullPath = Path.Combine(solutionRoot, outputLocation);

        Expect.That(fullPath)
            .WithOrderedSort()
            .ShouldMatch(results);
    }

    [Test]
    public void TestJoinMultiFieldOutputMatchesDocs()
    {
        var example = new Examples.Aggregation.Pipelines.JoinMultiField.Tutorial();
        example.LoadSampleData();
        var results = example.PerformAggregation();

        var solutionRoot = Env.GetString("SOLUTION_ROOT",
            "Env variable not found. Verify you have a .env file with a valid connection string.");
        var outputLocation = "Examples/Aggregation/Pipelines/JoinMultiField/TutorialOutput.txt";
        var fullPath = Path.Combine(solutionRoot, outputLocation);

        Expect.That(fullPath)
            .WithOrderedSort()
            .ShouldMatch(results);
    }

    [TearDown]
    public void TearDown()
    {
        // Drop the database after the test completes
        _client.DropDatabase("agg_tutorials_db");
        _client.Dispose();
    }
}