using Utilities.Comparison;
using Utilities.SampleData;

namespace Tests.Aggregation.Builders;

[TestFixture]
public class GroupTest
{
    private Examples.Aggregation.Builders.GroupExample _example = null!;

    [SetUp]
    public void Setup()
    {
        _example = new Examples.Aggregation.Builders.GroupExample();
    }

    [TearDown]
    public void TearDown()
    {
        _example.Dispose();
    }

    [Test]
    [RequiresSampleData("sample_mflix", new[] { "movies" })]
    [Description("Tests that RunGroupPipeline groups movies by rating with correct runtime stats")]
    public void TestRunGroupPipeline()
    {
        var results = _example.RunGroupPipeline();
        var sorted = results
            .OrderBy(r => r["Rating"].IsBsonNull ? "" : r["Rating"].AsString, StringComparer.Ordinal)
            .ToList();

        Expect.That(sorted)
            .WithOrderedSort()
            .ShouldMatch(FullPath("GroupOutput.txt"));
    }

    private static string FullPath(string fileName)
    {
        var solutionRoot = $"{Directory.GetCurrentDirectory()}/../../../../";
        var outputLocation = $"Examples/Aggregation/Builders/OutputFiles/{fileName}";
        return Path.Combine(solutionRoot, outputLocation);
    }
}
