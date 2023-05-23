val doc1= InsertOneModel(SampleDoc(3))
val doc2 = ReplaceOneModel(
    Filters.eq("_id", 1),
    SampleDoc(1, 2)
)
val doc3  = UpdateOneModel<SampleDoc>(
        Filters.eq("_id", 3),
        Updates.set(SampleDoc::x.name, 2)
    )
val doc4 = DeleteManyModel<SampleDoc>(Filters.eq(SampleDoc::x.name, 2))

val bulkOperations = listOf(
    doc1,
    doc2,
    doc3,
    doc4
)

val update = collection.bulkWrite(bulkOperations)
