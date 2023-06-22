using System.Security.Cryptography;
using System.Security.Cryptography.X509Certificates;
using MongoDB.Bson;
using MongoDB.Driver;
using MongoDB.Driver.Encryption;

namespace QueryableEncryption;

public static class QueryableEncryptionHelpers
{
    public static Dictionary<string, IReadOnlyDictionary<string, object>> GetKmsProviderCredentials(string kmsProvider,
        bool generateNewLocalKey)
    {
        if (kmsProvider == "aws")
        {
            // start-aws-kms-credentials
            var kmsProviderCredentials = new Dictionary<string, IReadOnlyDictionary<string, object>>();
            var awsKmsOptions = new Dictionary<string, object>
            {
                { "accessKeyId", Environment.GetEnvironmentVariable("AWS_ACCESS_KEY_ID")! }, // Your AWS access key ID
                { "secretAccessKey", Environment.GetEnvironmentVariable("AWS_SECRET_ACCESS_KEY")! } // Your AWS secret access key
            };
            kmsProviderCredentials.Add(kmsProvider, awsKmsOptions);
            // end-aws-kms-credentials
            return kmsProviderCredentials;
        }
        else if (kmsProvider == "azure")
        {
            // start-azure-kms-credentials
            var kmsProviderCredentials = new Dictionary<string, IReadOnlyDictionary<string, object>>();
            var azureKmsOptions = new Dictionary<string, object>
            {
                { "tenantId", Environment.GetEnvironmentVariable("AZURE_TENANT_ID")! }, // Your Azure tenant ID
                { "clientId", Environment.GetEnvironmentVariable("AZURE_CLIENT_ID")! }, // Your Azure client ID
                { "clientSecret", Environment.GetEnvironmentVariable("AZURE_CLIENT_SECRET")! } // Your Azure client secret
            };
            kmsProviderCredentials.Add(kmsProvider, azureKmsOptions);
            // end-azure-kms-credentials
            return kmsProviderCredentials;
        }
        else if (kmsProvider == "gcp")
        {
            // start-gcp-kms-credentials
            var kmsProviderCredentials = new Dictionary<string, IReadOnlyDictionary<string, object>>();
            var gcpKmsOptions = new Dictionary<string, object>
            {
                { "email", Environment.GetEnvironmentVariable("GCP_EMAIL")! }, // Your GCP email
                { "privateKey", Environment.GetEnvironmentVariable("GCP_PRIVATE_KEY")! } // Your GCP private key
            };
            kmsProviderCredentials.Add(kmsProvider, gcpKmsOptions);
            // end-gcp-kms-credentials
            return kmsProviderCredentials;
        }
        else if (kmsProvider == "kmip")
        {
            // start-kmip-kms-credentials
            var kmsProviderCredentials = new Dictionary<string, IReadOnlyDictionary<string, object>>();
            var kmipKmsOptions = new Dictionary<string, object>
            {
                { "endpoint", Environment.GetEnvironmentVariable("KMIP_KMS_ENDPOINT")! } // Your KMIP KMS endpoint
            };
            kmsProviderCredentials.Add(kmsProvider, kmipKmsOptions);
            // end-kmip-kms-credentials
            return kmsProviderCredentials;
        }
        else if (kmsProvider == "local")
        {
            if (generateNewLocalKey)
            {
                File.Delete("master-key.txt");

                // start-generate-local-key
                using var randomNumberGenerator = RandomNumberGenerator.Create();
                try
                {
                    var bytes = new byte[96];
                    randomNumberGenerator.GetBytes(bytes);
                    var localCustomerMasterKeyBase64Write = Convert.ToBase64String(bytes);
                    File.WriteAllText("master-key.txt", localCustomerMasterKeyBase64Write);
                }
                catch (Exception e)
                {
                    Console.WriteLine(e.Message);
                }
                // end-generate-local-key
            }

            // start-get-local-key
            // WARNING: Do not use a local key file in a production application
            var kmsProviderCredentials = new Dictionary<string, IReadOnlyDictionary<string, object>>();
            try
            {
                var localCustomerMasterKeyBase64Read = File.ReadAllText("master-key.txt");
                var localCustomerMasterKeyBytes = Convert.FromBase64String(localCustomerMasterKeyBase64Read);

                var localOptions = new Dictionary<string, object>
                {
                    { "key", localCustomerMasterKeyBytes }
                };

                kmsProviderCredentials.Add(kmsProvider, localOptions);
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
            }
            // end-get-local-key
            return kmsProviderCredentials;

        }

        throw new Exception("Invalid KMS provider string");
    }

    public static BsonDocument GetCustomerMasterKeyCredentials(string kmsProvider)
    {
        if (kmsProvider == "aws")
        {
            // start-aws-cmk-credentials
            var customerMasterKeyCredentials = new BsonDocument
            {
                { "key", Environment.GetEnvironmentVariable("AWS_KEY_ARN")}, // Your AWS Key ARN
                { "region", Environment.GetEnvironmentVariable("AWS_KEY_REGION") } // Your AWS Key Region
            };
            // end-aws-cmk-credentials
            return customerMasterKeyCredentials;
        }
        else if (kmsProvider == "azure")
        {
            // start-azure-cmk-credentials
            var customerMasterKeyCredentials = new BsonDocument
            {
                { "keyVaultEndpoint", Environment.GetEnvironmentVariable("AZURE_KEY_VAULT_ENDPOINT") }, // Your Azure Key Vault Endpoint
                { "keyName", Environment.GetEnvironmentVariable("AZURE_KEY_NAME") } // Your Azure Key Name
            };
            // end-azure-cmk-credentials
            return customerMasterKeyCredentials;
        }
        else if (kmsProvider == "gcp")
        {
            // start-gcp-cmk-credentials
            var customerMasterKeyCredentials = new BsonDocument
            {
                { "projectId", Environment.GetEnvironmentVariable("GCP_PROJECT_ID") }, // Your GCP Project ID
                { "location", Environment.GetEnvironmentVariable("GCP_LOCATION") }, // Your GCP Key Location
                { "keyRing", Environment.GetEnvironmentVariable("GCP_KEY_RING") }, // Your GCP Key Ring
                { "keyName", Environment.GetEnvironmentVariable("GCP_KEY_NAME")} // Your GCP Key Name
            };
            // end-gcp-cmk-credentials
            return customerMasterKeyCredentials;           
        }
        else if (kmsProvider == "kmip")
        {
            // start-kmip-local-cmk-credentials
            var customerMasterKeyCredentials = new BsonDocument();
            // end-kmip-local-cmk-credentials
            return customerMasterKeyCredentials;
        } else
        { 
            throw new Exception("Invalid KMS provider string");
        }
    }

    public static AutoEncryptionOptions GetAutoEncryptionOptions(CollectionNamespace keyVaultNamespace,
        IReadOnlyDictionary<string, IReadOnlyDictionary<string, object>> kmsProviderCredentials)
    {
        var kmsProvider = kmsProviderCredentials.Keys.First();

        if (kmsProvider == "kmip")
        {
            // start-kmip-encryption-options
            var extraOptions = new Dictionary<string, object>
            {
                { "cryptSharedLibPath", Environment.GetEnvironmentVariable(
                    "CRYPT_SHARED_LIB_PATH") } // Path to your Automatic Encryption Shared Library
            };

            var tlsOptions = GetKmipTlsOptions();

            var autoEncryptionOptions = new AutoEncryptionOptions(keyVaultNamespace,
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
                { "cryptSharedLibPath", Environment.GetEnvironmentVariable(
                    "CRYPT_SHARED_LIB_PATH") } // Path to your Automatic Encryption Shared Library
            };

            var autoEncryptionOptions = new AutoEncryptionOptions(keyVaultNamespace,
                kmsProviderCredentials,
                extraOptions: extraOptions);
            // end-auto-encryption-options

            return autoEncryptionOptions;
        }
    }

    public static ClientEncryption GetClientEncryption(IMongoClient keyVaultClient,
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

    private static Dictionary<string, SslSettings> GetKmipTlsOptions()
    {
        // start-tls-options
        var tlsOptions = new Dictionary<string, SslSettings>();
        var sslSettings = new SslSettings();
        var clientCertificate = new X509Certificate2(Environment.GetEnvironmentVariable("KMIP_TLS_CERT_P12")!); // Full path to your client certificate p12 file
        sslSettings.ClientCertificates = new[] { clientCertificate };
        tlsOptions.Add("kmip", sslSettings);
        // end-tls-options

        return tlsOptions;
    }
}
