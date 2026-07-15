var mongoOptions = new MongoOptionsExtension()
    .WithConnectionString("<connection string URI>")
    .WithDatabaseName("hospitalDb")
    .WithKmsProviders(kmsProviders)
    .WithKeyVaultNamespace(keyVaultNamespace)
    .WithCryptProvider(
        CryptProvider.AutoEncryptSharedLibrary,
        Environment.GetEnvironmentVariable("CRYPT_SHARED_LIB_PATH"))
    .WithQueryableEncryptionSchemaMode(
        QueryableEncryptionSchemaMode.Ignore);
