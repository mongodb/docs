val user = app.login(Credentials.emailPassword(email, password))
val config = SyncConfiguration.Builder(user, setOf(Toad::class))
    .waitForInitialRemoteData(60.seconds)
    .initialSubscriptions { realm ->
        add(
            realm.query<Toad>(
                "name == $0",
                "Jeremiah"
            ),
            "toads_named_jeremiah"
        )
    }
    .build()
val realm = Realm.open(config)
Log.v("Successfully opened realm: ${realm.configuration}")

// Query the realm we opened after waiting for data to download, and see that it contains data
val downloadedToads: RealmResults<Toad> = realm.query<Toad>().find()
Log.v("After downloading initial data, downloadedToads.size is ${downloadedToads.size}")
realm.close()
