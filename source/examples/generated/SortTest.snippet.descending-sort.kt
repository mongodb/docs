val resultsFlow = collection.find()
    .sort(Sorts.descending("_id"))
resultsFlow.collect { println(it) }
