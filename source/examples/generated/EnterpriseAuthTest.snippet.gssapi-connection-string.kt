val connectionString = ConnectionString("<Kerberos principal>@<hostname>:<port>/?authSource=$external&authMechanism=GSSAPI")
val mongoClient = MongoClient.create(connectionString)
