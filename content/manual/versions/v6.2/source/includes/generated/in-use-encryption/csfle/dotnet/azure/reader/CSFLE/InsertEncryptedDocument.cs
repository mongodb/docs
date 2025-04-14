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
            var coll = "patients";
            var db = "medicalRecords";
            var dbNamespace = $"{db}.{coll}";

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
            var keyId = "<Your base64 DEK ID here>";
            var schema = new BsonDocument
            {
               { "bsonType", "object" },
               {
                   "encryptMetadata",
                   new BsonDocument("keyId", new BsonArray(new[] { new BsonBinaryData(Convert.FromBase64String(keyId), BsonBinarySubType.UuidStandard) }))
               },
               {
                   "properties",
                   new BsonDocument
                   {
                       {
                           "ssn", new BsonDocument
                           {
                               {
                                   "encrypt", new BsonDocument
                                   {
                                       { "bsonType", "int" },
                                       { "algorithm", "AEAD_AES_256_CBC_HMAC_SHA_512-Deterministic" }
                                   }
                               }
                           }
                       },
                       {
                           "bloodType", new BsonDocument
                           {
                               {
                                   "encrypt", new BsonDocument
                                   {
                                       { "bsonType", "string" },
                                       { "algorithm", "AEAD_AES_256_CBC_HMAC_SHA_512-Random" }
                                   }
                               }
                           }
                       },
                       {
                           "medicalRecords", new BsonDocument
                           {
                               {
                                   "encrypt", new BsonDocument
                                   {
                                       { "bsonType", "array" },
                                       { "algorithm", "AEAD_AES_256_CBC_HMAC_SHA_512-Random" }
                                   }
                               }
                           }
                       },
                       {
                           "insurance", new BsonDocument
                           {
                               { "bsonType", "object" },
                               {
                                   "properties", new BsonDocument
                                   {
                                       {
                                           "policyNumber", new BsonDocument
                                           {
                                               {
                                                   "encrypt", new BsonDocument
                                                   {
                                                       { "bsonType", "int" },
                                                       { "algorithm", "AEAD_AES_256_CBC_HMAC_SHA_512-Deterministic" }
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
            var schemaMap = new Dictionary<string, BsonDocument>();
            schemaMap.Add(dbNamespace, schema);
            // end-schema


            // start-extra-options
            var mongoBinariesPath = "<Path to mongocryptd binary>";
            var extraOptions = new Dictionary<string, object>()
            {
               { "mongocryptdSpawnPath", mongoBinariesPath },
            };
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
                extraOptions: extraOptions
                );
            clientSettings.AutoEncryptionOptions = autoEncryptionOptions;
            var secureClient = new MongoClient(clientSettings);
            // end-client

            // start-insert
            var sampleDocFields = new BsonDocument
            {
                { "name", "Jon Doe" },
                { "ssn", 145014000 },
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
            var ssnFilter = Builders<BsonDocument>.Filter.Eq("ssn", 145014000);
            var secureResult = secureCollection.Find(ssnFilter).Limit(1).First();
            Console.WriteLine($"\n{secureResult}\n");
            // end-find
        }
    }
}
