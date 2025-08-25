// Login with authorized user and define a Flexible Sync SyncConfiguration
val app = App.create(YOUR_APP_ID)
val user = app.login(credentials)
val flexSyncConfig = SyncConfiguration.Builder(user, setOf(Task::class, Team::class))
    .initialSubscriptions {
        // Define the initial subscription set for the realm ...
    }
    .build()
// Open the synced realm and manage subscriptions
val realm = Realm.open(flexSyncConfig)
Log.v("Successfully opened realm: ${realm.configuration}")
