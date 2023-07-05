try {
    val bulkOperations = listOf(
        (InsertOneModel(Person(1, "James Smith", 13))),
        (InsertOneModel(Person(3, "Colin Samuels")))
    )
    val bulkWrite = collection.bulkWrite(bulkOperations)
} catch (e: MongoBulkWriteException) {
    println("A MongoBulkWriteException occurred with the following message: " + e.message)
}
