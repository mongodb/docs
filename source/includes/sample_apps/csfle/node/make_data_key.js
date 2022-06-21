const mongodb = require("mongodb");
const { ClientEncryption } = require("mongodb-client-encryption");
const { MongoClient, Binary } = mongodb;

// :state-start: local-reader local-test
const fs = require("fs");
const crypto = require("crypto");
try {
  fs.writeFileSync("master-key.txt", crypto.randomBytes(96));
} catch (err) {
  console.error(err);
}
// :state-end:

// start-kmsproviders
// :state-start: local-reader local-test
const provider = "local";
const path = "./master-key.txt";
const localMasterKey = fs.readFileSync(path);
const kmsProviders = {
  local: {
    key: localMasterKey,
  },
};
// :state-end:
// :state-uncomment-start: aws-reader
//const provider = "aws";
//const kmsProviders = {
//  aws: {
//    accessKeyId: "<Your AWS Access Key ID>",
//    secretAccessKey: "<Your AWS Secret Access Key>",
//  },
//};
// :state-uncomment-end:
// :state-uncomment-start: aws-test
//const provider = "aws";
//const kmsProviders = {
//  aws: {
//    accessKeyId: process.env["AWS_ACCESS_KEY_ID"],
//    secretAccessKey: process.env["AWS_SECRET_ACCESS_KEY"],
//  },
//};
// :state-uncomment-end:
// :state-uncomment-start: azure-reader
//const provider = "azure";
//const kmsProviders = {
//  azure: {
//    tenantId: "<Your Tenant ID>",
//    clientId: "<Your Client ID>",
//    clientSecret: "<Your Client Secret>",
//  },
//};
// :state-uncomment-end:
// :state-uncomment-start: azure-test
//const provider = "azure";
//const kmsProviders = {
//  azure: {
//    tenantId: process.env["AZURE_TENANT_ID"],
//    clientId: process.env["AZURE_CLIENT_ID"],
//    clientSecret: process.env["AZURE_CLIENT_SECRET"],
//  },
//};
// :state-uncomment-end:
// :state-uncomment-start: gcp-reader
//const provider = "gcp";
//const kmsProviders = {
//  gcp: {
//    email: "<Your GCP Email>",
//    privateKey: "<Your GCP Private Key>",
//  },
//};
// :state-uncomment-end:
// :state-uncomment-start: gcp-test
//const provider = "gcp";
//const kmsProviders = {
//  gcp: {
//    email: process.env["GCP_EMAIL"],
//    privateKey: process.env["GCP_PRIVATE_KEY"],
//  },
//};
// :state-uncomment-end:
// end-kmsproviders

// start-datakeyopts
// :state-start: local-reader local-test
// :state-end:
// :state-uncomment-start: aws-reader
//const masterKey = {
//  key: "<Your AWS Key ARN>",
//  region: "<Your AWS Key Region>",
//};
// :state-uncomment-end:
// :state-uncomment-start: aws-test
//const masterKey = {
//  key: process.env["AWS_KEY_ARN"],
//  region: process.env["AWS_KEY_REGION"],
//};
// :state-uncomment-end:
// :state-uncomment-start: azure-reader
//const masterKey = {
//  keyVaultEndpoint: "<Your Key Vault Endpoint>",
//  keyName: "<Your Key Name>",
//};
// :state-uncomment-end:
// :state-uncomment-start: azure-test
//const masterKey = {
//  keyVaultEndpoint: process.env["AZURE_KEY_VAULT_ENDPOINT"],
//  keyName: process.env["AZURE_KEY_NAME"],
//};
// :state-uncomment-end:
// :state-uncomment-start: gcp-reader
//const masterKey = {
//  projectId: "<Your Project ID>",
//  location: "<Your Key Location>",
//  keyRing: "<Your Key Ring>",
//  keyName: "<Your Key Name>",
//};
// :state-uncomment-end:
// :state-uncomment-start: gcp-test
//const masterKey = {
//  projectId: process.env["GCP_PROJECT_ID"],
//  location: process.env["GCP_LOCATION"],
//  keyRing: process.env["GCP_KEY_RING"],
//  keyName: process.env["GCP_KEY_NAME"],
//};
// :state-uncomment-end:
// end-datakeyopts

// start-create-dek
// :state-start: local-reader aws-reader azure-reader gcp-reader
// :uncomment-start:
//const connectionString = "<Your Connection String>";
// :uncomment-end:
// :state-end:
// :state-start: local-test aws-test azure-test gcp-test
const connectionString = process.env.MONGODB_URI;
// :state-end:
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
    // :state-uncomment-start: local-reader
    //const key = await encryption.createDataKey(provider);
    // :state-uncomment-end:
    // :state-start: local-test
    const key = await encryption.createDataKey(provider, {
      keyAltNames: ["demo-data-key"],
    });
    // :state-end:
    // :state-start: aws-reader azure-reader gcp-reader
    // :uncomment-start:
    //const key = await encryption.createDataKey(
    //  provider,
    //  { masterKey: masterKey },
    //);
    // :uncomment-end:
    // :state-end:
    // :state-start: aws-test azure-test gcp-test
    // :uncomment-start:
    //const key = await encryption.createDataKey(
    //  provider,
    //  { masterKey: masterKey, keyAltNames: ["demo-data-key"] }
    //);
    // :uncomment-end:
    // :state-end:
    console.log("DataKeyId [base64]: ", key.toString("base64"));
  } finally {
    await client.close();
  }
}
main();
// end-create-dek
