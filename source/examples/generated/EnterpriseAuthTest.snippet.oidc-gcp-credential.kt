val credential = MongoCredential.createOidcCredential("<username>")
    .withMechanismProperty("ENVIRONMENT", "gcp")
    .withMechanismProperty("TOKEN_RESOURCE", "<audience>")

val mongoClient = MongoClient.create(
    MongoClientSettings.builder()
        .applyToClusterSettings { builder ->
            builder.hosts(listOf(ServerAddress("<hostname>", <port>)))
        }
        .credential(credential)
        .build())
