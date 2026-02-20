import 'dotenv/config';
import mongoose from 'mongoose';
import * as qeHelper from './queryable-encryption-helpers.js';
import { MongoClient, ClientEncryption } from 'mongodb';

async function runExample() {
  // Paste initial application variables below
  // start-setup-application-variables
  const kmsProviderName = '<KMS provider>';

  const uri = process.env.MONGODB_URI; // Your connection URI

  const keyVaultDatabaseName = 'encryption';
  const keyVaultCollectionName = '__keyVault';
  const keyVaultNamespace = `${keyVaultDatabaseName}.${keyVaultCollectionName}`;
  const encryptedDatabaseName = 'medicalRecords';
  const encryptedCollectionName = 'patients';
  // end-setup-application-variables

  // Paste credential and options variables below
  // start-credentials
  const kmsProviderCredentials =
    qeHelper.getKMSProviderCredentials(kmsProviderName);
  const customerMasterKeyCredentials =
    qeHelper.getCustomerMasterKeyCredentials(kmsProviderName);

  const autoEncryptionOptions = await qeHelper.getAutoEncryptionOptions(
    kmsProviderName,
    keyVaultNamespace,
    kmsProviderCredentials
  );
  // end-credentials

  // Paste connection and client configuration below
  // start-connection-setup
  const connection = mongoose.createConnection();

  const client = new MongoClient(uri);
  const clientEncryption = new ClientEncryption(
    client,
    autoEncryptionOptions
  );

  await qeHelper.dropExistingDatabase(client, encryptedDatabaseName);
  await qeHelper.dropExistingDatabase(client, keyVaultDatabaseName);
  // end-connection-setup

  // Paste data key creation code below
  // start-create-data-key
  const keyId1 = await clientEncryption.createDataKey(
      kmsProviderName, {
      masterKey: customerMasterKeyCredentials,
  });
  const keyId2 = await clientEncryption.createDataKey(
      kmsProviderName, {
      masterKey: customerMasterKeyCredentials,
  });
  const keyId3 = await clientEncryption.createDataKey(
      kmsProviderName, {
      masterKey: customerMasterKeyCredentials,
  });
  // end-create-data-key

  // Paste encryption schema below
  // start-define-encrypted-schema
  const patientSchema = new mongoose.Schema({
    patientName: {
      type: String,
      required: true
    },
    patientId: {
      type: Number,
      required: true
    },
    patientRecord: {
      ssn: {
        type: String,
        encrypt: {
          keyId: keyId1,
          queries: { queryType: 'equality' } 
        }
      },
      billing: {
        type: {
          type: String,
          encrypt: {
            keyId: keyId2,
          }
        },
        number: {
          type: String,
          encrypt: {
            keyId: keyId3
          }
        }
      },
      billAmount: Number
    }
  }, { 
    encryptionType: 'queryableEncryption',
    collection: encryptedCollectionName 
  });
  // end-define-encrypted-schema

  // Paste the model below
  // start-create-model
  const Patient = connection.model('Patient', patientSchema);
  // end-create-model

  // Paste connection code below
  // start-connect-db
  await connection.openUri(uri, { 
    autoEncryption: autoEncryptionOptions,
    dbName: encryptedDatabaseName
  });
  // end-connect-db

  // Paste the insertion operation below
  // start-insert-document
  const patientDocument = {
    patientName: 'Jon Doe',
    patientId: 12345678,
    patientRecord: {
      ssn: '987-65-4320',
      billing: {
        type: 'Visa',
        number: '4111111111111111',
      },
      billAmount: 1500,
    },
  };

  const result = await Patient.create(patientDocument);

  if (result) {
    console.log('Successfully inserted the patient document.');
    console.log('Document ID:', result._id);
  }
  // end-insert-document
  
  // Paste the encrypted query below
  // start-find-document
  const findResult = await Patient.findOne({
    'patientRecord.ssn': '987-65-4320',
  });
  console.log('Found patient:');
  console.log(findResult);
  // end-find-document

  await connection.close();
  console.log('Connection closed.');
}

runExample().catch(console.dir);
