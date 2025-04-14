const { MongoClient, Binary } = require("mongodb");

// start-key-vault
const eDB = "encryption";
const eKV = "__keyVault";
const keyVaultNamespace = `${eDB}.${eKV}`;
// end-key-vault

// start-kmsproviders
const provider = "kmip";
const kmsProviders = {
  kmip: {
    endpoint: "<endpoint for your KMIP-compliant key provider>",
  },
};
// end-kmsproviders

async function run() {
  // start-schema
  const uri = "<Your Connection String>";
  const unencryptedClient = new MongoClient(uri);
  await unencryptedClient.connect();
  const keyVaultClient = unencryptedClient.db(eDB).collection(eKV);

  const dek1 = await keyVaultClient.findOne({ keyAltNames: "dataKey1" });
  const dek2 = await keyVaultClient.findOne({ keyAltNames: "dataKey2" });
  const dek3 = await keyVaultClient.findOne({ keyAltNames: "dataKey3" });
  const dek4 = await keyVaultClient.findOne({ keyAltNames: "dataKey4" });

  const secretDB = "medicalRecords";
  const secretCollection = "patients";

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

  // start-create-tls
  const tlsOptions = {
    kmip: {
      tlsCAFile:
        "<path to file containing your Certificate Authority certificate>",
      tlsCertificateKeyFile: "<path to your client certificate file>",
    },
  };
  // end-create-tls

  // start-extra-options
  const extraOptions = {
    cryptSharedLibPath: "<path to FLE Shared Library>",
  };
  // end-extra-options

  // start-client
  const encryptedClient = new MongoClient(uri, {
    autoEncryption: {
      keyVaultNamespace: keyVaultNamespace,
      kmsProviders: kmsProviders,
      extraOptions: extraOptions,
      encryptedFieldsMap: encryptedFieldsMap,
      tlsOptions,
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
