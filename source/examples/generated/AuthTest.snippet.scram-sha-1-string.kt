val mongoClient =
    MongoClient.create("mongodb://<db_username>:<db_password>@<hostname>:<port>/?authSource=<authenticationDb>&authMechanism=SCRAM-SHA-1")
