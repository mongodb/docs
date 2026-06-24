using System;
using System.IO;
using System.Collections.Generic;
using MongoDB.Driver;
using MongoDB.Bson;
using MongoDB.Driver.Encryption;

namespace CsfleTutorial;

public static class InsertEncryptedDocument
{
    public static void Insert()
    {
        var db = "medicalRecords";
        var coll = "patients";
        var dbNamespace = $"{db}.{coll}";

        // start-json-schema
        var dekId = File.ReadAllText(Config.DekIdPath);
        var schema = new BsonDocument
        {
            { "bsonType", "object" },
            {
                "encryptMetadata",
                new BsonDocument("keyId", new BsonArray(new[]
                {
                    new BsonBinaryData(
                        Convert.FromBase64String(dekId),
                        BsonBinarySubType.UuidStandard)
                }))
            },
            {
                "properties", new BsonDocument
                {
                    {
                        "ssn", new BsonDocument
                        {
                            {
                                "encrypt", new BsonDocument
                                {
                                    { "bsonType", "int" },
                                    {
                                        "algorithm",
                                        "AEAD_AES_256_CBC_HMAC_SHA_512-Deterministic"
                                    }
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
                                    {
                                        "algorithm",
                                        "AEAD_AES_256_CBC_HMAC_SHA_512-Random"
                                    }
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
                                    {
                                        "algorithm",
                                        "AEAD_AES_256_CBC_HMAC_SHA_512-Random"
                                    }
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
                                                    {
                                                        "algorithm",
                                                        "AEAD_AES_256_CBC_HMAC_SHA_512-Deterministic"
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
            }
        };
        var schemaMap = new Dictionary<string, BsonDocument>
        {
            { dbNamespace, schema }
        };
        // end-json-schema

        // start-create-client
        var keyVaultNamespace =
            CollectionNamespace.FromFullName(Config.KeyVaultNamespace);
        var kmsProviders = Config.GetKmsProviders();
        var extraOptions = new Dictionary<string, object>
        {
            { "cryptSharedLibPath", Config.CryptSharedLibPath }
        };
        MongoClientSettings.Extensions.AddAutoEncryption();
        var clientSettings =
            MongoClientSettings.FromConnectionString(Config.ConnectionString);
        var autoEncryptionOptions = new AutoEncryptionOptions(
            keyVaultNamespace: keyVaultNamespace,
            kmsProviders: kmsProviders,
            schemaMap: schemaMap,
            extraOptions: extraOptions);
        clientSettings.AutoEncryptionOptions = autoEncryptionOptions;
        var secureClient = new MongoClient(clientSettings);
        var regularClient = new MongoClient(Config.ConnectionString);
        // end-create-client

        // start-insert-document
        var secureCollection = secureClient
            .GetDatabase(db).GetCollection<BsonDocument>(coll);
        var sampleDoc = new BsonDocument
        {
            { "name", "Jon Doe" },
            { "ssn", 241014209 },
            { "bloodType", "AB+" },
            {
                "medicalRecords", new BsonArray
                {
                    new BsonDocument
                    {
                        { "weight", 180 },
                        { "bloodPressure", "120/80" }
                    }
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
        secureCollection.InsertOne(sampleDoc);
        // end-insert-document

        // start-find-document
        var regularCollection = regularClient
            .GetDatabase(db).GetCollection<BsonDocument>(coll);

        Console.WriteLine(
            "Finding a document with the regular (non-encrypted) client:");
        var filter = Builders<BsonDocument>.Filter.Eq("name", "Jon Doe");
        var regularResult = regularCollection.Find(filter).First();
        Console.WriteLine($"\n{regularResult}\n");

        Console.WriteLine("Finding a document with the encrypted client:");
        var secureResult = secureCollection.Find(filter).First();
        Console.WriteLine($"\n{secureResult}\n");
        // end-find-document
    }
}
