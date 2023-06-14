val credential = MongoCredential.createMongoX509Credential()

val settings = MongoClientSettings.builder()
    .applyToClusterSettings { builder ->
        builder.hosts(listOf(
            ServerAddress("<hostname>", "<port>"))
        )
    }
    .applyToSslSettings { builder ->
        builder.enabled(true)
    }
    .credential(credential)
    .build()

val mongoClient = MongoClient.create(settings)
