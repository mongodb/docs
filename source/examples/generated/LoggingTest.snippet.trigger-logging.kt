val mongoClient = MongoClient.create("<connection string>");
val database = mongoClient.getDatabase(DB_NAME_PLACEHOLDER);
val collection = database.getCollection<Document>(COLLECTION_NAME_PLACEHOLDER);
collection.find().firstOrNull()
