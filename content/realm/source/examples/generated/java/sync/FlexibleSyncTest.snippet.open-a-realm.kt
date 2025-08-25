// instantiate a Realm App connection
val appID: String = YOUR_APP_ID // replace this with your App ID
val app = App(
    AppConfiguration.Builder(appID)
        .build()
)
// authenticate a user
val credentials = Credentials.anonymous()
app.loginAsync(
    credentials
) { it: App.Result<User?> ->
    if (it.isSuccess) {
        val user = it.get()

        // add an initial subscription to the sync configuration
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
    } else {
        Log.e(
            "EXAMPLE",
            "Failed to log in: " + it.error.errorMessage
        )
    }
}
