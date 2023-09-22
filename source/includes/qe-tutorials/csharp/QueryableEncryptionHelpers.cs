using System.Security.Cryptography;
using System.Security.Cryptography.X509Certificates;
using Microsoft.Extensions.Configuration;
using MongoDB.Bson;
using MongoDB.Driver;
using MongoDB.Driver.Encryption;

namespace QueryableEncryption;

public class QueryableEncryptionHelpers
{
    private readonly IConfigurationRoot _appSettings;
    public QueryableEncryptionHelpers(IConfigurationRoot appSettings)
    {
        _appSettings = appSettings;
    }

    public Dictionary<string, IReadOnlyDictionary<string, object>> GetKmsProviderCredentials(string kmsProvider,
        bool generateNewLocalKey)
    {
        if (kmsProvider == "aws")
        {
            // start-aws-kms-credentials
            var kmsProviderCredentials = new Dictionary<string, IReadOnlyDictionary<string, object>>();
            var kmsOptions = new Dictionary<string, object>
            {
                { "accessKeyId", _appSettings["Aws:AccessKeyId"] }, // Your AWS access key ID
                { "secretAccessKey", _appSettings["Aws:SecretAccessKey"] } // Your AWS secret access key
            };
            kmsProviderCredentials.Add(kmsProvider, kmsOptions);
            // end-aws-kms-credentials
            return kmsProviderCredentials;
        }
        else if (kmsProvider == "azure")
        {
            // start-azure-kms-credentials
            var kmsProviderCredentials = new Dictionary<string, IReadOnlyDictionary<string, object>>();
            var kmsOptions = new Dictionary<string, object>
            {
                { "tenantId", _appSettings["Azure:TenantId"] }, // Your Azure tenant ID
                { "clientId", _appSettings["Azure:ClientId"] }, // Your Azure client ID
                { "clientSecret", _appSettings["Azure:ClientSecret"] } // Your Azure client secret
            };
            kmsProviderCredentials.Add(kmsProvider, kmsOptions);
            // end-azure-kms-credentials
            return kmsProviderCredentials;
        }
        else if (kmsProvider == "gcp")
        {
            // start-gcp-kms-credentials
            var kmsProviderCredentials = new Dictionary<string, IReadOnlyDictionary<string, object>>();
            var kmsOptions = new Dictionary<string, object>
            {
                { "email", _appSettings["Gcp:Email"] }, // Your GCP email
                { "privateKey", _appSettings["Gcp:PrivateKey"] } // Your GCP private key
            };
            kmsProviderCredentials.Add(kmsProvider, kmsOptions);
            // end-gcp-kms-credentials
            return kmsProviderCredentials;
        }
        else if (kmsProvider == "kmip")
        {
            // start-kmip-kms-credentials
            var kmsProviderCredentials = new Dictionary<string, IReadOnlyDictionary<string, object>>();
            var kmsOptions = new Dictionary<string, object>
            {
                { "endpoint", _appSettings["Kmip:KmsEndpoint"] } // Your KMIP KMS endpoint
            };
            kmsProviderCredentials.Add(kmsProvider, kmsOptions);
            // end-kmip-kms-credentials
            return kmsProviderCredentials;
        }
        else if (kmsProvider == "local")
        {
            if (generateNewLocalKey)
            {
                File.Delete("customer-master-key.txt");

                // start-generate-local-key
                using var randomNumberGenerator = RandomNumberGenerator.Create();
                try
                {
                    var bytes = new byte[96];
                    randomNumberGenerator.GetBytes(bytes);
                    var localCustomerMasterKeyBase64 = Convert.ToBase64String(bytes);
                    File.WriteAllText("customer-master-key.txt", localCustomerMasterKeyBase64);
                }
                catch (Exception e)
                {
                    throw new Exception("Unable to write Customer Master Key file due to the following error: " + e.Message);
                }
                // end-generate-local-key
            }

            // start-get-local-key
            // WARNING: Do not use a local key file in a production application
            var kmsProviderCredentials = new Dictionary<string, IReadOnlyDictionary<string, object>>();
            try
            {
                var localCustomerMasterKeyBase64 = File.ReadAllText("customer-master-key.txt");
                var localCustomerMasterKeyBytes = Convert.FromBase64String(localCustomerMasterKeyBase64);

                var localOptions = new Dictionary<string, object>
                {
                    { "key", localCustomerMasterKeyBytes }
                };

                kmsProviderCredentials.Add(kmsProvider, localOptions);
            }
            // end-get-local-key
            catch (Exception e)
            {
                throw new Exception("Unable to read the Customer Master Key due to the following error: " + e.Message);
            }
            return kmsProviderCredentials;

        }

        throw new Exception("Unrecognized value for KMS provider name \"" + kmsProvider + "\"  encountered while retrieving KMS credentials.");
    }

    public BsonDocument GetCustomerMasterKeyCredentials(string kmsProvider)
    {
        if (kmsProvider == "aws")
        {
            // start-aws-cmk-credentials
            var customerMasterKeyCredentials = new BsonDocument
            {
                { "key", _appSettings["Aws:KeyArn"] }, // Your AWS Key ARN
                { "region", _appSettings["Aws:KeyRegion"] } // Your AWS Key Region
            };
            // end-aws-cmk-credentials
            return customerMasterKeyCredentials;
        }
        else if (kmsProvider == "azure")
        {
            // start-azure-cmk-credentials
            var customerMasterKeyCredentials = new BsonDocument
            {
                { "keyVaultEndpoint", _appSettings["Azure:KeyVaultEndpoint"] }, // Your Azure Key Vault Endpoint
                { "keyName", _appSettings["Azure:KeyName"] } // Your Azure Key Name
            };
            // end-azure-cmk-credentials
            return customerMasterKeyCredentials;
        }
        else if (kmsProvider == "gcp")
        {
            // start-gcp-cmk-credentials
            var customerMasterKeyCredentials = new BsonDocument
            {
                { "projectId", _appSettings["Gcp:ProjectId"] }, // Your GCP Project ID
                { "location", _appSettings["Gcp:Location"] }, // Your GCP Key Location
                { "keyRing", _appSettings["Gcp:KeyRing"] }, // Your GCP Key Ring
                { "keyName", _appSettings["Gcp:KeyName"] } // Your GCP Key Name
            };
            // end-gcp-cmk-credentials
            return customerMasterKeyCredentials;
        }
        else if (kmsProvider == "kmip" || kmsProvider == "local")
        {
            // start-kmip-local-cmk-credentials
            var customerMasterKeyCredentials = new BsonDocument();
            // end-kmip-local-cmk-credentials
            return customerMasterKeyCredentials;
        }
        else
        {
            throw new Exception("Unrecognized value for KMS provider name \"" + kmsProvider + "\"  encountered while retrieving Customer Master Key credentials.");
        }
    }

    public AutoEncryptionOptions GetAutoEncryptionOptions(CollectionNamespace keyVaultNamespace,
        IReadOnlyDictionary<string, IReadOnlyDictionary<string, object>> kmsProviderCredentials)
    {
        var kmsProvider = kmsProviderCredentials.Keys.First();

        if (kmsProvider == "kmip")
        {
            var tlsOptions = GetKmipTlsOptions();

            // start-kmip-encryption-options
            var extraOptions = new Dictionary<string, object>
            {
                { "cryptSharedLibPath", _appSettings["CryptSharedLibPath"] } // Path to your Automatic Encryption Shared Library
            };

            var autoEncryptionOptions = new AutoEncryptionOptions(
                keyVaultNamespace,
                kmsProviderCredentials,
                extraOptions: extraOptions,
                tlsOptions: tlsOptions);
            // end-kmip-encryption-options
            return autoEncryptionOptions;
        }
        else
        {
            // start-auto-encryption-options
            var extraOptions = new Dictionary<string, object>
            {
                { "cryptSharedLibPath", _appSettings["CryptSharedLibPath"] } // Path to your Automatic Encryption Shared Library
            };

            var autoEncryptionOptions = new AutoEncryptionOptions(
                keyVaultNamespace,
                kmsProviderCredentials,
                extraOptions: extraOptions);
            // end-auto-encryption-options

            return autoEncryptionOptions;
        }
    }

    public ClientEncryption GetClientEncryption(IMongoClient keyVaultClient,
        CollectionNamespace keyVaultNamespace, Dictionary<string, IReadOnlyDictionary<string, object>> kmsProviderCredentials)
    {
        var kmsProvider = kmsProviderCredentials.Keys.First();

        // include tls options for kmip
        if (kmsProvider == "kmip")
        {
            var tlsOptions = GetKmipTlsOptions();

            // start-kmip-client-encryption
            var clientEncryptionOptions = new ClientEncryptionOptions(
                keyVaultClient: keyVaultClient,
                keyVaultNamespace: keyVaultNamespace,
                kmsProviders: kmsProviderCredentials,
                tlsOptions: tlsOptions
            );

            var clientEncryption = new ClientEncryption(clientEncryptionOptions);
            // end-kmip-client-encryption
            return clientEncryption;
        }
        else
        {
            // start-client-encryption
            var clientEncryptionOptions = new ClientEncryptionOptions(
                keyVaultClient: keyVaultClient,
                keyVaultNamespace: keyVaultNamespace,
                kmsProviders: kmsProviderCredentials
            );
            var clientEncryption = new ClientEncryption(clientEncryptionOptions);
            // end-client-encryption
            return clientEncryption;
        }
    }

    private Dictionary<string, SslSettings> GetKmipTlsOptions()
    {
        // start-tls-options
        var tlsOptions = new Dictionary<string, SslSettings>();
        var sslSettings = new SslSettings();
        var clientCertificate = new X509Certificate2(_appSettings["Kmip:TlsCertP12"]!); // Full path to your client certificate p12 file
        sslSettings.ClientCertificates = new[] { clientCertificate };
        tlsOptions.Add("kmip", sslSettings);
        // end-tls-options

        return tlsOptions;
    }
}
