const keyVaultClient = new MongoClient('<connection string uri>');

try {
  const clientEncryption = new ClientEncryption(keyVaultClient, {
    keyVaultNamespace,
    kmsProviders,
  });

  const filter = { '<filter field>': '<filter value>' };

  const result = await clientEncryption.rewrapManyDataKey(filter, {
    provider: '<KMS provider>',
    masterKey: { '<dataKeyOpts Key>': '<dataKeyOpts Value>' },
  });
} finally {
  await keyVaultClient.close();
}
