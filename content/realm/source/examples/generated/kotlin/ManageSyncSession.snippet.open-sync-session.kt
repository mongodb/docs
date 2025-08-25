val app = App.create(YOUR_APP_ID)
val user = app.login(credentials)
val config = SyncConfiguration.Builder(user, setOf(Task::class))
    .build()

// Open the synced realm
val realm = Realm.open(config)

// Sync session is now active

// ... do something with the synced realm

