var kmsConnector = new HttpsProxyKmsConnector(proxyHost: "proxy.example.com", proxyPort: 3129);

// Explicit encryption
var clientEncryptionOptions = new ClientEncryptionOptions(
    keyVaultClient: keyVaultClient,
    keyVaultNamespace: keyVaultNamespace,
    kmsProviders: kmsProviders);
clientEncryptionOptions.SetKmsConnector(kmsConnector);
using var clientEncryption = new ClientEncryption(clientEncryptionOptions);

// Automatic encryption
var autoEncryptionOptions = new AutoEncryptionOptions(
    keyVaultNamespace: keyVaultNamespace,
    kmsProviders: kmsProviders);
autoEncryptionOptions.SetKmsConnector(kmsConnector);

var clientSettings = MongoClientSettings.FromConnectionString("<connection string URI>");
clientSettings.AutoEncryptionOptions = autoEncryptionOptions;
var client = new MongoClient(clientSettings);
