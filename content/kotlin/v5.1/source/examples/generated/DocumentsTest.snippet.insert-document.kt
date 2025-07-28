// val mongoClient = <code to instantiate your client>

val database = mongoClient.getDatabase("fundamentals_data")
val collection = database.getCollection<Document>("authors")
val result = collection.insertOne(author)
