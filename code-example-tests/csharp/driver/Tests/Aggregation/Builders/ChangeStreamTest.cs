using Utilities.Comparison;

namespace Tests.Aggregation.Builders;

[TestFixture]
public class ChangeStreamTest
{
    private Examples.Aggregation.Builders.ChangeStreamExample _example = null!;

    [SetUp]
    [Description("Initializes the ChangeStreamExample instance before each test")]
    public void Setup()
    {
        _example = new Examples.Aggregation.Builders.ChangeStreamExample();
    }

    [Test]
    [Description("Tests that BuildChangeStreamPipeline successfully creates a $changeStream pipeline stage")]
    public void TestBuildChangeStreamPipeline()
    {
        var result = _example.BuildChangeStreamPipeline();
        Expect.That(result).ShouldMatch(true);
    }

    [Test]
    [Description("Tests that BuildChangeStreamPipelineWithOptions successfully creates a $changeStream pipeline stage with options")]
    public void TestBuildChangeStreamPipelineWithOptions()
    {
        var result = _example.BuildChangeStreamPipelineWithOptions();
        Expect.That(result).ShouldMatch(true);
    }
}
