namespace Tests.EfCore.QueryableEncryption;

using Examples.EfCore.QueryableEncryption;
using MongoDB.Bson;
using MongoDB.Driver;
using MongoDB.Driver.Encryption;
using Utilities.Comparison;

[TestFixture]
public class QueryableEncryptionTests
{
    private const string DbName = "hospitalDb";
    private const string KeyVaultDbName = "encryption";

    private MongoClient _client;
    private byte[] _localMasterKey;
    private Dictionary<string, IReadOnlyDictionary<string, object>> _kmsProviders;
    private CollectionNamespace _keyVaultNamespace;
    private Guid _ssnDataKeyId;
    private Guid _dobDataKeyId;
    private QueryableEncryptionExample _example;

    [OneTimeSetUp]
    public void OneTimeSetUp()
    {
        var cryptSharedLibPath =
            DotNetEnv.Env.GetString("CRYPT_SHARED_LIB_PATH", "");
        if (string.IsNullOrEmpty(cryptSharedLibPath))
        {
            Assert.Ignore(
                "CRYPT_SHARED_LIB_PATH is not set. Skipping Queryable " +
                "Encryption tests. To enable, install the Automatic " +
                "Encryption Shared Library and set CRYPT_SHARED_LIB_PATH " +
                "in code-example-tests/csharp/driver/.env.");
        }

        // Register the auto-encryption provider once for the process.
        MongoClientSettings.Extensions.AddAutoEncryption();

        var connectionString =
            DotNetEnv.Env.GetString("CONNECTION_STRING");
        _client = new MongoClient(connectionString);

        _client.DropDatabase(DbName);
        _client.DropDatabase(KeyVaultDbName);

        _localMasterKey = new byte[96];
        using var rng =
            System.Security.Cryptography.RandomNumberGenerator.Create();
        rng.GetBytes(_localMasterKey);

        _kmsProviders =
            new Dictionary<string, IReadOnlyDictionary<string, object>>
            {
                {
                    "local",
                    new Dictionary<string, object>
                    {
                        { "key", _localMasterKey }
                    }
                }
            };

        _keyVaultNamespace = CollectionNamespace.FromFullName(
            $"{KeyVaultDbName}.__keyVault");

        var clientEncryptionOptions = new ClientEncryptionOptions(
            _client,
            _keyVaultNamespace,
            _kmsProviders);

        using var clientEncryption =
            new ClientEncryption(clientEncryptionOptions);

        // Create the data keys once and keep them stable across tests.
        // Reusing the same key IDs (and key vault) avoids libmongocrypt's
        // cached collection schema referencing keys that a per-test
        // teardown would otherwise delete.
        _ssnDataKeyId = clientEncryption.CreateDataKey(
            "local",
            new DataKeyOptions(),
            CancellationToken.None);

        _dobDataKeyId = clientEncryption.CreateDataKey(
            "local",
            new DataKeyOptions(),
            CancellationToken.None);
    }

    [SetUp]
    public void SetUp()
    {
        // Drop only the data database between tests; keep the key vault so
        // the stable data keys persist.
        _client.DropDatabase(DbName);
        _example = new QueryableEncryptionExample();
    }

    [OneTimeTearDown]
    public void OneTimeTearDown()
    {
        if (_client == null) return;
        _client.DropDatabase(DbName);
        _client.DropDatabase(KeyVaultDbName);
        _client.Dispose();
    }

    [Test]
    [Description("Verifies that a patient can be inserted and queried " +
                 "using a range predicate on an encrypted field.")]
    public void TestInsertAndQuery()
    {
        var results = _example.InsertAndQuery(
            _kmsProviders,
            _keyVaultNamespace,
            _ssnDataKeyId,
            _dobDataKeyId);

        Expect.That(results.Count).ShouldMatch(1);
        Expect.That(results[0].Name).ShouldMatch("John Doe");
    }

    [Test]
    [Description("Verifies that server-side encrypted collections can be " +
                 "created from the context model schema.")]
    public void TestCreateEncryptedCollection()
    {
        _example.CreateEncryptedCollection(
            _kmsProviders,
            _keyVaultNamespace,
            _ssnDataKeyId,
            _dobDataKeyId);

        var patients = _client.GetDatabase(DbName)
            .ListCollections(new ListCollectionsOptions
            {
                Filter = Builders<BsonDocument>.Filter.Eq("name", "patients")
            })
            .ToList();

        var hasEncryptedFields = patients.Count == 1 &&
            patients[0].Contains("options") &&
            patients[0]["options"].AsBsonDocument.Contains("encryptedFields");

        Expect.That(hasEncryptedFields).ShouldMatch(true);
    }

    [Test]
    [Description("Verifies that a context configured with Ignore mode can " +
                 "query an encrypted collection using the server schema.")]
    public void TestQueryWithIgnoreMode()
    {
        _example.CreateEncryptedCollection(
            _kmsProviders,
            _keyVaultNamespace,
            _ssnDataKeyId,
            _dobDataKeyId);

        _example.InsertAndQuery(
            _kmsProviders,
            _keyVaultNamespace,
            _ssnDataKeyId,
            _dobDataKeyId);

        var results = _example.QueryWithIgnoreMode(
            _kmsProviders,
            _keyVaultNamespace,
            _ssnDataKeyId,
            _dobDataKeyId);

        Expect.That(results.Count).ShouldMatch(1);
        Expect.That(results[0].Name).ShouldMatch("John Doe");
    }

    [Test]
    [Description("Verifies that ConfigureEncryptionOptions returns options " +
                 "that can be used to create a working HospitalContext.")]
    public void TestConfigureEncryptionOptions()
    {
        var options = QueryableEncryptionSetup.ConfigureEncryptionOptions(
            _localMasterKey);

        using var context = new HospitalContext(
            options,
            _ssnDataKeyId,
            _dobDataKeyId);

        context.Patients.Add(new Patient
        {
            Name = "Jane Smith",
            SSN = "987-65-4321",
            DateOfBirth = new DateTime(1990, 3, 20)
        });
        context.SaveChanges();

        Expect.That(context.Patients.Count()).ShouldMatch(1);
    }
}
