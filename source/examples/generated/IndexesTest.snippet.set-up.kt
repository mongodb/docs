val mongoClient = MongoClient.create("<connection string>")
val database = mongoClient.getDatabase("sample_mflix")
val moviesCollection = database.getCollection<Movie>("movies")
val theatersCollection = database.getCollection<Theater>("theaters")
