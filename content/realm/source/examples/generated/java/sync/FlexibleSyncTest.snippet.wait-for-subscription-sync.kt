val config = SyncConfiguration.Builder(app.currentUser())
    .initialSubscriptions { realm, subscriptions ->
        subscriptions.add(
            Subscription.create(
                "my subscription",
                realm.where(Frog::class.java)
                    .equalTo("species", "poison dart")
            )
        )
    }
    .waitForInitialRemoteData(
        2112,
        TimeUnit.MILLISECONDS
    )
    .build()
Realm.getInstanceAsync(config, object : Realm.Callback() {
    override fun onSuccess(realm: Realm) {
        Log.v("EXAMPLE", "Successfully opened a realm.")
    }
})
