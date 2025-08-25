Task otherTask = tasks.get(0);

// all modifications to a realm must happen inside of a write block
backgroundThreadRealm.executeTransaction( transactionRealm -> {
    Task innerOtherTask = transactionRealm.where(Task.class).equalTo("_id", otherTask.get_id()).findFirst();
    innerOtherTask.setStatus(TaskStatus.Complete);
});
