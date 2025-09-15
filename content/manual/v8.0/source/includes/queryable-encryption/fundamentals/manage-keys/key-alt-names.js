const encryption = new ClientEncryption(client, {
  keyVaultNamespace,
  kmsProviders,
});
const masterKey = {
  "<Your dataKeyOpts Key>": "<Your dataKeyOpts Value>",
};
const key = await encryption.createDataKey(provider, {
  masterKey: masterKey,
  keyAltNames: ["<Your Key Alt Name>"],
});
