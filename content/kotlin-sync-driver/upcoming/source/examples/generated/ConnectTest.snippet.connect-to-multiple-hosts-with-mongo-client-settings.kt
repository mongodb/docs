val seed1 = ServerAddress("host1", 27017)
val seed2 = ServerAddress("host2", 27017)
val seed3 = ServerAddress("host3", 27017)
val settings = MongoClientSettings.builder()
    .applyToClusterSettings { builder ->
        builder.hosts(
            listOf(seed1, seed2, seed3)
        )
    }
    .build()
val mongoClient = MongoClient.create(settings)
