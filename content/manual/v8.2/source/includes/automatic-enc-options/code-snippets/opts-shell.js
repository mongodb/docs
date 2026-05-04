var autoEncryptionOpts =
{
   "keyVaultNamespace" : "<database>.<collection>",
   "kmsProviders" : { ... },
   "schemaMap" : { ... }
}

cluster = Mongo(
  "<Your Connection String>",
  autoEncryptionOpts
);
