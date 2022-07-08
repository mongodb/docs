using System;
using System.IO;
using System.Collections.Generic;
using System.Threading;
using MongoDB.Driver;
using MongoDB.Bson;
using MongoDB.Driver.Encryption;

namespace QueryableEncryption
{
    internal static class MakeDataKey
    {
        public static void MakeKey()
        {
            // :state-start: local-reader local-test
            using (var randomNumberGenerator = System.Security.Cryptography.RandomNumberGenerator.Create())
            {
                var bytes = new byte[96];
                randomNumberGenerator.GetBytes(bytes);
                var localMasterKeyBase64Write = Convert.ToBase64String(bytes);
                Console.WriteLine(localMasterKeyBase64Write);
                File.WriteAllText("master-key.txt", localMasterKeyBase64Write);
            }
            // :state-end:

            // start-kmsproviders
            var kmsProviders = new Dictionary<string, IReadOnlyDictionary<string, object>>();
            // :state-start: local-reader local-test
            const string provider = "local";
            var localMasterKeyBase64Read = File.ReadAllText("master-key.txt");
            var localMasterKeyBytes = Convert.FromBase64String(localMasterKeyBase64Read);
            var localOptions = new Dictionary<string, object>
            {
                {"key", localMasterKeyBytes}
            };
            kmsProviders.Add(provider, localOptions);
            // :state-end:
            // :state-uncomment-start: aws-reader
            //const string provider = "aws";
            //var awsKmsOptions = new Dictionary<string, object>
            //{
            //    { "accessKeyId", "<Your AWS Access Key ID>" },
            //    { "secretAccessKey", "<Your AWS Secret Access Key>" }
            //};
            //kmsProviders.Add(provider, awsKmsOptions);
            // :state-uncomment-end:
            // :state-uncomment-start: aws-test
            //const string provider = "aws";
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
            //const string provider = "azure";
            //var azureKmsOptions = new Dictionary<string, object>
            //{
            //    { "tenantId", "<Your Azure Tenant ID>" },
            //    { "clientId", "<Your Azure Client ID>" },
            //    { "clientSecret", "<Your Azure Client Secret>" },
            //};
            //kmsProviders.Add(provider, azureKmsOptions);
            // :state-uncomment-end:
            // :state-uncomment-start: azure-test
            //const string provider = "azure";
            //var azureTenantId = Environment.GetEnvironmentVariable("AZURE_TENANT_ID");
            //var azureClientId = Environment.GetEnvironmentVariable("AZURE_CLIENT_ID");
            //var azureClientSecret = Environment.GetEnvironmentVariable("AZURE_CLIENT_SECRET");
            //var azureKmsOptions = new Dictionary<string, object>
            //{
            //    { "tenantId", azureTenantId },
            //    { "clientId", azureClientId },
            //    { "clientSecret", azureClientSecret },
            //};
            //kmsProviders.Add(provider, azureKmsOptions);
            // :state-uncomment-end:
            // :state-uncomment-start: gcp-reader
            //const string provider = "gcp";
            //var gcpKmsOptions = new Dictionary<string, object>
            //{
            //    { "privateKey", "<Your GCP Private Key>" },
            //    { "email", "<Your GCP Email>" },
            //};
            //kmsProviders.Add(provider, gcpKmsOptions);
            // :state-uncomment-end:
            // :state-uncomment-start: gcp-test
            //const string provider = "gcp";
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

            // :state-start: aws-reader aws-test gcp-reader gcp-test azure-reader azure-test
            // start-datakeyopts
            DataKeyOptions GetDataKeyOptions(List<string> altNames)
            {
                var dataKeyOptions = new DataKeyOptions(); // :remove:
                // :state-uncomment-start: aws-reader
                //var dataKeyOptions = new DataKeyOptions(
                //    alternateKeyNames: altNames,
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
                //    alternateKeyNames: altNames,
                //    masterKey: new BsonDocument
                //    {
                //        { "region", awsKeyRegion },
                //        { "key", awsKeyARN },
                //    });
                // :state-uncomment-end:
                // :state-uncomment-start: azure-reader
                //kmsProviders.Add(provider, azureKmsOptions);
                //var dataKeyOptions = new DataKeyOptions(
                //    alternateKeyNames: altNames,
                //    masterKey: new BsonDocument
                //    {
                //        { "keyName", "<Your Azure Key Name>" },
                //        { "keyVaultEndpoint", "<Your Azure Key Vault Endpoint>" },
                //    });
                // :state-uncomment-end:
                // :state-uncomment-start: azure-test
                //var azureKeyName = Environment.GetEnvironmentVariable("AZURE_KEY_NAME");
                //var azureKeyVaultEndpoint = Environment.GetEnvironmentVariable("AZURE_KEY_VAULT_ENDPOINT"); // typically <azureKeyName>.vault.azure.net
                //var dataKeyOptions = new DataKeyOptions(
                //    alternateKeyNames: altNames,
                //    masterKey: new BsonDocument
                //    {
                //        { "keyName", azureKeyName },
                //        { "keyVaultEndpoint", azureKeyVaultEndpoint },
                //    });
                // :state-uncomment-end:
                // :state-uncomment-start: gcp-reader
                //var dataKeyOptions = new DataKeyOptions(
                //    alternateKeyNames: altNames,
                //    masterKey: new BsonDocument
                //    {
                //        { "projectId", "<Your GCP Project ID>" },
                //        { "location", "<Your GCP Key Location>" } ,
                //        { "keyRing", "<Your GCP Key Ring>" },
                //        { "keyName", "<Your GCP Key Name>" },
                //    });
                // :state-uncomment-end:
                // :state-uncomment-start: gcp-test
                //var dataKeyOptions = new DataKeyOptions(
                //    alternateKeyNames: altNames,
                //    masterKey: new BsonDocument
                //    {
                //        { "projectId", gcpDataKeyProjectId },
                //        { "location", gcpDataKeyLocation } ,
                //        { "keyRing", gcpDataKeyKeyRing },
                //        { "keyName", gcpDataKeyKeyName },
                //    });
                // :state-uncomment-end:
                return dataKeyOptions;
            }
            // end-datakeyopts
            // :state-end:

            // start-create-index
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
            var indexOptions = new CreateIndexOptions<BsonDocument>
            {
                Unique = true,
                PartialFilterExpression = new BsonDocument
                    {{"keyAltNames", new BsonDocument {{"$exists", new BsonBoolean(true)}}}}
            };
            var builder = Builders<BsonDocument>.IndexKeys;
            var indexKeysDocument = builder.Ascending("keyAltNames");
            var indexModel = new CreateIndexModel<BsonDocument>(indexKeysDocument, indexOptions);
            var keyVaultDatabase = keyVaultClient.GetDatabase(keyVaultNamespace.DatabaseNamespace.DatabaseName);
            // Drop the Key Vault Collection in case you created this collection
            // in a previous run of this application.
            keyVaultDatabase.DropCollection(keyVaultNamespace.CollectionName);
            var keyVaultCollection = keyVaultDatabase.GetCollection<BsonDocument>(keyVaultNamespace.CollectionName);
            keyVaultCollection.Indexes.CreateOne(indexModel);
            // end-create-index

            // start-create-dek
            var clientEncryptionOptions = new ClientEncryptionOptions(
                keyVaultClient,
                keyVaultNamespace,
                kmsProviders);
            var clientEncryption = new ClientEncryption(clientEncryptionOptions);
            // :state-start: aws-test aws-reader azure-test azure-reader gcp-test gcp-reader
            // :uncomment-start:
            //var dataKeyOptions1 = GetDataKeyOptions(new List<string> { "dataKey1" });
            //var dataKeyOptions2 = GetDataKeyOptions(new List<string> { "dataKey2" });
            //var dataKeyOptions3 = GetDataKeyOptions(new List<string> { "dataKey3" });
            //var dataKeyOptions4 = GetDataKeyOptions(new List<string> { "dataKey4" });
            // :uncomment-end:
            // :state-end:
            // :state-start: local-test local-reader
            var dataKeyOptions1 = new DataKeyOptions(alternateKeyNames : new List<string> { "dataKey1" });
            var dataKeyOptions2 = new DataKeyOptions(alternateKeyNames : new List<string> { "dataKey2" });
            var dataKeyOptions3 = new DataKeyOptions(alternateKeyNames : new List<string> { "dataKey3" });
            var dataKeyOptions4 = new DataKeyOptions(alternateKeyNames : new List<string> { "dataKey4" });
            // :state-end:

            
            BsonBinaryData CreateKeyGetID(DataKeyOptions options){
                var dateKeyGuid = clientEncryption.CreateDataKey(provider, options, CancellationToken.None);
                return new BsonBinaryData(dateKeyGuid, GuidRepresentation.Standard);
            }

            var dataKeyId1 = CreateKeyGetID(dataKeyOptions1);
            var dataKeyId2 = CreateKeyGetID(dataKeyOptions2);
            var dataKeyId3 = CreateKeyGetID(dataKeyOptions3);
            var dataKeyId4 = CreateKeyGetID(dataKeyOptions4);
            // end-create-dek

            // start-create-enc-collection
            var encryptedCollectionNamespace = CollectionNamespace.FromFullName("medicalRecords.patients");
            var encryptedFieldsMap = new Dictionary<string, BsonDocument>
            {
                {
                    encryptedCollectionNamespace.FullName, new BsonDocument
                    {
                        {
                            "fields", new BsonArray
                            {
                                new BsonDocument
                                {
                                    {"keyId", dataKeyId1},
                                    {"path", new BsonString("patientId")},
                                    {"bsonType", new BsonString("int")},
                                    {
                                        "queries", new BsonDocument
                                        {
                                            {"queryType", new BsonString("equality")}
                                        }
                                    }
                                },
                                new BsonDocument
                                {
                                    {"keyId", dataKeyId2},
                                    {"path", new BsonString("medications")},
                                    {"bsonType", new BsonString("array")},
                                },
                                new BsonDocument
                                {
                                    {"keyId", dataKeyId3},
                                    {"path", new BsonString("patientRecord.ssn")},
                                    {"bsonType", new BsonString("string")},
                                    {
                                        "queries", new BsonDocument
                                        {
                                            {"queryType", new BsonString("equality")}
                                        }
                                    }
                                },
                                new BsonDocument
                                {
                                    {"keyId", dataKeyId4},
                                    {"path", new BsonString("patientRecord.billing")},
                                    {"bsonType", new BsonString("object")},
                                },
                            }
                        }
                    }
                }
            };

            // :state-start: aws-reader azure-reader local-reader gcp-reader
            // :uncomment-start:
            //var extraOptions = new Dictionary<string, object>()
            //{
            //    { "cryptSharedLibPath", "<path to crypt_shared library>" },
            //};
            // :uncomment-end:
            // :state-end:
            // :state-start: aws-test azure-test local-test gcp-test
            var extraOptions = new Dictionary<string, object>()
            {
                {"cryptSharedLibPath", Environment.GetEnvironmentVariable("SHARED_LIB_PATH")},
            };
            // :state-end:

            var autoEncryptionOptions = new AutoEncryptionOptions(
                keyVaultNamespace,
                kmsProviders,
                encryptedFieldsMap: encryptedFieldsMap,
                extraOptions: extraOptions);

            var clientSettings = MongoClientSettings.FromConnectionString(connectionString);
            clientSettings.AutoEncryptionOptions = autoEncryptionOptions;
            var secureClient = new MongoClient(clientSettings);
            var encryptedDatabase = secureClient.GetDatabase(encryptedCollectionNamespace.DatabaseNamespace.DatabaseName);
            // Drop the encrypted collection in case you created this collection
            // in a previous run of this application.
            encryptedDatabase.DropCollection(encryptedCollectionNamespace.CollectionName);
            encryptedDatabase.CreateCollection(encryptedCollectionNamespace.CollectionName);
            Console.WriteLine("Created encrypted collection!");
            // end-create-enc-collection
        }
    }
}
