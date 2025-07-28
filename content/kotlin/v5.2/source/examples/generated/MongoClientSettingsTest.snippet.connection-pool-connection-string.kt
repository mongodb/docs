val mongoClient = MongoClient.create(
    MongoClientSettings.builder()
        .applyConnectionString(ConnectionString("<your connection string>"))
        .applyToConnectionPoolSettings{ builder ->
            builder
                .maxWaitTime(10, TimeUnit.SECONDS)
                .maxSize(200)
        }
        .build()
)
