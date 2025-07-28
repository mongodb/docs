val resultsFlow = collection.aggregate(listOf(
    Aggregates.sort(Sorts.ascending(Order::orderTotal.name))
))

resultsFlow.collect { println(it) }
