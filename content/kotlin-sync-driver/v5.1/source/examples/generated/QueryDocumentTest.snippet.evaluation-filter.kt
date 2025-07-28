val filter = Filters.regex("color", "k$")
val findFlow = collection.find(filter)
findFlow.collect { println(it) }
