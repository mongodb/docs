using Utilities.Comparison;
using Utilities.SampleData;

namespace Tests.Aggregation.Builders;

[TestFixture]
public class LimitTest
{
    private readonly Examples.Aggregation.Builders.LimitExample _example = new();

    [Test]
    [RequiresSampleData("sample_mflix", new[] { "movies" })]
    [Description("Tests that RunLimitPipeline returns the first 5 movies sorted by title")]
    public void TestRunLimitPipeline()
    {
        var results = _example.RunLimitPipeline();
        Expect.That(results)
            .WithOrderedSort()
            .ShouldMatch(FullPath("LimitOutput.txt"));
    }

    private static string FullPath(string fileName)
    {
        var solutionRoot = $"{Directory.GetCurrentDirectory()}/../../../../";
        var outputLocation = $"Examples/Aggregation/Builders/OutputFiles/{fileName}";
        return Path.Combine(solutionRoot, outputLocation);
    }
}
