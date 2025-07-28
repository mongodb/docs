data class Results(val year: Int, val score: Double)

val filter = Filters.text("even number")
val projection = Projections.fields(
    Projections.include(YearlyTemperature::year.name),
    Projections.metaTextScore("score")
)
val resultsFlow = collection.find<Results>(filter).projection(projection)
resultsFlow.collect { println(it) }
