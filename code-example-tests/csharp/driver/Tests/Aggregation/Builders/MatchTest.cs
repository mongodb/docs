using Utilities.Comparison;
using Utilities.SampleData;

namespace Tests.Aggregation.Builders;

[TestFixture]
public class MatchTest
{
    private readonly Examples.Aggregation.Builders.MatchExample _example = new();

    [Test]
    [RequiresSampleData("sample_mflix", new[] { "movies" })]
    [Description("Tests that RunMatchPipeline produces the expected output")]
    public void TestRunMatchPipeline()
    {
        var results = _example.RunMatchPipeline();
        Expect.That(results)
            .WithOrderedSort()
            .WithIgnoredFields("plot", "type", "cast", "directors", "writers")
            .ShouldMatch(FullPath("MatchOutput.txt"));
    }

    private static string FullPath(string fileName)
    {
        var solutionRoot = $"{Directory.GetCurrentDirectory()}/../../../../";
        var outputLocation = $"Examples/Aggregation/Builders/OutputFiles/{fileName}";
        return Path.Combine(solutionRoot, outputLocation);
    }
}
