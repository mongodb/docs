namespace Tests.Encryption.RewrapManyDataKey;

using System.Security.Cryptography;
using Examples.Encryption.RewrapManyDataKey;
using MongoDB.Bson;
using MongoDB.Driver;
using MongoDB.Driver.Encryption;
using Utilities.Comparison;

[TestFixture]
public class RewrapManyDataKeyTests
{
    private const string KeyVaultDbName = "encryption";
    private const string KeyVaultCollectionName = "__keyVault";
    private const string DataKeyAltName = "my-key";

    private MongoClient _client;
    private CollectionNamespace _keyVaultNamespace;
    private IMongoCollection<BsonDocument> _keyVault;
    private byte[] _masterKey;
    private RewrapManyDataKeyExample _example;

    [OneTimeSetUp]
    public void OneTimeSetUp()
    {
        var cryptSharedLibPath =
            DotNetEnv.Env.GetString("CRYPT_SHARED_LIB_PATH", "");
        if (string.IsNullOrEmpty(cryptSharedLibPath))
        {
            Assert.Ignore(
                "CRYPT_SHARED_LIB_PATH is not set. Skipping rewrapManyDataKey " +
                "tests. To enable, install the Automatic Encryption Shared " +
                "Library and set CRYPT_SHARED_LIB_PATH in " +
                "code-example-tests/csharp/driver/.env.");
        }

        MongoClientSettings.Extensions.AddAutoEncryption();

        _client = new MongoClient(
            DotNetEnv.Env.GetString("CONNECTION_STRING"));
        _keyVaultNamespace = CollectionNamespace.FromFullName(
            $"{KeyVaultDbName}.{KeyVaultCollectionName}");

        _masterKey = GenerateMasterKey();
    }

    [SetUp]
    public void SetUp()
    {
        _client.DropDatabase(KeyVaultDbName);
        _keyVault = _client.GetDatabase(KeyVaultDbName)
            .GetCollection<BsonDocument>(KeyVaultCollectionName);
        _example = new RewrapManyDataKeyExample();
    }

    [OneTimeTearDown]
    public void OneTimeTearDown()
    {
        if (_client == null)
        {
            return;
        }

        _client.DropDatabase(KeyVaultDbName);
        _client.Dispose();
    }

    [Test]
    [Description("Verifies that rewrapping a DEK re-encrypts its key " +
                 "material while preserving its key ID.")]
    public void TestRewrapKeys()
    {
        CreateDataKey(LocalKmsProviders(_masterKey));
        var originalDataKey = GetDataKey();

        var result = _example.RewrapKeys(
            LocalKmsProviders(_masterKey), _keyVaultNamespace);

        var rewrappedDataKey = GetDataKey();

        Expect.That((int)result.BulkWriteResult.MatchedCount).ShouldMatch(1);
        Expect.That(
                rewrappedDataKey["_id"].AsBsonBinaryData.Bytes)
            .ShouldMatch(originalDataKey["_id"].AsBsonBinaryData.Bytes);
        Expect.That(
                rewrappedDataKey["keyMaterial"] !=
                originalDataKey["keyMaterial"])
            .ShouldMatch(true);
    }

    private static byte[] GenerateMasterKey()
    {
        var masterKey = new byte[96];
        using var rng = RandomNumberGenerator.Create();
        rng.GetBytes(masterKey);
        return masterKey;
    }

    private static Dictionary<string, IReadOnlyDictionary<string, object>>
        LocalKmsProviders(byte[] masterKey)
    {
        return new Dictionary<string, IReadOnlyDictionary<string, object>>
        {
            {
                "local",
                new Dictionary<string, object>
                {
                    { "key", masterKey }
                }
            }
        };
    }

    private void CreateDataKey(
        Dictionary<string, IReadOnlyDictionary<string, object>> kmsProviders)
    {
        var clientEncryptionOptions = new ClientEncryptionOptions(
            _client, _keyVaultNamespace, kmsProviders);
        using var clientEncryption =
            new ClientEncryption(clientEncryptionOptions);

        var dataKeyOptions = new DataKeyOptions(
            alternateKeyNames: new[] { DataKeyAltName });

        clientEncryption.CreateDataKey(
            "local", dataKeyOptions, CancellationToken.None);
    }

    private BsonDocument GetDataKey()
    {
        return _keyVault
            .Find(Builders<BsonDocument>.Filter.Eq(
                "keyAltNames", DataKeyAltName))
            .First();
    }
}
