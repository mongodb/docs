// Open the synced realm with the defined configuration
val realm = Realm.open(config)
Log.v("Successfully opened synced realm: ${realm.configuration.name}")
// Wait for initial subscriptions to sync to Atlas
realm.subscriptions.waitForSynchronization()
