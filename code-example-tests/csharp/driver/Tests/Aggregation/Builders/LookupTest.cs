using Utilities.Comparison;
using Utilities.SampleData;

namespace Tests.Aggregation.Builders;

[TestFixture]
public class LookupTest
{
    private readonly Examples.Aggregation.Builders.LookupExample _example = new();

    [TearDown]
    public void TearDown()
    {
        _example.Dispose();
    }

    [Test]
    [RequiresSampleData("sample_mflix", new[] { "movies", "comments" })]
    [Description("Tests that RunLookupPipeline produces the expected output")]
    public void TestRunLookupPipeline()
    {
        var results = _example.RunLookupPipeline();
        Expect.That(results)
            .WithOrderedSort()
            .ShouldMatch(FullPath("LookupOutput.txt"));
    }

    private static string FullPath(string fileName)
    {
        var solutionRoot = $"{Directory.GetCurrentDirectory()}/../../../../";
        var outputLocation = $"Examples/Aggregation/Builders/OutputFiles/{fileName}";
        return Path.Combine(solutionRoot, outputLocation);
    }
}
