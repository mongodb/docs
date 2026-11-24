package monitoring.opentelemetry;

import com.mongodb.ConnectionString;
import com.mongodb.MongoClientSettings;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import com.mongodb.client.model.Filters;
import com.mongodb.observability.ObservabilitySettings;
import com.mongodb.observability.micrometer.MicrometerObservabilitySettings;
import io.micrometer.observation.ObservationRegistry;
import io.micrometer.tracing.exporter.FinishedSpan;
import io.micrometer.tracing.test.reporter.inmemory.InMemoryOtelSetup;
import org.bson.Document;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

public class OpenTelemetryTracing {

    public List<Document> runApp() {
        // :snippet-start: enable-tracing
        // :replace-start: {
        //   "terms": {
        //     "System.getenv(\"CONNECTION_STRING\")": "\"<connection string URI>\""
        //   }
        // }
        String uri = System.getenv("CONNECTION_STRING");
        // :replace-end:

        ObservationRegistry observationRegistry = ObservationRegistry.create();

        MicrometerObservabilitySettings micrometerSettings = ObservabilitySettings.micrometerBuilder()
                .observationRegistry(observationRegistry)
                .build();

        MongoClientSettings settings = MongoClientSettings.builder()
                .applyConnectionString(new ConnectionString(uri))
                .observabilitySettings(micrometerSettings)
                .build();

        // Registers an in-memory OpenTelemetry exporter so this example can
        // inspect the spans the driver emits. In your application, configure
        // your OpenTelemetry SDK with the exporter for your tracing backend
        // instead, such as the OTLP exporter.
        try (InMemoryOtelSetup otelSetup = InMemoryOtelSetup.builder().register(observationRegistry);
             MongoClient mongoClient = MongoClients.create(settings)) {
            MongoDatabase database = mongoClient.getDatabase("sample_mflix");
            MongoCollection<Document> collection = database.getCollection("movies");

            // Runs a find() command to generate "mongodb.operation" and "mongodb.command" spans
            List<Document> results = collection.find().limit(1).into(new ArrayList<>());
            return describeSpans(otelSetup.getBuildingBlocks().getFinishedSpans()); // :remove:
        }
        // :snippet-end:
    }

    public Document configureTracingOptions() {
        // :snippet-start: configure-tracing-options
        // :replace-start: {
        //   "terms": {
        //     "System.getenv(\"CONNECTION_STRING\")": "\"<connection string URI>\""
        //   }
        // }
        String uri = System.getenv("CONNECTION_STRING");
        // :replace-end:

        ObservationRegistry observationRegistry = ObservationRegistry.create();

        MicrometerObservabilitySettings micrometerSettings = ObservabilitySettings.micrometerBuilder()
                .observationRegistry(observationRegistry)
                .enableCommandPayloadTracing(true)
                .maxQueryTextLength(1024)
                .build();

        MongoClientSettings settings = MongoClientSettings.builder()
                .applyConnectionString(new ConnectionString(uri))
                .observabilitySettings(micrometerSettings)
                .build();
        // :snippet-end:

        try (InMemoryOtelSetup otelSetup = InMemoryOtelSetup.builder().register(observationRegistry);
             MongoClient mongoClient = MongoClients.create(settings)) {
            MongoDatabase database = mongoClient.getDatabase("sample_mflix");
            MongoCollection<Document> collection = database.getCollection("movies");

            // Builds a filter long enough that the serialized find command
            // exceeds maxQueryTextLength(1024), so this test can verify the
            // driver actually truncates the captured query text rather than
            // just capturing a short one.
            List<String> titles = new ArrayList<>();
            for (int i = 0; i < 100; i++) {
                titles.add("Back to the Future " + i);
            }
            collection.find(Filters.in("title", titles)).first();

            String queryText = otelSetup.getBuildingBlocks().getFinishedSpans().stream()
                    .map(span -> span.getTags().get("db.query.text"))
                    .filter(Objects::nonNull)
                    .findFirst()
                    .orElse("");

            return new Document("queryTextLength", queryText.length())
                    .append("isTruncated", queryText.endsWith("..."));
        }
    }

    // Converts spans into a doc-friendly representation: the span name and
    // whether it's an operation-level or command-level span, derived from
    // which attribute is present (mirrors the Span Type table on the docs page).
    private static List<Document> describeSpans(List<FinishedSpan> spans) {
        List<Document> described = new ArrayList<>();
        for (FinishedSpan span : spans) {
            String kind;
            if (span.getTags().containsKey("db.operation.name")) {
                kind = "operation";
            } else if (span.getTags().containsKey("db.command.name")) {
                kind = "command";
            } else {
                kind = "other";
            }
            described.add(new Document("name", span.getName()).append("kind", kind));
        }
        return described;
    }
}
