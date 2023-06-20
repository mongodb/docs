val search = listOf("A", "D")
val allComparison = Filters.all(PaintOrder::vendors.name, search)
val resultsFlow = collection.find(allComparison)
resultsFlow.collect { println(it) }
