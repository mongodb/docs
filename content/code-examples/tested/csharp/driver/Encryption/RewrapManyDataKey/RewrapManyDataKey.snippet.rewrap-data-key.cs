var keyVaultClient = new MongoClient(
    "<connection string URI>");

var clientEncryptionOptions = new ClientEncryptionOptions(
    keyVaultClient: keyVaultClient,
    keyVaultNamespace: keyVaultNamespace,
    kmsProviders: kmsProviders);

using var clientEncryption =
    new ClientEncryption(clientEncryptionOptions);

var filter = Builders<BsonDocument>.Filter.Eq(
    "<filter field>", "<filter value>");

var rewrapManyDataKeyOptions = new RewrapManyDataKeyOptions(
    provider: "<KMS provider>",
    masterKey: new BsonDocument
    {
        { "<dataKeyOpts Key>", "<dataKeyOpts Value>" }
    });

var result = clientEncryption.RewrapManyDataKey(
    filter, rewrapManyDataKeyOptions, CancellationToken.None);
