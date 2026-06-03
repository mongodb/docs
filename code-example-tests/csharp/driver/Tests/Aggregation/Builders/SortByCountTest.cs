using Utilities.Comparison;
using Utilities.SampleData;

namespace Tests.Aggregation.Builders;

[TestFixture]
public class SortByCountTest
{
    private readonly Examples.Aggregation.Builders.SortByCountExample _example = new();

    [Test]
    [RequiresSampleData("sample_mflix", new[] { "movies" })]
    [Description("Tests that RunSortByCountPipeline produces the expected output")]
    public void TestRunSortByCountPipeline()
    {
        var results = _example.RunSortByCountPipeline();
        Expect.That(results)
            .ShouldMatch(FullPath("SortByCountOutput.txt"));
    }

    private static string FullPath(string fileName)
    {
        var solutionRoot = $"{Directory.GetCurrentDirectory()}/../../../../";
        var outputLocation = $"Examples/Aggregation/Builders/OutputFiles/{fileName}";
        return Path.Combine(solutionRoot, outputLocation);
    }
}
