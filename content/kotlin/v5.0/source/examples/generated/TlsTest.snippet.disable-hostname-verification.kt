val settings = MongoClientSettings.builder()
    .applyConnectionString(ConnectionString("<connection string>"))
    .applyToSslSettings { builder ->
        builder.enabled(true)
        builder.invalidHostNameAllowed(true)
    }
    .build()
val mongoClient = MongoClient.create(settings);
