val config = SyncConfiguration.Builder(app.currentUser())
    .allowQueriesOnUiThread(true)
    .allowWritesOnUiThread(true)
    .initialSubscriptions { realm, subscriptions ->
        subscriptions.add(
            Subscription.create(
                "subscriptionName",
                realm.where(Frog::class.java)
                    .equalTo("species", "springPeepers")
            )
        )
    }
    .build()

Realm.getInstanceAsync(config, object : Realm.Callback() {
    override fun onSuccess(realm: Realm) {
        Log.v(
            "EXAMPLE",
            "Successfully opened a realm with reads and writes allowed on the UI thread."
        )
    }
})
