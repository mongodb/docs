// Create the in-memory realm configuration
val config = RealmConfiguration.Builder(
    schema = setOf(Frog::class, Person::class)
)
    .inMemory()
    .build()

// Open the realm with the configuration object
val realm = Realm.open(config)
Log.v("Successfully opened an in-memory realm")

// ... use the open realm ...
