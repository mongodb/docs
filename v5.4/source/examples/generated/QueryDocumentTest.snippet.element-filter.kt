val filter = Filters.exists("rating")
val findFlow = collection.find(filter)
findFlow.collect { println(it) }
