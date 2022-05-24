var ClientSideFieldLevelEncryptionOptions = {
  keyVaultNamespace: keyVaultNamespace,
  kmsProviders: kmsProviders,
};
var encryptedClient = Mongo(
  connectionString,
  ClientSideFieldLevelEncryptionOptions
);
var clientEncryption = encryptedClient.getClientEncryption();
var masterKey = {
  "<Your dataKeyOpts Key>": "<Your dataKeyOpts Value>",
};
var keyVault = encryptedClient.getKeyVault();
var keyId = keyVault.createKey("aws", masterKey, ["<Your Key Alt Name>"]);
