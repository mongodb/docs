val otherTask: Task = tasks[0]!!

// all modifications to a realm must happen inside of a write block
backgroundThreadRealm.executeTransaction { transactionRealm ->
    val innerOtherTask : Task = transactionRealm.where<Task>().equalTo("_id", otherTask._id).findFirst()!!
    innerOtherTask.status = TaskStatus.Complete.name
}
