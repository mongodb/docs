var ClientSideFieldLevelEncryptionOptions = {
  keyVaultNamespace: keyVaultNamespace,
  kmsProviders: kmsProviders,
  bypassAutoEncryption: true,
};
var encryptedClient = Mongo(
  connectionString,
  ClientSideFieldLevelEncryptionOptions
);
