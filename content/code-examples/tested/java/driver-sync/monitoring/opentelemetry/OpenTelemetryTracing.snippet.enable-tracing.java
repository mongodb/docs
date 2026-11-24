String uri = "<connection string URI>";

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
}
