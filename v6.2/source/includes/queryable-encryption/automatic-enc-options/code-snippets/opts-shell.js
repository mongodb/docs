var AutoEncryptionOpts =
{
   "keyVaultClient" : keyVaultClient,
   "keyVaultNamespace" : "<database>.<collection>",
   "kmsProviders" : { ... },
   "bypassQueryAnalysis": "<boolean value>", // optional - defaults to false
   "encryptedFieldsMap" : { ... }
}

cluster = Mongo(
  "mongodb://myhostexample.net:27017/?replicaSet=myReplicaSet",
  AutoEncryptionOpts
);
