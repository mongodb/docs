val mongoClient = MongoClient.create(
    MongoClientSettings.builder()
        .applyToClusterSettings{ builder ->
            builder.mode(ClusterConnectionMode.SINGLE)
        }
        .build()
)
