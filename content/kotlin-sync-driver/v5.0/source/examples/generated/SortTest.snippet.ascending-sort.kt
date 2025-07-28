val resultsFlow = collection.find()
    .sort(Sorts.ascending(Order::orderTotal.name))

resultsFlow.collect { println(it) }
