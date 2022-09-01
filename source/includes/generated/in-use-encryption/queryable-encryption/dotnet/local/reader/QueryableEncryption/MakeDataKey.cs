using System;
using System.IO;
using System.Collections.Generic;
using System.Threading;
using MongoDB.Driver;
using MongoDB.Bson;
using MongoDB.Driver.Encryption;

namespace QueryableEncryption
{
    internal static class MakeDataKey
    {
        public static void MakeKey()
        {
            using (var randomNumberGenerator = System.Security.Cryptography.RandomNumberGenerator.Create())
            {
                var bytes = new byte[96];
                randomNumberGenerator.GetBytes(bytes);
                var localMasterKeyBase64Write = Convert.ToBase64String(bytes);
                File.WriteAllText("master-key.txt", localMasterKeyBase64Write);
            }

            // start-kmsproviders
            var kmsProviders = new Dictionary<string, IReadOnlyDictionary<string, object>>();
            const string provider = "local";
            var localMasterKeyBase64Read = File.ReadAllText("master-key.txt");
            var localMasterKeyBytes = Convert.FromBase64String(localMasterKeyBase64Read);
            var localOptions = new Dictionary<string, object>
            {
                {"key", localMasterKeyBytes}
            };
            kmsProviders.Add(provider, localOptions);
            // end-kmsproviders


            // start-create-index
            var connectionString = "<Your MongoDB URI>";
            var keyVaultNamespace = CollectionNamespace.FromFullName("encryption.__keyVault");
            var keyVaultClient = new MongoClient(connectionString);
            var indexOptions = new CreateIndexOptions<BsonDocument>
            {
                Unique = true,
                PartialFilterExpression = new BsonDocument
                    {{"keyAltNames", new BsonDocument {{"$exists", new BsonBoolean(true)}}}}
            };
            var builder = Builders<BsonDocument>.IndexKeys;
            var indexKeysDocument = builder.Ascending("keyAltNames");
            var indexModel = new CreateIndexModel<BsonDocument>(indexKeysDocument, indexOptions);
            var keyVaultDatabase = keyVaultClient.GetDatabase(keyVaultNamespace.DatabaseNamespace.DatabaseName);
            // Drop the Key Vault Collection in case you created this collection
            // in a previous run of this application.
            keyVaultDatabase.DropCollection(keyVaultNamespace.CollectionName);
            var keyVaultCollection = keyVaultDatabase.GetCollection<BsonDocument>(keyVaultNamespace.CollectionName);
            keyVaultCollection.Indexes.CreateOne(indexModel);
            // end-create-index


            // start-create-dek
            var clientEncryptionOptions = new ClientEncryptionOptions(
                keyVaultClient,
                keyVaultNamespace,
                kmsProviders: kmsProviders
                );
            var clientEncryption = new ClientEncryption(clientEncryptionOptions);
            var dataKeyOptions1 = new DataKeyOptions(alternateKeyNames: new List<string> { "dataKey1" });
            var dataKeyOptions2 = new DataKeyOptions(alternateKeyNames: new List<string> { "dataKey2" });
            var dataKeyOptions3 = new DataKeyOptions(alternateKeyNames: new List<string> { "dataKey3" });
            var dataKeyOptions4 = new DataKeyOptions(alternateKeyNames: new List<string> { "dataKey4" });


            BsonBinaryData CreateKeyGetID(DataKeyOptions options)
            {
                var dateKeyGuid = clientEncryption.CreateDataKey(provider, options, CancellationToken.None);
                return new BsonBinaryData(dateKeyGuid, GuidRepresentation.Standard);
            }

            var dataKeyId1 = CreateKeyGetID(dataKeyOptions1);
            var dataKeyId2 = CreateKeyGetID(dataKeyOptions2);
            var dataKeyId3 = CreateKeyGetID(dataKeyOptions3);
            var dataKeyId4 = CreateKeyGetID(dataKeyOptions4);
            // end-create-dek

            // start-create-enc-collection
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

            var extraOptions = new Dictionary<string, object>()
            {
               { "cryptSharedLibPath", "<path to crypt_shared library>" },
            };

            var autoEncryptionOptions = new AutoEncryptionOptions(
                keyVaultNamespace,
                kmsProviders,
                encryptedFieldsMap: encryptedFieldsMap,
                extraOptions: extraOptions);

            var clientSettings = MongoClientSettings.FromConnectionString(connectionString);
            clientSettings.AutoEncryptionOptions = autoEncryptionOptions;
            var secureClient = new MongoClient(clientSettings);
            var encryptedDatabase = secureClient.GetDatabase(encryptedCollectionNamespace.DatabaseNamespace.DatabaseName);
            // Drop the encrypted collection in case you created this collection
            // in a previous run of this application.
            encryptedDatabase.DropCollection(encryptedCollectionNamespace.CollectionName);
            encryptedDatabase.CreateCollection(encryptedCollectionNamespace.CollectionName);
            Console.WriteLine("Created encrypted collection!");
            // end-create-enc-collection
        }
    }
}
