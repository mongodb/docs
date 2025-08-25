val config = SyncConfiguration.Builder(app.currentUser(), PARTITION)
    .allowQueriesOnUiThread(true)
    .allowWritesOnUiThread(true)
    .build()

Realm.getInstanceAsync(config, object : Realm.Callback() {
    override fun onSuccess(realm: Realm) {
        Log.v("EXAMPLE", "Successfully opened a realm with reads and writes allowed on the UI thread.")
    }
})
