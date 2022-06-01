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

            var localMasterKeyPath = "master-key.txt";
            using (var randomNumberGenerator = System.Security.Cryptography.RandomNumberGenerator.Create())
            {
                var bytes = new byte[96];
                randomNumberGenerator.GetBytes(bytes);
                var localMasterKeyBase64Write = Convert.ToBase64String(bytes);
                Console.WriteLine(localMasterKeyBase64Write);
                File.WriteAllText(localMasterKeyPath, localMasterKeyBase64Write);
            }

            // start-kmsproviders
            var kmsProviders = new Dictionary<string, IReadOnlyDictionary<string, object>>();
            var provider = "local";
            string localMasterKeyBase64Read = File.ReadAllText(localMasterKeyPath);
            var localMasterKeyBytes = Convert.FromBase64String(localMasterKeyBase64Read);
            var localOptions = new Dictionary<string, object>
            {
                { "key", localMasterKeyBytes }
            };
            kmsProviders.Add("local", localOptions);
            // end-kmsproviders

            // start-datakeyopts
            // end-datakeyopts

            var connectionString = "<Your MongoDB URI>";
            // start-create-dek
            var keyVaultNamespace = CollectionNamespace.FromFullName("encryption.__keyVault");
            var keyVaultClient = new MongoClient(connectionString);
            var clientEncryptionOptions = new ClientEncryptionOptions(
                keyVaultClient: keyVaultClient,
                keyVaultNamespace: keyVaultNamespace,
                kmsProviders: kmsProviders);
            var clientEncryption = new ClientEncryption(clientEncryptionOptions);
            var dataKeyOptions = new DataKeyOptions();
            var dataKeyId = clientEncryption.CreateDataKey(provider, dataKeyOptions, CancellationToken.None);
            var dataKeyIdBase64 = Convert.ToBase64String(GuidConverter.ToBytes(dataKeyId, GuidRepresentation.Standard));
            Console.WriteLine($"DataKeyId [base64]: {dataKeyIdBase64}");
            // end-create-dek
        }
    }
}
