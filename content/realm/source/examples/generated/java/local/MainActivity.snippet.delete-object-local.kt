val yetAnotherTask: Task = tasks.get(0)!!
val yetAnotherTaskName: String = yetAnotherTask.name
// all modifications to a realm must happen inside of a write block
backgroundThreadRealm.executeTransaction { transactionRealm ->
    val innerYetAnotherTask : Task = transactionRealm.where<Task>().equalTo("name", yetAnotherTaskName).findFirst()!!
    innerYetAnotherTask.deleteFromRealm()
}
