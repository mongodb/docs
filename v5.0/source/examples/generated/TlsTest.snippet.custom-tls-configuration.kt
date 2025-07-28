// You can customize SSL settings using the SSLContext
val sslContext = SSLContext.getDefault()

val settings = MongoClientSettings.builder()
    .applyToSslSettings { builder ->
        builder.enabled(true)
        builder.context(sslContext)
    }
    .build()
val mongoClient = MongoClient.create(settings);
