var database = "medicalRecords";
var collection = "patients";
var kmsProviders = {
  aws: {
    accessKeyId: process.env["AWS_ACCESS_KEY_ID"],
    secretAccessKey: process.env["AWS_SECRET_ACCESS_KEY"],
  },
};
var masterKey = {
  key: process.env["AWS_KEY_ARN"],
  region: process.env["AWS_KEY_REGION"],
};
var connectionString = process.env.DRIVER_URL;
var keyVaultNamespace = "encryption.__keyVault";

// start_mongoclient
var autoEncryptionOpts = {
  keyVaultNamespace: keyVaultNamespace,
  kmsProviders: kmsProviders,
};
var encryptedClient = Mongo(
  connectionString,
  autoEncryptionOpts
);
// end_mongoclient
// start_client_enc
var clientEncryption = encryptedClient.getClientEncryption();
// end_client_enc

var keyVault = encryptedClient.getKeyVault();
var keyId = keyVault.createKey("aws", masterKey);

// start_enc_and_insert
var encName = clientEncryption.encrypt(
  keyId,
  "Greg",
  "AEAD_AES_256_CBC_HMAC_SHA_512-Deterministic"
);
var encFoods = clientEncryption.encrypt(
  keyId,
  ["Cheese", "Grapes"],
  "AEAD_AES_256_CBC_HMAC_SHA_512-Random"
);
// end_enc_and_insert
// start_find_decrypt
db.getSiblingDB(database).getCollection(collection).insertOne({
  name: encName,
  foods: encFoods,
});

var encNameQuery = clientEncryption.encrypt(
  keyId,
  "Greg",
  "AEAD_AES_256_CBC_HMAC_SHA_512-Deterministic"
);
var doc = db.getSiblingDB(database).getCollection(collection).findOne({
  name: encNameQuery,
});
doc;
doc["name"] = clientEncryption.decrypt(doc["name"]);
doc["foods"] = clientEncryption.decrypt(doc["foods"]);
doc;
// end_find_decrypt
