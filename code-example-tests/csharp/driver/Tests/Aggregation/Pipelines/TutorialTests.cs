using MongoDB.Driver;
using Utilities.Comparison;

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

        var validationResult = OutputValidator.Expect(results)
            .WithOrderedArrays()
            .ToMatchFile(fullPath);
        validationResult.ThrowIfFailed();
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

        var validationResult = OutputValidator.Expect(results)
            .WithOrderedArrays()
            .ToMatchFile(fullPath);
        validationResult.ThrowIfFailed();
    }

    [Test]
    public void TestUnwindOutputMatchesDocs()
    {
        var example = new Examples.Aggregation.Pipelines.Unwind.Tutorial();
        example.LoadSampleData();
        var results = example.PerformAggregation();

        var solutionRoot = DotNetEnv.Env.GetString("SOLUTION_ROOT", "Env variable not found. Verify you have a .env file with a valid connection string.");
        var outputLocation = "Examples/Aggregation/Pipelines/Unwind/TutorialOutput.txt";
        var fullPath = Path.Combine(solutionRoot, outputLocation);

        var validationResult = OutputValidator.Expect(results)
            .ToMatchFile(fullPath);
        validationResult.ThrowIfFailed();
    }

    [Test]
    public void TestJoinOneToOneOutputMatchesDocs()
    {
        var example = new Examples.Aggregation.Pipelines.JoinOneToOne.Tutorial();
        example.LoadSampleData();
        var results = example.PerformAggregation();

        var solutionRoot = DotNetEnv.Env.GetString("SOLUTION_ROOT", "Env variable not found. Verify you have a .env file with a valid connection string.");
        var outputLocation = "Examples/Aggregation/Pipelines/JoinOneToOne/TutorialOutput.txt";
        var fullPath = Path.Combine(solutionRoot, outputLocation);

        var validationResult = OutputValidator.Expect(results)
            .WithOrderedArrays()
            .ToMatchFile(fullPath);
        validationResult.ThrowIfFailed();
    }

    [Test]
    public void TestJoinMultiFieldOutputMatchesDocs()
    {
        var example = new Examples.Aggregation.Pipelines.JoinMultiField.Tutorial();
        example.LoadSampleData();
        var results = example.PerformAggregation();

        var solutionRoot = DotNetEnv.Env.GetString("SOLUTION_ROOT", "Env variable not found. Verify you have a .env file with a valid connection string.");
        var outputLocation = "Examples/Aggregation/Pipelines/JoinMultiField/TutorialOutput.txt";
        var fullPath = Path.Combine(solutionRoot, outputLocation);

        var validationResult = OutputValidator.Expect(results)
            .WithOrderedArrays()
            .ToMatchFile(fullPath);
        validationResult.ThrowIfFailed();
    }

    [TearDown]
    public void TearDown()
    {
        // Drop the database after the test completes
        _client.DropDatabase("agg_tutorials_db");
        _client.Dispose();
    }
}