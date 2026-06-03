using Utilities.Comparison;
using Utilities.SampleData;

namespace Tests.Aggregation.Builders;

[TestFixture]
public class UnionWithTest
{
    private Examples.Aggregation.Builders.UnionWithExample _example = null!;

    [SetUp]
    public void Setup()
    {
        _example = new Examples.Aggregation.Builders.UnionWithExample();
    }

    [TearDown]
    public void TearDown()
    {
        _example.Dispose();
    }

    [Test]
    [RequiresSampleData("sample_mflix", new[] { "movies" })]
    [Description("Tests that RunUnionWithPipeline produces the expected output")]
    public void TestRunUnionWithPipeline()
    {
        var results = _example.RunUnionWithPipeline();
        var sorted = results
            .OrderBy(r => r["title"].AsString, StringComparer.Ordinal)
            .ToList();

        Expect.That(sorted)
            .WithOrderedSort()
            .ShouldMatch(FullPath("UnionWithOutput.txt"));
    }

    private static string FullPath(string fileName)
    {
        var solutionRoot = $"{Directory.GetCurrentDirectory()}/../../../../";
        var outputLocation = $"Examples/Aggregation/Builders/OutputFiles/{fileName}";
        return Path.Combine(solutionRoot, outputLocation);
    }
}
