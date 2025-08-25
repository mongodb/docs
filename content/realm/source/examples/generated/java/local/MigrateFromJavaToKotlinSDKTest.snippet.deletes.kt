val sample =
    realm.where(
        Sample::class.java
    ).findFirst()

// delete one object synchronously
realm.executeTransaction {
        transactionRealm: Realm? ->
    sample!!.deleteFromRealm()
}

// delete a query result asynchronously
realm.executeTransactionAsync {
        backgroundRealm: Realm ->
    backgroundRealm.where(
        Sample::class.java
    ).findFirst()!!.deleteFromRealm()
}
