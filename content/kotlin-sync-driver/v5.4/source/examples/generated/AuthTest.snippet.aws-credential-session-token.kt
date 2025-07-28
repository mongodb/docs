val credential = MongoCredential.createAwsCredential("<awsKeyId>", "<awsSecretKey>".toCharArray())
    .withMechanismProperty("AWS_SESSION_TOKEN", "<awsSessionToken>")

val settings = MongoClientSettings.builder()
        .applyToClusterSettings { builder: ClusterSettings.Builder ->
            builder.hosts(
                listOf(ServerAddress("<atlasUri>"))
            )
        }
        .credential(credential)
        .build()

val mongoClient = MongoClient.create(settings)
