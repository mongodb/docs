using Utilities.Comparison;
using Utilities.SampleData;

namespace Tests.Aggregation.Builders;

[TestFixture]
public class GeoNearTest
{
    private readonly Examples.Aggregation.Builders.GeoNearExample _example = new();

    [Test]
    [RequiresSampleData("sample_mflix", new[] { "theaters" })]
    [Description("Tests that RunGeoNearPipeline produces expected documents within max distance")]
    public void TestRunGeoNearPipeline()
    {
        var results = _example.RunGeoNearPipeline();
        Expect.That(results)
            .WithOrderedSort()
            .ShouldMatch(FullPath("GeoNearOutput.txt"));
    }

    [Test]
    [RequiresSampleData("sample_mflix", new[] { "theaters" })]
    [Description("Tests that RunGeoNearMinPipeline produces 4 documents beyond min distance")]
    public void TestRunGeoNearMinPipeline()
    {
        var results = _example.RunGeoNearMinPipeline();
        Expect.That(results)
            .WithOrderedSort()
            .ShouldMatch(FullPath("GeoNearMinOutput.txt"));
    }

    private static string FullPath(string fileName)
    {
        var solutionRoot = $"{Directory.GetCurrentDirectory()}/../../../../";
        var outputLocation = $"Examples/Aggregation/Builders/OutputFiles/{fileName}";
        return Path.Combine(solutionRoot, outputLocation);
    }
}
