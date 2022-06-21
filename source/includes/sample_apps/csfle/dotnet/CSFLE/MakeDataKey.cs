using System;
using System.IO;
using System.Collections.Generic;
using System.Threading;
using MongoDB.Driver;
using MongoDB.Bson;
using MongoDB.Driver.Encryption;

namespace Key
{

    class MakeDataKey
    {
        public static void MakeKey()
        {

            // :state-start: local-reader local-test
            var localMasterKeyPath = "master-key.txt";
            using (var randomNumberGenerator = System.Security.Cryptography.RandomNumberGenerator.Create())
            {
                var bytes = new byte[96];
                randomNumberGenerator.GetBytes(bytes);
                var localMasterKeyBase64Write = Convert.ToBase64String(bytes);
                Console.WriteLine(localMasterKeyBase64Write);
                File.WriteAllText(localMasterKeyPath, localMasterKeyBase64Write);
            }
            // :state-end:

            // start-kmsproviders
            var kmsProviders = new Dictionary<string, IReadOnlyDictionary<string, object>>();
            // :state-start: local-reader local-test
            var provider = "local";
            string localMasterKeyBase64Read = File.ReadAllText(localMasterKeyPath);
            var localMasterKeyBytes = Convert.FromBase64String(localMasterKeyBase64Read);
            var localOptions = new Dictionary<string, object>
            {
                { "key", localMasterKeyBytes }
            };
            kmsProviders.Add("local", localOptions);
            // :state-end:
            // :state-uncomment-start: aws-reader
            //var provider = "aws";
            //var awsKmsOptions = new Dictionary<string, object>
            //{
            //    { "accessKeyId", "<Your AWS Access Key ID>" },
            //    { "secretAccessKey", "<Your AWS Secret Access Key>" }
            //};
            //kmsProviders.Add(provider, awsKmsOptions);
            // :state-uncomment-end:
            // :state-uncomment-start: aws-test
            //var provider = "aws"; 
            //var awsAccessKey = Environment.GetEnvironmentVariable("AWS_ACCESS_KEY_ID");
            //var awsSecretAccessKey = Environment.GetEnvironmentVariable("AWS_SECRET_ACCESS_KEY");
            //var awsKmsOptions = new Dictionary<string, object>
            //{
            //    { "accessKeyId", awsAccessKey },
            //    { "secretAccessKey", awsSecretAccessKey }
            //};
            //kmsProviders.Add(provider, awsKmsOptions);
            // :state-uncomment-end:
            // :state-uncomment-start: azure-reader
            //var provider = "azure"; 
            //var azureKmsOptions = new Dictionary<string, object>
            //{
            //    { "tenantId", "<Your Azure Tenant ID>" },
            //    { "clientId", "<Your Azure Client ID>" },
            //    { "clientSecret", "<Your Azure Client Secret>" },
            //};
            // :state-uncomment-end:
            // :state-uncomment-start: azure-test
            //var provider = "azure"; 
            //var azureTenantId = Environment.GetEnvironmentVariable("AZURE_TENANT_ID");
            //var azureClientId = Environment.GetEnvironmentVariable("AZURE_CLIENT_ID");
            //var azureClientSecret = Environment.GetEnvironmentVariable("AZURE_CLIENT_SECRET");
            //var azureKmsOptions = new Dictionary<string, object>
            //{
            //    { "tenantId", azureTenantId },
            //    { "clientId", azureClientId },
            //    { "clientSecret", azureClientSecret },
            //};
            //kmsProviders.Add("azure", azureKmsOptions);
            // :state-uncomment-end:
            // :state-uncomment-start: gcp-reader
            //var provider = "gcp";
            //var gcpKmsOptions = new Dictionary<string, object>
            //{
            //    { "privateKey", "<Your GCP Private Key>" },
            //    { "email", "<Your GCP Email>" },
            //};
            //kmsProviders.Add(provider, gcpKmsOptions);
            // :state-uncomment-end:
            // :state-uncomment-start: gcp-test
            //var provider = "gcp";
            //var gcpPrivateKey = Environment.GetEnvironmentVariable("GCP_PRIVATE_KEY");
            //var gcpEmail = Environment.GetEnvironmentVariable("GCP_EMAIL");
            //var gcpKmsOptions = new Dictionary<string, object>
            //{
            //    { "privateKey", gcpPrivateKey },
            //    { "email", gcpEmail },
            //};
            //kmsProviders.Add(provider, gcpKmsOptions);
            //
            //var gcpDataKeyProjectId = Environment.GetEnvironmentVariable("GCP_PROJECT_ID");
            //var gcpDataKeyLocation = Environment.GetEnvironmentVariable("GCP_LOCATION");
            //var gcpDataKeyKeyRing = Environment.GetEnvironmentVariable("GCP_KEY_RING");
            //var gcpDataKeyKeyName = Environment.GetEnvironmentVariable("GCP_KEY_NAME");
            // :state-uncomment-end:
            // end-kmsproviders

            // start-datakeyopts
            // :state-start: local-reader local-test
            // :state-end:
            // :state-uncomment-start: aws-reader
            //var dataKeyOptions = new DataKeyOptions(
            //    masterKey: new BsonDocument
            //    {
            //        { "region", "<Your AWS Key Region>" },
            //        { "key", "<Your AWS Key ARN>" },
            //    });
            // :state-uncomment-end:
            // :state-uncomment-start: aws-test
            //var awsKeyARN = Environment.GetEnvironmentVariable("AWS_KEY_ARN"); // e.g. "arn:aws:kms:us-east-2:111122223333:alias/test-key"
            //var awsKeyRegion = Environment.GetEnvironmentVariable("AWS_KEY_REGION");
            //var dataKeyOptions = new DataKeyOptions(
            //    masterKey: new BsonDocument
            //    {
            //        { "region", awsKeyRegion },
            //        { "key", awsKeyARN },
            //    });
            // :state-uncomment-end:
            // :state-uncomment-start: azure-reader
            //kmsProviders.Add(provider, azureKmsOptions);
            //var dataKeyOptions = new DataKeyOptions(
            //masterKey: new BsonDocument
            //{
            //    { "keyName", "<Your Azure Key Name>" },
            //    { "keyVaultEndpoint", "<Your Azure Key Vault Endpoint>" },
            //});
            // :state-uncomment-end:
            // :state-uncomment-start: azure-test
            //var azureKeyName = Environment.GetEnvironmentVariable("AZURE_KEY_NAME");
            //var azureKeyVaultEndpoint = Environment.GetEnvironmentVariable("AZURE_KEY_VAULT_ENDPOINT"); // typically <azureKeyName>.vault.azure.net
            //var dataKeyOptions = new DataKeyOptions(
            //    masterKey: new BsonDocument
            //    {
            //        { "keyName", azureKeyName },
            //        { "keyVaultEndpoint", azureKeyVaultEndpoint },
            //    });
            // :state-uncomment-end:
            // :state-uncomment-start: gcp-reader
            //var dataKeyOptions = new DataKeyOptions(
            //    masterKey: new BsonDocument
            //    {
            //        { "projectId", "Your GCP Project ID" },
            //        { "location", "Your GCP Key Location" } ,
            //        { "keyRing", "<Your GCP Key Ring>" },
            //        { "keyName", "<Your GCP Key Name>" },
            //    });
            // :state-uncomment-end:
            // :state-uncomment-start: gcp-test
            //var dataKeyOptions = new DataKeyOptions(
            //    masterKey: new BsonDocument
            //    {
            //        { "projectId", gcpDataKeyProjectId },
            //        { "location", gcpDataKeyLocation } ,
            //        { "keyRing", gcpDataKeyKeyRing },
            //        { "keyName", gcpDataKeyKeyName },
            //    });
            // :state-uncomment-end:
            // end-datakeyopts

            // :state-start: local-reader azure-reader aws-reader gcp-reader
            // :uncomment-start:
            //var connectionString = "<Your MongoDB URI>";
            // :uncomment-end:
            // :state-end:
            // :state-start: local-test azure-test aws-test gcp-test
            var connectionString = Environment.GetEnvironmentVariable("MONGODB_URI");
            // :state-end:
            // start-create-dek
            var keyVaultNamespace = CollectionNamespace.FromFullName("encryption.__keyVault");
            var keyVaultClient = new MongoClient(connectionString);
            var clientEncryptionOptions = new ClientEncryptionOptions(
                keyVaultClient: keyVaultClient,
                keyVaultNamespace: keyVaultNamespace,
                kmsProviders: kmsProviders);
            var clientEncryption = new ClientEncryption(clientEncryptionOptions);
            // :state-start: local-test local-reader
            var dataKeyOptions = new DataKeyOptions();
            // :state-end:
            // :state-start: local-test azure-test gcp-test aws-test
            List<string> keyNames = new List<string>();
            keyNames.Add("demo-data-key");
            var dataKeyId = clientEncryption.CreateDataKey(provider, dataKeyOptions.With(keyNames), CancellationToken.None);
            // :state-end:
            // :state-start: local-reader aws-reader azure-reader gcp-reader
            // :uncomment-start:
            //var dataKeyId = clientEncryption.CreateDataKey(provider, dataKeyOptions, CancellationToken.None);
            // :uncomment-end:
            // :state-end:
            var dataKeyIdBase64 = Convert.ToBase64String(GuidConverter.ToBytes(dataKeyId, GuidRepresentation.Standard));
            Console.WriteLine($"DataKeyId [base64]: {dataKeyIdBase64}");
            // end-create-dek
        }
    }
}
