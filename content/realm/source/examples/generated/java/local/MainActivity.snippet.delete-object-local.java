Task yetAnotherTask = Tasks.get(0);
String yetAnotherTaskName = yetAnotherTask.getName();
// all modifications to a realm must happen inside of a write block
backgroundThreadRealm.executeTransaction( transactionRealm -> {
    Task innerYetAnotherTask = transactionRealm.where(Task.class).equalTo("_id", yetAnotherTaskName).findFirst();
    innerYetAnotherTask.deleteFromRealm();
});
