val app = App.create(YOUR_APP_ID)
// use constants for query names so you can edit or remove them later
val NAME_QUERY = "NAME_QUERY"
runBlocking {
    val user = app.login(Credentials.anonymous())
    val config = SyncConfiguration.Builder(user, setOf(Toad::class))
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
    Log.v("Successfully opened realm: ${realm.configuration.name}")
    realm.close()
}
