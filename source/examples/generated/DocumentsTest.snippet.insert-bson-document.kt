// val mongoClient = <code to instantiate your client>

val database = mongoClient.getDatabase("fundamentals_data")
val collection = database.getCollection<BsonDocument>("authors")

val result: InsertOneResult = collection.insertOne(author)
