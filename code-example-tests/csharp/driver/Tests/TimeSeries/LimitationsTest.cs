using Examples.TimeSeries;
using Utilities.Comparison;

namespace Tests.TimeSeries;

public class LimitationsTest
{
    [Test]
    public void TestQueryByTimeRange()
    {
        var result = Limitations.GetDistinctDocuments();

        if (result != null)
        {
            Expect.That(result.Count).ShouldMatch(2);
            Expect.That(result[0]["_id"]).ShouldMatch("a");
            Expect.That(result[1]["_id"]).ShouldMatch("b");
        }
    }
}