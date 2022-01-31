private static MongoClient setApiVersionParam(String connectionString) {
    // Start Versioned API Example 1
    MongoClient client = MongoClients.create(
            MongoClientSettings.builder()
            .applyConnectionString(new ConnectionString(<connection string>))
            .serverApi(
                    ServerApi.builder()
                    .version(ServerApiVersion.V1)
                    .build()
                    ).build()
            );

    return client;
    // End Versioned API Example 1
}

private static MongoClient setApiVersionStrict(String connectionString) {
    // Start Versioned API Example 2
    MongoClient client = MongoClients.create(
            MongoClientSettings.builder()
            .applyConnectionString(new ConnectionString(<connection string>))
            .serverApi(
                    ServerApi.builder()
                    .version(ServerApiVersion.V1)
                    .strict(true)
                    .build()
                    ).build()
            );

    return client;
    // End Versioned API Example 2
}

private static MongoClient setApiVersionNotStrict(String connectionString) {
    // Start Versioned API Example 3
    MongoClient client = MongoClients.create(
            MongoClientSettings.builder()
            .applyConnectionString(new ConnectionString(<connection string>))
            .serverApi(
                    ServerApi.builder()
                    .version(ServerApiVersion.V1)
                    .strict(false)
                    .build()
                    ).build()
            );
    // End Versioned API Example 3
    return client;

}

private static MongoClient setApiVersionDeprecationErrors(String connectionString) {
    // Start Versioned API Example 4
    MongoClient client = MongoClients.create(
            MongoClientSettings.builder()
            .applyConnectionString(new ConnectionString(<connection string>))
            .serverApi(
                    ServerApi.builder()
                    .version(ServerApiVersion.V1)
                    .deprecationErrors(true)
                    .build()
                    ).build()
            );

    // End Versioned API Example 4
    return client;
}

