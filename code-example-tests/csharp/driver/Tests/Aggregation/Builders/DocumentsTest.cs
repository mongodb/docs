using Utilities.Comparison;

namespace Tests.Aggregation.Builders;

[TestFixture]
public class DocumentsTest
{
    private readonly Examples.Aggregation.Builders.DocumentsExample _example = new();

    [Test]
    [Description("Tests that RunDocumentsPipeline produces the expected documents")]
    public void TestRunDocumentsPipeline()
    {
        var results = _example.RunDocumentsPipeline();
        Expect.That(results)
            .WithOrderedSort()
            .ShouldMatch(FullPath("DocumentsOutput.txt"));
    }

    private static string FullPath(string fileName)
    {
        var solutionRoot = $"{Directory.GetCurrentDirectory()}/../../../../";
        var outputLocation = $"Examples/Aggregation/Builders/OutputFiles/{fileName}";
        return Path.Combine(solutionRoot, outputLocation);
    }
}
