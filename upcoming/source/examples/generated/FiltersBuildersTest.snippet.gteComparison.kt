val gteComparison = Filters.gte(PaintOrder::qty.name, 10)
val resultsFlow = collection.find(gteComparison)
resultsFlow.collect { println(it) }
