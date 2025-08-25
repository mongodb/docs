// Create a secure key.
const encryptionKey = new Int8Array(64);
// ... store key

const syncedEncryptedConfig: Realm.Configuration = {
  schema: [Car],
  path: "syncedEncrypted.realm",
  sync: {
    user: app.currentUser!,
    partitionValue: "myPartition",
  },
  encryptionKey,
};
const syncedEncryptedRealm = await Realm.open(syncedEncryptedConfig);

const localUnencryptedConfig: Realm.Configuration = {
  schema: [Car],
  path: "copyLocalUnencrypted.realm",
};

syncedEncryptedRealm.writeCopyTo(localUnencryptedConfig);
const localUnencryptedRealm = await Realm.open(syncedEncryptedConfig);
