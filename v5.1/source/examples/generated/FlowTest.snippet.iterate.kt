val resultsFlow = collection.find()
resultsFlow.collect { println(it) }
