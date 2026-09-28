const database = "medicalRecords";
const collection = "patients";
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
const connectionString = process.env.DRIVER_URL;
const keyVaultNamespace = "encryption.__keyVault";

// start_mongoclient
const autoEncryptionOpts = {
  keyVaultNamespace: keyVaultNamespace,
  kmsProviders: kmsProviders,
};
const encryptedClient = Mongo(connectionString, autoEncryptionOpts);
// end_mongoclient
// start_client_enc
const clientEncryption = encryptedClient.getClientEncryption();
// end_client_enc

const keyVault = encryptedClient.getKeyVault();
const dataKeyId = keyVault.createKey("aws", masterKey);

// start_enc_and_insert
const encName = clientEncryption.encrypt(
  dataKeyId,
  "Greg",
  "AEAD_AES_256_CBC_HMAC_SHA_512-Deterministic"
);
const encFoods = clientEncryption.encrypt(
  dataKeyId,
  ["Cheese", "Grapes"],
  "AEAD_AES_256_CBC_HMAC_SHA_512-Random"
);
db.getSiblingDB(database).getCollection(collection).insertOne({
  name: encName,
  foods: encFoods,
});
// end_enc_and_insert
// start_find_decrypt
const encNameQuery = clientEncryption.encrypt(
  dataKeyId,
  "Greg",
  "AEAD_AES_256_CBC_HMAC_SHA_512-Deterministic"
);
let doc = db.getSiblingDB(database).getCollection(collection).findOne({
  name: encNameQuery,
});
console.log(doc);
doc.name = clientEncryption.decrypt(doc.name);
doc.foods = clientEncryption.decrypt(doc.foods);
console.log(doc);
// end_find_decrypt
