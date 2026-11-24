String uri = "<connection string URI>";

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
