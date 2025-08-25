val task : Task = Task("New Task", partitionValue)
backgroundThreadRealm.executeTransaction { transactionRealm ->
    transactionRealm.insert(task)
}
