var keyVaultClient = new MongoClient(connectionString);
var clientEncryptionOptions = new ClientEncryptionOptions(
    keyVaultClient: keyVaultClient,
    keyVaultNamespace: keyVaultNamespace,
    kmsProviders: kmsProviders);
var clientEncryption = new ClientEncryption(clientEncryptionOptions);

var dataKeyOptions = new DataKeyOptions(
    alternateKeyNames: new[] { "<Your Key Alt Name>" },
    masterKey: new BsonDocument
    {
        { "<Your dataKeyOpts Keys>", "<Your dataKeyOpts Values>" },
    });

var dataKeyId = clientEncryption.CreateDataKey("<Your KMS Provider>", dataKeyOptions, CancellationToken.None);
