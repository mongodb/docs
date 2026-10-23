using Examples.Monitoring.OpenTelemetry;
using Utilities.Comparison;
using Utilities.SampleData;

namespace Tests.Monitoring;

[TestFixture]
public class OpenTelemetryExamplesTests
{
    private readonly OpenTelemetryExamples _example = new();

    [Test]
    [RequiresSampleData("sample_mflix", new[] { "movies" })]
    [Description("Verifies the driver emits operation and command spans when OpenTelemetry tracing is enabled")]
    public void TestExampleProducesExpectedSpans()
    {
        var spans = _example.RunExample();

        Expect.That(spans).ShouldMatch(FullPath("OpenTelemetryOutput.txt"));
    }

    [Test]
    [RequiresSampleData("sample_mflix", new[] { "movies" })]
    [Description("Verifies the driver emits operation and command spans when OpenTelemetry tracing is configured in a generic host")]
    public void TestGenericHostProducesExpectedSpans()
    {
        var spans = _example.RunExampleInGenericHost();

        Expect.That(spans).ShouldMatch(FullPath("OpenTelemetryOutput.txt"));
    }

    [Test]
    [RequiresSampleData("sample_mflix", new[] { "movies" })]
    [Description("Verifies a raw ActivityListener receives the same driver spans as the OpenTelemetry SDK")]
    public void TestActivityListenerProducesExpectedSpans()
    {
        var spans = _example.RunExampleWithActivityListener();

        Expect.That(spans).ShouldMatch(FullPath("OpenTelemetryOutput.txt"));
    }

    [Test]
    [RequiresSampleData("sample_mflix", new[] { "movies" })]
    [Description("Verifies QueryTextMaxLength captures the complete, untruncated db.query.text attribute for a command span")]
    public void TestQueryTextCapture()
    {
        var queryText = _example.RunExampleWithQueryText();

        // The command is shorter than the configured 1024-character limit, so the
        // driver must capture the complete command. If QueryTextMaxLength were set
        // too low, the captured text would be truncated and would not match.
        Expect.That(queryText)
            .ShouldMatch("{ \"find\" : \"movies\", \"filter\" : { \"title\" : \"Back to the Future\" }, \"limit\" : 1 }");
    }

    private static string FullPath(string fileName)
    {
        var solutionRoot = $"{Directory.GetCurrentDirectory()}/../../../../";
        var outputLocation = $"Examples/Monitoring/OpenTelemetry/OutputFiles/{fileName}";
        return Path.Combine(solutionRoot, outputLocation);
    }
}
