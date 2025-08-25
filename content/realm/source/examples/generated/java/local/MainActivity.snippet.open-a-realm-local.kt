val realmName: String = "My Project"
val config = RealmConfiguration.Builder().name(realmName).build()

val backgroundThreadRealm : Realm = Realm.getInstance(config)
