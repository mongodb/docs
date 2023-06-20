val filter = Filters.gt("qty", 7)
val findFlow = collection.find(filter)
findFlow.collect { println(it) }
