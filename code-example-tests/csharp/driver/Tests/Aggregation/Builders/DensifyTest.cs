using Utilities.Comparison;
using Utilities.SampleData;

namespace Tests.Aggregation.Builders;

[TestFixture]
public class DensifyTest
{
    private readonly Examples.Aggregation.Builders.DensifyExample _example = new();

    [Test]
    [RequiresSampleData("sample_weatherdata", new[] { "data" })]
    [Description("Tests that RunDensifyPipeline produces 5 documents at 15-minute intervals for the target location")]
    public void TestRunDensifyPipeline()
    {
        var results = _example.RunDensifyPipeline();

        var partition = results
            .Where(w =>
                w.Position?.Coordinates?[0] == -47.9 &&
                w.Position?.Coordinates?[1] == 47.6 &&
                w.Timestamp >= new DateTime(1984, 3, 5, 13, 0, 0, DateTimeKind.Utc) &&
                w.Timestamp <= new DateTime(1984, 3, 5, 14, 0, 0, DateTimeKind.Utc))
            .OrderBy(w => w.Timestamp)
            .ToList();

        Expect.That(partition)
            .WithOrderedSort()
            .ShouldMatch(FullPath("PostDensifyOutput.txt"));
    }

    private static string FullPath(string fileName)
    {
        var solutionRoot = $"{Directory.GetCurrentDirectory()}/../../../../";
        var outputLocation = $"Examples/Aggregation/Builders/OutputFiles/{fileName}";
        return Path.Combine(solutionRoot, outputLocation);
    }
}
