using System;
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
            var connectionString = "<Your MongoDB URI>";
            // start-key-vault
            var keyVaultNamespace = CollectionNamespace.FromFullName("encryption.__keyVault");
            // end-key-vault

            // start-kmsproviders
            var kmsProviders = new Dictionary<string, IReadOnlyDictionary<string, object>>();
            var provider = "azure";
            var azureKmsOptions = new Dictionary<string, object>
            {
               { "tenantId", "<Your Azure Tenant ID>" },
               { "clientId", "<Your Azure Client ID>" },
               { "clientSecret", "<Your Azure Client Secret>" },
            };
            kmsProviders.Add(provider, azureKmsOptions);
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
            var extraOptions = new Dictionary<string, object>()
            {
               { "cryptSharedLibPath", "<path to crypt_shared library>" },
            };
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
