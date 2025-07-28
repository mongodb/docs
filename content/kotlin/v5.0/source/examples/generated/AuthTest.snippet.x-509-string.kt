val mongoClient =
    MongoClient.create("mongodb://<username>:<password>@<hostname>:<port>/?authSource=<authenticationDb>&authMechanism=MONGODB-X509&tls=true")
