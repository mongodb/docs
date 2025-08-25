val config = RealmConfiguration.Builder(
    schema = setOf(Frog::class)
)
    .deleteRealmIfMigrationNeeded()
    .build()
val realm = Realm.open(config)
Log.v("Successfully opened realm: ${realm.configuration.name}")
