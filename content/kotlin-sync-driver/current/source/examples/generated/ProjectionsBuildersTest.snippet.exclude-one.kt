data class Results(@BsonId val id: ObjectId, val year: Int, val type: String)
val filter = Filters.empty()
val projection = Projections.exclude(YearlyTemperature::temperatures.name)
val resultsFlow = collection.find<Results>(filter).projection(projection)
resultsFlow.collect { println(it) }
