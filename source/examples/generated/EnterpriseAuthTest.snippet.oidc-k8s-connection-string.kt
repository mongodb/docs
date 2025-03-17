val connectionString = ConnectionString(
    "mongodb://<OIDC principal>@<hostname>:<port>/?" +
            "authMechanism=MONGODB-OIDC" +
            "&authMechanismProperties=ENVIRONMENT:k8s,TOKEN_RESOURCE:<percent-encoded audience>")
val mongoClient = MongoClient.create(connectionString)
