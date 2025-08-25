val config = SyncConfiguration.Builder(app.currentUser())
    .initialSubscriptions { realm, subscriptions ->
        // add a subscription without assigning a name
        subscriptions.add(
            Subscription.create(
                realm.where(Frog::class.java)
                    .equalTo("species", "spring peeper")
            )
        )
    }
    .build()
Realm.getInstanceAsync(config, object : Realm.Callback() {
    override fun onSuccess(realm: Realm) {
        Log.v("EXAMPLE", "Successfully opened a realm.")
        // later, you can look up this subscription by query
        val subscription =
            realm.subscriptions.find(
                realm.where(
                    Frog::class.java
                ).equalTo("species", "spring peeper")
            )
    }
})
