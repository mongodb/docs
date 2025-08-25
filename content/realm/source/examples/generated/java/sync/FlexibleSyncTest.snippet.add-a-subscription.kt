val config = SyncConfiguration.Builder(app.currentUser())
    .initialSubscriptions { realm, subscriptions ->
        subscriptions.add(
            Subscription.create(
                "subscriptionName",
                realm.where(Frog::class.java)
                    .equalTo("species", "spring peeper")
            )
        )
    }
    .build()

// instantiate a realm instance with the flexible sync configuration
Realm.getInstanceAsync(config, object : Realm.Callback() {
    override fun onSuccess(realm: Realm) {
        Log.v("EXAMPLE", "Successfully opened a realm.")
    }
})
