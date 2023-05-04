val resultsFlow = collection.aggregate(listOf(
    Aggregates.sort(Sorts.ascending("_id"))
))
resultsFlow.collect { println(it) }
