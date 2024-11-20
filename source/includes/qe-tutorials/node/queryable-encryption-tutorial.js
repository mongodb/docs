import "dotenv/config";
import { MongoClient } from "mongodb";
import * as qeHelper from "./queryable-encryption-helpers.js";

async function runExample() {
  // start-setup-application-variables
  const kmsProviderName = "<Your KMS Provider Name>";

  const uri = process.env.MONGODB_URI; // Your connection URI

  const keyVaultDatabaseName = "encryption";
  const keyVaultCollectionName = "__keyVault";
  const keyVaultNamespace = `${keyVaultDatabaseName}.${keyVaultCollectionName}`;
  const encryptedDatabaseName = "medicalRecords";
  const encryptedCollectionName = "patients";
  // end-setup-application-variables

  const kmsProviderCredentials =
    qeHelper.getKMSProviderCredentials(kmsProviderName);
  const customerMasterKeyCredentials =
    qeHelper.getCustomerMasterKeyCredentials(kmsProviderName);

  const autoEncryptionOptions = await qeHelper.getAutoEncryptionOptions(
    kmsProviderName,
    keyVaultNamespace,
    kmsProviderCredentials
  );

  // start-create-client
  const encryptedClient = new MongoClient(uri, {
    autoEncryption: autoEncryptionOptions,
  });
  // end-create-client

  await qeHelper.dropExistingCollection(encryptedClient, encryptedDatabaseName);
  await qeHelper.dropExistingCollection(encryptedClient, keyVaultDatabaseName);

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

  const clientEncryption = qeHelper.getClientEncryption(
    encryptedClient,
    autoEncryptionOptions
  );

  await qeHelper.createEncryptedCollection(
    clientEncryption,
    encryptedClient.db(encryptedDatabaseName),
    encryptedCollectionName,
    kmsProviderName,
    encryptedFieldsMap,
    customerMasterKeyCredentials
  );

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
      billAmount: 1500,
    },
  };

  const encryptedCollection = encryptedClient
    .db(encryptedDatabaseName)
    .collection(encryptedCollectionName);

  const result = await encryptedCollection.insertOne(patientDocument);
  // end-insert-document

  if (result.acknowledged) {
    console.log("Successfully inserted the patient document.");
  }

  // start-find-document
  const findResult = await encryptedCollection.findOne({
    "patientRecord.ssn": "987-65-4320",
  });
  console.log(findResult);
  // end-find-document

  await encryptedClient.close();
}

runExample().catch(console.dir);
