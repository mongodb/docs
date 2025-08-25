Task Task = new Task("New Task");
backgroundThreadRealm.executeTransaction (transactionRealm -> {
    transactionRealm.insert(Task);
});
