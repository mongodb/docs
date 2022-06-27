using System;
// :state-start: local-test local-reader
using System.IO;
// :state-end:
using System.Collections.Generic;
using MongoDB.Driver;
using MongoDB.Bson;
using MongoDB.Driver.Encryption;

namespace Insert
{

    class InsertEncryptedDocument
    {

        public static void Insert()
        {
            // :state-start: local-reader azure-reader aws-reader gcp-reader
            // :uncomment-start:
            //var connectionString = "<Your MongoDB URI>";
            // :uncomment-end:
            // :state-end:
            // :state-start: local-test azure-test aws-test gcp-test
            var connectionString = Environment.GetEnvironmentVariable("MONGODB_URI");
            // :state-end:
            // start-key-vault
            var keyVaultNamespace = CollectionNamespace.FromFullName("encryption.__keyVault");
            // end-key-vault

            // start-kmsproviders
            var kmsProviders = new Dictionary<string, IReadOnlyDictionary<string, object>>();
            // :state-start: local-reader local-test
            var provider = "local";
            var localMasterKeyPath = "master-key.txt";
            string localMasterKeyBase64Read = File.ReadAllText(localMasterKeyPath);
            var localMasterKeyBytes = Convert.FromBase64String(localMasterKeyBase64Read);
            var localOptions = new Dictionary<string, object>
            {
                { "key", localMasterKeyBytes }
            };
            kmsProviders.Add(provider, localOptions);
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
            //kmsProviders.Add(provider, azureKmsOptions);
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
            //kmsProviders.Add(provider, azureKmsOptions);
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
            // :state-uncomment-end:
            // end-kmsproviders


            // start-schema
            var regularClientSettings = MongoClientSettings.FromConnectionString(connectionString);
            var regularClient = new MongoClient(regularClientSettings);
            var keyVaultCollection = regularClient.GetDatabase(keyVaultNamespace.DatabaseNamespace.ToString()).GetCollection<BsonDocument>(keyVaultNamespace.CollectionName.ToString());

            Func<string, FilterDefinition<BsonDocument>> getFilter = altName => Builders<BsonDocument>.Filter.Eq<BsonString>("keyAltNames", altName);
            var dataKeyId1 = keyVaultCollection.Find<BsonDocument>(getFilter("dataKey1")).First<BsonDocument>().GetValue("_id"); 
            var dataKeyId2 = keyVaultCollection.Find<BsonDocument>(getFilter("dataKey2")).First<BsonDocument>().GetValue("_id"); 
            var dataKeyId3 = keyVaultCollection.Find<BsonDocument>(getFilter("dataKey3")).First<BsonDocument>().GetValue("_id"); 
            var dataKeyId4 = keyVaultCollection.Find<BsonDocument>(getFilter("dataKey4")).First<BsonDocument>().GetValue("_id"); 


            var encryptedDatabaseNamespace = CollectionNamespace.FromFullName("medicalRecords.patients");
            var encryptedFieldsMap = new Dictionary<string, BsonDocument> {
            { encryptedDatabaseNamespace.FullName, new BsonDocument{ 
                    { "fields", new BsonArray{
                            new BsonDocument {
                                { "keyId", dataKeyId1 },
                                { "path", new BsonString("patientId")},
                                {"bsonType", new BsonString("int")},
                                {"queries", new BsonDocument{
                                    {"queryType", new BsonString("equality")}
                                }}
                            },
                            new BsonDocument {
                                { "keyId", dataKeyId2 },
                                { "path", new BsonString("medications")},
                                {"bsonType", new BsonString("array")},
                            },
                            new BsonDocument {
                                { "keyId", dataKeyId3 },
                                { "path", new BsonString("patientRecord.ssn")},
                                {"bsonType", new BsonString("string")},
                                {"queries", new BsonDocument{
                                    {"queryType", new BsonString("equality")}
                                }}
                            },
                            new BsonDocument {
                                { "keyId", dataKeyId4 },
                                { "path", new BsonString("patienRecord.billing")},
                                {"bsonType", new BsonString("object")},
                            },
                        }
                    }      
                }
                }
            };
            // end-schema

            // start-extra-options
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
                { "cryptSharedLibPath", Environment.GetEnvironmentVariable("SHARED_LIB_PATH")},
            };
            // :state-end:
            // end-extra-options

            // start-client
            var clientSettings = MongoClientSettings.FromConnectionString(connectionString);
            var autoEncryptionOptions = new AutoEncryptionOptions(
                keyVaultNamespace: keyVaultNamespace,
                kmsProviders: kmsProviders,
                encryptedFieldsMap: encryptedFieldsMap,
                extraOptions: extraOptions);
            clientSettings.AutoEncryptionOptions = autoEncryptionOptions;
            var secureClient = new MongoClient(clientSettings);
            // end-client

            // start-insert
            var sampleDocument = new BsonDocument
            {
                { "firstName", "Jon" },
                { "lastName", "Doe" },
                { "patientId", 12345678 },
                { "address", "157 Electric Ave." },
                {
                    "medications", new BsonArray
                    {
                        new BsonString("Atorvastatin"),
                        new BsonString("Levothyroxine")
                    }
                },
                {
                    "patientRecord", new BsonDocument
                    {
                        { "ssn", new BsonString("987-65-4320") },
                        { "billing", new BsonDocument {
                            {"type", new BsonString("Visa")},
                            {"number", "4111111111111111"}
                        }
                        }
                    }
                }
            };

            var secureCollection = secureClient.GetDatabase(encryptedDatabaseNamespace.DatabaseNamespace.ToString()).GetCollection<BsonDocument>(encryptedDatabaseNamespace.CollectionName.ToString());
            secureCollection.InsertOne(sampleDocument);
            // end-insert
    
            // start-find
            Console.WriteLine("Finding a document with regular (non-encrypted) client.");
            var filter = Builders<BsonDocument>.Filter.Eq("firstName", "Jon");
            var regularResult = regularClient.GetDatabase(encryptedDatabaseNamespace.DatabaseNamespace.ToString()).GetCollection<BsonDocument>(encryptedDatabaseNamespace.CollectionName.ToString()).Find(filter).Limit(1).ToList()[0];
            Console.WriteLine($"\n{regularResult}\n");
            Console.WriteLine("Finding a document with encrypted client, searching on an encrypted field");
            var encryptedFieldFilter = Builders<BsonDocument>.Filter.Eq("patientRecord.ssn", "987-65-4320");
            var secureResult = secureClient.GetDatabase(encryptedDatabaseNamespace.DatabaseNamespace.ToString()).GetCollection<BsonDocument>(encryptedDatabaseNamespace.CollectionName.ToString()).Find(encryptedFieldFilter).Limit(1).ToList()[0];
            Console.WriteLine($"\n{secureResult}\n");
            // end-find
        }
    }
}
