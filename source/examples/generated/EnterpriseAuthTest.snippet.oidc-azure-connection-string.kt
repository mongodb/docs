val connectionString = ConnectionString(
    "mongodb://<username>@<hostname>:<port>/?" +
        "?authMechanism=MONGODB-OIDC" +
        "&authMechanismProperties=ENVIRONMENT:azure,TOKEN_RESOURCE:<percent-encoded audience>")
val mongoClient = MongoClient.create(connectionString)
