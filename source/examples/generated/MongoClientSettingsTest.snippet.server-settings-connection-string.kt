val mongoClient = MongoClient.create(
    MongoClientSettings.builder()
        .applyConnectionString(ConnectionString("<your connection string>"))
        .applyToServerSettings{ builder ->
            builder
                .minHeartbeatFrequency(700, TimeUnit.MILLISECONDS)
                .heartbeatFrequency(15, TimeUnit.SECONDS)
        }
        .build()
)
