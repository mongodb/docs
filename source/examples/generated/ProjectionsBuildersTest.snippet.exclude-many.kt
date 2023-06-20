data class Results(@BsonId val id: ObjectId, val year: Int)

val filter = Filters.empty()
val projection = Projections.exclude(YearlyTemperature::temperatures.name, YearlyTemperature::type.name)
val resultsFlow = collection.find<Results>(filter).projection(projection)
resultsFlow.collect { println(it) }
