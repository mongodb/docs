val connectionString = ConnectionString("<Kerberos principal>@<hostname>:<port>/?authSource=$external&authMechanism=GSSAPI&authMechanismProperties=SERVICE_NAME:myService")
val mongoClient = MongoClient.create(connectionString)
