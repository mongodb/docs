// transaction logic, success notification, error handler all via lambdas
realm.executeTransactionAsync(transactionRealm -> {
    Item item = transactionRealm.createObject(Item.class);
}, () -> {
    Log.v("EXAMPLE", "Successfully completed the transaction");
}, error -> {
    Log.e("EXAMPLE", "Failed the transaction: " + error);
});

// using class instances for transaction, success, error
realm.executeTransactionAsync(new Realm.Transaction() {
    @Override
    public void execute(Realm transactionRealm) {
        Item item = transactionRealm.createObject(Item.class);
    }
}, new Realm.Transaction.OnSuccess() {
    @Override
    public void onSuccess() {
        Log.v("EXAMPLE", "Successfully completed the transaction");
    }
}, new Realm.Transaction.OnError() {
    @Override
    public void onError(Throwable error) {
        Log.e("EXAMPLE", "Failed the transaction: " + error);
    }
});
