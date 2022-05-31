const mongodb = require("mongodb");
const { ClientEncryption } = require("mongodb-client-encryption");
const { MongoClient, Binary } = mongodb;

// start-kmsproviders
const provider = "azure";
const kmsProviders = {
  azure: {
    tenantId: "<Your Tenant ID>",
    clientId: "<Your Client ID>",
    clientSecret: "<Your Client Secret>",
  },
};
// end-kmsproviders

// start-datakeyopts
const masterKey = {
  keyVaultEndpoint: "<Your Key Vault Endpoint>",
  keyName: "<Your Key Name>",
};
// end-datakeyopts

// start-create-dek
const connectionString = "<Your Connection String>";
const keyVaultNamespace = "encryption.__keyVault";
const client = new MongoClient(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function main() {
  try {
    await client.connect();
    const encryption = new ClientEncryption(client, {
      keyVaultNamespace,
      kmsProviders,
    });
    const key = await encryption.createDataKey(provider, {
      masterKey: masterKey,
    });
    console.log("DataKeyId [base64]: ", key.toString("base64"));
  } finally {
    await client.close();
  }
}
main();
// end-create-dek
