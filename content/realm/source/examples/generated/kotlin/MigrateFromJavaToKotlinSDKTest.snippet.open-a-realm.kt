val config = RealmConfiguration.create(
    setOf(Frog::class, Sample::class))
val realm = Realm.open(config)
Log.v("Successfully opened realm:" +
        "${realm.configuration.name}")
