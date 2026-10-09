using Examples.Aggregation.Linq;
using Utilities.Comparison;
using Utilities.SampleData;

namespace Tests.Aggregation.Linq;

[TestFixture]
public class QueryResultsTests
{
    private QueryResults _example = null!;

    [SetUp]
    [Description("Initializes the QueryResults example instance before each test")]
    public void Setup()
    {
        _example = new QueryResults();
    }

    [TearDown]
    [Description("Disposes the MongoDB client after each test")]
    public void TearDown()
    {
        _example.Dispose();
    }

    private static string OutputPath =>
        $"{Directory.GetCurrentDirectory()}/../../../../Examples/Aggregation/Linq/QueryResultsOutput.txt";

    [Test]
    [Description("Verifies synchronous iteration over query results by using foreach")]
    [RequiresSampleData("sample_restaurants", new[] { "restaurants" })]
    public void TestIterateSynchronously()
    {
        var results = _example.IterateSynchronously();

        Expect.That(results).ShouldMatch(OutputPath);
    }

    [Test]
    [Description("Verifies converting query results to a list by using ToList()")]
    [RequiresSampleData("sample_restaurants", new[] { "restaurants" })]
    public void TestConvertToList()
    {
        var results = _example.ConvertToList();

        Expect.That(results).ShouldMatch(OutputPath);
    }

    [Test]
    [Description("Verifies converting query results to a cursor by using ToCursor()")]
    [RequiresSampleData("sample_restaurants", new[] { "restaurants" })]
    public void TestConvertToCursor()
    {
        var results = _example.ConvertToCursor();

        Expect.That(results).ShouldMatch(OutputPath);
    }

    [Test]
    [Description("Verifies asynchronous iteration over query results by using ToAsyncEnumerable()")]
    [RequiresSampleData("sample_restaurants", new[] { "restaurants" })]
    public async Task TestIterateAsynchronously()
    {
        var results = await _example.IterateAsynchronously();

        Expect.That(results).ShouldMatch(OutputPath);
    }
}
