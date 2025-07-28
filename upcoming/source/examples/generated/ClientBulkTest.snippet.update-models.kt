val docsToInsert = mutableListOf<ClientNamespacedWriteModel>()

docsToInsert.add(
    ClientNamespacedWriteModel
        .updateOne(
            MongoNamespace("sample_db", "people"),
            Filters.eq(Person::name.name, "Freya Polk"),
            Updates.inc(Person::age.name, 1)
        )
)

docsToInsert.add(
    ClientNamespacedWriteModel
        .updateMany(
            MongoNamespace("sample_db", "objects"),
            Filters.eq(Object::category.name, "electronic"),
            Updates.set(Object::manufacturer.name, "Premium Technologies")
        )
)

val clientBulkResult = client.bulkWrite(docsToInsert)
