const secureClient = new MongoClient(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  monitorCommands: true,
  autoEncryption: {
    keyVaultNamespace,
    kmsProviders,
    bypassQueryAnalysis, // optional - defaults to false
    encryptedFieldsMap: patientSchema,
    extraOptions: extraOptions,
  },
});
