using Utilities.Comparison;
using Utilities.SampleData;

namespace Tests.Aggregation.Builders;

[TestFixture]
public class FacetTest
{
    private Examples.Aggregation.Builders.FacetExample _example = null!;

    [SetUp]
    [Description("Initializes the FacetExample instance before each test")]
    public void Setup()
    {
        _example = new Examples.Aggregation.Builders.FacetExample();
    }

    [Test]
    [RequiresSampleData("sample_mflix", new[] { "movies" })]
    [Description("Tests that RunFacetPipeline produces the expected facet output")]
    public void TestRunFacetPipeline()
    {
        var result = _example.RunFacetPipeline();
        Expect.That(result).ShouldMatch(FullPath("FacetOutput.txt"));
    }

    private static string FullPath(string fileName)
    {
        var solutionRoot = $"{Directory.GetCurrentDirectory()}/../../../../";
        var outputLocation = $"Examples/Aggregation/Builders/OutputFiles/{fileName}";
        return Path.Combine(solutionRoot, outputLocation);
    }
}
