val app = App.create(YOUR_APP_ID)
runBlocking {
    val user = app.login(Credentials.anonymous())
    val config =
        SyncConfiguration.Builder(user, PARTITION, setOf(/*realm object models here*/))
            .maxNumberOfActiveVersions(10)
            .waitForInitialRemoteData()
            .name("realm name")
            .build()
    val realm = Realm.open(config)
    Log.v("Successfully opened realm: ${realm.configuration}")
    realm.close()
}
