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
            var coll = "patients";
            var db = "medicalRecords";
            var db_namespace = $"{db}.{coll}";

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
            // :state-start: local-reader aws-reader azure-reader gcp-reader
            // :uncomment-start:
            //var keyId = "<Your base64 DEK ID here>";
            //var schema = new BsonDocument
            //{
            //    { "bsonType", "object" },
            //    {
            //        "encryptMetadata",
            //        new BsonDocument("keyId", new BsonArray(new[] { new BsonBinaryData(Convert.FromBase64String(keyId), BsonBinarySubType.UuidStandard) }))
            //    },
            //    {
            //        "properties",
            //        new BsonDocument
            //        {
            //            {
            //                "ssn", new BsonDocument
            //                {
            //                    {
            //                        "encrypt", new BsonDocument
            //                        {
            //                            { "bsonType", "int" },
            //                            { "algorithm", "AEAD_AES_256_CBC_HMAC_SHA_512-Deterministic" }
            //                        }
            //                    }
            //                }
            //            },
            //            {
            //                "bloodType", new BsonDocument
            //                {
            //                    {
            //                        "encrypt", new BsonDocument
            //                        {
            //                            { "bsonType", "string" },
            //                            { "algorithm", "AEAD_AES_256_CBC_HMAC_SHA_512-Random" }
            //                        }
            //                    }
            //                }
            //            },
            //            {
            //                "medicalRecords", new BsonDocument
            //                {
            //                    {
            //                        "encrypt", new BsonDocument
            //                        {
            //                            { "bsonType", "array" },
            //                            { "algorithm", "AEAD_AES_256_CBC_HMAC_SHA_512-Random" }
            //                        }
            //                    }
            //                }
            //            },
            //            {
            //                "insurance", new BsonDocument
            //                {
            //                    { "bsonType", "object" },
            //                    {
            //                        "properties", new BsonDocument
            //                        {
            //                            {
            //                                "policyNumber", new BsonDocument
            //                                {
            //                                    {
            //                                        "encrypt", new BsonDocument
            //                                        {
            //                                            { "bsonType", "int" },
            //                                            { "algorithm", "AEAD_AES_256_CBC_HMAC_SHA_512-Deterministic" }
            //                                        }
            //                                    }
            //                                }
            //                            }
            //                        }
            //                    }
            //                }
            //            }
            //        }
            //    }
            //};
            // :uncomment-end:
            // :state-end:
            // :state-start: local-test aws-test azure-test gcp-test
            var schema = new BsonDocument {
                { "bsonType", "object" },
                { "encryptMetadata", new BsonDocument{ 
                        { "keyId", "/key-id"}      
                    }
                },
                { "properties", new BsonDocument {
                        { "ssn", new BsonDocument {
                                { "encrypt", new BsonDocument {
                                    { "bsonType", "int" },
                                    { "algorithm", "AEAD_AES_256_CBC_HMAC_SHA_512-Random"}
                                    }
                                }
                            }
                        },
                        { "bloodType", new BsonDocument {
                            { "encrypt" ,new BsonDocument {
                                    { "bsonType", "string" },
                                    { "algorithm", "AEAD_AES_256_CBC_HMAC_SHA_512-Random"}
                                    }
                                }
                            }
                        },
                        { "medicalRecords", new BsonDocument {
                                {"encrypt", new BsonDocument {
                                    { "bsonType", "array" },
                                    { "algorithm", "AEAD_AES_256_CBC_HMAC_SHA_512-Random"}
                                    }
                                }
                            }
                        },
                        { "insurance", new BsonDocument {
                                { "bsonType", "object" },
                                { "properties", new BsonDocument {
                                        { "policyNumber", new BsonDocument {
                                                { "encrypt", new BsonDocument {
                                                        { "bsonType", "int" },
                                                        { "algorithm", "AEAD_AES_256_CBC_HMAC_SHA_512-Random"}
                                                    }
                                                } 
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            };
            // :state-end:
            var schemaMap = new Dictionary<string, BsonDocument>();
            schemaMap.Add(db_namespace, schema);
            // end-schema

            // start-extra-options
            // :state-start: aws-reader azure-reader local-reader gcp-reader
            // :uncomment-start:
            //var mongoBinariesPath = "<Path to mongocryptd binary>";
            //var extraOptions = new Dictionary<string, object>()
            //{
            //    { "mongocryptdSpawnPath", mongoBinariesPath },
            //};
            // :uncomment-end:
            // :state-end:
            // :state-start: aws-test azure-test local-test gcp-test
            var extraOptions = new Dictionary<string, object>()
            {
                { "mongocryptdSpawnPath", Environment.GetEnvironmentVariable("MONGCRYPTD_PATH")},
            };
            // :state-end:
            // end-extra-options

            var regularClientSettings = MongoClientSettings.FromConnectionString(connectionString);
            var regularClient = new MongoClient(regularClientSettings);
            var regularCollection = regularClient.GetDatabase(db).GetCollection<BsonDocument>(coll);

            // start-client
            var clientSettings = MongoClientSettings.FromConnectionString(connectionString);
            var autoEncryptionOptions = new AutoEncryptionOptions(
                keyVaultNamespace: keyVaultNamespace,
                kmsProviders: kmsProviders,
                schemaMap: schemaMap,
                extraOptions: extraOptions);
            clientSettings.AutoEncryptionOptions = autoEncryptionOptions;
            var secureClient = new MongoClient(clientSettings);
            // end-client

            // start-insert
            var sampleDocFields = new BsonDocument
            {
                { "name", "Jon Doe" },
                { "ssn", 145014000 },
                // :state-start: local-test aws-test azure-test gcp-test
                { "key-id", "demo-data-key"},
                // :state-end:
                { "bloodType", "AB-" },
                {
                    "medicalRecords", new BsonArray
                    {
                        new BsonDocument("weight", 180),
                        new BsonDocument("bloodPressure", "120/80")
                    }
                },
                {
                    "insurance", new BsonDocument
                    {
                        { "policyNumber", 123142 },
                        { "provider", "MaestCare" }
                    }
                }
            };

            // Construct an auto-encrypting client
            var secureCollection = secureClient.GetDatabase(db).GetCollection<BsonDocument>(coll);

            // Insert a document into the collection
            secureCollection.InsertOne(sampleDocFields);
            // end-insert
            // start-find
            Console.WriteLine("Finding a document with regular (non-encrypted) client.");
            var filter = Builders<BsonDocument>.Filter.Eq("name", "Jon Doe");
            var regularResult = regularCollection.Find(filter).Limit(1).ToList()[0];
            Console.WriteLine($"\n{regularResult}\n");
            Console.WriteLine("Finding a document with encrypted client, searching on an encrypted field");
            // :state-start: local-reader aws-reader azure-reader gcp-reader
            // :uncomment-start:
            //var ssnFilter = Builders<BsonDocument>.Filter.Eq("ssn", 145014000);
            //var secureResult = secureCollection.Find(ssnFilter).Limit(1).ToList()[0];
            // :uncomment-end:
            // :state-end:
            // :state-start: local-test aws-test azure-test gcp-test
            var secureResult = secureCollection.Find(filter).Limit(1).ToList()[0];
            // :state-end:
            Console.WriteLine($"\n{secureResult}\n");
            // end-find
        }
    }
}
