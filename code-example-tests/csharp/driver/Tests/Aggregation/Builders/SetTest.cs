using Utilities.Comparison;
using Utilities.SampleData;

namespace Tests.Aggregation.Builders;

[TestFixture]
public class SetTest
{
    private readonly Examples.Aggregation.Builders.SetExample _example = new();

    [Test]
    [RequiresSampleData("sample_mflix", new[] { "movies" })]
    [Description("Tests that RunSetPipeline produces the expected output")]
    public void TestRunSetPipeline()
    {
        var results = _example.RunSetPipeline();
        Expect.That(results)
            .WithOrderedSort()
            .ShouldMatch(FullPath("SetOutput.txt"));
    }

    private static string FullPath(string fileName)
    {
        var solutionRoot = $"{Directory.GetCurrentDirectory()}/../../../../";
        var outputLocation = $"Examples/Aggregation/Builders/OutputFiles/{fileName}";
        return Path.Combine(solutionRoot, outputLocation);
    }
}
