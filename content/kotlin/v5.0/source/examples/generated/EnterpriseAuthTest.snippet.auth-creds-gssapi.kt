val credential = MongoCredential.createGSSAPICredential("<username>")

val settings = MongoClientSettings.builder()
        .applyToClusterSettings { builder ->
            builder.hosts(listOf(ServerAddress("<hostname>", <port>)))
        }
        .credential(credential)
        .build()

val mongoClient = MongoClient.create(settings)
