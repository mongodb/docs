val config = RealmConfiguration.create(schema = setOf(Item::class))
var compacted = Realm.compactRealm(config)
