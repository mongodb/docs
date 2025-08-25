runBlocking {
    // Create the unencrypted realm
    val unencryptedConfig = RealmConfiguration.Builder(setOf(Frog::class))
        .name("unencrypted.realm")
        .build()

    // Open the realm and add data to it
    val unencryptedRealm = Realm.open(unencryptedConfig)

    unencryptedRealm.write {
        this.copyToRealm(Frog().apply {
            name = "Kermit"
        })
    }

    // ... Generate encryption key ...

    // Create the encrypted realm
    val encryptedConfig = RealmConfiguration.Builder(setOf(Frog::class))
        .name("encrypted.realm")
        .encryptionKey(encryptionKey)
        .build()

    // Copy data from `unencryptedRealm` to the new realm
    // Data is encrypted as part of the copy process
    unencryptedRealm.writeCopyTo(encryptedConfig)

    // Close the original realm when you're done copying
    unencryptedRealm.close()

    // Open the new encrypted realm
    val encryptedRealm = Realm.open(encryptedConfig)

    // Copied Frog object is available in the new realm
    val frog = encryptedRealm.query<Frog>().find().first()
    Log.v("Copied Frog: ${frog.name}")

    encryptedRealm.close()
}
