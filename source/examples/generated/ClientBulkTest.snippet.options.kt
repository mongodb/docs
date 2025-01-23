val namespace = MongoNamespace("sample_db", "people")

val options = ClientBulkWriteOptions
    .clientBulkWriteOptions()
    .ordered(false)

val bulkOperations = listOf(
    ClientNamespacedWriteModel.insertOne(
        namespace,
        Person(2, "Rudra Suraj")
    ),
    // Causes duplicate key error
    ClientNamespacedWriteModel.insertOne(
        namespace,
        Person(2, "Wendy Zhang")
    ),
    ClientNamespacedWriteModel.insertOne(
        namespace,
        Person(4, "Mario Bianchi")
    )
)

val result = client.bulkWrite(bulkOperations, options)
