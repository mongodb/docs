val filter = Filters.text("\"fate of the furious\"")
collection.find(filter).collect { println(it) }
