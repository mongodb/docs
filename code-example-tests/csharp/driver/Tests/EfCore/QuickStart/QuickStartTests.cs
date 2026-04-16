namespace Tests.EfCore.QuickStart;

using Examples.EfCore.QuickStart;
using Utilities.Comparison;

[TestFixture]
public class QuickStartTests
{
    [Test]
    [Utilities.SampleData.RequiresSampleData("sample_mflix", new[] { "movies" })]
    [Description("Verifies that the QuickStart example queries a movie and returns a non-empty plot.")]
    public void TestRunQuickStart()
    {
        var plot = QuickStart.RunQuickStart();
        Expect.That(plot).ShouldMatch("A young man is accidentally sent 30 years into the past in a time-traveling DeLorean invented by his friend, Dr. Emmett Brown, and must make sure his high-school-age parents unite in order to save his own existence.");
    }
}

