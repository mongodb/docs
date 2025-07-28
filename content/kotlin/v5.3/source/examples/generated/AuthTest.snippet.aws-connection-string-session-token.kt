val credential = MongoCredential.createAwsCredential("<awsKeyId>", "<awsSecretKey>".toCharArray())
val connectionString = ConnectionString("mongodb://<atlasUri>/?authMechanism=MONGODB-AWS&authMechanismProperties=AWS_SESSION_TOKEN:<awsSessionToken>")

val settings = MongoClientSettings.builder()
    .applyConnectionString(connectionString)
    .credential(credential)
    .build()

val mongoClient = MongoClient.create(settings)
