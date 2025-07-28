val sslContext = SslContextBuilder.forClient()
    .sslProvider(SslProvider.OPENSSL)
    .build()
val settings = MongoClientSettings.builder()
    .applyToSslSettings { builder -> builder.enabled(true) }
    .streamFactoryFactory(
        NettyStreamFactoryFactory.builder()
            .sslContext(sslContext)
            .build()
    )
    .build()
val mongoClient = MongoClient.create(settings)
