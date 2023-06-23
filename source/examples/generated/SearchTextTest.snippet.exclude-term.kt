val filter = Filters.text("furious -fast")
val findFlow = collection.find(filter)
findFlow.collect { println(it) }
