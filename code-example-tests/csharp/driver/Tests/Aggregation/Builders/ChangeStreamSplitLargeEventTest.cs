namespace Tests.Aggregation.Builders;

using Examples.Aggregation.Builders;
using Utilities.Comparison;

[TestFixture]
public class ChangeStreamSplitLargeEventTest
{
    private ChangeStreamSplitLargeEventExample _example = null!;

    [SetUp]
    [Description("Initializes the ChangeStreamSplitLargeEventExample instance before each test")]
    public void Setup()
    {
        _example = new ChangeStreamSplitLargeEventExample();
    }

    [TearDown]
    public void TearDown()
    {
        _example.Cleanup();
    }

    [Test]
    [Description("Tests that $changeStreamSplitLargeEvent splits a large change event into multiple fragments")]
    public void TestRunChangeStreamSplitLargeEvent()
    {
        var splitEvents = _example.RunChangeStreamSplitLargeEvent();

        var solutionRoot = $"{Directory.GetCurrentDirectory()}/../../../../";
        var outputLocation = "../../../content/code-examples/tested/csharp/driver/Aggregation/Builders/ChangeStreamSplitLargeEventOutput.txt";
        var fullPath = Path.Combine(solutionRoot, outputLocation);

        Expect.That(splitEvents).ShouldMatch(fullPath);
    }
}
