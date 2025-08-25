val config = RealmConfiguration.Builder(
    setOf(Frog::class, Sample::class))
    .name(REALM_NAME)
    .deleteRealmIfMigrationNeeded()
    .directory(PATH)
    .encryptionKey(KEY)
    .build()
val realm = Realm.open(config)
Log.v("Successfully opened realm:" +
        realm.configuration.name
)
