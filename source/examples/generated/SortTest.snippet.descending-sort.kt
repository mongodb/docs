val resultsFlow = collection.find()
    .sort(Sorts.descending(Order::orderTotal.name))

resultsFlow.collect { println(it) }
