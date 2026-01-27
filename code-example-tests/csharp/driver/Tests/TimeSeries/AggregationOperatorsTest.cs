using DotNetEnv;
using Examples.TimeSeries;
using Examples.TimeSeries.QuickStart;
using MongoDB.Driver;
using Utilities;
using Utilities.Comparison;

namespace Tests.TimeSeries;

public class AggregationOperatorsTest
{
    [SetUp]
    [Description("Initializes the MongoDB client before each test")]
    public void Setup()
    {

    }

    [Test]
    [Description("Tests that the average price aggregation pipeline output matches the expected documentation examples")]
    public async Task TestAveragePriceAggregationPipelineOutputMatchesDocs()
    {
        var result = await AggregationOperators.RunAveragePricePipeline();

        var solutionRoot = $"{Directory.GetCurrentDirectory()}/../../../../";
        var outputLocation = $"Examples/TimeSeries/OutputFiles/AveragePriceOutput.txt";
        var fullPath = Path.Combine(solutionRoot, outputLocation);

        Expect.That(fullPath).ShouldMatch(result);
    }

    [Test]
    [Description("Tests that the rolling average aggregation pipeline output matches the expected documentation examples")]
    public async Task TestRollingAverageAggregationPipelineOutputMatchesDocs()
    {
        var result = await AggregationOperators.RunRollingAveragePipeline();

        var solutionRoot = $"{Directory.GetCurrentDirectory()}/../../../../";
        var outputLocation = $"Examples/TimeSeries/OutputFiles/RollingAverageOutput.txt";
        var fullPath = Path.Combine(solutionRoot, outputLocation);

        Expect.That(fullPath).WithIgnoredFields("_id", "ticker").ShouldMatch(result);
    }

    [TearDown]
    public void TearDown()
    {
        // Drop the database after the test completes
        AggregationOperators.Cleanup();
    }
}
