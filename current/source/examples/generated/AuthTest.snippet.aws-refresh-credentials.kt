val awsFreshCredentialSupplier: Supplier<AwsCredential> = Supplier {
    // Add your code here to fetch new credentials

    // Return the new credentials
    AwsCredential("<awsKeyId>", "<awsSecretKey>", "<awsSessionToken>")
}

val credential = MongoCredential.createAwsCredential("<awsKeyId>", "<awsSecretKey>".toCharArray())
    .withMechanismProperty(MongoCredential.AWS_CREDENTIAL_PROVIDER_KEY, awsFreshCredentialSupplier)

val settings = MongoClientSettings.builder()
    .applyToClusterSettings { builder ->
        builder.hosts(listOf(ServerAddress("<hostname>", "<port>")))
    }
    .credential(credential)
    .build()

val mongoClient = MongoClient.create(settings)
