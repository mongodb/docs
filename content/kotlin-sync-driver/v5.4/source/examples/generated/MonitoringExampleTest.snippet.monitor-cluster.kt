val clusterListener = IsWriteable()
val settings = MongoClientSettings.builder()
    .applyConnectionString(URI)
    .applyToClusterSettings { builder ->
        builder.addClusterListener(clusterListener)
    }
    .build()
val mongoClient = MongoClient.create(settings)
val database = mongoClient.getDatabase(DATABASE)
val collection = database.getCollection<Document>(COLLECTION)
// Run a command to trigger a ClusterDescriptionChangedEvent event
collection.find().firstOrNull()
