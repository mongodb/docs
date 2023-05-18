val mongoClient = MongoClient.create(CONNECTION_URI_PLACEHOLDER)
val database = mongoClient.getDatabase("sample_mflix")
val moviesCollection = database.getCollection<Movie>("movies")
val theatersCollection = database.getCollection<Theater>("theaters")
