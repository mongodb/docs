val user: User? = app.currentUser()
val partitionValue: String = "<partition>" // replace this with a partition key
val config = SyncConfiguration.Builder(user!!, partitionValue)
    .build()
val realm: Realm = Realm.getInstance(config)

val address = Address("123 Fake St.", "Springfield", "USA", "90710")
val contact = Contact("Nick Riviera", address)

realm.executeTransaction { transactionRealm ->
    transactionRealm.insert(contact)
}

realm.close()
