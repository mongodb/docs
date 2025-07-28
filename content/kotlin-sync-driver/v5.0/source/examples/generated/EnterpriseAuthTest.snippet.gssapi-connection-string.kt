val connectionString = ConnectionString("<username>@<hostname>:<port>/?authSource=$external&authMechanism=GSSAPI")
val mongoClient = MongoClient.create(connectionString)
