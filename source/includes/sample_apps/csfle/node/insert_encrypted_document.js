const mongodb = require("mongodb");
const { ClientEncryption } = require("mongodb-client-encryption");
const { MongoClient, Binary } = mongodb;

var db = "medicalRecords";
var coll = "patients";
var namespace = `${db}.${coll}`;
// start-kmsproviders
// :state-start: local-reader local-test
const fs = require("fs");
const provider = "local";
const path = "./master-key.txt";
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

// :state-start: local-reader aws-reader azure-reader gcp-reader
// :uncomment-start:
//const connectionString = "<Your Connection String>";
// :uncomment-end:
// :state-end:
// :state-start: local-test aws-test azure-test gcp-test
const connectionString = process.env.MONGODB_URI;
// :state-end:

// start-key-vault
const keyVaultNamespace = "encryption.__keyVault";
// end-key-vault


// start-schema
// :state-start: local-reader aws-reader azure-reader gcp-reader
// :uncomment-start:
//dataKey = "<Your base64 DEK ID>";
//const schema = {
//    bsonType: "object",
//    encryptMetadata: {
//      keyId: [new Binary(Buffer.from(dataKey, "base64"), 4)],
//    },
//    properties: {
//      insurance: {
//        bsonType: "object",
//        properties: {
//          policyNumber: {
//            encrypt: {
//              bsonType: "int",
//              algorithm: "AEAD_AES_256_CBC_HMAC_SHA_512-Deterministic",
//            },
//          },
//        },
//      },
//      medicalRecords: {
//        encrypt: {
//          bsonType: "array",
//          algorithm: "AEAD_AES_256_CBC_HMAC_SHA_512-Random",
//        },
//      },
//      bloodType: {
//        encrypt: {
//          bsonType: "string",
//          algorithm: "AEAD_AES_256_CBC_HMAC_SHA_512-Random",
//        },
//      },
//      ssn: {
//        encrypt: {
//          bsonType: "int",
//          algorithm: "AEAD_AES_256_CBC_HMAC_SHA_512-Deterministic",
//        },
//      },
//    },
//  };
// :uncomment-end:
// :state-end:
// :state-start: local-test aws-test azure-test gcp-test
const schema = {
  bsonType: "object",
  encryptMetadata: {
    keyId: "/key-id",
  },
  properties: {
    insurance: {
      bsonType: "object",
      properties: {
        policyNumber: {
          encrypt: {
            bsonType: "int",
            algorithm: "AEAD_AES_256_CBC_HMAC_SHA_512-Random",
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
        algorithm: "AEAD_AES_256_CBC_HMAC_SHA_512-Random",
      },
    },
  },
};
// :state-end:
var patientSchema = {};
patientSchema[namespace] = schema;
// end-schema

// start-extra-options
// :state-start: aws-reader azure-reader local-reader gcp-reader
// :uncomment-start:
//const extraOptions = {
//  mongocryptdSpawnPath: '/usr/local/bin/mongocryptd',
//};
// :uncomment-end:
// :state-end:
// :state-start: aws-test azure-test local-test gcp-test
const extraOptions = {
  mongocryptdSpawnPath: process.env["MONGCRYPTD_PATH"],
};
// :state-end:
// end-extra-options


// start-client
const secureClient = new MongoClient(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  autoEncryption: {
    keyVaultNamespace,
    kmsProviders,
    schemaMap: patientSchema,
    extraOptions: extraOptions,
  },
});
// end-client
const regularClient = new MongoClient(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function main() {
  try {
    await regularClient.connect();
    try{
    await secureClient.connect();
    // start-insert
    try {
      const writeResult = await secureClient.db(db).collection(coll).insertOne({
        name: "Jon Doe",
        ssn: 241014209,
        bloodType: "AB+",
        // :state-start: local-test aws-test azure-test gcp-test
        "key-id": "demo-data-key",
        // :state-end:
        medicalRecords: [{ weight: 180, bloodPressure: "120/80" }],
        insurance: {
          policyNumber: 123142,
          provider:  "MaestCare",
        },
      });
    } catch (writeError) {
      console.error("writeError occurred:", writeError);
    }
    // end-insert
    // start-find
    console.log("Finding a document with regular (non-encrypted) client.");
    console.log(await regularClient.db(db).collection(coll).findOne({ name: /Jon/ }));
    console.log(
      "Finding a document with encrypted client, searching on an encrypted field"
    );
    console.log(
      // :state-start: local-reader aws-reader azure-reader gcp-reader
      // :uncomment-start:
      //await secureClient.db(db).collection(coll).findOne({ ssn: "241014209" })
      // :uncomment-end:
      // :state-end:
      // :state-start: local-test aws-test azure-test gcp-test
      await secureClient.db(db).collection(coll).findOne({ name: /Jon/ })
      // :state-end:
      );
    // end-find
    } finally {
      await secureClient.close();
    }
  } finally {
    await regularClient.close();
  }
}
main();
