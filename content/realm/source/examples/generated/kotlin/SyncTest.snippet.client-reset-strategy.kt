// Specify your client reset strategy in the SyncConfiguration
// If you don't specify, defaults to RecoverOrDiscardUnsyncedChangesStrategy
val config = SyncConfiguration.Builder(user, setOf(Toad::class))
    .initialSubscriptions { realm ->
        add(realm.query<Toad>(), "subscription name")
    }
    .syncClientResetStrategy(clientResetStrategy) // Set your client reset strategy
    .build()
