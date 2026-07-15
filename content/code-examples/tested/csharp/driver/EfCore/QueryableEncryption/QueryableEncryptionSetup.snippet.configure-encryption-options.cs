var kmsProviders = new Dictionary<
    string, IReadOnlyDictionary<string, object>>
{
    {
        "local",
        new Dictionary<string, object>
        {
            { "key", localMasterKey }
        }
    }
};

var keyVaultNamespace = CollectionNamespace.FromFullName(
    "encryption.__keyVault");

var mongoOptions = new MongoOptionsExtension()
    .WithConnectionString(connectionString)
    .WithDatabaseName("myDatabase")
    .WithKmsProviders(kmsProviders)
    .WithKeyVaultNamespace(keyVaultNamespace)
    .WithCryptProvider(
        CryptProvider.AutoEncryptSharedLibrary,
        Environment.GetEnvironmentVariable("CRYPT_SHARED_LIB_PATH"));

var optionsBuilder = new DbContextOptionsBuilder<MyDbContext>()
    .UseMongoDB(mongoOptions);
