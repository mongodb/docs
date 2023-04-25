val serverApi = ServerApi.builder()
    .version(ServerApiVersion.V1)
    .build()

// Replace the uri string placeholder with your MongoDB deployment's connection string
val uri = CONNECTION_URI_PLACEHOLDER

val settings = MongoClientSettings.builder()
    .applyConnectionString(ConnectionString(uri))
    .serverApi(serverApi)
    .build()

val client = MongoClient.create(settings)
