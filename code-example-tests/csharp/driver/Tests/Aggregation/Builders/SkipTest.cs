using Utilities.Comparison;
using Utilities.SampleData;

namespace Tests.Aggregation.Builders;

[TestFixture]
public class SkipTest
{
    private readonly Examples.Aggregation.Builders.SkipExample _example = new();

    [Test]
    [RequiresSampleData("sample_mflix", new[] { "movies" })]
    [Description("Tests that RunSkipPipeline returns the expected output")]
    public void TestRunSkipPipeline()
    {
        var results = _example.RunSkipPipeline();
        Expect.That(results)
            .WithOrderedSort()
            .ShouldMatch(FullPath("SkipOutput.txt"));
    }

    private static string FullPath(string fileName)
    {
        var solutionRoot = $"{Directory.GetCurrentDirectory()}/../../../../";
        var outputLocation = $"Examples/Aggregation/Builders/OutputFiles/{fileName}";
        return Path.Combine(solutionRoot, outputLocation);
    }
}
