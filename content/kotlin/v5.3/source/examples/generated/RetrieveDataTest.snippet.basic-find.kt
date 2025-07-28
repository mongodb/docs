val filter = Filters.and(Filters.gt("qty", 3), Filters.lt("qty", 9))
val resultsFlow = collection.find(filter)

resultsFlow.collect { println(it) }
