val uri = "<connection string>"

val mongoClient = MongoClient.create(
    MongoClientSettings.builder()
        .applyConnectionString(ConnectionString(uri))
        .applyToSocketSettings{ builder ->
            builder
                .applyToProxySettings{ proxyBuilder ->
                    proxyBuilder
                        .host("<proxyHost>")
                        .port("<proxyPort>".toInt())
                        .username("<proxyUsername>")
                        .password("<proxyPassword>")
                        .build()
                }
        }
        .build()
)
