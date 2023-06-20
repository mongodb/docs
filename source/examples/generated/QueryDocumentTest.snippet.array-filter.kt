val filter = Filters.size("vendor", 3)
val findFlow = collection.find(filter)
findFlow.collect { println(it) }
