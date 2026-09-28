// start-key-vault
const keyVaultDB = "encryption";
const keyVaultColl = "__keyVault";
const keyVaultNamespace = `${keyVaultDB}.${keyVaultColl}`;
const secretDB = "medicalRecords";
const secretCollection = "patients";
// end-key-vault

// start-kmsproviders
const kmsProviders = {
  azure: {
    tenantId: "<Your Tenant ID>",
    clientId: "<Your Client ID>",
    clientSecret: "<Your Client Secret>",
  },
};
// end-kmsproviders

async function run() {
  // start-schema
  const uri = "<Your Connection String>";
  const unencryptedClient = Mongo(uri);
  const autoEncryptionOpts = { kmsProviders, keyVaultNamespace };

  const encClient = Mongo(uri, autoEncryptionOpts);
  const keyVault = encClient.getKeyVault();
  const keyVaultClient = unencryptedClient
    .getDB(keyVaultDB)
    .getCollection(keyVaultColl);

  const dek1 = keyVaultClient.findOne({ keyAltNames: "dataKey1" });
  const dek2 = keyVaultClient.findOne({ keyAltNames: "dataKey2" });
  const dek3 = keyVaultClient.findOne({ keyAltNames: "dataKey3" });
  const dek4 = keyVaultClient.findOne({ keyAltNames: "dataKey4" });

  const secretDB = "medicalRecords";
  const secretColl = "patients";

  const encryptedFieldsMap = {
    [`${secretDB}.${secretColl}`]: {
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
  // end-extra-options

  // start-client
  const autoEncryptionOptions = {
    keyVaultNamespace: keyVaultNamespace,
    kmsProviders: kmsProviders,
    bypassQueryAnalysis: false,
    encryptedFieldsMap: encryptedFieldsMap,
  };

  const encryptedClient = Mongo(uri, autoEncryptionOptions);
  const encryptedColl = encryptedClient
    .getDB(secretDB)
    .getCollection(secretColl);
  const unencryptedColl = unencryptedClient
    .getDB(secretDB)
    .getCollection(secretColl);
  // end-client

  try {
    // start-insert
    encryptedColl.insertOne({
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
    console.log(unencryptedColl.findOne({ firstName: /Jon/ }));
    console.log(
      "Finding a document with encrypted client, searching on an encrypted field"
    );
    console.log(encryptedColl.findOne({ "patientRecord.ssn": "987-65-4320" }));
    // end-find
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
}

run().catch(console.dir);
