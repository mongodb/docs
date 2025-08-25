val app = App.create(YOUR_APP_ID)
runBlocking {
    val user = app.login(Credentials.anonymous())
    val config = SyncConfiguration.Builder(user, setOf(Toad::class))
        .maxNumberOfActiveVersions(10)
        .name("realm name")
        .initialSubscriptions { realm ->
            add(
                realm.query<Toad>(
                    "name == $0",
                    "name value"
                ),
                "subscription name"
            )
        }
        .build()
    val realm = Realm.open(config)
    Log.v("Successfully opened realm: ${realm.configuration}")
    realm.close()
}
