import { MongoClient, Binary } from "mongodb";
import fs from "fs";
import * as config from "./config.js";

async function insert() {
  // start-json-schema
  const dekId = fs.readFileSync(config.dekIdPath, "utf8");
  const schema = {
    bsonType: "object",
    encryptMetadata: {
      keyId: [new Binary(Buffer.from(dekId, "base64"), 4)],
    },
    properties: {
      insurance: {
        bsonType: "object",
        properties: {
          policyNumber: {
            encrypt: {
              bsonType: "int",
              algorithm: "AEAD_AES_256_CBC_HMAC_SHA_512-Deterministic",
            },
          },
        },
      },
      medicalRecords: {
        encrypt: {
          bsonType: "array",
          algorithm: "AEAD_AES_256_CBC_HMAC_SHA_512-Random",
        },
      },
      bloodType: {
        encrypt: {
          bsonType: "string",
          algorithm: "AEAD_AES_256_CBC_HMAC_SHA_512-Random",
        },
      },
      ssn: {
        encrypt: {
          bsonType: "int",
          algorithm: "AEAD_AES_256_CBC_HMAC_SHA_512-Deterministic",
        },
      },
    },
  };

  const patientSchema = { "medicalRecords.patients": schema };
  // end-json-schema

  // start-create-client
  const secureClient = new MongoClient(config.connectionString, {
    autoEncryption: {
      keyVaultNamespace: config.keyVaultNamespace,
      kmsProviders: config.getKmsProviders(),
      schemaMap: patientSchema,
      extraOptions: {
        cryptSharedLibPath: config.cryptSharedLibPath,
      },
    },
  });
  const regularClient = new MongoClient(config.connectionString);
  // end-create-client

  // start-insert-document
  await secureClient.connect();
  const collection = secureClient
    .db("medicalRecords")
    .collection("patients");
  await collection.insertOne({
    name: "Jon Doe",
    ssn: 241014209,
    bloodType: "AB+",
    medicalRecords: [{ weight: 180, bloodPressure: "120/80" }],
    insurance: {
      policyNumber: 123142,
      provider: "MaestCare",
    },
  });
  // end-insert-document

  // start-find-document
  await regularClient.connect();

  console.log(
    "Finding a document with the regular (non-encrypted) client:"
  );
  console.log(
    await regularClient
      .db("medicalRecords")
      .collection("patients")
      .findOne({ name: "Jon Doe" })
  );

  console.log("\nFinding a document with the encrypted client:");
  console.log(
    await secureClient
      .db("medicalRecords")
      .collection("patients")
      .findOne({ name: "Jon Doe" })
  );

  await regularClient.close();
  await secureClient.close();
  // end-find-document
}

export { insert };
