val filter = Filters.text("furious -fast")
collection.find(filter).collect { println(it) }
