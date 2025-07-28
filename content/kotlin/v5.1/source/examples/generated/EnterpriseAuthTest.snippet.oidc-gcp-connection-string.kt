val connectionString = ConnectionString(
    "mongodb://<OIDC principal>@<hostname>:<port>/?" +
            "authMechanism=MONGODB-OIDC" +
            "&authMechanismProperties=ENVIRONMENT:gcp,TOKEN_RESOURCE:<percent-encoded audience>")
val mongoClient = MongoClient.create(connectionString)
