using Utilities.Comparison;
using Utilities.SampleData;

namespace Tests.Aggregation.Builders;

[TestFixture]
public class OutTest
{
    private Examples.Aggregation.Builders.OutExample _example = null!;

    [SetUp]
    public void Setup()
    {
        _example = new Examples.Aggregation.Builders.OutExample();
    }

    [TearDown]
    public void TearDown()
    {
        _example.Dispose();
    }

    [Test]
    [RequiresSampleData("sample_mflix", new[] { "movies" })]
    [Description("Tests that RunOutPipeline writes movies to the output collection and returns the expected documents")]
    public void TestRunOutPipeline()
    {
        var results = _example.RunOutPipeline();
        Expect.That(results)
            .WithOrderedSort()
            .WithIgnoredFields("rated")
            .ShouldMatch(FullPath("OutOutput.txt"));
    }

    private static string FullPath(string fileName)
    {
        var solutionRoot = $"{Directory.GetCurrentDirectory()}/../../../../";
        var outputLocation = $"Examples/Aggregation/Builders/OutputFiles/{fileName}";
        return Path.Combine(solutionRoot, outputLocation);
    }
}
