val partitionValue: String = "My Project"
val config = SyncConfiguration.Builder(user, partitionValue)
    .build()

val backgroundThreadRealm : Realm = Realm.getInstance(config)
