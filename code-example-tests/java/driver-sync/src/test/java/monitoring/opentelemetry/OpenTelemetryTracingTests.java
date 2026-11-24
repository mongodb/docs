package monitoring.opentelemetry;

import mongodb.comparison.Expect;
import org.bson.Document;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import sampledatautil.RequiresSampleData;

import java.util.List;

public class OpenTelemetryTracingTests {

    @Test
    @RequiresSampleData("sample_mflix")
    @DisplayName("Test that enabling tracing creates an operation span and a command span")
    void TestEnableTracingCreatesSpans() {
        var example = new OpenTelemetryTracing();
        List<Document> spans = example.runApp();

        Expect.that(spans)
                .withUnorderedSort()
                .shouldMatch("src/main/java/monitoring/opentelemetry/OutputFiles/OpenTelemetryOutput.txt");
    }

    @Test
    @RequiresSampleData("sample_mflix")
    @DisplayName("Test that maxQueryTextLength truncates the captured command text")
    void TestConfigureTracingOptionsTruncatesQueryText() {
        var example = new OpenTelemetryTracing();
        Document result = example.configureTracingOptions();

        Expect.that(result)
                .shouldMatch("src/main/java/monitoring/opentelemetry/OutputFiles/ConfigureTracingOptionsOutput.txt");
    }
}
