val syncConfig = SyncConfiguration.Builder(user, setOf(Frog::class))
    .initialSubscriptions { realm ->
        add(realm.query<Frog>())
    }
    // Specify the encryption key
    .encryptionKey(generatedKey)
    .build()
val realm = Realm.open(syncConfig)
Log.v("Successfully opened encrypted realm: ${realm.configuration.name}")
