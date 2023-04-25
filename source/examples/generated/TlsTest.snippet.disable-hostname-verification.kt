val settings = MongoClientSettings.builder()
    .applyToSslSettings { builder ->
        builder.enabled(true)
        builder.invalidHostNameAllowed(true)
    }
    .build()
val mongoClient = MongoClient.create(settings);
