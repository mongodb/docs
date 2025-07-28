data class Results(val year: Int, val type: String, val temperatures: List<YearlyTemperature.MonthlyTemperature>)
val filter = Filters.empty()
val projection = Projections.excludeId()
val resultsFlow = collection.find<Results>(filter).projection(projection)
resultsFlow.collect { println(it) }
