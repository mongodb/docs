collection.bulkWrite(
    listOf(
        InsertOneModel(Movie("Shrek", 2001)),
        DeleteManyModel(Filters.lt(Movie::year.name, 2004)),
    )
)
