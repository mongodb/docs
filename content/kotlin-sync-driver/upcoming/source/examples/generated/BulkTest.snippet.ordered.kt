val insertMdl = InsertOneModel(Person(6, "Zaynab Omar", 37))
val replaceMdl = ReplaceOneModel(
    Filters.eq("_id", 1),
    Person(1, "Sandy Kane", location = "Helena, MT")
)
val updateMdl  = UpdateOneModel<Person>(
        Filters.eq("_id", 6),
        Updates.set(Person::name.name, "Zaynab Hassan")
    )
val deleteMdl = DeleteManyModel<Person>(Filters.gt(Person::age.name, 50))

val bulkOperations = listOf(
    insertMdl,
    replaceMdl,
    updateMdl,
    deleteMdl
)

val result = collection.bulkWrite(bulkOperations)
