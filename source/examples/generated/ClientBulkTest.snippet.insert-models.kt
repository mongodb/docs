val docsToInsert = mutableListOf<ClientNamespacedWriteModel>()

docsToInsert.add(ClientNamespacedWriteModel
    .insertOne(
        MongoNamespace("sample_db", "people"),
        Person(2, "Julia Smith")
    )
)

docsToInsert.add(ClientNamespacedWriteModel
    .insertOne(
        MongoNamespace("sample_db", "objects"),
        Object(2, "washing machine")
    )
)

val clientBulkResult = client.bulkWrite(docsToInsert)
