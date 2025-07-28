val filter = Filters.text("fast")
val findFlow = collection.find(filter)
findFlow.collect { println(it) }
