// use a new encryption key to write and read from a realm
byte[] realmKey = getNewKey();
// use the key to configure a realm
final SyncConfiguration realmConfig =
        new SyncConfiguration.Builder(user, PARTITION)
        .allowQueriesOnUiThread(true)
        .allowWritesOnUiThread(true)
        .encryptionKey(realmKey)
        .build();
// once we've used the key to generate a config, erase it in memory manually
Arrays.fill(realmKey, (byte) 0);

// open and write and read from the realm
Realm encryptedRealm = Realm.getInstance(realmConfig);
ObjectId id = new ObjectId();
encryptedRealm.executeTransaction(eR -> {
    eR.createObject(Frog.class, id);
});
Frog frog = encryptedRealm.where(Frog.class).findFirst();
ObjectId written_id = frog.get_id();
Log.v("EXAMPLE", "generated id: " + id
        + ", written frog id: " + written_id);
encryptedRealm.close();

// get the encryption key from the key store a second time
byte[] decryptedKey = getExistingKey();

// configure a realm with the key
final SyncConfiguration realmConfigDecrypt =
        new SyncConfiguration.Builder(user, PARTITION)
        .allowQueriesOnUiThread(true)
        .allowWritesOnUiThread(true)
        .encryptionKey(decryptedKey)
        .build();
// once we've used the key to generate a config, erase it in memory manually
Arrays.fill(decryptedKey, (byte) 0);

// note: realm is encrypted, this variable just demonstrates that we've
// decrypted the contents with the key in memory
Realm decryptedRealm = Realm.getInstance(realmConfigDecrypt);

Frog frogDecrypt = decryptedRealm.where(Frog.class).findFirst();
Log.v("EXAMPLE", "generated id: " + id
        + ", decrypted written frog id: " + frogDecrypt.get_id());
decryptedRealm.close();
