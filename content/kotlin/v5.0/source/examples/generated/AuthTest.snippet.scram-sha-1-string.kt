val mongoClient =
    MongoClient.create("mongodb://<username>:<password>@<hostname>:<port>/?authSource=<authenticationDb>&authMechanism=SCRAM-SHA-1")
