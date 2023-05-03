val filter = Filters.size("vendor", 3)
collection.find(filter).collect { println(it) }
