using System;
using System.IO;
using System.Collections.Generic;
using System.Threading;
using MongoDB.Driver;
using MongoDB.Bson;
using MongoDB.Driver.Encryption;

namespace Key
{

    class MakeDataKey
    {
        public static void MakeKey()
        {

            using (var randomNumberGenerator = System.Security.Cryptography.RandomNumberGenerator.Create())
            {
                var bytes = new byte[96];
                randomNumberGenerator.GetBytes(bytes);
                var localMasterKeyBase64Write = Convert.ToBase64String(bytes);
                Console.WriteLine(localMasterKeyBase64Write);
                File.WriteAllText("master-key.txt", localMasterKeyBase64Write);
            }

            // start-kmsproviders
            var kmsProviders = new Dictionary<string, IReadOnlyDictionary<string, object>>();
            var provider = "local";
            string localMasterKeyBase64Read = File.ReadAllText("master-key.txt");
            var localMasterKeyBytes = Convert.FromBase64String(localMasterKeyBase64Read);
            var localOptions = new Dictionary<string, object>
            {
                { "key", localMasterKeyBytes }
            };
            kmsProviders.Add(provider, localOptions);
            // end-kmsproviders

            DataKeyOptions[] dataKeyOptsArr = new DataKeyOptions[4];



            // start-create-index
            var connectionString = "<Your MongoDB URI>";
            // start-create-dek
            var keyVaultNamespace = CollectionNamespace.FromFullName("encryption.__keyVault");
            var keyVaultClient = new MongoClient(connectionString);
            var indexOptions = new CreateIndexOptions<BsonDocument>();
            indexOptions.Unique = true;
            indexOptions.PartialFilterExpression = new BsonDocument { { "keyAltNames", new BsonDocument { { "$exists", new BsonBoolean(true) } } } };
            var builder = Builders<BsonDocument>.IndexKeys;
            var indexKeysDocument = builder.Ascending("keyAltNames");
            var indexModel = new CreateIndexModel<BsonDocument>(indexKeysDocument, indexOptions);
            var keyVaultDatabase = keyVaultClient.GetDatabase(keyVaultNamespace.DatabaseNamespace.ToString());
            // Drop the Key Vault Collection in case you created this collection
            // in a previous run of this application.  
            keyVaultDatabase.DropCollection(keyVaultNamespace.CollectionName.ToString());
            var keyVaultCollection = keyVaultDatabase.GetCollection<BsonDocument>(keyVaultNamespace.CollectionName.ToString());
            keyVaultCollection.Indexes.CreateOne(indexModel);
            // end-create-index

            // start-create-dek
            var clientEncryptionOptions = new ClientEncryptionOptions(
                keyVaultClient: keyVaultClient,
                keyVaultNamespace: keyVaultNamespace,
                kmsProviders: kmsProviders);
            Func<Guid, BsonBinaryData> getBsonBinaryId = guid => new BsonBinaryData(guid, GuidRepresentation.Standard);
            var clientEncryption = new ClientEncryption(clientEncryptionOptions);
            var dataKeyOptions1 = new DataKeyOptions();
            var dataKeyOptions2 = new DataKeyOptions();
            var dataKeyOptions3 = new DataKeyOptions();
            var dataKeyOptions4 = new DataKeyOptions();
            List<string> keyNames1 = new List<string>();
            keyNames1.Add("dataKey1");
            var dataKeyId1 = getBsonBinaryId(clientEncryption.CreateDataKey(provider, dataKeyOptions1.With(keyNames1), CancellationToken.None));
            List<string> keyNames2 = new List<string>();
            keyNames2.Add("dataKey2");
            var dataKeyId2 = getBsonBinaryId(clientEncryption.CreateDataKey(provider, dataKeyOptions2.With(keyNames2), CancellationToken.None));
            List<string> keyNames3 = new List<string>();
            keyNames3.Add("dataKey3");
            var dataKeyId3 = getBsonBinaryId(clientEncryption.CreateDataKey(provider, dataKeyOptions3.With(keyNames3), CancellationToken.None));
            List<string> keyNames4 = new List<string>();
            keyNames4.Add("dataKey4");
            var dataKeyId4 = getBsonBinaryId(clientEncryption.CreateDataKey(provider, dataKeyOptions4.With(keyNames4), CancellationToken.None));
            // end-create-dek


            // start-create-enc-collection
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

            var extraOptions = new Dictionary<string, object>()
            {
               { "cryptSharedLibPath", "<path to crypt_shared library>" },
            };

            var autoEncryptionOptions = new AutoEncryptionOptions(
                keyVaultNamespace: keyVaultNamespace,
                kmsProviders: kmsProviders,
                encryptedFieldsMap: encryptedFieldsMap,
                extraOptions: extraOptions);

            var clientSettings = MongoClientSettings.FromConnectionString(connectionString);
            clientSettings.AutoEncryptionOptions = autoEncryptionOptions;
            var secureClient = new MongoClient(clientSettings);
            var encryptedDatabase = secureClient.GetDatabase(encryptedDatabaseNamespace.DatabaseNamespace.ToString());
            // Drop the encrypted collection in case you created this collection
            // in a previous run of this application.
            encryptedDatabase.DropCollection(encryptedDatabaseNamespace.CollectionName.ToString());
            encryptedDatabase.CreateCollection(encryptedDatabaseNamespace.CollectionName.ToString());
            Console.WriteLine("Created encrypted collection!");
            // end-create-enc-collection
        }
    }
}
