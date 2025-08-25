realm.executeTransactionAsync {
        transactionRealm: Realm ->
    val sample: Sample =
        Sample()
    sample.stringField = "Sven"
    transactionRealm.copyToRealm(
        sample
    )
}
