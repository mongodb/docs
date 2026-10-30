import { randomBytes } from 'crypto';
import { ClientEncryption, MongoClient } from 'mongodb';
import { rewrapDataKeys } from '../../examples/encryption/rewrap-many-data-key.js';
import Expect from '../../utils/Expect.js';

const keyVaultDbName = 'encryption';
const keyVaultCollectionName = '__keyVault';
const keyVaultNamespace = `${keyVaultDbName}.${keyVaultCollectionName}`;
const dataKeyAltName = 'my-key';

describe('rewrapManyDataKey tests', () => {
  let client;
  let kmsProviders;

  beforeEach(async () => {
    client = new MongoClient(process.env.CONNECTION_STRING);
    await client.db(keyVaultDbName).dropDatabase();
    kmsProviders = { local: { key: randomBytes(96) } };
  });

  afterEach(async () => {
    await client.db(keyVaultDbName).dropDatabase();
    await client.close();
  });

  async function getDataKey() {
    return client
      .db(keyVaultDbName)
      .collection(keyVaultCollectionName)
      .findOne({ keyAltNames: dataKeyAltName });
  }

  it('Should rewrap a matching DEK with new key material while preserving its ID', async () => {
    const clientEncryption = new ClientEncryption(client, {
      keyVaultNamespace,
      kmsProviders,
    });
    await clientEncryption.createDataKey('local', {
      keyAltNames: [dataKeyAltName],
    });
    const originalDataKey = await getDataKey();

    const result = await rewrapDataKeys(kmsProviders, keyVaultNamespace);

    const rewrappedDataKey = await getDataKey();

    Expect.that(result.bulkWriteResult.matchedCount).shouldMatch(1);
    Expect.that(
      rewrappedDataKey._id.toString('hex') ===
        originalDataKey._id.toString('hex')
    ).shouldMatch(true);
    Expect.that(
      rewrappedDataKey.keyMaterial.toString('hex') !==
        originalDataKey.keyMaterial.toString('hex')
    ).shouldMatch(true);
  });
});
