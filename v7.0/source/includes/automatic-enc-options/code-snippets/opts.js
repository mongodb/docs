const secureClient = new MongoClient(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  monitorCommands: true,
  autoEncryption: {
    keyVaultNamespace,
    kmsProviders,
    schemaMap: patientSchema,
    extraOptions: extraOptions,
  },
});
