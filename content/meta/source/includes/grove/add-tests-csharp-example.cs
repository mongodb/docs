using System.ComponentModel;
using MongoDB.Driver;
using Utilities.Comparison;

namespace Tests.Aggregation.Pipelines;

public class TutorialTests
{

    // Setup code goes here...

    [Test]
    [Description("Tests that the output of the Filter matches the expected output.")]
    public void TestFilterOutputMatchesDocs()
    {
        var example = new Examples.Aggregation.Pipelines.Filter.Tutorial();
        example.LoadSampleData();
        var results = example.PerformAggregation();

        var solutionRoot = DotNetEnv.Env.GetString("SOLUTION_ROOT", "Env variable not found. Verify you have a .env file with a valid connection string.");
        var outputLocation = "Examples/Aggregation/Pipelines/Filter/TutorialOutput.txt";
        var fullPath = Path.Combine(solutionRoot, outputLocation);

        Expect.That(results)
            .WithOrderedArrays()
            .ShouldMatch(fullPath);
    }

    [Test]
    [Description("Tests that the output of the Group matches the documented output.")]
    public void TestGroupOutputMatchesDocs()
    {
        var example = new Examples.Aggregation.Pipelines.Group.Tutorial();
        example.LoadSampleData();
        var results = example.PerformAggregation();

        var solutionRoot = DotNetEnv.Env.GetString("SOLUTION_ROOT", "Env variable not found. Verify you have a .env file with a valid connection string.");
        var outputLocation = "Examples/Aggregation/Pipelines/Group/TutorialOutput.txt";
        var fullPath = Path.Combine(solutionRoot, outputLocation);

        Expect.That(results)
            .WithOrderedArrays()
            .ShouldMatch(fullPath);
    }

    // Teardown code goes here...
}