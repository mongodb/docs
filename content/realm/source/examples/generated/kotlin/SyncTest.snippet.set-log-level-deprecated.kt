// Access your app
val app = App.create(YOUR_APP_ID)
val user = app.login(credentials)

// Access the configuration builder for the app
val config = SyncConfiguration.Builder(user, setOf(Toad::class))

    // Set the logger to provide debug log
    // Must be set BEFORE you open a synced realm
    .log(LogLevel.DEBUG)

    .initialSubscriptions { realm ->
        add(realm.query<Toad>(), "sync subscription")
    }
    .build()

// Open the synced realm
// Synced realm writes logs according to the log level set above
val realm = Realm.open(config)
