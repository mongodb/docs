val filter = Filters.text("fate 7")
val findFlow = collection.find(filter)
findFlow.collect { println(it) }
