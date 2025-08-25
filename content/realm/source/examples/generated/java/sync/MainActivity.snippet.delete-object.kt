val yetAnotherTask: Task = tasks.get(0)!!
val yetAnotherTaskId: ObjectId = yetAnotherTask._id
// all modifications to a realm must happen inside of a write block
backgroundThreadRealm.executeTransaction { transactionRealm ->
    val innerYetAnotherTask : Task = transactionRealm.where<Task>().equalTo("_id", yetAnotherTaskId).findFirst()!!
    innerYetAnotherTask.deleteFromRealm()
}
