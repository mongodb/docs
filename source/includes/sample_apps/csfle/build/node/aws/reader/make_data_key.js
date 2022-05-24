const mongodb = require("mongodb");
const { ClientEncryption } = require("mongodb-client-encryption");
const { MongoClient, Binary } = mongodb;

// start-kmsproviders
const provider = "aws";
const kmsProviders = {
  aws: {
    accessKeyId: "<Your AWS Access Key ID>",
    secretAccessKey: "<Your AWS Secret Access Key>",
  },
};
// end-kmsproviders

// start-datakeyopts
const masterKey = {
  key: "<Your AWS Key ARN>",
  region: "<Your AWS Key Region>",
};
// end-datakeyopts

// start-create-dek
const base64 = require("base64-js");
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
    const base64DataKeyId = key.toString("base64");
    const uuidDataKeyId = base64.fromByteArray(base64DataKeyId);
    console.log("DataKeyId [base64]: ", base64DataKeyId);
  } finally {
    await client.close();
  }
}
main();
// end-create-dek
