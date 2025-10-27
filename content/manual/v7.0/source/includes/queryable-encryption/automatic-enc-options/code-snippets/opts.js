const secureClient = new MongoClient(connectionString, {
  monitorCommands: true,
  autoEncryption: {
    keyVaultNamespace,
    kmsProviders,
    bypassQueryAnalysis, // optional - defaults to false
    encryptedFieldsMap: patientSchema,
    extraOptions: extraOptions,
  },
});
