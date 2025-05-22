const keyVaultDatabase = "encryption";
const keyVaultCollection = "__keyVault";
const keyVaultNamespace = `${keyVaultDatabase}.${keyVaultCollection}`;
const secretDB = "medicalRecords";
const secretCollection = "patients";

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

async function run() {
  // start-create-index
  const uri = "<Your Connection String>";
  const keyVaultClient = Mongo(uri);
  const keyVaultDB = keyVaultClient.getDB(keyVaultDatabase);
  // Drop the Key Vault Collection in case you created this collection
  // in a previous run of this application.
  keyVaultDB.dropDatabase();
  keyVaultDB.createCollection(keyVaultCollection);

  const keyVaultColl = keyVaultDB.getCollection(keyVaultCollection);
  keyVaultColl.createIndex(
    { keyAltNames: 1 },
    {
      unique: true,
      partialFilterExpression: { keyAltNames: { $exists: true } },
    }
  );
  // end-create-index

  // start-create-dek
  const autoEncryptionOpts = {
    keyVaultNamespace: keyVaultNamespace,
    kmsProviders: kmsProviders,
  };

  const encClient = Mongo(uri, autoEncryptionOpts);
  const keyVault = encClient.getKeyVault();

  const dek1 = keyVault.createKey(provider, {
    masterKey: masterKey,
    keyAltNames: ["dataKey1"],
  });
  const dek2 = keyVault.createKey(provider, {
    masterKey: masterKey,
    keyAltNames: ["dataKey2"],
  });
  const dek3 = keyVault.createKey(provider, {
    masterKey: masterKey,
    keyAltNames: ["dataKey3"],
  });
  const dek4 = keyVault.createKey(provider, {
    masterKey: masterKey,
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

  try {
    const autoEncryptionOptions = {
      keyVaultNamespace: keyVaultNamespace,
      kmsProviders: kmsProviders,
      encryptedFieldsMap: encryptedFieldsMap,
    };

    const encClient = Mongo(uri, autoEncryptionOptions);
    const newEncDB = encClient.getDB(secretDB);
    // Drop the encrypted collection in case you created this collection
    // in a previous run of this application.
    newEncDB.dropDatabase();
    newEncDB.createCollection(secretCollection);
    console.log("Created encrypted collection!");
    // end-create-enc-collection
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
}

run().catch(console.dir);
