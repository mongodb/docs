// val mongoClient = <code to instantiate your client>;

val database = mongoClient.getDatabase("fundamentals_data")
val collection= database.getCollection<JsonObject>("authors")

val result = collection.insertOne(author)
