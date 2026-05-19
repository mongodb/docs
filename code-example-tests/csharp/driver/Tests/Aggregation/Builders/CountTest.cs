using Utilities.Comparison;
using Utilities.SampleData;

namespace Tests.Aggregation.Builders;

[TestFixture]
public class CountTest
{
    private Examples.Aggregation.Builders.CountExample _example = null!;

    [SetUp]
    [Description("Initializes the CountExample instance")]
    public void Setup()
    {
        _example = new Examples.Aggregation.Builders.CountExample();
    }

    [TearDown]
    [Description("Disposes the client")]
    public void TearDown()
    {
        _example.Dispose();
    }

    [Test]
    [Description("Tests that RunCountPipeline returns the correct count of documents")]
    [RequiresSampleData("sample_mflix", new[] { "movies" })]
    public void TestRunCountPipeline()
    {
        var result = _example.RunCountPipeline();
        var outputPath = $"{Directory.GetCurrentDirectory()}/../../../../Examples/Aggregation/Builders/CountOutput.txt";
        Expect.That(result).ShouldMatch(outputPath);
    }
}
