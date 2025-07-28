val credential = MongoCredential.createAwsCredential(null, null)

val settings = MongoClientSettings.builder()
    .applyToClusterSettings { builder: ClusterSettings.Builder ->
        builder.hosts(
            listOf(ServerAddress("<atlasUri>"))
        )
    }
    .credential(credential)
    .build()

val mongoClient = MongoClient.create(settings)
