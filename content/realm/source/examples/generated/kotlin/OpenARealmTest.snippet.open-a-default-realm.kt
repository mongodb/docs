// Creates a realm with default configuration values
val config = RealmConfiguration.create(
    // Pass object classes for the realm schema
    schema = setOf(Frog::class, Person::class)
)

// Open the realm with the configuration object
val realm = Realm.open(config)
Log.v("Successfully opened realm: ${realm.configuration.name}")

// ... use the open realm ...
