val app = App.create(yourFlexAppId)

// Login with user that has the server-side permissions to
// read and write the data you want in the asset realm
val user = app.login(credentials)

// Create a SyncConfiguration to open a synced realm to use as the asset realm
val assetRealmConfig = SyncConfiguration.Builder(user, setOf(Item::class))
    .name("asset.realm")
    // Add a subscription that matches the data being added
    // and your app's backend permissions
    .initialSubscriptions{ realm ->
        add(
            realm.query<Item>("isComplete == $0", false), "Incomplete Items")
    }
    .build()
val assetRealm = Realm.open(assetRealmConfig)

assetRealm.subscriptions.waitForSynchronization(10.seconds)
assertEquals(SubscriptionSetState.COMPLETE, assetRealm.subscriptions.state)

assetRealm.writeBlocking {
    // Add seed data to the synced realm
    copyToRealm(Item().apply {
        summary = "Make sure the app has the data it needs"
        isComplete = false
    })
}
// Verify the data in the existing realm
// (this data should also be in the bundled realm we open later)
val assetItems: RealmResults<Item> = assetRealm.query<Item>().find()
for(item in assetItems) {
    Log.v("Item in the assetRealm: ${item.summary}")
}

// IMPORTANT: Sync all changes with server before copying the synced realm
assetRealm.syncSession.uploadAllLocalChanges(30.seconds)
assetRealm.syncSession.downloadAllServerChanges(30.seconds)
