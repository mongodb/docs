val filter = Filters.regex("color", "k$")
collection.find(filter).collect { println(it) }
