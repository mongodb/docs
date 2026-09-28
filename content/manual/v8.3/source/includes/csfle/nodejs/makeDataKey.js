import { MongoClient, ClientEncryption } from "mongodb";
import fs from "fs";
import crypto from "crypto";
import * as config from "./config.js";

// start-generate-cmk
fs.writeFileSync(config.masterKeyPath, crypto.randomBytes(96));
// end-generate-cmk

async function makeKey() {
  // start-create-index
  const keyVaultClient = new MongoClient(config.connectionString);
  await keyVaultClient.connect();
  const keyVaultDb = keyVaultClient.db("encryption");
  await keyVaultDb.dropDatabase();
  await keyVaultClient.db("medicalRecords").dropDatabase();
  const keyVaultColl = keyVaultDb.collection("__keyVault");
  await keyVaultColl.createIndex(
    { keyAltNames: 1 },
    {
      unique: true,
      partialFilterExpression: { keyAltNames: { $exists: true } },
    }
  );
  await keyVaultClient.close();
  // end-create-index

  // start-create-data-key
  const client = new MongoClient(config.connectionString);
  await client.connect();
  const encryption = new ClientEncryption(client, {
    keyVaultNamespace: config.keyVaultNamespace,
    kmsProviders: config.getKmsProviders(),
  });
  const key = await encryption.createDataKey("local");
  const base64DekId = key.toString("base64");
  console.log("DataKeyId [base64]: ", base64DekId);
  fs.writeFileSync(config.dekIdPath, base64DekId);
  await client.close();
  // end-create-data-key
}

export { makeKey };
