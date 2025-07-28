val settings = MongoClientSettings.builder()
    .applyConnectionString(ConnectionString("<connection string>"))
    .applyToSslSettings { builder ->
        builder.enabled(true)
    }
    .build()
val mongoClient = MongoClient.create(settings)
