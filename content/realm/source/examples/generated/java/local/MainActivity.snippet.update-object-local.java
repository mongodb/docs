Task otherTask = Tasks.get(0);

// all modifications to a realm must happen inside of a write block
backgroundThreadRealm.executeTransaction( transactionRealm -> {
    Task innerOtherTask = transactionRealm.where(Task.class).equalTo("_id", otherTask.getName()).findFirst();
    innerOtherTask.setStatus(TaskStatus.Complete);
});
