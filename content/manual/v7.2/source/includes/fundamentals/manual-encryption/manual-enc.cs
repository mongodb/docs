using System;
using System.IO;
using System.Collections.Generic;
using System.Threading;
using MongoDB.Driver;
using MongoDB.Bson;
using MongoDB.Driver.Encryption;

namespace Insert
{

    class InsertEncryptedDocument
    {
        public static void Main()
        {
            var connectionString = Environment.GetEnvironmentVariable("MONGODB_URI");
            var keyVaultNamespace = CollectionNamespace.FromFullName("encryption.__keyVault");
            var coll = "patients";
            var db = "medicalRecords";
            var db_namespace = $"{db}.{coll}";

            // start-credentials
            var kmsProviders = new Dictionary<string, IReadOnlyDictionary<string, object>>();
            var provider = "aws";
            var awsAccessKey = Environment.GetEnvironmentVariable("AWS_ACCESS_KEY_ID");
            var awsSecretAccessKey = Environment.GetEnvironmentVariable("AWS_SECRET_ACCESS_KEY");
            var awsKmsOptions = new Dictionary<string, object>
            {
               { "accessKeyId", awsAccessKey },
               { "secretAccessKey", awsSecretAccessKey }
            };
            kmsProviders.Add("aws", awsKmsOptions);
            var awsKeyARN = Environment.GetEnvironmentVariable("AWS_KEY_ARN"); // e.g. "arn:aws:kms:us-east-2:111122223333:alias/test-key"
            var awsKeyRegion = Environment.GetEnvironmentVariable("AWS_KEY_REGION");
            var dataKeyOptions = new DataKeyOptions(
               masterKey: new BsonDocument
               {
                   { "region", awsKeyRegion },
                   { "key", awsKeyARN },
               });
            // start_mongoclient
            var client = new MongoClient(connectionString);
            // end_mongoclient
            // start_client_enc
            var collection = client.GetDatabase(db).GetCollection<BsonDocument>(coll);
            var clientEncryptionOptions = new ClientEncryptionOptions(
                keyVaultClient: client,
                keyVaultNamespace: keyVaultNamespace,
                kmsProviders: kmsProviders);
            var clientEncryption = new ClientEncryption(clientEncryptionOptions);
            // end_client_enc

            List<string> keyNames = new List<string>();
            keyNames.Add("manual-enc-test");
            var dataKeyId = clientEncryption.CreateDataKey(provider, dataKeyOptions.With(keyNames), CancellationToken.None);

            // start_enc_and_insert
            var encryptedName = clientEncryption.Encrypt(
                "Greg",
                new EncryptOptions(algorithm: "AEAD_AES_256_CBC_HMAC_SHA_512-Deterministic", keyId: dataKeyId),
                CancellationToken.None);
            var encryptedFoods = clientEncryption.Encrypt(
                new BsonArray { "Cheese", "Grapes" },
                new EncryptOptions(algorithm: "AEAD_AES_256_CBC_HMAC_SHA_512-Random", keyId: dataKeyId),
                CancellationToken.None);
            collection.InsertOne(new BsonDocument { { "name", encryptedName }, { "age", 83 }, { "foods", encryptedFoods } });
            // end_enc_and_insert

            // start_find_decrypt
            var nameToQuery = "Greg";
            var encryptedNameToQuery = clientEncryption.Encrypt(
                nameToQuery,
                new EncryptOptions(algorithm: "AEAD_AES_256_CBC_HMAC_SHA_512-Deterministic", keyId: dataKeyId),
                CancellationToken.None);
            var doc = collection.Find(new BsonDocument { { "name", encryptedNameToQuery } }).Single();
            Console.WriteLine($"Encrypted document: {doc}");
            doc["name"] = clientEncryption.Decrypt(doc["name"].AsBsonBinaryData, CancellationToken.None);
            doc["foods"] = clientEncryption.Decrypt(doc["foods"].AsBsonBinaryData, CancellationToken.None);
            Console.WriteLine($"Decrypted field: {doc}");
            // end_find_decrypt
        }
    }
}
