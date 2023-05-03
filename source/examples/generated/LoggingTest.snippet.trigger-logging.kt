val mongoClient = MongoClient.create(CONNECTION_URI_PLACEHOLDER);
val database = mongoClient.getDatabase(DB_NAME_PLACEHOLDER);
val collection = database.getCollection<Document>(COLLECTION_NAME_PLACEHOLDER);
collection.find().firstOrNull()
