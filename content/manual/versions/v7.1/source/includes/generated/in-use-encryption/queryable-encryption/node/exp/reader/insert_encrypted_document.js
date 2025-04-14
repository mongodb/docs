const { MongoClient } = require("mongodb");
const { ClientEncryption } = require("mongodb-client-encryption");

// start-key-vault
const eDB = "encryption";
const eKV = "__keyVault";
const keyVaultNamespace = `${eDB}.${eKV}`;
const secretDB = "medicalRecords";
const secretCollection = "patients";
// end-key-vault

// start-kmsproviders
const fs = require("fs");
const path = "./master-key.txt";
// WARNING: Do not use a local key file in a production application
const localMasterKey = fs.readFileSync(path);
const kmsProviders = {
  local: {
    key: localMasterKey,
  },
};
// end-kmsproviders

async function run() {
  // start-retrieve-deks
  const uri = "<Your MongoDB URI>";
  const unencryptedClient = new MongoClient(uri);
  await unencryptedClient.connect();
  const keyVaultClient = unencryptedClient.db(eDB).collection(eKV);
  const dek1 = await keyVaultClient.findOne({ keyAltNames: "dataKey1" });
  const dek2 = await keyVaultClient.findOne({ keyAltNames: "dataKey2" });
  // end-retrieve-deks

  // start-extra-options
  const extraOptions = {
    cryptSharedLibPath: "<path to crypt_shared library>",
  };
  // end-extra-options

  // start-client
  const encryptedClient = new MongoClient(uri, {
    autoEncryption: {
      kmsProviders: kmsProviders,
      keyVaultNamespace: keyVaultNamespace,
      bypassQueryAnalysis: true,
      keyVaultClient: unencryptedClient,
      extraOptions: extraOptions,
    },
  });
  await encryptedClient.connect();
  // end-client

  // start-client-enc
  const encryption = new ClientEncryption(unencryptedClient, {
    keyVaultNamespace,
    kmsProviders,
  });
  // end-client-enc

  try {
    // start-insert
    const patientId = 12345678;
    const medications = ["Atorvastatin", "Levothyroxine"];

    const indexedInsertPayload = await encryption.encrypt(patientId, {
      algorithm: "Indexed",
      keyId: dek1._id,
      contentionFactor: 1,
    });
    const unindexedInsertPayload = await encryption.encrypt(medications, {
      algorithm: "Unindexed",
      keyId: dek2._id,
    });
    const encryptedColl = encryptedClient
      .db(secretDB)
      .collection(secretCollection);
    await encryptedColl.insertOne({
      firstName: "Jon",
      patientId: indexedInsertPayload,
      medications: unindexedInsertPayload,
    });
    // end-insert
    // start-find
    const findPayload = await encryption.encrypt(patientId, {
      algorithm: "Indexed",
      keyId: dek1._id,
      queryType: "equality",
      contentionFactor: 1,
    });

    console.log("Finding a document with manually encrypted field:");
    console.log(await encryptedColl.findOne({ patientId: findPayload }));
    // end-find
  } finally {
    await unencryptedClient.close();
    await encryptedClient.close();
  }
}

run().catch(console.dir);
