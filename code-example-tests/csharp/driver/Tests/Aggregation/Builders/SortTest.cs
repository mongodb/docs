using Utilities.Comparison;
using Utilities.SampleData;

namespace Tests.Aggregation.Builders;

[TestFixture]
public class SortTest
{
    private readonly Examples.Aggregation.Builders.SortExample _example = new();

    [TearDown]
    public void TearDown()
    {
        _example.Dispose();
    }

    [Test]
    [RequiresSampleData("sample_mflix", new[] { "movies" })]
    [Description("Tests that RunSortPipeline produces the expected output")]
    public void TestRunSortPipeline()
    {
        var results = _example.RunSortPipeline();
        Expect.That(results)
            .WithOrderedSort()
            .ShouldMatch(FullPath("SortOutput.txt"));
    }

    private static string FullPath(string fileName)
    {
        var solutionRoot = $"{Directory.GetCurrentDirectory()}/../../../../";
        var outputLocation = $"Examples/Aggregation/Builders/OutputFiles/{fileName}";
        return Path.Combine(solutionRoot, outputLocation);
    }
}
