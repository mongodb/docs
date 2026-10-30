// :replace-start: {
//   "terms": {
//     "process.env.CONNECTION_STRING": "'<connection string uri>'",
//     "{ keyAltNames: 'my-key' }": "{ '<filter field>': '<filter value>' }",
//     "provider: 'local'": "provider: '<KMS provider>'",
//     "masterKey: {}": "masterKey: { '<dataKeyOpts Key>': '<dataKeyOpts Value>' }"
//   }
// }
import { ClientEncryption, MongoClient } from 'mongodb';

export async function rewrapDataKeys(kmsProviders, keyVaultNamespace) {
  // :snippet-start: rewrap-data-key
  const keyVaultClient = new MongoClient(process.env.CONNECTION_STRING);

  try {
    const clientEncryption = new ClientEncryption(keyVaultClient, {
      keyVaultNamespace,
      kmsProviders,
    });

    const filter = { keyAltNames: 'my-key' };

    const result = await clientEncryption.rewrapManyDataKey(filter, {
      provider: 'local',
      masterKey: {},
    });
    return result; // :remove:
  } finally {
    await keyVaultClient.close();
  }
  // :snippet-end:
}
// :replace-end:
