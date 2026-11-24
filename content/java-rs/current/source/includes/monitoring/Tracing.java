package org.example;

import com.mongodb.ConnectionString;
import com.mongodb.MongoClientSettings;
import com.mongodb.client.model.Filters;
import com.mongodb.observability.ObservabilitySettings;
import com.mongodb.observability.micrometer.MicrometerObservabilitySettings;
import com.mongodb.reactivestreams.client.*;
import io.micrometer.observation.ObservationRegistry;
import io.micrometer.tracing.test.reporter.inmemory.InMemoryOtelSetup;
import org.bson.Document;
import org.reactivestreams.Publisher;
import reactor.core.publisher.Flux;

public class Tracing {

    public static void main(String[] args) {
        Tracing example = new Tracing();
        example.enableTracing();
        example.configureTracingOptions();
    }

    private void enableTracing() {
        // start-otel-tracing-example
        ConnectionString uri = new ConnectionString("<connection string URI>");
        ObservationRegistry observationRegistry = ObservationRegistry.create();

        MicrometerObservabilitySettings micrometerSettings = ObservabilitySettings.micrometerBuilder()
                .observationRegistry(observationRegistry)
                .build();

        MongoClientSettings settings = MongoClientSettings.builder()
                .applyConnectionString(uri)
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
            FindPublisher<Document> findPublisher = collection.find().limit(1);
            Flux.from(findPublisher).blockLast();
        }
        // end-otel-tracing-example
    }

    private void configureTracingOptions() {
        // start-otel-configure-tracing-options-example
        ConnectionString uri = new ConnectionString("<connection string URI>");
        ObservationRegistry observationRegistry = ObservationRegistry.create();

        MicrometerObservabilitySettings micrometerSettings = ObservabilitySettings.micrometerBuilder()
                .observationRegistry(observationRegistry)
                .enableCommandPayloadTracing(true)
                .maxQueryTextLength(1024)
                .build();

        MongoClientSettings settings = MongoClientSettings.builder()
                .applyConnectionString(uri)
                .observabilitySettings(micrometerSettings)
                .build();
        // end-otel-configure-tracing-options-example

        try (InMemoryOtelSetup otelSetup = InMemoryOtelSetup.builder().register(observationRegistry);
             MongoClient mongoClient = MongoClients.create(settings)) {
            MongoDatabase database = mongoClient.getDatabase("sample_mflix");
            MongoCollection<Document> collection = database.getCollection("movies");

            Publisher<Document> findPublisher = collection.find(Filters.eq("title", "Back to the Future")).first();
            Flux.from(findPublisher).blockLast();
        }
    }

}
