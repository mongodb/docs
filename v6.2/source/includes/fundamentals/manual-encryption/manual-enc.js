const mongodb = require("mongodb");
const { ClientEncryption } = require("mongodb-client-encryption");
const { MongoClient, Binary } = mongodb;

const db = "medicalRecords";
const coll = "patients";

// start-specify-credentials
const provider = "aws";
const kmsProviders = {
  aws: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
};
const masterKey = {
  key: process.env.AWS_KEY_ARN,
  region: process.env.AWS_KEY_REGION,
};
// end-specify-state

// start-create-dek
const connectionString = process.env.MONGODB_URI;
const keyVaultNamespace = "encryption.__keyVault";
// start_mongoclient
const client = new MongoClient(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
//end_mongoclient

async function main() {
  try {
    await client.connect();
    // start_client_enc
    const collection = client.db(db).collection(coll);
    const encryption = new ClientEncryption(client, {
      keyVaultNamespace,
      kmsProviders,
    });
    // end_client_enc
    const dataKeyId = await encryption.createDataKey(provider, {
      masterKey: masterKey,
      keyAltNames: ["manual-enc-demo"],
    });
    console.log(dataKeyId);
    // start_enc_and_insert
    encryptedName = await encryption.encrypt("Greg", {
      algorithm: "AEAD_AES_256_CBC_HMAC_SHA_512-Deterministic",
      keyId: dataKeyId,
    });
    encryptedFoods = await encryption.encrypt(["Cheese", "Grapes"], {
      algorithm: "AEAD_AES_256_CBC_HMAC_SHA_512-Random",
      keyId: dataKeyId,
    });
    await collection.insertOne({
      name: encryptedName,
      age: 83,
      foods: encryptedFoods,
    });
    // end_enc_and_insert
    // start_find_decrypt
    queryEncryptedName = await encryption.encrypt("Greg", {
      algorithm: "AEAD_AES_256_CBC_HMAC_SHA_512-Deterministic",
      keyId: dataKeyId,
    });
    let doc = await collection.findOne({ name: queryEncryptedName });
    console.log("Encrypted Document: ", doc);
    doc.name = encryption.decrypt(doc.name);
    doc.foods = encryption.decrypt(doc.foods);
    console.log("Decrypted document: ", doc);
    // end_find_decrypt
  } finally {
    await client.close();
  }
}
main();
// end-create-dek
