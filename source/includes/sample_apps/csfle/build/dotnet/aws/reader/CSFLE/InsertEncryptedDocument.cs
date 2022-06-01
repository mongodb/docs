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
            var db_namespace = $"{db}.{coll}";

            // start-kmsproviders
            var kmsProviders = new Dictionary<string, IReadOnlyDictionary<string, object>>();
            var awsKmsOptions = new Dictionary<string, object>
            {
               { "accessKeyId", "<Your AWS Access Key ID>" },
               { "secretAccessKey", "<Your AWS Secret Access Key>" }
            };
            kmsProviders.Add("aws", awsKmsOptions);
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
            schemaMap.Add(db_namespace, schema);
            // end-schema

            // start-extra-options
            var mongoBinariesPath = "<Path to mongocryptd binary>";
            var extraOptions = new Dictionary<string, object>()
            {
               { "mongocryptdSpawnPath", mongoBinariesPath },
            };
            // end-extra-options

            // start-client
            var clientSettings = MongoClientSettings.FromConnectionString(connectionString);
            var autoEncryptionOptions = new AutoEncryptionOptions(
                keyVaultNamespace: keyVaultNamespace,
                kmsProviders: kmsProviders,
                schemaMap: schemaMap,
                extraOptions: extraOptions);
            clientSettings.AutoEncryptionOptions = autoEncryptionOptions;
            var client = new MongoClient(clientSettings);
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
            var collection = client.GetDatabase(db).GetCollection<BsonDocument>(coll);

            // Insert a document into the collection
            collection.InsertOne(sampleDocFields);
            var result = collection.Find(FilterDefinition<BsonDocument>.Empty).Limit(1).ToList()[0];
            Console.WriteLine("Successfully upserted the sample document!");
            Console.WriteLine($"Encrypted client query by the SSN (deterministically-encrypted) field:\n {result}\n");
            // end-insert
        }
    }
}
