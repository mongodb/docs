MongoClientSettings clientSettings = MongoClientSettings.builder()
.applyConnectionString(new ConnectionString(connectionString))
.autoEncryptionSettings(AutoEncryptionSettings.builder()
        .keyVaultNamespace(keyVaultNamespace)
        .kmsProviders(kmsProviders).bypassAutoEncryption(true)
        .build())
.build();
MongoClient mongoClient = MongoClients.create(clientSettings);
