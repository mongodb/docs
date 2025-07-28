val mongoClient = MongoClient.create(
    MongoClientSettings.builder()
        .applyConnectionString(ConnectionString("<your connection string>"))
        .applyToSslSettings{ builder ->
            builder.enabled(true)
        }
        .build()
)
