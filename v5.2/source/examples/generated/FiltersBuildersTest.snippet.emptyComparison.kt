val emptyComparison = Filters.empty()
val resultsFlow = collection.find(emptyComparison)
resultsFlow.collect { println(it) }
