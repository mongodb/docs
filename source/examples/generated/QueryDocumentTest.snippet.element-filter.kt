val filter = Filters.exists("rating")
collection.find(filter).collect { println(it) }
