data class FruitName(
    @BsonId val id: Int? = null,
    val name: String
)

// return all documents with only the name field
val filter = Filters.empty()
val projection = Projections.fields(
    Projections.include(FruitName::name.name)
)
val flowResults = collection.find<FruitName>(filter).projection(projection)
flowResults.collect { println(it)}
