val config = RealmConfiguration.Builder(
    schema = setOf(Person::class)
)
    .schemaVersion(2) // Sets the new schema version to 2
    .build()
val realm = Realm.open(config)
