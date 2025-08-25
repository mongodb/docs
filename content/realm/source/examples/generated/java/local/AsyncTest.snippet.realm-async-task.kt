// using class instances for transaction, success, error
realm.executeTransactionAsync(Realm.Transaction { transactionRealm ->
        val item: Item = transactionRealm.createObject<Item>()
}, Realm.Transaction.OnSuccess {
        Log.v("EXAMPLE", "Successfully completed the transaction")
}, Realm.Transaction.OnError { error ->
        Log.e("EXAMPLE", "Failed the transaction: $error")
})

// transaction logic, success notification, error handler all via lambdas
realm.executeTransactionAsync(
    { transactionRealm ->
        val item = transactionRealm.createObject<Item>()
    },
    { Log.v("EXAMPLE", "Successfully completed the transaction") },
    { error ->
        Log.e("EXAMPLE", "Failed the transaction: $error")
    })
