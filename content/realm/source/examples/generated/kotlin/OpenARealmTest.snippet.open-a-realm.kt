// Create a realm configuration with configuration builder
// and pass all optional arguments
val config = RealmConfiguration.Builder(
    schema = setOf(Frog::class, Person::class)
)
    .name("myRealmName.realm")
    .directory("my-directory-path")
    .encryptionKey(myEncryptionKey)
    .build()

// Open the realm with the configuration object
val realm = Realm.open(config)
Log.v("Successfully opened realm: ${realm.configuration.name}")

// ... use the open realm ...
