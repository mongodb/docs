var autoEncryptionOpts = {
  keyVaultNamespace: keyVaultNamespace,
  kmsProviders: kmsProviders,
};
var encryptedClient = Mongo(
  connectionString,
  autoEncryptionOpts
);
var clientEncryption = encryptedClient.getClientEncryption();
var masterKey = {
  "<Your dataKeyOpts Key>": "<Your dataKeyOpts Value>",
};
var keyVault = encryptedClient.getKeyVault();
var keyId = keyVault.createKey("aws", masterKey, ["<Your Key Alt Name>"]);
