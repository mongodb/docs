using Examples.TimeSeries;

namespace Tests.TimeSeries;

public class SampleAppTest
{
    [Test]
    public void TestAppProducesExpectedOutput()
    {
        var results = SampleApp.RunExample();
        var expectedOutput = "ok";
        Assert.That(results.Contains(expectedOutput), Is.True,
            $"The result does not contain the expected '{expectedOutput}' key.");
    }
}