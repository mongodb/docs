const { MongoClient, Binary } = require("mongodb");

const eDB = "encryption";
const eKV = "__keyVault";
// start-key-vault
const secretDB = "medicalRecords";
const secretCollection = "patients";
const keyVaultNamespace = `${eDB}.${eKV}`;
// end-key-vault

// start-kmsproviders
// :state-start: local-reader local-test
const fs = require("fs");
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
//const kmsProviders = {
//  aws: {
//    accessKeyId: "<Your AWS Access Key ID>",
//    secretAccessKey: "<Your AWS Secret Access Key>",
//  },
//};
// :state-uncomment-end:
// :state-uncomment-start: aws-test
//const kmsProviders = {
//  aws: {
//    accessKeyId: process.env["AWS_ACCESS_KEY_ID"],
//    secretAccessKey: process.env["AWS_SECRET_ACCESS_KEY"],
//  },
//};
// :state-uncomment-end:
// :state-uncomment-start: azure-reader
//const kmsProviders = {
//  azure: {
//    tenantId: "<Your Tenant ID>",
//    clientId: "<Your Client ID>",
//    clientSecret: "<Your Client Secret>",
//  },
//};
// :state-uncomment-end:
// :state-uncomment-start: azure-test
//const kmsProviders = {
//  azure: {
//    tenantId: process.env["AZURE_TENANT_ID"],
//    clientId: process.env["AZURE_CLIENT_ID"],
//    clientSecret: process.env["AZURE_CLIENT_SECRET"],
//  },
//};
// :state-uncomment-end:
// :state-uncomment-start: gcp-reader
//const kmsProviders = {
//  gcp: {
//    email: "<Your GCP Email>",
//    privateKey: "<Your GCP Private Key>",
//  },
//};
// :state-uncomment-end:
// :state-uncomment-start: gcp-test
//const kmsProviders = {
//  gcp: {
//    email: process.env["GCP_EMAIL"],
//    privateKey: process.env["GCP_PRIVATE_KEY"],
//  },
//};
// :state-uncomment-end:
// end-kmsproviders

async function run() {
  // start-schema
  // :state-start: local-reader aws-reader azure-reader gcp-reader
  // :uncomment-start:
  //const uri = "<Your Connection String>";
  // :uncomment-end:
  // :state-end:
  // :state-start: local-test aws-test azure-test gcp-test
  const uri = process.env.MONGODB_URI;
  // :state-end:
  const unencryptedClient = new MongoClient(uri);
  await unencryptedClient.connect();
  const keyVaultClient = unencryptedClient.db(eDB).collection(eKV);

  const dek1 = await keyVaultClient.findOne({ keyAltNames: "dataKey1" });
  const dek2 = await keyVaultClient.findOne({ keyAltNames: "dataKey2" });
  const dek3 = await keyVaultClient.findOne({ keyAltNames: "dataKey3" });
  const dek4 = await keyVaultClient.findOne({ keyAltNames: "dataKey4" });

  const encryptedFieldsMap = {
    [`${secretDB}.${secretCollection}`]: {
      fields: [
        {
          keyId: dek1._id,
          path: "patientId",
          bsonType: "int",
          queries: { queryType: "equality" },
        },
        {
          keyId: dek2._id,
          path: "medications",
          bsonType: "array",
        },
        {
          keyId: dek3._id,
          path: "patientRecord.ssn",
          bsonType: "string",
          queries: { queryType: "equality" },
        },
        {
          keyId: dek4._id,
          path: "patientRecord.billing",
          bsonType: "object",
        },
      ],
    },
  };
  // end-schema

  // start-extra-options
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
  // end-extra-options

  // start-client
  const encryptedClient = new MongoClient(uri, {
    autoEncryption: {
      keyVaultNamespace: keyVaultNamespace,
      kmsProviders: kmsProviders,
      extraOptions: extraOptions,
      encryptedFieldsMap: encryptedFieldsMap,
    },
  });
  await encryptedClient.connect();
  // end-client
  try {
    const unencryptedColl = unencryptedClient
      .db(secretDB)
      .collection(secretCollection);

    // start-insert
    const encryptedColl = encryptedClient
      .db(secretDB)
      .collection(secretCollection);
    await encryptedColl.insertOne({
      firstName: "Jon",
      lastName: "Doe",
      patientId: 12345678,
      address: "157 Electric Ave.",
      patientRecord: {
        ssn: "987-65-4320",
        billing: {
          type: "Visa",
          number: "4111111111111111",
        },
      },
      medications: ["Atorvastatin", "Levothyroxine"],
    });
    // end-insert
    // start-find
    console.log("Finding a document with regular (non-encrypted) client.");
    console.log(await unencryptedColl.findOne({ firstName: /Jon/ }));
    console.log(
      "Finding a document with encrypted client, searching on an encrypted field"
    );
    console.log(
      await encryptedColl.findOne({ "patientRecord.ssn": "987-65-4320" })
    );
    // end-find
  } finally {
    await unencryptedClient.close();
    await encryptedClient.close();
  }
}

run().catch(console.dir);
