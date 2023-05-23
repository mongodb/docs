val resultsFlow = collection.find()
    .sort(Sorts.ascending("_id"))

resultsFlow.collect { println(it) }
