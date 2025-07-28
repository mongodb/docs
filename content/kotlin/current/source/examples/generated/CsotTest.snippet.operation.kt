val settings = MongoClientSettings.builder()
    .applyConnectionString(ConnectionString("<connection string>"))
    .timeout(200L, TimeUnit.MILLISECONDS)
    .build()

val client = MongoClient.create(settings)
val collection = client
    .getDatabase("db")
    .getCollection<Document>("people")

collection.insertOne(Document("name", "Francine Loews"))
