val config = SyncConfiguration.create(user, setOf(WeatherSensor::class))
val realm = Realm.open(config)
Log.v("Successfully opened realm: ${realm.configuration.name}")
