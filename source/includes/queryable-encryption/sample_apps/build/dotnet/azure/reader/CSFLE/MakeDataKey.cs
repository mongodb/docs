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
            var provider = "azure";
            var azureKmsOptions = new Dictionary<string, object>
            {
               { "tenantId", "<Your Azure Tenant ID>" },
               { "clientId", "<Your Azure Client ID>" },
               { "clientSecret", "<Your Azure Client Secret>" },
            };
            // end-kmsproviders

            // start-datakeyopts
            kmsProviders.Add(provider, azureKmsOptions);
            var dataKeyOptions = new DataKeyOptions(
            masterKey: new BsonDocument
            {
               { "keyName", "<Your Azure Key Name>" },
               { "keyVaultEndpoint", "<Your Azure Key Vault Endpoint>" },
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
