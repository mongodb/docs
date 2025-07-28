val sslContext = SslContextBuilder.forClient()
    .sslProvider(SslProvider.OPENSSL)
    .build()

val settings = MongoClientSettings.builder()
    .applyToSslSettings { builder: SslSettings.Builder -> builder.enabled(true) }
    .transportSettings(
        TransportSettings.nettyBuilder()
            .sslContext(sslContext)
            .build()
    )
    .build()

val mongoClient = MongoClient.create(settings);
