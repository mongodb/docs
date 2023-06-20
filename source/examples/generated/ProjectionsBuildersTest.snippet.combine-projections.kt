data class Results(val year: Int, val type: String)

val filter = Filters.empty()
val projection = Projections.fields(
    Projections.include(YearlyTemperature::year.name, YearlyTemperature::type.name),
    Projections.excludeId()
)
val resultsFlow = collection.find<Results>(filter).projection(projection)
resultsFlow.collect { println(it) }
