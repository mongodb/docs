val app = App.create(FLEXIBLE_APP_ID)
val user = app.login(credentials)
val flexSyncConfig = SyncConfiguration.Builder(user, setOf(Item::class))
    // Add subscription
    .initialSubscriptions { realm ->
        add(
            // Get Items from Atlas that match the Realm Query Language query.
            // Uses the queryable field `complexity`.
            // Query matches objects with complexity less than or equal to 4.
            realm.query<Item>("complexity <= 4"),
            "simple-items"
        )
    }
    .build()
val syncRealm = Realm.open(flexSyncConfig)
syncRealm.subscriptions.waitForSynchronization()
Log.v("Successfully opened realm: ${syncRealm.configuration}")
