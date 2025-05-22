const mongodb = require("mongodb");
const { MongoClient, Binary, ClientEncryption } = mongodb;

// start-kmsproviders
const provider = "kmip";
const kmsProviders = {
  kmip: {
    endpoint: "<endpoint for your KMIP-compliant key provider>",
  },
};
// end-kmsproviders

// start-datakeyopts
const masterKey = {}; // an empty key object prompts your KMIP-compliant key provider to generate a new Customer Master Key
// end-datakeyopts

async function main() {
  // start-create-index
  const uri = "<Your Connection String>";
  const keyVaultDatabase = "encryption";
  const keyVaultCollection = "__keyVault";
  const keyVaultNamespace = `${keyVaultDatabase}.${keyVaultCollection}`;
  const keyVaultClient = new MongoClient(uri);
  await keyVaultClient.connect();
  const keyVaultDB = keyVaultClient.db(keyVaultDatabase);
  // Drop the Key Vault Collection in case you created this collection
  // in a previous run of this application.
  await keyVaultDB.dropDatabase();
  // Drop the database storing your encrypted fields as all
  // the DEKs encrypting those fields were deleted in the preceding line.
  await keyVaultClient.db("medicalRecords").dropDatabase();
  const keyVaultColl = keyVaultDB.collection(keyVaultCollection);
  await keyVaultColl.createIndex(
    { keyAltNames: 1 },
    {
      unique: true,
      partialFilterExpression: { keyAltNames: { $exists: true } },
    }
  );
  // end-create-index

  // start-create-tls
  const tlsOptions = {
    kmip: {
      tlsCAFile:
        "<path to file containing your Certificate Authority certificate>",
      tlsCertificateKeyFile: "<path to your client certificate file>",
    },
  };
  // end-create-tls

  // start-create-dek
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  await client.connect();

  const encryption = new ClientEncryption(client, {
    keyVaultNamespace,
    kmsProviders,
    tlsOptions,
  });
  const key = await encryption.createDataKey(provider, {
    masterKey: masterKey,
  });
  console.log("DataKeyId [base64]: ", key.toString("base64"));
  await keyVaultClient.close();
  await client.close();
  // end-create-dek
}
main();
