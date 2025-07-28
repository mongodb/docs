data class Store(
    @BsonId val id: Int,
    val name: String,
    val coordinates: Point
)
val collection = database.getCollection<Store>("stores")

val square = Polygon(listOf(
    Position(0.0, 0.0),
    Position(4.0, 0.0),
    Position(4.0, 4.0),
    Position(0.0, 4.0),
    Position(0.0, 0.0)))
val geoWithinComparison = Filters.geoWithin(Store::coordinates.name, square)

val resultsFlow = collection.find(geoWithinComparison)
resultsFlow.collect { println(it) }
