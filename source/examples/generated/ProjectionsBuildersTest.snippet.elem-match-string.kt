data class Results(
    val year: Int,
    val temperatures: List<YearlyTemperature.MonthlyTemperature>
)

val filter = Filters.gt(
    "${YearlyTemperature::temperatures.name}.${YearlyTemperature.MonthlyTemperature::avg.name}",
    10.1
)
val projection = Projections.fields(
    Projections.include(YearlyTemperature::year.name),
    Projections.elemMatch(YearlyTemperature::temperatures.name)
)
val resultsFlow = collection.find<Results>(filter).projection(projection)
resultsFlow.collect { println(it) }
