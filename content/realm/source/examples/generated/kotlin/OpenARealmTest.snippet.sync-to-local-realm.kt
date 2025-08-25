// Instantiate the synced realm with your App ID
val app = App.create(YOUR_APP_ID)

runBlocking {
    val user = app.login(credentials)
    // Create the synced realm configuration
    val syncConfig = SyncConfiguration.Builder(user, setOf(Frog::class))
        .initialSubscriptions { realm ->
            add(realm.query<Frog>(),"all-frogs")
        }
        .build()

    // Open the synced realm and add data to it
    val syncRealm = Realm.open(syncConfig)
    Log.v("Successfully opened realm: ${syncRealm.configuration.name}")

    syncRealm.write {
        this.copyToRealm(Frog().apply {
            name = "Kermit"
        })
    }
    // Wait for write to sync
    syncRealm.syncSession.uploadAllLocalChanges(30.seconds)

    // Create the local realm
    val localConfig = RealmConfiguration.Builder(setOf(Frog::class))
        .name("local.realm")
        .build()
    // Copy data from synced realm to the new realm
    syncRealm.writeCopyTo(localConfig)
    // Close the synced realm when you're done copying
    syncRealm.close()

    // Open the new local realm
    val localRealm = Realm.open(localConfig)

    // Copied Frog object is available in the new realm
    val frog = localRealm.query<Frog>().find().first()
    Log.v("Copied Frog: ${frog.name}")

    localRealm.close()
}
