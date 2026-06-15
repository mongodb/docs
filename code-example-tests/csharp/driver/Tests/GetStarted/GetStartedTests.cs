using Examples.GetStarted;
using Utilities.Comparison;

namespace Tests.GetStarted;

public class GetStartedTests
{
    [Test]
    [Description("Tests that the output of the Get Started tutorial matches the expected output.")]
    public void TestGetStarted()
    {
        var example = new GetStartedBsonDocument();
        var result = example.RunGetStarted();

        var fullPath = Path.Combine(
            Directory.GetCurrentDirectory(),
            "../../../../Examples/GetStarted/get-started-bson-output.sh");

        Expect.That(result).ShouldMatch(fullPath);
    }

    [Test]
    [Description("Tests that the POCO Get Started tutorial returns the expected movie.")]
    public void TestGetStartedPoco()
    {
        var example = new GetStartedPoco();
        var movie = example.RunGetStarted();

        using (Assert.EnterMultipleScope())
        {
            Assert.That(movie.Title, Is.EqualTo("Back to the Future"));
            Assert.That(movie.Plot, Does.StartWith("A young man is accidentally sent 30 years into the past"));
            Assert.That(movie.Genres, Does.Contain("Adventure"));
            Assert.That(movie.Genres, Does.Contain("Comedy"));
            Assert.That(movie.Genres, Does.Contain("Sci-Fi"));
        }
    }
}