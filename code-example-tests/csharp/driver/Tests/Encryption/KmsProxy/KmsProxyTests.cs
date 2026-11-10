namespace Tests.Encryption.KmsProxy;

using System.Security.Cryptography;
using Examples.Encryption.KmsProxy;
using MongoDB.Driver;
using MongoDB.Driver.Encryption;
using Utilities.Comparison;

// These tests verify the KMS connector wiring only. The driver invokes the
// connector only when it sends a request to a remote KMS provider, which
// requires cloud KMS credentials and an HTTPS proxy that this suite does not
// provision, so no test exercises an actual tunneled request.
[TestFixture]
public class KmsProxyTests
{
    private MongoClient _client;
    private KmsProxyExample _example;

    [OneTimeSetUp]
    public void OneTimeSetUp()
    {
        MongoClientSettings.Extensions.AddAutoEncryption();
    }

    [SetUp]
    public void SetUp()
    {
        _client = new MongoClient(
            DotNetEnv.Env.GetString("CONNECTION_STRING"));
        _example = new KmsProxyExample();
    }

    [TearDown]
    public void TearDown()
    {
        _client.Dispose();
    }

    [Test]
    [Description("Verifies that SetKmsConnector() attaches the connector " +
                 "to both explicit and automatic encryption options.")]
    public void TestConfigureKmsConnector()
    {
        var (clientEncryptionOptions, autoEncryptionOptions) =
            _example.ConfigureKmsConnector(
                _client,
                CollectionNamespace.FromFullName("encryption.__keyVault"),
                LocalKmsProviders());

        Expect.That(clientEncryptionOptions.KmsConnector is HttpsProxyKmsConnector)
            .ShouldMatch(true);
        Expect.That(autoEncryptionOptions.KmsConnector is HttpsProxyKmsConnector)
            .ShouldMatch(true);
    }

    private static Dictionary<string, IReadOnlyDictionary<string, object>>
        LocalKmsProviders()
    {
        var masterKey = new byte[96];
        RandomNumberGenerator.Fill(masterKey);
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
}
