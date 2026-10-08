// :replace-start: {
//   "terms": {
//     "DotNetEnv.Env.GetString(\"CONNECTION_STRING\")": "\"<connection string URI>\"",
//     "\"keyAltNames\", \"my-key\"": "\"<filter field>\", \"<filter value>\"",
//     "provider: \"local\"": "provider: \"<KMS provider>\"",
//     "masterKey: new BsonDocument()": "masterKey: new BsonDocument\n    {\n        { \"<dataKeyOpts Key>\", \"<dataKeyOpts Value>\" }\n    }"
//   }
// }
namespace Examples.Encryption.RewrapManyDataKey;

using DotNetEnv;
using MongoDB.Bson;
using MongoDB.Driver;
using MongoDB.Driver.Encryption;

public class RewrapManyDataKeyExample
{
    public RewrapManyDataKeyResult RewrapKeys(
        Dictionary<string, IReadOnlyDictionary<string, object>> kmsProviders,
        CollectionNamespace keyVaultNamespace)
    {
        // :snippet-start: rewrap-data-key
        var keyVaultClient = new MongoClient(
            DotNetEnv.Env.GetString("CONNECTION_STRING"));

        var clientEncryptionOptions = new ClientEncryptionOptions(
            keyVaultClient: keyVaultClient,
            keyVaultNamespace: keyVaultNamespace,
            kmsProviders: kmsProviders);

        using var clientEncryption =
            new ClientEncryption(clientEncryptionOptions);

        var filter = Builders<BsonDocument>.Filter.Eq(
            "keyAltNames", "my-key");

        var rewrapManyDataKeyOptions = new RewrapManyDataKeyOptions(
            provider: "local",
            masterKey: new BsonDocument());

        var result = clientEncryption.RewrapManyDataKey(
            filter, rewrapManyDataKeyOptions, CancellationToken.None);
        // :snippet-end:

        return result;
    }
}
// :replace-end:
