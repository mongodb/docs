val config = RealmConfiguration.Builder(
    schema = setOf(Frog::class, Person::class)
)
    .initialData {
        copyToRealm(Frog().apply { name = "Kermit" })
        copyToRealm(Person().apply { name = "Jim Henson" })
    }
    .build()

val realm = Realm.open(config)
Log.v("Successfully opened realm: ${realm.configuration.name}")

// Opened realm includes the initial data
val initialFrog = realm.query<Frog>().find().first()
val initialPerson = realm.query<Person>().find().first()
Log.v("Realm initialized with: ${initialFrog.name} and ${initialPerson.name}")
