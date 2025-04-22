var autoEncryptionOpts = {
  keyVaultNamespace: keyVaultNamespace,
  kmsProviders: kmsProviders,
  bypassAutoEncryption: true,
};
var encryptedClient = Mongo(
  connectionString,
  autoEncryptionOpts
);
