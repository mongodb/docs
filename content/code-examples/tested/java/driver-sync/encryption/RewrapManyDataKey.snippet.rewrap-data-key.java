ClientEncryptionSettings clientEncryptionSettings = ClientEncryptionSettings.builder()
        .keyVaultMongoClientSettings(MongoClientSettings.builder()
                .applyConnectionString(new ConnectionString("<connection string uri>"))
                .build())
        .keyVaultNamespace(keyVaultNamespace)
        .kmsProviders(kmsProviders)
        .build();

try (ClientEncryption clientEncryption = ClientEncryptions.create(clientEncryptionSettings)) {
    Bson filter = Filters.eq("<filter field>", "<filter value>");

    BsonDocument masterKey = new BsonDocument("<dataKeyOpts Key>", new BsonString("<dataKeyOpts Value>"));

    RewrapManyDataKeyOptions options =
            new RewrapManyDataKeyOptions().provider("<KMS provider>").masterKey(masterKey);

    RewrapManyDataKeyResult result = clientEncryption.rewrapManyDataKey(filter, options);
}
