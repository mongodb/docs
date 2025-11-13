using Examples.TimeSeries;

namespace Tests.TimeSeries;

public class SampleAppTest
{
    [Test]
    [Description("Tests that the TimeSeries SampleApp produces output containing the expected 'ok' key")]
    public void TestAppProducesExpectedOutput()
    {
        var results = SampleApp.RunExample();
        var expectedOutput = "ok";
        Assert.That(results.Contains(expectedOutput), Is.True,
            $"The result does not contain the expected '{expectedOutput}' key.");
    }
}