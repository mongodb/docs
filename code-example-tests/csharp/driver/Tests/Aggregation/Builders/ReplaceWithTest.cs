using Utilities.Comparison;
using Utilities.SampleData;

namespace Tests.Aggregation.Builders;

[TestFixture]
public class ReplaceWithTest
{
    private readonly Examples.Aggregation.Builders.ReplaceWithExample _example = new();

    [Test]
    [RequiresSampleData("sample_mflix", new[] { "movies" })]
    [Description("Tests that RunReplaceWithPipeline replaces Movie documents with ImdbData sub-documents")]
    public void TestRunReplaceWithPipeline()
    {
        var results = _example.RunReplaceWithPipeline();
        Expect.That(results)
            .WithOrderedSort()
            .ShouldMatch(FullPath("ReplaceWithOutput.txt"));
    }

    private static string FullPath(string fileName)
    {
        var solutionRoot = $"{Directory.GetCurrentDirectory()}/../../../../";
        var outputLocation = $"Examples/Aggregation/Builders/OutputFiles/{fileName}";
        return Path.Combine(solutionRoot, outputLocation);
    }
}
