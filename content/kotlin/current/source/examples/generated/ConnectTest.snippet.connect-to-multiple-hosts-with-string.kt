val connectionString = ConnectionString("mongodb://host1:27017,host2:27017,host3:27017/")
val mongoClient = MongoClient.create(connectionString)
