val mongoClient =
    MongoClient.create("mongodb://<db_username>:<db_password>@<hostname>:<port>/?authSource=<authenticationDb>&authMechanism=MONGODB-X509&tls=true")
