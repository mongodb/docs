// Set a log level using the global RealmLog singleton
RealmLog.level = LogLevel.TRACE

// Access your app and use realm
val app: App = App.create(YOUR_APP_ID) // Replace this with your App ID
val user = app.login(Credentials.emailPassword(email, password))
val config = SyncConfiguration.Builder(user, setOf(Toad::class))
    .initialSubscriptions { realm ->
        add(realm.query<Toad>("name == $0", "name value"), "sync subscription")
    }
    .build()
val realm = Realm.open(config)

// You can change the log level at any point in your app's lifecycle as needed
RealmLog.level = LogLevel.INFO
