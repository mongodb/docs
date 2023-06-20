val mongoClient = MongoClient.create(
    MongoClientSettings.builder()
        .applyConnectionString(ConnectionString("<your connection string>"))
        .build()
)
