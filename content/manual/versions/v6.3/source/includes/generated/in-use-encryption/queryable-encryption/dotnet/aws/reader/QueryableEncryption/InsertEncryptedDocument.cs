using System;
using System.Collections.Generic;
using MongoDB.Driver;
using MongoDB.Bson;
using MongoDB.Driver.Encryption;

namespace QueryableEncryption
{
    internal static class InsertEncryptedDocument
    {
        public static void Insert()
        {
            var connectionString = "<Your MongoDB URI>";
            // start-key-vault
            var keyVaultNamespace = CollectionNamespace.FromFullName("encryption.__keyVault");
            // end-key-vault

            // start-kmsproviders
            var kmsProviders = new Dictionary<string, IReadOnlyDictionary<string, object>>();
            const string provider = "aws";
            var awsKmsOptions = new Dictionary<string, object>
            {
               { "accessKeyId", "<Your AWS Access Key ID>" },
               { "secretAccessKey", "<Your AWS Secret Access Key>" }
            };
            kmsProviders.Add(provider, awsKmsOptions);
            // end-kmsproviders

            // start-schema
            var regularClient = new MongoClient(connectionString);
            var keyVaultCollection = regularClient.GetDatabase(keyVaultNamespace.DatabaseNamespace.DatabaseName)
                .GetCollection<BsonDocument>(keyVaultNamespace.CollectionName);

            BsonBinaryData GetKeyId(string altName)
            {
                var filter = Builders<BsonDocument>.Filter.Eq<BsonString>("keyAltNames", altName);
                return keyVaultCollection.Find(filter).First<BsonDocument>()["_id"].AsBsonBinaryData;
            }

            var dataKeyId1 = GetKeyId("dataKey1");
            var dataKeyId2 = GetKeyId("dataKey2");
            var dataKeyId3 = GetKeyId("dataKey3");
            var dataKeyId4 = GetKeyId("dataKey4");

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
            // end-schema


            // start-extra-options
            var extraOptions = new Dictionary<string, object>()
            {
               { "cryptSharedLibPath", "<path to crypt_shared library>" },
            };
            // end-extra-options

            // start-client
            var clientSettings = MongoClientSettings.FromConnectionString(connectionString);
            var autoEncryptionOptions = new AutoEncryptionOptions(
                keyVaultNamespace,
                kmsProviders,
                encryptedFieldsMap: encryptedFieldsMap,
                extraOptions: extraOptions
                );
            clientSettings.AutoEncryptionOptions = autoEncryptionOptions;
            var secureClient = new MongoClient(clientSettings);
            // end-client

            // start-insert
            var sampleDocument = new BsonDocument
            {
                {"firstName", "Jon"},
                {"lastName", "Doe"},
                {"patientId", 12345678},
                {"address", "157 Electric Ave."},
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
                        {"ssn", new BsonString("987-65-4320")},
                        {
                            "billing", new BsonDocument
                            {
                                {"type", new BsonString("Visa")},
                                {"number", "4111111111111111"}
                            }
                        }
                    }
                }
            };

            var secureCollection = secureClient.GetDatabase(encryptedCollectionNamespace.DatabaseNamespace.DatabaseName)
                .GetCollection<BsonDocument>(encryptedCollectionNamespace.CollectionName);
            secureCollection.InsertOne(sampleDocument);
            // end-insert

            // start-find
            Console.WriteLine("Finding a document with regular (non-encrypted) client.");
            var filter = Builders<BsonDocument>.Filter.Eq("firstName", "Jon");
            var regularClientEncryptedCollection = regularClient.GetDatabase(encryptedCollectionNamespace.DatabaseNamespace.DatabaseName)
                .GetCollection<BsonDocument>(encryptedCollectionNamespace.CollectionName);
            var regularResult = regularClientEncryptedCollection.Find(filter).First();
            Console.WriteLine($"\n{regularResult}\n");
            Console.WriteLine("Finding a document with encrypted client, searching on an encrypted field");
            var encryptedFieldFilter = Builders<BsonDocument>.Filter.Eq("patientRecord.ssn", "987-65-4320");
            var secureResult = secureCollection.Find(encryptedFieldFilter).First();
            Console.WriteLine($"\n{secureResult}\n");
            // end-find
        }
    }
}
