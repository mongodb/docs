Task task = new Task("New Task");
backgroundThreadRealm.executeTransaction (transactionRealm -> {
    transactionRealm.insert(task);
});
