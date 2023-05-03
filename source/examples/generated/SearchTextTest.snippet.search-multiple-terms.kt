val filter = Filters.text("fate 7")
collection.find(filter).collect { println(it) }
