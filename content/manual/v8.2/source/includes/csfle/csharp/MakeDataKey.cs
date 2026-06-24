using System;
using System.IO;
using System.Threading;
using MongoDB.Driver;
using MongoDB.Bson;
using MongoDB.Driver.Encryption;

namespace CsfleTutorial;

public static class MakeDataKey
{
    public static void MakeKey()
    {
        // start-generate-cmk
        using (var rng =
            System.Security.Cryptography.RandomNumberGenerator.Create())
        {
            var bytes = new byte[96];
            rng.GetBytes(bytes);
            File.WriteAllBytes(Config.MasterKeyPath, bytes);
        }
        // end-generate-cmk

        // start-create-index
        var keyVaultNamespace =
            CollectionNamespace.FromFullName(Config.KeyVaultNamespace);
        var keyVaultClient = new MongoClient(Config.ConnectionString);
        var keyVaultDatabase = keyVaultClient
            .GetDatabase(keyVaultNamespace.DatabaseNamespace.ToString());
        keyVaultDatabase.DropCollection(keyVaultNamespace.CollectionName);
        // Drop the patients collection to make the tutorial re-runnable.
        keyVaultClient.GetDatabase("medicalRecords").DropCollection("patients");
        var keyVaultCollection = keyVaultDatabase
            .GetCollection<BsonDocument>(keyVaultNamespace.CollectionName);
        var indexOptions = new CreateIndexOptions<BsonDocument>
        {
            Unique = true,
            PartialFilterExpression = new BsonDocument
            {
                {
                    "keyAltNames",
                    new BsonDocument { { "$exists", new BsonBoolean(true) } }
                }
            }
        };
        var indexKeysDocument =
            Builders<BsonDocument>.IndexKeys.Ascending("keyAltNames");
        var indexModel =
            new CreateIndexModel<BsonDocument>(indexKeysDocument, indexOptions);
        keyVaultCollection.Indexes.CreateOne(indexModel);
        // end-create-index

        // start-create-data-key
        var kmsProviders = Config.GetKmsProviders();
        var clientEncryptionOptions = new ClientEncryptionOptions(
            keyVaultClient: keyVaultClient,
            keyVaultNamespace: keyVaultNamespace,
            kmsProviders: kmsProviders);
        var clientEncryption = new ClientEncryption(clientEncryptionOptions);
        var dataKeyOptions = new DataKeyOptions();
        var dataKeyId = clientEncryption.CreateDataKey(
            "local", dataKeyOptions, CancellationToken.None);
        var base64DekId = Convert.ToBase64String(
            GuidConverter.ToBytes(dataKeyId, GuidRepresentation.Standard));
        Console.WriteLine($"DataKeyId [base64]: {base64DekId}");
        File.WriteAllText(Config.DekIdPath, base64DekId);
        // end-create-data-key
    }
}
