val equalComparison = Filters.eq(PaintOrder::qty.name, 5)
val resultsFlow = collection.find(equalComparison)
resultsFlow.collect { println(it) }
