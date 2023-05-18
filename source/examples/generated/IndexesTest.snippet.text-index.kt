try {
    val resultCreateIndex = moviesCollection.createIndex(Indexes.text(Movie::plot.name))
    println("Index created: $resultCreateIndex")
} catch (e: MongoCommandException) {
    if (e.errorCodeName == "IndexOptionsConflict")
        println("there's an existing text index with different options")
}

val filter = Filters.text("Batman")
val projection = Projections.fields(
    Projections.include(Movie::fullplot.name),
    Projections.excludeId()
)
data class Results(val fullplot: String)
val resultsFlow = moviesCollection.find<Results>(filter).projection(projection)
resultsFlow.collect { println(it) }
