using Examples.TimeSeries;
using Utilities.Comparison;

namespace Tests.TimeSeries;

public class SecondaryIndexesTest
{
    [Test]
    [Description("Tests CreateSecondaryIndex and UseSecondaryIndex output matches the expected documentation examples")]
    public async Task TestSecondaryIndex()
    {
        var result = await SecondaryIndexes.CreateAndUseSecondaryIndex();
        var solutionRoot = $"{Directory.GetCurrentDirectory()}/../../../../";
        var outputLocation = $"Examples/TimeSeries/OutputFiles/SecondaryIndexOutput.txt";
        var fullPath = Path.Combine(solutionRoot, outputLocation);

        Expect.That(result.Result).WithIgnoredFields("_id").ShouldMatch(fullPath);

        outputLocation = $"Examples/TimeSeries/OutputFiles/SecondaryIndexExplainOutput.txt";
        fullPath = Path.Combine(solutionRoot, outputLocation);

        Expect.That(result.ExplainResult)
            .ShouldResemble(fullPath)
            .WithSchema(new SchemaValidationOptions
            {
                Count = 1,
                RequiredFields = new[] { "stages[0].$cursor.queryPlanner.winningPlan.stage" },
                FieldValues =
                    new Dictionary<string, object?>() { { "stages[0].$cursor.queryPlanner.winningPlan.stage", "CLUSTERED_IXSCAN" } }
            });
    }

    [TearDown]
    public void TearDown()
    {
        SecondaryIndexes.Cleanup();
    }
}