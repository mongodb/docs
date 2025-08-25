val user = app.login(Credentials.emailPassword(email, password))
val config = SyncConfiguration.Builder(user, setOf(Toad::class))
    .initialSubscriptions { realm ->
        add(
            realm.query<Toad>(
                "name == $0",
                "Lollihops"
            ),
            "toads_named_lollihops"
        )
    }
    .build()

val realm = Realm.open(config)
// Conditionally download data before using the realm based on some business logic
if (downloadData) {
    realm.syncSession.downloadAllServerChanges(30.seconds)
}

// Query the realm we opened after waiting for data to download, and see that it contains data
val downloadedToads: RealmResults<Toad> = realm.query<Toad>().find()
Log.v("After conditionally downloading data, downloadedToads.size is ${downloadedToads.size}")
realm.close()
