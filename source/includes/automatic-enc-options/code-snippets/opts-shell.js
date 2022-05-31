var ClientSideFieldLevelEncryptionOptions =
{
   "keyVaultNamespace" : "<database>.<collection>",
   "kmsProviders" : { ... },
   "schemaMap" : { ... }
}

cluster = Mongo(
  "<Your Connection String>",
  ClientSideFieldLevelEncryptionOptions
);
