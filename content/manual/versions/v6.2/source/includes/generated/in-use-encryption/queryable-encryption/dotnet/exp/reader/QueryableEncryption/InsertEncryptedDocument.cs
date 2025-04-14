using System;
using System.IO;
using System.Collections.Generic;
using System.Threading;
using MongoDB.Driver;
using MongoDB.Bson;
using MongoDB.Driver.Encryption;

namespace QueryableEncryption
{
    internal static class InsertEncryptedDocument
    {
        public static void Insert()
        {
            // start-key-vault
            var connectionString = "<Your MongoDB URI>";
            var keyVaultNamespace = CollectionNamespace.FromFullName("encryption.__keyVault");
            var coll = "patients";
            var db = "medicalRecords";
            // end-key-vault

            // start-kmsproviders
            var kmsProviders = new Dictionary<string, IReadOnlyDictionary<string, object>>();
            const string provider = "local";
            const string localMasterKeyPath = "master-key.txt";
            var localMasterKeyBase64Read = File.ReadAllText(localMasterKeyPath);
            var localMasterKeyBytes = Convert.FromBase64String(localMasterKeyBase64Read);
            var localOptions = new Dictionary<string, object>
            {
                {"key", localMasterKeyBytes}
            };
            kmsProviders.Add(provider, localOptions);
            // end-kmsproviders


            // start-retrieve-deks
            var regularClient = new MongoClient(connectionString);
            var keyVaultCollection = regularClient.GetDatabase(keyVaultNamespace.DatabaseNamespace.DatabaseName)
                .GetCollection<BsonDocument>(keyVaultNamespace.CollectionName);

            Guid GetKeyId(string altName)
            {
                var filter = Builders<BsonDocument>.Filter.Eq<BsonString>("keyAltNames", altName);
                return keyVaultCollection.Find(filter).First<BsonDocument>()["_id"].AsGuid;
            }

            var dataKeyId1 = GetKeyId("dataKey1");
            var dataKeyId2 = GetKeyId("dataKey2");
            // end-retrieve-deks


            // start-extra-options
            var extraOptions = new Dictionary<string, object>()
            {
                {"cryptSharedLibPath", "<path to crypt_shared library>"},
            };
            // end-extra-options

            // start-client
            var clientSettings = MongoClientSettings.FromConnectionString(connectionString);
            var autoEncryptionOptions = new AutoEncryptionOptions(
                keyVaultNamespace,
                kmsProviders,
                bypassQueryAnalysis: true,
                extraOptions: extraOptions);
            clientSettings.AutoEncryptionOptions = autoEncryptionOptions;
            var secureClient = new MongoClient(clientSettings);
            var collection = secureClient.GetDatabase(db).GetCollection<BsonDocument>(coll);
            // end-client

            // start-client-enc
            var clientEncryptionOptions = new ClientEncryptionOptions(
                keyVaultClient: regularClient,
                keyVaultNamespace: keyVaultNamespace,
                kmsProviders: kmsProviders
                );
            var clientEncryption = new ClientEncryption(clientEncryptionOptions);
            // end-client-enc

            // start-insert
            var patientId = 12345678;
            var medications = new BsonArray
                    {
                        new BsonString("Atorvastatin"),
                        new BsonString("Levothyroxine")
                    };
            var indexedEncrypted = clientEncryption.Encrypt(
                patientId,
                new EncryptOptions(algorithm: "Indexed", keyId: dataKeyId1, contentionFactor: 1),
                CancellationToken.None);
            var unindexedEncrypted = clientEncryption.Encrypt(
                medications,
                new EncryptOptions(algorithm: "Unindexed", keyId: dataKeyId2),
                CancellationToken.None);
            collection.InsertOne(new BsonDocument { { "firstName", "Jon" }, { "patientId", indexedEncrypted }, { "medications", unindexedEncrypted } });
            // end-insert

            // start-find
            var findPayload = clientEncryption.Encrypt(
                patientId,
                new EncryptOptions(algorithm: "Indexed", keyId: dataKeyId1, queryType: "equality", contentionFactor: 1),
                CancellationToken.None);
            var doc = collection.Find(new BsonDocument { { "patientId", findPayload } }).Single();
            Console.WriteLine($"Encrypted document: {doc}");
            // end-find
        }
    }
}
