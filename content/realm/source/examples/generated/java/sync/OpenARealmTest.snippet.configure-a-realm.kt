val config =
    SyncConfiguration.Builder(app.currentUser(), PARTITION)
        .allowQueriesOnUiThread(true)
        .allowWritesOnUiThread(true)
        .waitForInitialRemoteData(500, TimeUnit.MILLISECONDS)
        .compactOnLaunch()
        .build()

Realm.getInstanceAsync(config, object : Realm.Callback() {
    override fun onSuccess(realm: Realm) {
        Log.v("EXAMPLE", "Successfully opened a realm.")
    }
})
