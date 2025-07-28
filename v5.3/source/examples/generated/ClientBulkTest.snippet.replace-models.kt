val docsReplacements = mutableListOf<ClientNamespacedWriteModel>()

docsReplacements.add(ClientNamespacedWriteModel
    .replaceOne(
        MongoNamespace("sample_db", "people"),
        Filters.eq(Person::id.name, 1),
        Person(1, "Frederic Hilbert")
    )
)

docsReplacements.add(ClientNamespacedWriteModel
    .replaceOne(
        MongoNamespace("sample_db", "objects"),
        Filters.eq(Object::id.name, 1),
        Object(1, "ironing board")
    )
)

val clientBulkResult = client.bulkWrite(docsReplacements)
