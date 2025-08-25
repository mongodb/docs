val task : Task = Task()
task.name = "New Task"
backgroundThreadRealm.executeTransaction { transactionRealm ->
    transactionRealm.insert(task)
}
