val settings = MongoClientSettings.builder()
    .applyConnectionString(ConnectionString("<connection string>"))
    .timeout(200L, TimeUnit.MILLISECONDS)
    .build()

val client = MongoClient.create(settings)
val database = client.getDatabase("db")
val collection = database
    .getCollection<Document>("people")
    .withTimeout(300L, TimeUnit.MILLISECONDS)
