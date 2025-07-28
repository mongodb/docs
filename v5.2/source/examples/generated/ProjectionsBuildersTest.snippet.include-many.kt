data class Results(@BsonId val id: ObjectId, val year: Int, val type: String)

val filter = Filters.empty()
val projection = Projections.include(YearlyTemperature::year.name, YearlyTemperature::type.name)
val resultsFlow = collection.find<Results>(filter).projection(projection)
resultsFlow.collect { println(it) }
