// use a new encryption key to write and read from a realm
val realmKey = getNewKey()
// use the key to configure a realm
val realmConfig = SyncConfiguration.Builder(user, PARTITION)
        .allowQueriesOnUiThread(true)
        .allowWritesOnUiThread(true)
        .encryptionKey(realmKey)
        .build()
// once we've used the key to generate a config, erase it in memory manually
Arrays.fill(realmKey, 0.toByte())

// open and write and read from the realm
val encryptedRealm = Realm.getInstance(realmConfig)
val id = ObjectId()
encryptedRealm.executeTransaction {
    eR: Realm -> eR.createObject(Frog::class.java, id)
}
val frog = encryptedRealm.where(Frog::class.java).findFirst()
val written_id = frog!!._id
Log.v("EXAMPLE", "generated id: " + id
        + ", written frog id: " + written_id)
encryptedRealm.close()

// get the encryption key from the key store a second time
val decryptedKey = getExistingKey()

// configure a realm with the key
val realmConfigDecrypt = SyncConfiguration.Builder(user, PARTITION)
        .allowQueriesOnUiThread(true)
        .allowWritesOnUiThread(true)
        .encryptionKey(decryptedKey)
        .build()
// once we've used the key to generate a config, erase it in memory manually
Arrays.fill(decryptedKey, 0.toByte())

// note: realm is encrypted, this variable just demonstrates that we've
// decrypted the contents with the key in memory
val decryptedRealm = Realm.getInstance(realmConfigDecrypt)
val frogDecrypt = decryptedRealm.where(Frog::class.java).findFirst()
Log.v("EXAMPLE", "generated id: " + id
        + ", decrypted written frog id: " + frogDecrypt!!._id)
decryptedRealm.close()
