val doc1: InsertOneModel<SampleDoc> = InsertOneModel(SampleDoc(3))
val doc2: ReplaceOneModel<SampleDoc> = ReplaceOneModel(
    Filters.eq("_id", 1),
    SampleDoc(1, 2)
)
val doc3: UpdateOneModel<SampleDoc> =
    UpdateOneModel(
        Filters.eq("_id", 3),
        Updates.set(SampleDoc::x.name, 2)
    )
val doc4: DeleteManyModel<SampleDoc> =
    DeleteManyModel(Filters.eq(SampleDoc::x.name, 2))

val bulkOperations = listOf(
    doc1,
    doc2,
    doc3,
    doc4
)

val update = collection.bulkWrite(bulkOperations)
