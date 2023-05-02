val settings = MongoClientSettings.builder()
    .applyConnectionString(ConnectionString(CONNECTION_URI_PLACEHOLDER))
    .applyToSslSettings { builder ->
        builder.enabled(true)
        builder.invalidHostNameAllowed(true)
    }
    .build()
val mongoClient = MongoClient.create(settings);
