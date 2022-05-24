var ClientSideFieldLevelEncryptionOptions =
{
   "keyVaultClient" : keyVaultClient,
   "keyVaultNamespace" : "<database>.<collection>",
   "kmsProviders" : { ... },
   "schemaMap" : { ... }
}

cluster = Mongo(
  "mongodb://myhostexample.net:27017/?replicaSet=myReplicaSet",
  ClientSideFieldLevelEncryptionOptions
);
