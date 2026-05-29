using Utilities.Comparison;
using Utilities.SampleData;

namespace Tests.Aggregation.Builders;

[TestFixture]
public class SampleTest
{
    private readonly Examples.Aggregation.Builders.SampleExample _example = new();

    [Test]
    [RequiresSampleData("sample_mflix", new[] { "movies" })]
    [Description("Tests that RunSamplePipeline returns 5 random documents from the movies collection")]
    public void TestRunSamplePipeline()
    {
        var results = _example.RunSamplePipeline();
        Expect.That(results.Count).ShouldMatch(5);
    }
}
