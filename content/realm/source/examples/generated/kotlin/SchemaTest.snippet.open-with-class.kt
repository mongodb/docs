val config = RealmConfiguration.Builder(
    schema = setOf(Cat::class) // Pass the defined class as the object schema
)
    .build()
val realm = Realm.open(config)
