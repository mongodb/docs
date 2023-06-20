val filter = Filters.and(Filters.lte("qty", 5), Filters.ne("color", "pink"))
val findFlow = collection.find(filter)
findFlow.collect { println(it) }
