val config = SyncConfiguration.Builder(app.currentUser())
    .initialSubscriptions { realm, subscriptions ->
        // add a subscription with a name
        subscriptions.add(
            Subscription.create(
                "frogSubscription",
                realm.where(Frog::class.java)
                    .equalTo("species", "spring peeper")
            )
        )
    }
    .build()
Realm.getInstanceAsync(config, object : Realm.Callback() {
    override fun onSuccess(realm: Realm) {
        Log.v("EXAMPLE", "Successfully opened a realm.")
        // later, you can look up this subscription by name
        val subscription =
            realm.subscriptions.find("frogSubscription")

    }
})
