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
        var schemaMap = CsfleSchemaBuilder.Create(schemaBuilder =>
        {
            schemaBuilder.Encrypt<BsonDocument>(
                CollectionNamespace.FromFullName(dbNamespace),
                builder =>
                {
                    builder
                        .EncryptMetadata(keyId: GuidConverter.FromBytes(
                            Convert.FromBase64String(dekId), GuidRepresentation.Standard))
                        .Property("ssn", BsonType.Int32,
                            EncryptionAlgorithm.AEAD_AES_256_CBC_HMAC_SHA_512_Deterministic)
                        .Property("bloodType", BsonType.String,
                            EncryptionAlgorithm.AEAD_AES_256_CBC_HMAC_SHA_512_Random)
                        .Property("medicalRecords", BsonType.Array,
                            EncryptionAlgorithm.AEAD_AES_256_CBC_HMAC_SHA_512_Random)
                        .Property<BsonDocument>("insurance", insurance =>
                        {
                            insurance.Property("policyNumber", BsonType.Int32,
                                EncryptionAlgorithm.AEAD_AES_256_CBC_HMAC_SHA_512_Deterministic);
                        });
                });
        }).Build();
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
