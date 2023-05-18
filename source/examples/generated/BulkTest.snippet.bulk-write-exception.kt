val doc5 = InsertOneModel(SampleDoc(1))
val doc6 = InsertOneModel(SampleDoc(3))
try {
    val bulkOperations = listOf(
        (doc5),
        (doc6)
    )
    val bulkWrite = collection.bulkWrite(bulkOperations)
} catch (e: MongoBulkWriteException) {
    println("A MongoBulkWriteException occurred with the following message: " + e.message)
}
