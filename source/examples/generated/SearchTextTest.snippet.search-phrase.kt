val filter = Filters.text("\"fate of the furious\"")
val findFlow = collection.find(filter)
findFlow.collect { println(it) }
