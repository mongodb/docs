var keyVaultClient = new MongoClient(connectionString);
var clientEncryptionOptions = new ClientEncryptionOptions(
    keyVaultClient: keyVaultClient,
    keyVaultNamespace: keyVaultNamespace,
    kmsProviders: kmsProviders);
var clientEncryption = new ClientEncryption(clientEncryptionOptions);

var dataKeyOptions = new DataKeyOptions(
    masterKey: new BsonDocument
    {
        { "<Your dataKeyOpts Keys>", "<Your dataKeyOpts Values>" },
    });
List<string> keyNames = new List<string>();
keyNames.Add("<Your Key Alt Name>");
var dataKeyId = clientEncryption.CreateDataKey("<Your KMS Provider>", dataKeyOptions.With(keyNames), CancellationToken.None);
