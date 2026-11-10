// :replace-start: {
//   "terms": {
//     "DotNetEnv.Env.GetString(\"CONNECTION_STRING\")": "\"<connection string URI>\""
//   }
// }
namespace Examples.Encryption.KmsProxy;

using MongoDB.Driver;
using MongoDB.Driver.Encryption;

public class KmsProxyExample
{
    public (ClientEncryptionOptions, AutoEncryptionOptions) ConfigureKmsConnector(
        IMongoClient keyVaultClient,
        CollectionNamespace keyVaultNamespace,
        Dictionary<string, IReadOnlyDictionary<string, object>> kmsProviders)
    {
        // :snippet-start: set-kms-connector
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

        var clientSettings = MongoClientSettings.FromConnectionString(DotNetEnv.Env.GetString("CONNECTION_STRING"));
        clientSettings.AutoEncryptionOptions = autoEncryptionOptions;
        var client = new MongoClient(clientSettings);
        // :snippet-end:

        client.Dispose(); // :remove:
        return (clientEncryptionOptions, clientSettings.AutoEncryptionOptions); // :remove:
    }
}
// :replace-end:
