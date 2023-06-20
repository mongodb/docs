data class Results(val temperatures: List<YearlyTemperature.MonthlyTemperature>)

val filter = Filters.empty()
// First half of the year
val projection = Projections.fields(
    Projections.slice(YearlyTemperature::temperatures.name, 6),
    Projections.excludeId()
)
val resultsFlow = collection.find<Results>(filter)
    .projection(projection)
resultsFlow.collect { println(it) }
