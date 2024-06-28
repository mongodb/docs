val credential = MongoCredential.createOidcCredential(null)
    .withMechanismProperty("OIDC_CALLBACK") { context: Context ->
        val accessToken = String(Files.readAllBytes(Paths.get("access-token.dat")))
        OidcCallbackResult(accessToken)
    }

val mongoClient = MongoClient.create(
    MongoClientSettings.builder()
        .applyToClusterSettings { builder ->
            builder.hosts(listOf(ServerAddress("<hostname>", <port>)))
        }
        .credential(credential)
        .build()
)
