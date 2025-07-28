val commandCounter = CommandCounter()

val settings = MongoClientSettings.builder()
    .applyConnectionString(URI)
    .addCommandListener(commandCounter)
    .build()
val mongoClient = MongoClient.create(settings)
val database = mongoClient.getDatabase(DATABASE)
val collection = database.getCollection<Document>(COLLECTION)

// Run some commands to test the counter
collection.find().firstOrNull()
collection.find().firstOrNull()
