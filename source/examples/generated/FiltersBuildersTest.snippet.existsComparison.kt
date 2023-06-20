val existsComparison = Filters.and(Filters.exists(PaintOrder::qty.name), Filters.nin("qty", 5, 8))
val resultsFlow = collection.find(existsComparison)
resultsFlow.collect { println(it) }
