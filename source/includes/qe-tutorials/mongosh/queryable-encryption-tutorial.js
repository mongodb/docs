var qeHelper = require("./queryable-encryption-helpers.js")

async function runExample() {
  // start-setup-application-variables
  // KMS provider name should be one of the following: "aws", "gcp", "azure", "kmip" or "local"
  const kmsProviderName = "<Your KMS Provider Name>";

  const uri = process.env.MONGODB_URI; // Your connection URI

  const keyVaultDatabaseName = "encryption";
  const keyVaultCollectionName = "__keyVault";
  const keyVaultNamespace = `${keyVaultDatabaseName}.${keyVaultCollectionName}`;
  const encryptedDatabaseName = "medicalRecords";
  const encryptedCollectionName = "patients";
  // end-setup-application-variables

  const kmsProviderCredentials = qeHelper.getKMSProviderCredentials(kmsProviderName);

  const autoEncryptionOpts = await qeHelper.getAutoEncryptionOptions(
    kmsProviderName,
    keyVaultNamespace,
    kmsProviderCredentials
  );
  autoEncryptionOpts.bypassQueryAnalysis = false
  
  // start-encrypted-fields-map
  const encryptedFieldsMap = {
    encryptedFields: {
      fields: [
        {
          path: "patientRecord.ssn",
          bsonType: "string",
          queries: { queryType: "equality" },
        },
        {
          path: "patientRecord.billing",
          bsonType: "object",
        },
      ],
    },
  };
  // end-encrypted-fields-map
  autoEncryptionOpts.encryptedFieldsMap = encryptedFieldsMap
  
  // start-create-client
  const encryptedClient = Mongo(uri, autoEncryptionOpts);
  // end-create-client

  await qeHelper.dropExistingCollection(
    encryptedClient,
    encryptedDatabaseName
  );
  await qeHelper.dropExistingCollection(encryptedClient, keyVaultDatabaseName);

  // start-insert-document
  const patientDocument = {
    patientName: "Jon Doe",
    patientId: 12345678,
    patientRecord: {
      ssn: "987-65-4320",
      billing: {
        type: "Visa",
        number: "4111111111111111",
      },
    },
  };

  const encryptedCollection = encryptedClient.getDB(encryptedDatabaseName).getCollection(encryptedCollectionName);

  const insertResult = await encryptedCollection.insertOne(patientDocument);

  try {
    assert(insertResult.acknowledged == true)
  } catch(err) {
    console.error(err);
  }
  // end-insert-document

  // start-find-document
  const findResult = await encryptedCollection.findOne({
    "patientRecord.ssn": "987-65-4320",
  });
  console.log(findResult);
  // end-find-document

  await encryptedClient.close();
}

runExample().catch(console.dir);
