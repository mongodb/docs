data class FruitRating(
    val name: String,
    val rating: Int
)

val filter = Filters.empty()
val projection = Projections.fields(
    Projections.include(FruitRating::name.name, FruitRating::rating.name),
    Projections.excludeId()
)
val flowResults = collection.find<FruitRating>(filter).projection(projection)
flowResults.collect { println(it)}
