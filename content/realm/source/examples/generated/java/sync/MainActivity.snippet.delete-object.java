Task yetAnotherTask = tasks.get(0);
ObjectId yetAnotherTaskId = yetAnotherTask.get_id();
// all modifications to a realm must happen inside of a write block
backgroundThreadRealm.executeTransaction( transactionRealm -> {
    Task innerYetAnotherTask = transactionRealm.where(Task.class).equalTo("_id", yetAnotherTaskId).findFirst();
    innerYetAnotherTask.deleteFromRealm();
});
