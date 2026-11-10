ClientEncryptionSettings clientEncryptionSettings = ClientEncryptionSettings.builder()
.keyVaultMongoClientSettings(MongoClientSettings.builder()
    .applyConnectionString(new ConnectionString(connectionString))
    .build())
.keyVaultNamespace(keyVaultNamespace)
.kmsProviders(kmsProviders)
.build();
ClientEncryption clientEncryption = ClientEncryptions.create(clientEncryptionSettings);
BsonDocument masterKeyProperties = new BsonDocument();
masterKeyProperties.put("provider", new BsonString("<Your KMS Provider>"));
masterKeyProperties.put("<Your dataKeyOpts Key>", new BsonString("<Your dataKeyOpts Value>"));
List keyAltNames = new ArrayList<String>();
keyAltNames.add("<Your Key Alt Name>");
BsonBinary dataKeyId = clientEncryption.createDataKey(kmsProvider, new DataKeyOptions().masterKey(masterKeyProperties).keyAltNames(keyAltNames));
