val filter = Filters.gt("qty", 7)
collection.find(filter).collect { println(it) }
