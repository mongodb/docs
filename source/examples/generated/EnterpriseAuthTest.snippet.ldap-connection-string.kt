val connectionString = ConnectionString("<LDAP username>:<password>@<hostname>:<port>/?authSource=$external&authMechanism=PLAIN")
val mongoClient = MongoClient.create(connectionString)
