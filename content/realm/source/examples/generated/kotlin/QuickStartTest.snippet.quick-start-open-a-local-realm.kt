val config = RealmConfiguration.create(schema = setOf(Item::class))
val realm: Realm = Realm.open(config)
