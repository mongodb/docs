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


            // start-kmsproviders
            var kmsProviders = new Dictionary<string, IReadOnlyDictionary<string, object>>();
            var provider = "gcp";
            var gcpKmsOptions = new Dictionary<string, object>
            {
               { "privateKey", "<Your GCP Private Key>" },
               { "email", "<Your GCP Email>" },
            };
            kmsProviders.Add(provider, gcpKmsOptions);
            // end-kmsproviders

            // start-datakeyopts
            var dataKeyOptions = new DataKeyOptions(
               masterKey: new BsonDocument
               {
                   { "projectId", "Your GCP Project ID" },
                   { "location", "Your GCP Key Location" } ,
                   { "keyRing", "<Your GCP Key Ring>" },
                   { "keyName", "<Your GCP Key Name>" },
               });
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
            var dataKeyId = clientEncryption.CreateDataKey(provider, dataKeyOptions, CancellationToken.None);
            var dataKeyIdBase64 = Convert.ToBase64String(GuidConverter.ToBytes(dataKeyId, GuidRepresentation.Standard));
            Console.WriteLine($"DataKeyId [base64]: {dataKeyIdBase64}");
            // end-create-dek
        }
    }
}
