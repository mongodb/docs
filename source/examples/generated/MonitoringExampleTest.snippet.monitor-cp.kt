val cpListener = ConnectionPoolLibrarian()
val settings = MongoClientSettings.builder()
    .applyConnectionString(URI)
    .applyToConnectionPoolSettings { builder ->
        builder.addConnectionPoolListener(cpListener)
    }
    .build()
val mongoClient = MongoClient.create(settings)
val database = mongoClient.getDatabase(DATABASE)
val collection = database.getCollection<Document>(COLLECTION)
// Run a command to trigger connection pool events
collection.find().firstOrNull()
