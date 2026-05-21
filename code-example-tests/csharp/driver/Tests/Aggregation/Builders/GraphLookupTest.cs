using Utilities.Comparison;

namespace Tests.Aggregation.Builders;

[TestFixture]
public class GraphLookupTest
{
    private Examples.Aggregation.Builders.GraphLookupExample _example = null!;

    [SetUp]
    public void Setup()
    {
        _example = new Examples.Aggregation.Builders.GraphLookupExample();
        _example.Initialize();
    }

    [TearDown]
    public void TearDown()
    {
        _example.Cleanup();
    }

    [Test]
    [Description("Tests that RunGraphLookupBasicPipeline recursively builds reporting hierarchies for all employees")]
    public void TestRunGraphLookupBasicPipeline()
    {
        var results = _example.RunGraphLookupBasicPipeline()
            .OrderBy(e => e.Id)
            .ToList();
        Expect.That(results)
            .WithOrderedSort()
            .ShouldMatch(FullPath("GraphLookupBasicOutput.txt"));
    }

    [Test]
    [Description("Tests that RunGraphLookupDepthPipeline limits graph traversal to a maximum depth of 1")]
    public void TestRunGraphLookupDepthPipeline()
    {
        var results = _example.RunGraphLookupDepthPipeline()
            .OrderBy(e => e.Id)
            .ToList();
        Expect.That(results)
            .WithOrderedSort()
            .ShouldMatch(FullPath("GraphLookupDepthOutput.txt"));
    }

    [Test]
    [Description("Tests that RunGraphLookupMatchPipeline filters hierarchy members by the Hobbies field")]
    public void TestRunGraphLookupMatchPipeline()
    {
        var results = _example.RunGraphLookupMatchPipeline()
            .OrderBy(e => e.Id)
            .ToList();
        Expect.That(results)
            .WithOrderedSort()
            .ShouldMatch(FullPath("GraphLookupMatchOutput.txt"));
    }

    private static string FullPath(string fileName)
    {
        var solutionRoot = $"{Directory.GetCurrentDirectory()}/../../../../";
        var outputLocation = $"Examples/Aggregation/Builders/OutputFiles/{fileName}";
        return Path.Combine(solutionRoot, outputLocation);
    }
}
