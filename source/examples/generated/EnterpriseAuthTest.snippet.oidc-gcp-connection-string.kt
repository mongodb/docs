val connectionString = ConnectionString(
    "mongodb://<hostname>:<port>/?" +
            "authMechanism=MONGODB-OIDC" +
            "&authMechanismProperties=ENVIRONMENT:gcp,TOKEN_RESOURCE:<percent-encoded audience>")
val mongoClient = MongoClient.create(connectionString)
