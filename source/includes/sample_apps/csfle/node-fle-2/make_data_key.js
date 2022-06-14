const { MongoClient, Binary } = require("mongodb");
const { ClientEncryption } = require("mongodb-client-encryption");

const eDB = "encryption";
const eKV = "__keyVault";
const keyVaultNamespace = `${eDB}.${eKV}`;
const secretDB = "medicalRecords";
const secretCollection = "patients";

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
// WARNING: Do not use a local key file in a production application
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

async function run() {
  // start-create-index
  // :state-start: local-reader aws-reader azure-reader gcp-reader
  // :uncomment-start:
  //const uri = "<Your Connection String>";
  // :uncomment-end:
  // :state-end:
  // :state-start: local-test aws-test azure-test gcp-test
  const uri = process.env.MONGODB_URI;
  // :state-end:
  const keyVaultClient = new MongoClient(uri);
  await keyVaultClient.connect();
  // :state-start: local-test aws-test azure-test gcp-test
  const keyVaultDB = keyVaultClient.db(eDB);
  await keyVaultDB.dropDatabase();
  const keyVaultColl = keyVaultDB.collection(eKV);
  // :state-end:
  await keyVaultColl.createIndex(
    { keyAltNames: 1 },
    {
      unique: true,
      partialFilterExpression: { keyAltNames: { $exists: true } },
    }
  );
  // end-create-index
  // start-create-dek
  const clientEnc = new ClientEncryption(keyVaultClient, {
    keyVaultNamespace: keyVaultNamespace,
    kmsProviders: kmsProviders,
  });
  const dek1 = await clientEnc.createDataKey(provider, {
    // :state-start: aws-test aws-reader azure-test azure-reader gcp-test gcp-reader
    // :uncomment-start:
    //masterKey: masterKey,
    // :uncomment-end:
    // :state-end:
    keyAltNames: ["dataKey1"],
  });
  const dek2 = await clientEnc.createDataKey(provider, {
    // :state-start: aws-test aws-reader azure-test azure-reader gcp-test gcp-reader
    // :uncomment-start:
    //masterKey: masterKey,
    // :uncomment-end:
    // :state-end:
    keyAltNames: ["dataKey2"],
  });
  const dek3 = await clientEnc.createDataKey(provider, {
    // :state-start: aws-test aws-reader azure-test azure-reader gcp-test gcp-reader
    // :uncomment-start:
    //masterKey: masterKey,
    // :uncomment-end:
    // :state-end:
    keyAltNames: ["dataKey3"],
  });
  const dek4 = await clientEnc.createDataKey(provider, {
    // :state-start: aws-test aws-reader azure-test azure-reader gcp-test gcp-reader
    // :uncomment-start:
    //masterKey: masterKey,
    // :uncomment-end:
    // :state-end:
    keyAltNames: ["dataKey4"],
  });
  // end-create-dek

  // start-create-enc-collection
  const encryptedFieldsMap = {
    [`${secretDB}.${secretCollection}`]: {
      fields: [
        {
          keyId: dek1,
          path: "patientId",
          bsonType: "int",
          queries: { queryType: "equality" },
        },
        {
          keyId: dek2,
          path: "medications",
          bsonType: "array",
        },
        {
          keyId: dek3,
          path: "patientRecord.ssn",
          bsonType: "string",
          queries: { queryType: "equality" },
        },
        {
          keyId: dek4,
          path: "patientRecord.billing",
          bsonType: "object",
        },
      ],
    },
  };
  const extraOptions = {
    // :state-start: local-test aws-test azure-test gcp-test
    cryptSharedLibPath: process.env["SHARED_LIB_PATH"],
    // :state-end:
    // :state-start: local-reader aws-reader azure-reader gcp-reader
    // :uncomment-start:
    // cryptSharedLibPath: "<path to FLE Shared Library>",
    // :uncomment-end:
    // :state-end:
  };
  const encClient = new MongoClient(uri, {
    autoEncryption: {
      keyVaultNamespace,
      kmsProviders,
      extraOptions,
      encryptedFieldsMap,
    },
  });
  await encClient.connect();
  const newEncDB = encClient.db(secretDB);
  await newEncDB.dropDatabase();
  await newEncDB.createCollection(secretCollection);
  console.log("Created encrypted collection!");
  // end-create-enc-collection
  await keyVaultClient.close();
  await encClient.close();
}

run().catch(console.dir);
