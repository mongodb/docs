val filter = Filters.text("Batman")
val projection = Projections.fields(
    Projections.include(Movie::fullplot.name),
    Projections.excludeId()
)

data class Results(val fullplot: String)

val resultsFlow = moviesCollection.find<Results>(filter).projection(projection)
resultsFlow.collect { println(it) }
