val mongoClient = MongoClient.create(
    MongoClientSettings.builder()
        .applyConnectionString(ConnectionString("mongodb+srv://host1.acme.com"))
        .build()
)
