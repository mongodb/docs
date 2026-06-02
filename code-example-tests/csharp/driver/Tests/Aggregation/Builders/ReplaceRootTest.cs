using Utilities.Comparison;
using Utilities.SampleData;

namespace Tests.Aggregation.Builders;

[TestFixture]
public class ReplaceRootTest
{
    private readonly Examples.Aggregation.Builders.ReplaceRootExample _example = new();

    [Test]
    [RequiresSampleData("sample_mflix", new[] { "movies" })]
    [Description("Tests that RunReplaceRootPipeline produces the expected output")]
    public void TestRunReplaceRootPipeline()
    {
        var results = _example.RunReplaceRootPipeline();
        Expect.That(results)
            .WithOrderedSort()
            .ShouldMatch(FullPath("ReplaceRootOutput.txt"));
    }

    private static string FullPath(string fileName)
    {
        var solutionRoot = $"{Directory.GetCurrentDirectory()}/../../../../";
        var outputLocation = $"Examples/Aggregation/Builders/OutputFiles/{fileName}";
        return Path.Combine(solutionRoot, outputLocation);
    }
}
