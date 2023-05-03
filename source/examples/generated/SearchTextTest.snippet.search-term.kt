val filter = Filters.text("fast")
collection.find(filter).collect { println(it) }
