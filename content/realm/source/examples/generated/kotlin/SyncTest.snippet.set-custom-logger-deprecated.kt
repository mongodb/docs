val customLogger = CustomLogger()
customLogger.tag = "Engineering debugging"
customLogger.message = "${customLogger.logLevel}: ${customLogger.message}"

// Access your app
val app = App.create(YOUR_APP_ID)
val user = app.login(credentials)

// Access the configuration builder for the app
val config = SyncConfiguration.Builder(user, setOf(Toad::class))

    // Set the custom logger and applicable log level
    // Must be set BEFORE you open a synced realm
    .log(LogLevel.ALL, customLoggers = listOf(customLogger))

    .initialSubscriptions { realm ->
        add(realm.query<Toad>(), "sync subscription")
    }
    .build()

// Open the synced realm with the custom logger
val realm = Realm.open(config)
