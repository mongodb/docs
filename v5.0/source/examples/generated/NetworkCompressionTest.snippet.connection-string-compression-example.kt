// Replace the placeholders with values from your MongoDB deployment's connection string
val connectionString = ConnectionString("mongodb+srv://<user>:<password>@<cluster-url>/?compressors=snappy,zlib,zstd")

// Create a new client with your settings
val mongoClient = MongoClient.create(connectionString)
