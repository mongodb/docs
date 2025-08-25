testActivity?.runOnUiThread {
    // instantiate an app connection
    val appID: String = YOUR_APP_ID // replace this with your App ID
    val app = App(AppConfiguration.Builder(appID).build())

    // authenticate a user
    val credentials = Credentials.anonymous()
    app.loginAsync(credentials) {
        if (it.isSuccess) {
            Log.v("EXAMPLE", "Successfully authenticated.")
            // open a synced realm
            val config = SyncConfiguration.Builder(
                app.currentUser(),
                getRandomPartition() // replace this with a valid partition
            ).allowQueriesOnUiThread(true)
                .allowWritesOnUiThread(true)
                .build()
            Realm.getInstanceAsync(config, object : Realm.Callback() {
                override fun onSuccess(realm: Realm) {
                    Log.v("EXAMPLE", "Successfully opened a realm.")
                    // read and write to realm here via transactions
                    realm.executeTransaction {
                        realm.createObjectFromJson(
                            Frog::class.java,
                            "{ name: \"Doctor Cucumber\", age: 1, species: \"bullfrog\", owner: \"Wirt\", _id:0 }"
                        )
                    }
                    testLatch.countDown()
                    realm.close()
                }
                override fun onError(exception: Throwable) {
                    Log.e("EXAMPLE",
                        "Failed to open the realm: " + exception.localizedMessage)
                }
            })
        } else {
            Log.e("EXAMPLE", "Failed login: " + it.error.errorMessage)
        }
    }
}
