runBlocking {
    // Create the in-memory realm
    val inMemoryConfig = RealmConfiguration.Builder(setOf(Frog::class))
        .name("inMemory.realm")
        .inMemory()
        .build()

    // Open the realm and add data to it
    val inMemoryRealm = Realm.open(inMemoryConfig)

    inMemoryRealm.write {
        this.copyToRealm(Frog().apply {
            name = "Kermit"
        })
    }

    // Create the local realm
    val localConfig = RealmConfiguration.Builder(setOf(Frog::class))
        .name("local.realm")
        .build()
    // Copy data from `inMemoryRealm` to the new realm
    inMemoryRealm.writeCopyTo(localConfig)
    // Close the original realm when you're done copying
    inMemoryRealm.close()

    // Open the new local realm
    val localRealm = Realm.open(localConfig)

    // Copied Frog object is available in the new realm
    val frog = localRealm.query<Frog>().find().first()
    Log.v("Copied Frog: ${frog.name}")

    localRealm.close()
}
